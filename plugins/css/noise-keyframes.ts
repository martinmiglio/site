import type { Plugin } from 'vite'

interface Options {
  stops?: number
  range?: number
}

const generate = ({ stops, range }: Required<Options>) => {
  const lines: string[] = ['@keyframes noiseJitter {']
  for (let i = 0; i < stops; i += 1) {
    const pct = +((i * 100) / stops).toFixed(4)
    const x = Math.floor(Math.random() * (range * 2 + 1)) - range
    const y = Math.floor(Math.random() * (range * 2 + 1)) - range
    lines.push(`  ${pct}% { transform: translate(${x}%, ${y}%); }`)
  }
  lines.push('  100% { transform: translate(0, 0); }', '}')
  return lines.join('\n')
}

export function noiseKeyframes({ stops = 60, range = 22 }: Options = {}): Plugin {
  const VIRTUAL_ID = 'virtual:noise-jitter.css'
  const RESOLVED = `\0${VIRTUAL_ID}.css`

  return {
    name: 'noise-jitter-keyframes',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED
    },
    load(id) {
      if (id === RESOLVED) return generate({ stops, range })
    }
  }
}
