import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.join(__dirname, '../tokens/tokens.json');
const outputPath = path.join(__dirname, '../css/tokens.css');

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

let cssContent = `/* ==========================================================================
   DSML — Design System Mali Tokens (Auto-generated)
   ========================================================================== */\n\n:root {\n`;

for (const [category, palette] of Object.entries(tokens.colors)) {
  cssContent += `  /* ${category.toUpperCase()} */\n`;
  for (const [shade, value] of Object.entries(palette)) {
    cssContent += `  --ml-color-${category}-${shade}: ${value};\n`;
  }
  cssContent += `\n`;
}

cssContent += `  /* TYPOGRAPHY */\n`;
cssContent += `  --ml-font-title: ${tokens.typography.fontFamily.title};\n`;
cssContent += `  --ml-font-body: ${tokens.typography.fontFamily.body};\n\n`;

cssContent += `  /* SPACING */\n`;
for (const [key, value] of Object.entries(tokens.spacing)) {
  cssContent += `  --ml-space-${key}: ${value};\n`;
}
cssContent += `\n`;

cssContent += `  /* BORDER RADIUS */\n`;
for (const [key, value] of Object.entries(tokens.borderRadius)) {
  cssContent += `  --ml-radius-${key}: ${value};\n`;
}
cssContent += `\n`;

cssContent += `  /* BOX SHADOWS */\n`;
for (const [key, value] of Object.entries(tokens.boxShadow)) {
  cssContent += `  --ml-shadow-${key}: ${value};\n`;
}

cssContent += `}\n`;

fs.writeFileSync(outputPath, cssContent, 'utf8');
console.log(`Successfully generated ${outputPath}`);
