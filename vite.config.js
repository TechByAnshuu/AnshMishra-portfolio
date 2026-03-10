import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    // Warn only on chunks larger than 750 KB (default is 500 KB)
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks: {
          // Heavy 3D library — isolated so it doesn't bloat the main bundle
          'vendor-three': ['three'],
          // Animation library
          'vendor-framer': ['framer-motion'],
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
