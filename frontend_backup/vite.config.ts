import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 61973,
    host: 'localhost',
    proxy: {
      '/api-backend': {
        target: 'http://127.0.0.1:38273',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-backend/, '')
      }
    }
  }
})
