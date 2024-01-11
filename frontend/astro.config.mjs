import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      proxy: {
        '/api': {
          // Node Express
          target: 'http://localhost:8080',
          //Python Flask
          // target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  },
  integrations: [
    react(),
  ]
});
