import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 650,
    emptyOutDir: true,
    minify: 'oxc',
    sourcemap: false,
    target: 'es2022'
  }
});
