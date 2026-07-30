import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const tokensPath = path.join(rootDir, 'packages/core/tokens/tokens.json');
const snippetsDir = path.join(rootDir, 'packages/snippets');
const outputPathRoot = path.join(rootDir, 'llms.txt');
const outputPathDocs = path.join(rootDir, 'apps/docs/public/llms.txt');

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

function scanDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanDir(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

let llmsContent = `# DSML — Design System Mali (Guide pour LLM / Agents IA)

> Système de conception officiel pour les administrations publiques maliennes.
> Principes : Accessibilité (RGAA/WCAG AA), Couleurs républicaines (Vert, Or, Rouge), Palette culturelle (Bogolan, Bazin, Fleuve Niger), Zéro dépendance JS obligatoire, optimisé Tailwind CSS & HTML pur.

---

## 1. Palette de Couleurs & Class Tokens Tailwind

### Couleurs Institutionnelles & Culturelles
- Vert Mali (Primary Actions): \`bg-[var(--ml-color-green-500)]\` (#0B7A2F), hover: \`bg-[var(--ml-color-green-600)]\` (#0A6428)
- Or Mali (Prestige & Accents): \`bg-[var(--ml-color-gold-400)]\` (#F5C518), \`bg-[var(--ml-color-gold-500)]\` (#EAB308)
- Rouge Mali (Alerte & Erreurs): \`bg-[var(--ml-color-red-600)]\` (#B4232B), \`bg-[var(--ml-color-red-700)]\` (#991B1B)
- Indigo de Ségou/Djenné: \`bg-[var(--ml-color-indigo-600)]\` (#2E2A85), \`bg-[var(--ml-color-indigo-800)]\` (#1C184E)
- Sahelian Bogolan: Kaolin (\`#FBF8F1\`), Sable (\`#EFE4D1\`), Ocre (\`#D97706\`), Terre (\`#78350F\`), Suie (\`#292524\`)
- Fleuve Niger (River Teal): \`bg-[var(--ml-color-river-500)]\` (#1B7A94)

### Polices Officielles
- Titres & En-têtes : \`font-['Archivo',_sans-serif]\`
- Corps de texte : \`font-['Atkinson_Hyperlegible',_sans-serif]\`

---

## 2. Catalogue de Snippets HTML / Tailwind Accessibles

`;

const snippetFiles = scanDir(snippetsDir);
snippetFiles.forEach((file) => {
  const relPath = path.relative(snippetsDir, file);
  const content = fs.readFileSync(file, 'utf8');
  llmsContent += `### Component Snippet: ${relPath}\n\`\`\`html\n${content}\n\`\`\`\n\n`;
});

llmsContent += `---

## 3. Directives de Conception & Accessibilité (a11y)
1. Toujours inclure les attributs ARIA requis (\`aria-describedby\`, \`role="region"\`, \`aria-label\`).
2. S'assurer que les contrastes de texte respectent la norme WCAG 2.1 AA.
3. Toujours fournir des états d'interactivité clairs (\`focus:outline-none focus:ring-2\`).
`;

fs.writeFileSync(outputPathRoot, llmsContent, 'utf8');
console.log(`Successfully generated ${outputPathRoot}`);

if (fs.existsSync(path.dirname(outputPathDocs))) {
  fs.writeFileSync(outputPathDocs, llmsContent, 'utf8');
  console.log(`Successfully generated ${outputPathDocs}`);
}
