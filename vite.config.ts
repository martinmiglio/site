import eslint from '@nabla/vite-plugin-eslint'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    eslint(),
    tsConfigPaths(),
    tanstackStart({
      customViteReactPlugin: true,
      target: "aws-lambda",
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        crawlLinks: true
      }
    }),
    tailwindcss(),
    viteReact()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
