import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { Suspense, useDeferredValue, useEffect, useState } from 'react'
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
  const [mounted, setMounted] = useState(false)
  const { pathname } = useLocation()
  const deferredPathname = useDeferredValue(pathname)

  const sheetIsOpen = deferredPathname !== '/'
  const sheetTitle = SHEET_TITLES[deferredPathname] ?? 'Page'

  const navigate = useNavigate()

  useEffect(() => setMounted(true), [])

  const onSheetOpenChange = (open: boolean) => {
    if (!open) {
      navigate({ to: '/', startTransition: true, viewTransition: true })
    }
  }

  return (
    <>
      <HomePage />
      {sheetIsOpen &&
        (mounted ? (
          <Sheet open={true} onOpenChange={onSheetOpenChange}>
            <SheetPage title={sheetTitle}>
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
            </SheetPage>
          </Sheet>
        ) : (
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-6 shadow-lg lg:w-[66vw]">
            <h1 className="sr-only">{sheetTitle}</h1>
            <Outlet />
          </div>
        ))}
    </>
  )
}
