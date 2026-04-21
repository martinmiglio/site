import { SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

interface SheetPageProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function SheetPage({ title, description, children }: SheetPageProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const sheetOptions = {
    mobile: {
      className: 'h-[100vh] lg:h-[66vh] overflow-y-auto',
      side: 'bottom' as const
    },
    desktop: {
      className: 'w-[100vw] lg:w-[66vw] overflow-y-auto',
      side: 'right' as const
    }
  }
  const { className, side } = sheetOptions[isMobile ? 'mobile' : 'desktop']

  const scrollbarStyles = `
  [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-theme-50
  [&::-webkit-scrollbar-thumb]:bg-theme-500
  `

  return (
    <SheetContent
      className={cn(className, scrollbarStyles, 'sm:max-w-none')}
      side={side}
      aria-describedby={description ? undefined : undefined}
    >
      <SheetTitle className="sr-only">{title}</SheetTitle>
      {description && <SheetDescription className="sr-only">{description}</SheetDescription>}
      {children}
    </SheetContent>
  )
}
