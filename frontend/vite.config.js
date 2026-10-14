import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  // ==================== DESARROLLO ====================
  server: {
    port: 5173,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },

  // ==================== PRODUCCIÓN ====================
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild', // Usamos esbuild nativo para evitar errores con terser
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom']
        }
      }
    }
  },

  // ==================== RESOLVER ====================
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
