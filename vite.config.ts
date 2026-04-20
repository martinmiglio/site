import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig, type Plugin } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

/**
 * TanStack Start 1.167 expects the ssr bundle at `dist/server/server.js` so its
 * prerender preview-server can import it. When the `nitro` plugin is also in
 * use it redirects the ssr env output to `node_modules/.nitro/vite/services/ssr/`,
 * which leaves nothing at the path TSS expects. We bridge the two by mirroring
 * the nitro ssr service output to `dist/server/server.js` before TSS's
 * post-build prerender step runs.
 */
function mirrorSsrForPrerender(): Plugin {
  return {
    name: 'mirror-ssr-for-prerender',
    enforce: 'post',
    applyToEnvironment(env) {
      return env.name === 'ssr'
    },
    writeBundle() {
      const src = resolve(__dirname, 'node_modules/.nitro/vite/services/ssr')
      if (!existsSync(src)) return
      const dest = resolve(__dirname, 'dist/server')
      mkdirSync(dest, { recursive: true })
      cpSync(src, dest, { recursive: true })
      const entry = resolve(dest, 'index.js')
      const renamed = resolve(dest, 'server.js')
      if (existsSync(entry) && !existsSync(renamed)) {
        cpSync(entry, renamed)
      }
    }
  }
}

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
    mirrorSsrForPrerender(),
    tailwindcss(),
    viteReact()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
