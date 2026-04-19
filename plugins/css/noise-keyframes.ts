import type { Plugin } from 'vite'

interface Options {
  stops?: number
  range?: number
  seed?: number
}

// Deterministic 32-bit PRNG. Same seed + stops → same CSS → stable bundle hash.
const mulberry32 = (a: number) => () => {
  a = (a + 0x6d2b79f5) | 0
  let t = a
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const generate = ({ stops, range, seed }: Required<Options>) => {
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

export function noiseKeyframes({ stops = 60, range = 22, seed = 42 }: Options = {}): Plugin {
  const VIRTUAL_ID = 'virtual:noise-jitter.css'
  const RESOLVED = `\0${VIRTUAL_ID}.css`

  return {
    name: 'noise-jitter-keyframes',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED
    },
    load(id) {
      if (id === RESOLVED) return generate({ stops, range, seed })
    }
  }
}
