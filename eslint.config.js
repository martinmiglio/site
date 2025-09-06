import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import pluginRouter from '@tanstack/eslint-plugin-router'

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
		},
	},
	{
		plugins: {
            '@tanstack/router': pluginRouter,
        },
        rules: {
            '@tanstack/router/create-route-property-order': 'error',
            "@typescript-eslint/only-throw-error": [
      "error",
      {
        "allow": [
          {
            "from": "package",
            "package": "@tanstack/router-core",
            "name": "Redirect"
          }
        ]
      }
    ]
        },
	},
	{
		ignores: ["dist/**", "node_modules/**", "src/routeTree.gen.ts"],
	},
]);
