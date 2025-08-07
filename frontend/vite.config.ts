import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/static',
    emptyOutDir: false,
    lib: {
      entry: './src/main.tsx',
      formats: ['es'],
      fileName: 'dashboard',
    },
    rollupOptions: {
      output: {
        assetFileNames: `dashboard.[ext]`,
      },
    },
  },
});
