# @dsml/core — Package Cœur DSML (CSS, Assets, Utilities)

Package officiel du **Design System Mali (DSML)**. Il s'agit de la brique de base autonome (zéro dépendance externe) contenant l'ensemble des tokens de design, feuilles de style CSS et actifs graphiques officiels de la République du Mali.

---

## 📦 Installation

### Option 1 : Via NPM (Recommandé pour projets modernes Node/Vite/Webpack)

```bash
npm install @dsml/core
# ou avec pnpm
pnpm add @dsml/core
# ou avec yarn
yarn add @dsml/core
```

Dans votre point d'entrée JavaScript / TypeScript ou fichier principal CSS :

```js
// Dans main.js / App.jsx / index.ts
import '@dsml/core/css/dsml.css';
import '@dsml/core/css/dsml-icons.css'; // optionnel si icônes utilisées
```

Ou dans un fichier CSS :

```css
@import '@dsml/core/css/dsml.css';
```

### Option 2 : Usage direct sans bundler (HTML statique / CDN)

Copiez les fichiers CSS et assets depuis le package ou téléchargez-les dans votre projet :

```html
<head>
  <!-- Polices recommandées (Archivo & Atkinson Hyperlegible) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

  <!-- DSML CSS principal -->
  <link rel="stylesheet" href="./chemin/vers/dsml.css">
  <link rel="stylesheet" href="./chemin/vers/dsml-icons.css">
</head>
```

---

## 📂 Contenu du package

```
@dsml/core/
├── css/
│   ├── dsml.css          # Feuille de style principale (Tokens, layout, composants)
│   └── dsml-icons.css    # Bibliothèque d'icônes DSML
├── js/
│   └── search.js         # Utilitaire de recherche pour la documentation
└── assets/
    ├── logo-mali.svg     # Armoiries de la République du Mali
    ├── logo-aes.svg      # Logo de l'Alliance des États du Sahel
    ├── icons/            # Icônes SVG individuelles
    └── pictograms/       # Pictogrammes officiels
```

---

## ⚡ Exemple rapide HTML

```html
<button class="ml-btn ml-btn-primary">Valider la démarche</button>

<div class="ml-alert ml-alert-info">
  <p class="ml-alert-title">Information officielle</p>
  <p>Votre demande a bien été transmise aux services compétents.</p>
</div>
```

---

## 📄 Licence

MIT © République du Mali / Malihub Digital.
