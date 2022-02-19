import { Plugin, UserConfig, ConfigEnv } from 'vite';
import { PLUGIN_NAME, ViteConfig, VitePluginNodeConfig } from '.';
import { RollupPluginSwc } from './rollup-plugin-swc';
import { createMiddleware } from './server';

export function VitePluginNode(cfg: VitePluginNodeConfig): Plugin[] {
  const config: VitePluginNodeConfig = {
    appPath: cfg.appPath,
    adapter: cfg.adapter,
    tsCompiler: cfg.tsCompiler ?? 'esbuild',
    exportName: cfg.exportName ?? 'viteNodeApp'
  };

  const resolvePath = (root: string = '', config: VitePluginNodeConfig): VitePluginNodeConfig => {
    if (root !== '') {
      config.appPath = `${root}/${config.appPath}`;
    }
    return config;
  };

  const resolveConfig = (viteConfig: UserConfig, env: ConfigEnv ): ViteConfig => {

    const { root, build } = viteConfig;
    const { appPath } = config;

    if (env.mode === 'serve') {
      // serve
      return {
        // https://vitejs.dev/config/#root
        root: root || process.cwd(),
        server: {
          hmr: false
        },
        esbuild: config.tsCompiler === 'esbuild' ? {} : false,
        VitePluginNodeConfig: resolvePath(root, config),
      };
    } else {
      // build
      return {
        // https://vitejs.dev/config/#root
        root: root || process.cwd(),
        build: {
          ssr: appPath || 'index.js', // production entry point
          outDir: build?.outDir || '../dist',
          emptyOutDir: build?.emptyOutDir|| true,
        },
        esbuild: config.tsCompiler === 'esbuild' ? {} : false,
        VitePluginNodeConfig: resolvePath(root, config)
      };
    }
  };

  const plugins: Plugin[] = [
    {
      name: PLUGIN_NAME,
      config: (viteConfig, env) => resolveConfig(viteConfig, env),
      configureServer: (server) => {
        server.middlewares.use(createMiddleware(server));
      },
      apply: 'serve'
    },
    {
      name: PLUGIN_NAME,
      config: (viteConfig, env) => resolveConfig(viteConfig, env),
      apply: 'build'
    }
  ];

  if (config.tsCompiler === 'swc') {
    plugins.push({
      ...RollupPluginSwc({
        jsc: {
          target: 'es2019',
          parser: {
            syntax: 'typescript',
            decorators: true
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true
          }
        }
      })
    });
  }

  return plugins;
}
