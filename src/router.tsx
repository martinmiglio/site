// src/router.tsx
import { routeTree } from './routeTree.gen'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultSsr: true
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
