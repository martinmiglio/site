/// <reference types="vite-ssg" />
import UnheadVite from '@unhead/addons/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import webfontDownload from 'vite-plugin-webfont-dl'
import generateSitemap from 'vite-ssg-sitemap'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_DEPLOY_URL,
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
      },
      onFinished() {
        generateSitemap({ hostname: env.VITE_DEPLOY_URL })
      }
    }
  }
})
