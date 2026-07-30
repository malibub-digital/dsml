import plugin from 'tailwindcss/plugin.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.join(__dirname, '../core/tokens/tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

export const dsmlPlugin = plugin.withOptions(
  (options = {}) => {
    return ({ addBase, addComponents, addUtilities, theme }) => {
      addBase({
        ':root': {
          '--ml-font-title': tokens.typography.fontFamily.title,
          '--ml-font-body': tokens.typography.fontFamily.body,
        },
      });
    };
  },
  (options = {}) => {
    return {
      theme: {
        extend: {
          colors: {
            ml: tokens.colors,
          },
          fontFamily: {
            'ml-title': [tokens.typography.fontFamily.title],
            'ml-body': [tokens.typography.fontFamily.body],
          },
          spacing: {
            'ml-1': tokens.spacing['1'],
            'ml-2': tokens.spacing['2'],
            'ml-3': tokens.spacing['3'],
            'ml-4': tokens.spacing['4'],
            'ml-5': tokens.spacing['5'],
            'ml-6': tokens.spacing['6'],
            'ml-8': tokens.spacing['8'],
            'ml-12': tokens.spacing['12'],
            'ml-16': tokens.spacing['16'],
          },
          borderRadius: {
            'ml-s': tokens.borderRadius.s,
            'ml-m': tokens.borderRadius.m,
            'ml-l': tokens.borderRadius.l,
            'ml-pill': tokens.borderRadius.pill,
          },
          boxShadow: {
            'ml-1': tokens.boxShadow['1'],
            'ml-2': tokens.boxShadow['2'],
            'ml-3': tokens.boxShadow['3'],
            'ml-soft': tokens.boxShadow.soft,
            'ml-ambient': tokens.boxShadow.ambient,
            'ml-hover': tokens.boxShadow.hover,
          },
        },
      },
    };
  }
);

export default dsmlPlugin;
