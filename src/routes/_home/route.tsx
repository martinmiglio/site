import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { Suspense, useDeferredValue } from 'react'
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
  const deferredPathname = useDeferredValue(pathname)

  const sheetIsOpen = deferredPathname !== '/'
  const sheetTitle = SHEET_TITLES[deferredPathname] ?? 'Page'

  const navigate = useNavigate()

  const onSheetOpenChange = (open: boolean) => {
    if (!open) {
      navigate({ to: '/', startTransition: true, viewTransition: true })
    }
  }

  return (
    <>
      <HomePage />
      {sheetIsOpen && (
        <Sheet open={true} onOpenChange={onSheetOpenChange}>
          <SheetPage title={sheetTitle}>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </SheetPage>
        </Sheet>
      )}
    </>
  )
}
