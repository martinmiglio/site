import { ArrowLeft } from 'lucide-react'
import { SheetClose } from '@/components/ui/sheet'

/**
 * Variant: Neumorphic Pebble.
 * A floating pill anchored to the top-left of the sheet that matches the
 * capsules background aesthetic. Compact at rest; expands on hover/focus.
 */
export function StickyBackButton() {
  return (
    <div className="sticky top-0 z-20 -mx-8 -mt-10 mb-8 flex h-14 items-center px-5">
      <SheetClose
        data-umami-event="Back to Home Clicked"
        aria-label="Back to Home"
        className="pebble-back group flex h-12 w-12 items-center overflow-hidden rounded-full pr-4 pl-[14px] font-semibold text-[12px] text-theme-800 uppercase tracking-[0.22em] outline-none transition-[width,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:w-36 focus-visible:w-36 active:scale-[0.96]"
      >
        <ArrowLeft
          strokeWidth={2.25}
          className="h-5 w-5 shrink-0 text-theme-700 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-[1px] group-focus-visible:-translate-x-[1px]"
        />
        <span className="ml-4 whitespace-nowrap opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100 group-focus-visible:opacity-100">
          Home
        </span>
      </SheetClose>
    </div>
  )
}
