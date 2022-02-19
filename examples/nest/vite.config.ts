import { defineConfig } from 'vite';
import { VitePluginNode } from '../../dist';

export default defineConfig({
  root: 'src',
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      appPath: 'main.ts',
      tsCompiler: 'swc',
    }),
  ],
});
