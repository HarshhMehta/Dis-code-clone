import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: '.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL',
        changeOrigin: true,
      },
    },
  },
});