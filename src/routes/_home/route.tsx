import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SheetPage } from '@/components/layout/SheetPage'
import { Sheet } from '@/components/ui/sheet'
import HomePage from '@/pages/home'

export const Route = createFileRoute('/_home')({
  component: RouteComponent
})

function RouteComponent() {
  const [mounted, setMounted] = useState(false)
  const { pathname } = useLocation()

  const sheetIsOpen = pathname !== '/'

  const navigate = useNavigate()

  useEffect(() => setMounted(true), [])

  const onSheetOpenChange = (open: boolean) => {
    if (!open) {
      navigate({ to: '/' })
    }
  }

  const getSheetTitle = () => {
    switch (pathname) {
      case '/about':
        return 'About'
      case '/cv':
        return 'Experience'
      default:
        return 'Page'
    }
  }

  return (
    <>
      <HomePage />
      {mounted && (
        <Sheet open={sheetIsOpen} onOpenChange={onSheetOpenChange}>
          <SheetPage title={getSheetTitle()}>
            <Outlet />
          </SheetPage>
        </Sheet>
      )}
    </>
  )
}
