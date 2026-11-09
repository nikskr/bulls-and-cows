import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist/**', 'node_modules/**']),
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      {
        rules: {
          '@typescript-eslint/no-explicit-any': 'error',
          'no-undef': 'warn',
          'no-var': 'error',
          'prefer-const': 'error',
          'no-console': 'warn',
        },
      },
      eslintConfigPrettier,
    ],
    languageOptions: { globals: globals.browser },
  },
]);
