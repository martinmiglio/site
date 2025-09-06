import js from '@eslint/js'
import pluginRouter from '@tanstack/eslint-plugin-router'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.js'],
    plugins: {
      js
    },
    extends: ['js/recommended']
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    }
  },
  {
    plugins: {
      '@tanstack/router': pluginRouter
    },
    rules: {
      '@tanstack/router/create-route-property-order': 'error'
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'src/routeTree.gen.ts']
  }
])
