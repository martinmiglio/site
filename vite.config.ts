import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    nitro({
      preset: 'aws-lambda',
      awsLambda: { streaming: true }
    }),
    tanstackStart({
      customViteReactPlugin: true
      // Prerendering is intentionally off: page routes must flow through the
      // lambda so the Accept/Markdown middleware in src/start.ts can see the
      // request. The site is tiny and CloudFront still edge-caches each
      // variant.
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
