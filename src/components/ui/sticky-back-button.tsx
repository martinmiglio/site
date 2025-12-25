import { Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'

export function StickyBackButton() {
  const [isSticky, setIsSticky] = useState(false)
  const [mounted, setMounted] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      { threshold: [1] }
    )

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
    }
  }, [])

  const buttonClassName = `mr-3 cursor-pointer border-none bg-background/93 ring-transparent transition-all duration-300 ease-out hover:scale-[.97] hover:bg-background/100 ${isSticky ? '-translate-y-1 scale-[1.02] shadow-lg' : ''}`

  return (
    <>
      {/* Sentinel element for detecting sticky state */}
      <div ref={sentinelRef} className="pointer-events-none absolute top-0 h-px" />

      {/* Sticky Back Button */}
      <div className="sticky top-0 z-10 mb-4 flex w-full justify-end">
        {mounted ? (
          <Button asChild variant="ghost" size="lg" className={buttonClassName}>
            <SheetClose data-umami-event="Back to Home Clicked">
              <ChevronLeft className="h-4 w-4" />
              <span className="font-semibold">Back to Home</span>
            </SheetClose>
          </Button>
        ) : (
          // SSR fallback: plain link without Radix SheetClose
          <Button asChild variant="ghost" size="lg" className={buttonClassName}>
            <Link to="/" data-umami-event="Back to Home Clicked">
              <ChevronLeft className="h-4 w-4" />
              <span className="font-semibold">Back to Home</span>
            </Link>
          </Button>
        )}
      </div>
    </>
  )
}
