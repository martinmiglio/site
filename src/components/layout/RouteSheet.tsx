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
    waitForExitAnimation(contentRef.current, ac.signal).then(() => {
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

/**
 * Awaits two frames so React commits open=false and Radix flips
 * data-state="closed" before sampling the running animations.
 */
async function waitForExitAnimation(el: HTMLElement | null, signal: AbortSignal): Promise<void> {
  if (!el) return
  await nextFrame()
  if (signal.aborted) return
  await nextFrame()
  if (signal.aborted) return
  const anims = el.getAnimations({ subtree: true }).filter((a) => a.playState === 'running')
  if (anims.length === 0) return
  await Promise.all(anims.map((a) => a.finished.catch(() => {})))
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}
