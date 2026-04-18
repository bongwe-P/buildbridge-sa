import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/buildbridge-sa/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
  server: {
    warmup: {
      clientFiles: ['./src/main.jsx', './src/App.jsx'],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
