# DSML — Design System Mali

> Système de conception de référence pour les administrations publiques maliennes, conçu pour les usages réels au Mali : connexions mobiles limitées, agents peu équipés, accessibilité et souveraineté numérique.

[![Version](https://img.shields.io/badge/version-0.1.0-green)](https://github.com/malibub-digital/dsml)
[![Licence](https://img.shields.io/badge/licence-MIT-blue)](./LICENSE)
[![CSS pur](https://img.shields.io/badge/z%C3%A9ro%20d%C3%A9pendance-%E2%9C%93-brightgreen)](#)

---

## 🎯 Principes fondateurs

- **Zéro dépendance obligatoire** — HTML + CSS + JS vanilla uniquement au cœur. Aucun framework imposé.
- **Support des frameworks modernes** — Déclinaisons en packages dédiés pour Vue.js (`@dsml/vue`) et React (`@dsml/react`).
- **Performance & Sobriété** — Optimisé pour les réseaux mobiles (3G/4G) et appareils à faibles ressources.
- **Identité républicaine** — Couleurs nationales sobres, typographie lisible, armoiries officielles du Mali et symboles de l'AES.
- **Accessibilité (RGAA / WCAG 2.1 AA)** — Contraste garanti, navigation au clavier et marqueurs ARIA.

---

## 🏛️ Organisation du Monorépo

Le projet est organisé sous forme de **Monorépo NPM Workspaces** clair et modulaire :

```
dsml/
├── packages/                  # Packages distibuables (bibliothèques)
│   ├── core/                  # [@dsml/core] Cœur CSS, tokens, assets SVG et JS vanilla (Zéro dépendance)
│   ├── vue/                   # [@dsml/vue] Wrapper et composants officiels Vue.js 3
│   └── react/                 # [@dsml/react] Wrapper et composants officiels React
│
├── apps/                      # Applications & sites
│   └── docs/                  # Site officiel Vitrine & Documentation technique interactive (Astro)
│
├── package.json               # Configuration Workspaces NPM root
├── Dockerfile                 # Configuration de build et déploiement
├── docker-compose.yml
└── dokploy.json
```

---

## 🚀 Prise en main rapide pour les Développeurs

### 1. Installation du package `@dsml/core` via NPM

Dans un projet web (React, Vue, Vite, Next.js, HTML/JS) :

```bash
npm install @dsml/core
```

Dans votre point d'entrée JS ou fichier CSS principal :

```javascript
// Import du CSS principal et des icônes
import "@dsml/core/css/dsml.css";
import "@dsml/core/css/dsml-icons.css";
```

### 2. Usage HTML direct (sans bundler / via fichier local)

Vous pouvez aussi simplement télécharger le dossier [`packages/core`](./packages/core) et inclure les fichiers CSS :

```html
<link rel="stylesheet" href="/chemin/vers/dsml.css" />
<link rel="stylesheet" href="/chemin/vers/dsml-icons.css" />
```

---

## 💻 Développement local & Contribution au DSML

### Prérequis

- Node.js >= 18.x
- NPM >= 9.x

### Commandes utiles

```bash
# Installe toutes les dépendances du monorépo
npm install

# Démarrer le site de documentation en mode dev (localhost:4321)
npm run dev

# Générer le build du site de documentation
npm run build

# Tester la création de l'archive de distribution NPM du package core
npm run pack:core

# Publier le package core sur la registry NPM (Accès requis)
npm run publish:core
```

---

## 📦 Packaging & Publication NPM

Chaque package sous `packages/` dispose de sa propre configuration et versioning :

1. **`@dsml/core`** : Génère le package CSS/Assets distribué aux développeurs.
2. **`@dsml/vue`** : Consomme `@dsml/core` et exporte les composants Vue.
3. **`@dsml/react`** : Consomme `@dsml/core` et exporte les composants React.

Pour ajouter une mise à jour et la tester localement avant publication :

```bash
npm run pack:core
```

Ceci génère un fichier `.tgz` que vous pouvez tester dans n'importe quel projet externe via `npm i ./dsml-core-0.1.0.tgz`.

---

## 📖 Documentation & Vitrine

La documentation interactive complète est accessible en lançant `npm run dev` ou en ligne sur [dsml.ml](https://dsml.ml).

---

## 📄 Licence

Projet sous licence [MIT](./LICENSE).
