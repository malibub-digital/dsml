import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    allowedHosts: ['dsml.malihub.digital', '.malihub.digital', 'localhost', '127.0.0.1'],
  },
  server: {
    allowedHosts: ['dsml.malihub.digital', '.malihub.digital', 'localhost', '127.0.0.1'],
  },
});
