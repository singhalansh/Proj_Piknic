import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    origin: 'http://localhost:5173',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.NODE_ENV === 'production' 
      ? 'https://picknikb.vercel.app/api'
      : 'http://localhost:3000/api'),
    'process.env.EMAIL_USER': JSON.stringify(process.env.EMAIL_USER),
    'process.env.EMAIL_PASSWORD': JSON.stringify(process.env.EMAIL_PASSWORD)
  }
});
