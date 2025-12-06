/// <reference types="vite/client" />
import appCss from '@/assets/index.css?url'
import PageBackground from '@/components/PageBackground'
import NotFoundPage from '@/pages/404'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export const Route = createRootRoute({
  head: () => ({
    title: 'Martin Miglio',
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      },
      {
        name: 'description',
        content: "Martin Miglio's Site"
      },
      {
        name: 'keywords',
        content: 'Martin Miglio, Site, Software Engineer, Web Developer'
      },
      {
        name: 'creator',
        content: 'Martin Miglio'
      },
      {
        property: 'og:title',
        content: 'Martin Miglio'
      },
      {
        property: 'og:description',
        content: "Martin Miglio's Site"
      },
      {
        property: 'og:site_name',
        content: 'Martin Miglio'
      },
      {
        property: 'og:image',
        content: '/opengraph.png?v1'
      },
      {
        property: 'og:image:width',
        content: '1200'
      },
      {
        property: 'og:image:height',
        content: '630'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: 'Martin Miglio'
      },
      {
        name: 'twitter:description',
        content: "Martin Miglio's Site"
      },
      {
        name: 'twitter:image',
        content: '/opengraph.png?v1'
      }
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://martinmiglio.dev'
      },
      {
        rel: 'icon',
        href: '/favicon.ico?v1'
      },
      {
        rel: 'preconnect',
        href: 'https://analytics.martinmiglio.dev'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous'
      },
      { rel: 'stylesheet', href: appCss }
    ],
    scripts: [
      {
        async: true,
        src: 'https://analytics.martinmiglio.dev/script.js',
        'data-website-id': '6b71e8bb-208f-4cce-a1a7-10802153c6cc',
        'data-domains': 'vue.martinmiglio.dev,martinmiglio.dev'
      }
    ]
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-theme-50 font-sans antialiased">
        <PageBackground />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
