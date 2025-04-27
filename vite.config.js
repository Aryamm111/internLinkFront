import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
 
  css: {
    postcss: './postcss.config.js', 
  },
  server: {
    host: true, 
    port: 5173,
    allowedHosts: ['a218-212-62-98-0.ngrok-free.app'], // Add your ngrok URL here
  },
  define: {
    global: 'globalThis',
  },


  plugins: [react()],
})
