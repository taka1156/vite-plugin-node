import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePluginNode } from '../../dist';

export default defineConfig({
  plugins: [
    ...VitePluginNode({
      adapter: 'marble',
      appPath: './app.ts'
    })
  ]
});
