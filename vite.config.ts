import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import path from 'path'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext'
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
