import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SheetPage } from '@/components/layout/SheetPage'
import { Sheet } from '@/components/ui/sheet'
import AboutPage from '@/pages/about'
import CVPage from '@/pages/cv'
import HomePage from '@/pages/home'

type SheetSlug = 'about' | 'cv'

const SHEET_VALUES: SheetSlug[] = ['about', 'cv']

const SHEET_TITLES: Record<SheetSlug, string> = {
  about: 'About',
  cv: 'Experience'
}

export const Route = createFileRoute('/_home')({
  validateSearch: (search: Record<string, unknown>): { sheet?: SheetSlug } => {
    const raw = search.sheet
    return SHEET_VALUES.includes(raw as SheetSlug) ? { sheet: raw as SheetSlug } : {}
  },
  component: RouteComponent
})

function RouteComponent() {
  const [mounted, setMounted] = useState(false)
  const { sheet } = Route.useSearch()
  const navigate = useNavigate()

  useEffect(() => setMounted(true), [])

  const onSheetOpenChange = (open: boolean) => {
    if (!open) {
      navigate({ to: '/', search: {}, startTransition: true, viewTransition: true })
    }
  }

  const sheetContent = sheet === 'about' ? <AboutPage /> : sheet === 'cv' ? <CVPage /> : null

  return (
    <>
      <HomePage />
      {sheet &&
        (mounted ? (
          <Sheet open={true} onOpenChange={onSheetOpenChange}>
            <SheetPage title={SHEET_TITLES[sheet]}>{sheetContent}</SheetPage>
          </Sheet>
        ) : (
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-6 shadow-lg lg:w-[66vw]">
            <h1 className="sr-only">{SHEET_TITLES[sheet]}</h1>
            {sheetContent}
          </div>
        ))}
    </>
  )
}
