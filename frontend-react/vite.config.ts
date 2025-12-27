import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development/production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/categories': {
          target: env.VITE_DOTNET_SERVER_URL || 'http://localhost:5133',
          changeOrigin: true,
          secure: false,
        },
        '/api/products': {
          target: env.VITE_DOTNET_SERVER_URL || 'http://localhost:5133',
          changeOrigin: true,
          secure: false
        },
        '/api/orders': {
          target: env.VITE_NODE_SERVER_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
});
