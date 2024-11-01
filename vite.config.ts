import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5175,
    proxy: {
      '/api/v1': {  // Thay đổi prefix theo backend
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})