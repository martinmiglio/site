import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/')({
  // The static SPA shell at `/index.html` is served from the assets bucket and
  // bypasses the Accept-negotiation middleware. The `<link rel="alternate">`
  // here is the agent-discoverable hint that `/index.md` exists.
  head: () => ({
    links: [{ rel: 'alternate', type: 'text/markdown', href: '/index.md' }]
  }),
  component: RouteComponent
})

function RouteComponent() {
  return null // SheetPage is closed on index
}
