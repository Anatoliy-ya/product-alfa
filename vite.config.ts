import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  base: '/product-alfa/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fakestoreapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
