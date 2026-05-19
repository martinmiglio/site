import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { resumePdfPlugin } from './resume/vite-plugin'

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    resumePdfPlugin(),
    nitro({
      preset: 'aws-lambda',
      awsLambda: { streaming: true }
    }),
    tanstackStart({
      customViteReactPlugin: true,
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        crawlLinks: true,
        filter: (page) => !/\.(pdf|png|jpg|jpeg|svg|ico|webp)$/i.test(page.path)
      },
      sitemap: {
        enabled: true,
        host: 'https://martinmiglio.dev'
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
