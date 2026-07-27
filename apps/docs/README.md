# Site de Documentation et Vitrine DSML (`apps/docs`)

Application Astro constituant la **vitrine officielle et la documentation technique interactive** du Design System Mali (DSML).

---

## 🎯 Rôle de l'application

- **Vitrine institutionnelle** : Présentation du DSML pour les ministères, administrations et développeurs.
- **Documentation technique** : Guide interactif des composants, tokens, layouts, règles d'accessibilité et exemples de code.
- **Bac à sable** : Consomme le package `@dsml/core` en temps réel pour valider les rendus et les composants.

---

## 🛠️ Développement local

Depuis la racine du monorépo DSML :

```bash
# Démarrer le serveur de développement de la doc (http://localhost:4321)
npm run dev
```

Ou depuis le dossier `apps/docs` :

```bash
npm run dev
```

---

## 🏗️ Build de production

```bash
npm run build
```

Le script `prebuild` copie automatiquement le cœur `@dsml/core` dans `public/dsml` pour assurer la mise à jour des ressources distribuées avec le site statique généré dans `dist/`.

---

## 📁 Structure

```
apps/docs/
├── public/               # Actifs statiques et distribution DSML (copiés via prebuild)
├── src/
│   ├── components/       # Composants Astro propres au site de documentation (Header, Sidebar, Search, etc.)
│   ├── layouts/          # Layouts de page (BaseLayout, DocsLayout)
│   └── pages/            # Routes et pages de documentation (fondations, composants, etc.)
├── astro.config.mjs
└── package.json
```
