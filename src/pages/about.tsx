import { StickyBackButton } from '@/components/ui/sticky-back-button'
import { RESUME_DATA } from '@/data/resume-data'

export default function AboutPage() {
  return (
    <div id="page">
      <div className="mx-auto w-full max-w-4xl px-8 py-16">
        {/* Sticky Back Button */}
        <StickyBackButton />
        {/* Page Title */}
        <h1 className="mb-8 font-extrabold text-4xl text-theme-950 sm:text-5xl md:text-6xl">
          <span className="animate-shine bg-linear-to-r from-35% from-theme-500 via-theme-300 to-65% to-theme-500 bg-clip-text fill-mode-forwards text-transparent">
            ABOUT
          </span>
        </h1>

        {/* Bio Content */}
        <div className="space-y-6 text-lg text-theme-700 leading-relaxed">
          {/* Short Bio */}
          <p className="font-medium text-theme-800 text-xl">{RESUME_DATA.about}</p>

          {/* Detailed Summary */}
          <p className="text-base">{RESUME_DATA.summary}</p>

          {/* Location */}
          <div className="pt-4">
            <p className="text-sm text-theme-600">
              <a
                href={RESUME_DATA.locationLink}
                target="_blank"
                className="transition-colors duration-200 hover:text-theme-500"
              >
                {RESUME_DATA.location}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
