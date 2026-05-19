import { Download } from 'lucide-react'

type Props = {
  href: string
  filename?: string
  label?: string
}

export function StickyDownloadButton({ href, filename, label = 'Resume' }: Props) {
  return (
    <div className="pointer-events-none sticky bottom-6 z-20 mt-8 -mb-2 flex h-14 items-center justify-end px-5">
      <a
        href={href}
        download={filename}
        data-umami-event="Resume Downloaded"
        aria-label={`Download ${label}`}
        className="pebble pointer-events-auto group flex h-12 w-12 flex-row-reverse items-center overflow-hidden rounded-full pr-[14px] pl-4 font-semibold text-[12px] text-theme-800 uppercase tracking-[0.22em] outline-none transition-[width,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:w-40 focus-visible:w-40 active:scale-[0.96]"
      >
        <Download
          strokeWidth={2.25}
          className="h-5 w-5 shrink-0 text-theme-700 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[1px] group-focus-visible:translate-y-[1px]"
        />
        <span className="mr-4 whitespace-nowrap opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100 group-focus-visible:opacity-100">
          {label}
        </span>
      </a>
    </div>
  )
}
