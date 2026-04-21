import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { Suspense, useEffect, useState } from 'react'
import { SheetPage } from '@/components/layout/SheetPage'
import { Sheet } from '@/components/ui/sheet'
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

  const [isClosing, setIsClosing] = useState(false)

  const open = pathname !== '/' && !isClosing
  // While closing, pathname is still /about or /cv, so Outlet keeps rendering
  // the current page content during the exit animation.
  const sheetTitle = SHEET_TITLES[pathname] ?? 'Page'

  useEffect(() => {
    if (!isClosing) return
    let cancelled = false

    const finish = () => {
      if (cancelled) return
      navigate({ to: '/', startTransition: true })
      setIsClosing(false)
    }

    // Double rAF lets React commit the open={false} pass and Radix apply
    // data-state="closed" (which triggers the Tailwind slide-out) before we
    // read the running animations.
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return
        const dialog = document.querySelector('[role="dialog"]')
        const anims =
          dialog?.getAnimations({ subtree: true }).filter((a) => a.playState === 'running') ?? []
        if (anims.length === 0) {
          finish()
          return
        }
        Promise.all(anims.map((a) => a.finished.catch(() => {}))).then(finish)
      })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [isClosing, navigate])

  const onSheetOpenChange = (next: boolean) => {
    if (!next && !isClosing) setIsClosing(true)
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
