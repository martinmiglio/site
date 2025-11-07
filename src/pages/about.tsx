import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'
import { RESUME_DATA } from '@/data/resume-data'

export default function AboutPage() {
  return (
    <div className="flex h-full grow" id="page">
      {/* Main Content */}
      <div className="mx-auto flex w-full max-w-4xl flex-col px-8 py-16">
        {/* Page Title */}
        <h1 className="text-theme-950 mb-8 text-4xl font-extrabold sm:text-5xl md:text-6xl">
          <span className="animate-shine from-theme-500 via-theme-300 to-theme-500 fill-mode-forwards bg-linear-to-r from-35% to-65% bg-clip-text text-transparent">
            ABOUT
          </span>
        </h1>

        {/* Bio Content */}
        <div className="text-theme-700 space-y-6 text-lg leading-relaxed">
          {/* Short Bio */}
          <p className="text-theme-800 text-xl font-medium">{RESUME_DATA.about}</p>

          {/* Detailed Summary */}
          <p className="text-base">{RESUME_DATA.summary}</p>

          {/* Location */}
          <div className="pt-4">
            <p className="text-theme-600 text-sm">
              <a
                href={RESUME_DATA.locationLink}
                target="_blank"
                className="hover:text-theme-500 transition-colors duration-200"
              >
                {RESUME_DATA.location}
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="my-12">
          <Button
            asChild
            variant="link"
            className="text-theme-700 hover:text-theme-500 h-auto transform p-0 text-lg font-bold hover:scale-105"
          >
            <SheetClose data-umami-event="CV Back to Home Clicked">
              ← Back to Home
            </SheetClose>
          </Button>
        </div>
      </div>
    </div>
  )
}
