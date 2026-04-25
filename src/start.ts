import {
  type AnyRequestMiddleware,
  type AnyStartInstance,
  createStart
} from '@tanstack/react-start'
import { acceptPrefersMarkdown } from '@/lib/markdown/accept'
import { markdownRoutes, renderLlmsFullTxt, renderLlmsTxt } from '@/lib/markdown/render'

// `Accept-Encoding` is included so vite's dev-time compression middleware (which
// rewrites `Vary` rather than appending) doesn't drop the `Accept` signal.
const MD_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  Vary: 'Accept, Accept-Encoding',
  'Cache-Control': 'public, max-age=300'
}

const TXT_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  Vary: 'Accept-Encoding',
  'Cache-Control': 'public, max-age=300'
}

const acceptMarkdown: AnyRequestMiddleware = createStart(() => ({}))
  .createMiddleware()
  .server(async ({ request, next }) => {
    const isReadOnly = request.method === 'GET' || request.method === 'HEAD'
    const pathname = new URL(request.url).pathname
    const bodyForHead = (s: string) => (request.method === 'HEAD' ? null : s)

    if (isReadOnly) {
      if (pathname === '/llms.txt') {
        throw new Response(bodyForHead(renderLlmsTxt()), { headers: TXT_HEADERS })
      }
      if (pathname === '/llms-full.txt') {
        throw new Response(bodyForHead(renderLlmsFullTxt()), { headers: TXT_HEADERS })
      }

      let logicalPath = pathname
      let forceMd = false
      if (pathname.endsWith('.md') && pathname.length > 3) {
        const stripped = pathname.slice(0, -3)
        // `/index.md` is the canonical "home as markdown" form.
        logicalPath = stripped === '/index' ? '/' : stripped
        forceMd = true
      }

      const renderer = markdownRoutes[logicalPath]
      if (renderer) {
        if (forceMd || acceptPrefersMarkdown(request.headers.get('Accept'))) {
          throw new Response(bodyForHead(renderer()), { headers: MD_HEADERS })
        }
      }
    }

    const result = await next()
    if (markdownRoutes[pathname]) {
      const mdHref = pathname === '/' ? '/index.md' : `${pathname}.md`
      try {
        result.response.headers.append('Vary', 'Accept')
        result.response.headers.append('Link', `<${mdHref}>; rel="alternate"; type="text/markdown"`)
      } catch {
        // Some runtimes serve immutable Headers on Response — best-effort only.
      }
    }
    return result
  })

export const startInstance: AnyStartInstance = createStart(() => ({
  requestMiddleware: [acceptMarkdown]
}))
