import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import eslint from '@nabla/vite-plugin-eslint'

export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }), 
    viteReact(), 
    tailwindcss(), 
    eslint()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
