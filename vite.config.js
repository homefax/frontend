import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Explicitly include all needed polyfills
      include: ['crypto', 'process', 'buffer', 'stream', 'util', 'vm'],
      globals: {
        process: true,
        Buffer: true,
      }
    })
  ],
  server: {
    port: 3000, // will always start the service on port 3000
  },
  resolve: {
    alias: {
      // Fallbacks for Node.js modules
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
      process: 'process/browser',
      vm: 'vm-browserify'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      }
    }
  },
  define: {
    'process.env': process.env,
    'global': {}
  }
})