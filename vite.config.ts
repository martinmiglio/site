/// <reference types="vite-ssg" />
import UnheadVite from '@unhead/addons/vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import path from 'path'
import tailwind from 'tailwindcss'
import { defineConfig, loadEnv } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import webfontDownload from 'vite-plugin-webfont-dl'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_DEPLOY_URL,
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    },
    plugins: [vue(), VueDevTools(), UnheadVite(), webfontDownload()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      crittersOptions: {
        reduceInlineStyles: false
      }
    }
  }
})
