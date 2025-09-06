import { SheetPage } from '@/components/layout/SheetPage'
import { Sheet } from '@/components/ui/sheet'
import HomePage from '@/pages/home'
import { createFileRoute, useLocation, useNavigate, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_home')({
  component: RouteComponent
})

function RouteComponent() {
  const { pathname } = useLocation()

  const sheetIsOpen = pathname !== '/'

  const navigate = useNavigate()

  const onSheetOpenChange = (open: boolean) => {
    if (!open) {
      navigate({ to: '/' })
    }
  }

  return (
    <>
      <HomePage />
      <Sheet open={sheetIsOpen} onOpenChange={onSheetOpenChange}>
        <SheetPage>
          <Outlet />
        </SheetPage>
      </Sheet>
    </>
  )
}
