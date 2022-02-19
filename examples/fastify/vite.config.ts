import { defineConfig } from 'vite';
import { VitePluginNode } from '../../dist';

export default defineConfig({
  root: 'src',
  plugins: [
    ...VitePluginNode({
      adapter: 'fastify',
      appPath: './app.ts'
    })
  ]
});
