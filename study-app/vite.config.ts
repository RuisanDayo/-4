import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      '5173-ighe7ddaauekrvi44czxp-18e660f9.sandbox.novita.ai',
      '.sandbox.novita.ai',
    ],
  },
})
