/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Rosie/",
  plugins: [
    react(),
    legacy()
  ],
  build: {
    outDir: "www", // This should be the correct build directory
  },
  server: {
    proxy: {
      '/vapidPublicKey': 'https://rosie-production.up.railway.app', // this is an attempt to fix the cors issue
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
