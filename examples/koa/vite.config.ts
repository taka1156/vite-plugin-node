import { defineConfig } from 'vite';
import { VitePluginNode } from '../../dist';

export default defineConfig({
  plugins: [
    ...VitePluginNode({
      adapter: 'koa',
      appPath: './app.ts'
    })
  ]
});
