import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig, type Plugin } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

// Generates a `@keyframes noiseJitter` CSS block with `stops` randomized
// translate() positions. Output is deterministic given `seed` + `stops`,
// so the hash is stable across builds.
function noiseKeyframesPlugin({
  stops = 60,
  range = 22,
  seed = 42
}: {
  stops?: number
  range?: number
  seed?: number
} = {}): Plugin {
  const VIRTUAL_ID = 'virtual:noise-jitter.css'
  const RESOLVED = `\0${VIRTUAL_ID}`

  const mulberry32 = (a: number) => () => {
    a = (a + 0x6d2b79f5) | 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const generate = () => {
    const rand = mulberry32(seed)
    const lines: string[] = ['@keyframes noiseJitter {']
    for (let i = 0; i < stops; i += 1) {
      const pct = +((i * 100) / stops).toFixed(4)
      const x = Math.floor(rand() * (range * 2 + 1)) - range
      const y = Math.floor(rand() * (range * 2 + 1)) - range
      lines.push(`  ${pct}% { transform: translate(${x}%, ${y}%); }`)
    }
    lines.push('  100% { transform: translate(0, 0); }', '}')
    return lines.join('\n')
  }

  return {
    name: 'noise-jitter-keyframes',
    resolveId(id) {
      if (id === VIRTUAL_ID) return `${RESOLVED}.css`
    },
    load(id) {
      if (id === `${RESOLVED}.css`) return generate()
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
    tailwindcss(),
    viteReact(),
    noiseKeyframesPlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
