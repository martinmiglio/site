import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { Suspense, useCallback } from 'react'
import { RouteSheet } from '@/components/layout/RouteSheet'
import HomePage from '@/pages/home'

const SHEET_TITLES: Record<string, string> = {
  '/about': 'About',
  '/cv': 'Experience'
}

export const Route = createFileRoute('/_home')({
  component: RouteComponent
})

function RouteComponent() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const onClosed = useCallback(() => {
    navigate({ to: '/', startTransition: true })
  }, [navigate])

  return (
    <>
      <HomePage />
      <RouteSheet
        open={pathname !== '/'}
        title={SHEET_TITLES[pathname] ?? 'Page'}
        onClosed={onClosed}
      >
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </RouteSheet>
    </>
  )
}
