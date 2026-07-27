// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Le site sera publié à la racine du domaine
  site: 'https://dsml.ml',
  // Dossier de sortie du build (racine du monorepo /app/dist)
  outDir: '../../dist',
  // Répertoire racine du projet (le monorepo dsml/)
  root: '.',
  // Configuration du serveur de développement
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  vite: {
    preview: {
      allowedHosts: ['dsml.malihub.digital', '.malihub.digital', 'localhost', '127.0.0.1'],
    },
    server: {
      allowedHosts: ['dsml.malihub.digital', '.malihub.digital', 'localhost', '127.0.0.1'],
    },
  },
});
