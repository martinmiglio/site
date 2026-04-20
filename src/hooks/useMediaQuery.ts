import { useSyncExternalStore } from 'react'

const cache = new Map<string, MediaQueryList>()

function getMql(query: string): MediaQueryList {
  let mql = cache.get(query)
  if (!mql) {
    mql = window.matchMedia(query)
    cache.set(query, mql)
  }
  return mql
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = getMql(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => getMql(query).matches,
    () => false
  )
}
