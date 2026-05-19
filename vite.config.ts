import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'
import { resumePdfPlugin } from './resume/vite-plugin'

export default defineConfig({
  plugins: [
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
      }
    }),
    tailwindcss(),
    viteReact()
  ],
  resolve: {
    tsconfigPaths: true
  }
})
