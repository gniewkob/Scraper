import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 61973,
    allowedHosts: ['smart.bodora.pl', 'localhost', '127.0.0.1'],
    proxy: {
      '/api-backend': {
        target: 'http://127.0.0.1:38273',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-backend/, '')
      }
    }
  },
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
})
