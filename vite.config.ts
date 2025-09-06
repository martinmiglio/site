import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import eslint from '@nabla/vite-plugin-eslint'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    eslint(),
    tsConfigPaths(),
    tanstackStart({ customViteReactPlugin: true }),
    tailwindcss(),
    viteReact(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
