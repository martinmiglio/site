import { useEffect, useRef, useState } from 'react'
import { SheetPage } from '@/components/layout/SheetPage'
import { Sheet } from '@/components/ui/sheet'

interface RouteSheetProps {
  open: boolean
  title: string
  description?: string
  onClosed: () => void
  children: React.ReactNode
}

export function RouteSheet({ open, title, description, onClosed, children }: RouteSheetProps) {
  const [isClosing, setIsClosing] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const sheetOpen = open && !isClosing

  useEffect(() => {
    if (!isClosing) return
    const ac = new AbortController()
    waitForExitAnimation(contentRef.current).then(() => {
      if (ac.signal.aborted) return
      onClosed()
      setIsClosing(false)
    })
    return () => ac.abort()
  }, [isClosing, onClosed])

  const onOpenChange = (next: boolean) => {
    if (!next && !isClosing) setIsClosing(true)
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={onOpenChange}>
      <SheetPage title={title} description={description} contentRef={contentRef}>
        {children}
      </SheetPage>
    </Sheet>
  )
}

async function waitForExitAnimation(el: HTMLElement | null): Promise<void> {
  if (!el) return
  const anims = el.getAnimations({ subtree: true }).filter((a) => a.playState === 'running')
  if (anims.length === 0) return
  await Promise.all(anims.map((a) => a.finished.catch(() => {})))
}
