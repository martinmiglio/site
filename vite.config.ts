import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { noiseKeyframes } from './plugins/css/noise-keyframes'

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    nitro({
      preset: 'aws-lambda',
      awsLambda: { streaming: true }
    }),
    tanstackStart({
      customViteReactPlugin: true,
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        crawlLinks: true
      }
    }),
    tailwindcss(),
    viteReact(),
    noiseKeyframes()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
