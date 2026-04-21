import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { Suspense } from 'react'
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

  const sheetIsOpen = pathname !== '/'
  const sheetTitle = SHEET_TITLES[pathname] ?? 'Page'

  const navigate = useNavigate()

  const onSheetOpenChange = (open: boolean) => {
    if (open) return
    const go = () => navigate({ to: '/' })
    if (document.startViewTransition) {
      document.startViewTransition(go)
    } else {
      go()
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
