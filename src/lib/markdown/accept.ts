/**
 * Parse an Accept header and return whether `text/markdown` is preferred over
 * `text/html`. Implements enough of RFC 9110 §12.5.1 for the common cases:
 * comma-separated entries, optional `;q=` weight, defaulting to q=1.0.
 *
 * Wildcards (`* /*`, `text/*`) match `text/html` for tie-breaking — agents that
 * pass `* /*` get HTML by default.
 */

interface AcceptEntry {
  type: string
  q: number
}

const parseAccept = (header: string): AcceptEntry[] => {
  return header
    .split(',')
    .map((part) => {
      const trimmed = part.trim()
      if (!trimmed) return null
      const [rawType, ...params] = trimmed.split(';').map((s) => s.trim())
      let q = 1
      for (const p of params) {
        const eq = p.indexOf('=')
        if (eq < 0) continue
        const key = p.slice(0, eq).trim()
        const value = p.slice(eq + 1).trim()
        if (key === 'q') {
          const parsed = Number(value)
          if (!Number.isNaN(parsed)) q = parsed
        }
      }
      return rawType ? { type: rawType.toLowerCase(), q } : null
    })
    .filter((e): e is AcceptEntry => e !== null)
}

const matchQ = (entries: AcceptEntry[], target: string): number => {
  let best = -1
  for (const e of entries) {
    if (e.type === target || e.type === '*/*') {
      if (e.q > best) best = e.q
      continue
    }
    const slash = target.indexOf('/')
    if (slash > 0) {
      const family = `${target.slice(0, slash)}/*`
      if (e.type === family && e.q > best) best = e.q
    }
  }
  return best
}

export const acceptPrefersMarkdown = (header: string | null): boolean => {
  if (!header) return false
  const entries = parseAccept(header)
  if (!entries.length) return false
  const md = matchQ(entries, 'text/markdown')
  if (md <= 0) return false
  const html = matchQ(entries, 'text/html')
  // Strict preference: markdown must beat html. Equal q (e.g. `*/*` matches
  // both at 1.0) means we keep serving HTML — browsers send `*/*` and would
  // otherwise be misrouted.
  return md > html
}
