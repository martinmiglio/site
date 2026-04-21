import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { Suspense, useRef, useState } from 'react'
import { SheetPage } from '@/components/layout/SheetPage'
import { Sheet } from '@/components/ui/sheet'
import HomePage from '@/pages/home'

const SHEET_TITLES: Record<string, string> = {
  '/about': 'About',
  '/cv': 'Experience'
}

const CLOSE_ANIMATION_MS = 300

export const Route = createFileRoute('/_home')({
  component: RouteComponent
})

function RouteComponent() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [isClosing, setIsClosing] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const open = pathname !== '/' && !isClosing
  // While closing, pathname is still /about or /cv, so Outlet keeps rendering
  // the current page content during the exit animation.
  const sheetTitle = SHEET_TITLES[pathname] ?? 'Page'

  const onSheetOpenChange = (next: boolean) => {
    if (!next && !isClosing) {
      setIsClosing(true)
      if (closeTimer.current) clearTimeout(closeTimer.current)
      closeTimer.current = setTimeout(() => {
        navigate({ to: '/', startTransition: true })
        setIsClosing(false)
        closeTimer.current = null
      }, CLOSE_ANIMATION_MS)
    }
  }

  return (
    <>
      <HomePage />
      <Sheet open={open} onOpenChange={onSheetOpenChange}>
        <SheetPage title={sheetTitle}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </SheetPage>
      </Sheet>
    </>
  )
}
