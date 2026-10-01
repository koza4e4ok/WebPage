import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { portfolioPages } from './vite-plugins/portfolioPages';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // The production site uses a custom domain at the origin, so assets resolve from `/`.
    base: '/',
    publicDir: 'public',
    plugins: [react(), tailwindcss(), portfolioPages({ analyticsToken: env.CF_WEB_ANALYTICS_TOKEN })],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          work: path.resolve(__dirname, 'work.html'),
        },
        output: {
          manualChunks(id) {
            if (
              id.includes('/node_modules/motion/') ||
              id.includes('/node_modules/framer-motion/') ||
              id.includes('/node_modules/motion-dom/') ||
              id.includes('/node_modules/motion-utils/')
            ) {
              return 'motion';
            }
            if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
              return 'react';
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
