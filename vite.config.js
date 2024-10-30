/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [libInjectCss()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        dir: 'dist',
        assetFileNames: 'js-cloudimage-360-view.min[extname]',
        entryFileNames: 'js-cloudimage-360-view.min.js',
      },
    },
  },
});
