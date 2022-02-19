import { defineConfig } from 'vite';
import { VitePluginNode } from '../../dist';

export default defineConfig({
  root: 'src',
  server: {
    port: 3699
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: 'app.ts'
    })
  ]
});
