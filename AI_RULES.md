# Directives d'intégration IA pour le Design System Mali (DSML)

Ce document fournit des règles et instructions **agnostiques** d'assistance IA (Cursor, Windsurf, Copilot, Claude Code, Antigravity, ChatGPT...). Vous pouvez copier ces règles dans le fichier de configuration spécifique à votre IDE.

---

## 🏛️ Règles Générales pour l'Assistant IA

1. **Tokens de Design & Couleurs Officielles :**
   - Utiliser les couleurs républicaines maliennes : Vert (`var(--ml-color-green-500)`), Or (`var(--ml-color-gold-400)`), Rouge (`var(--ml-color-red-600)`).
   - Utiliser les palettes culturelles appropriées : Bogolan (`var(--ml-color-bogolan-ocre)`), Indigo (`var(--ml-color-indigo-600)`), Fleuve Niger (`var(--ml-color-river-500)`).
   - Éviter les couleurs génériques (rouge brut, bleu brut). Préférer la palette `@dsml/tailwind-plugin` ou les variables CSS natives `--ml-color-*`.

2. **Typographie & Styles :**
   - Titres & En-têtes : `Archivo`, sans-serif
   - Corps de texte : `Atkinson Hyperlegible`, sans-serif

3. **Accessibilité Numérique (a11y) :**
   - Inclure des indicateurs de focus visibles (`focus:ring-2 focus:ring-[var(--ml-color-green-400)]`).
   - Fournir les attributs ARIA requis (`aria-describedby`, `aria-label`, `role`) pour les éléments de formulaire et les bannières institutionnelles.

4. **Standards de Code :**
   - Privilégier les snippets HTML/Tailwind légers et universels plutôt que des wrappers JS lourds.
   - Code auto-documenté avec des noms explicites.

---

## 📋 Exemples de configuration selon votre IDE

### 1. Cursor (`.cursorrules`)
Créez un fichier `.cursorrules` à la racine de votre projet client et collez :
```markdown
# Rules for DSML (Design System Mali)
- Always use DSML colors: Green (#0B7A2F), Gold (#F5C518), Red (#B4232B) or --ml-color-* variables.
- Use Archivo font for titles and Atkinson Hyperlegible for body text.
- Ensure proper WCAG AA accessibility: visible focus rings, ARIA labels, semantic HTML.
- Favor Tailwind CSS utility classes extending @dsml/tailwind-plugin.
```

### 2. Windsurf (`.windsurfrules`)
Créez un fichier `.windsurfrules` à la racine du projet client.

### 3. GitHub Copilot (`.github/copilot-instructions.md`)
Créez le fichier `.github/copilot-instructions.md` et ajoutez les consignes ci-dessus.

### 4. Claude Code / Antigravity (`AGENTS.md` ou `CLAUDE.md`)
Ajoutez une section `# DSML Guidelines` dans votre fichier `AGENTS.md` ou `CLAUDE.md`.
