/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [libInjectCss(), dts({ include: ['lib'] })],
  build: {
    copyPublicDir: false,
    lib: { entry: resolve(__dirname, 'src/index.js'), formats: ['es'] },
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
