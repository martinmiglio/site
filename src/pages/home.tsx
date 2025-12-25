import { Link } from '@tanstack/react-router'
import ContactMenu from '@/components/ContactMenu'

export default function HomePage() {
  return (
    <div className="flex h-full grow" id="page">
      {/* Left Side - Menu */}
      <div className="flex w-1/2 flex-col justify-center px-8 py-16">
        {/* Main Title */}
        <h1 className="mb-12 font-extrabold text-5xl text-theme-950 sm:text-6xl md:text-7xl">
          <span className="animate-shine bg-linear-to-r from-35% from-theme-500 via-theme-300 to-65% to-theme-500 bg-clip-text fill-mode-forwards text-transparent">
            MARTIN
          </span>
        </h1>

        {/* Navigation Links */}
        <nav className="mb-8 flex flex-col gap-4">
          <Link
            to="/about"
            preload="viewport"
            className="w-fit transform text-left font-bold text-2xl text-theme-700 transition-colors duration-200 hover:scale-105 hover:text-theme-500"
            data-umami-event="Home Bio Link Clicked"
          >
            ABOUT
          </Link>
          <Link
            to="/cv"
            preload="viewport"
            className="w-fit transform text-left font-bold text-2xl text-theme-700 transition-colors duration-200 hover:scale-105 hover:text-theme-500"
            data-umami-event="Home CV Link Clicked"
          >
            EXPERIENCE
          </Link>
          <a
            href="https://github.com/martinmiglio"
            target="_blank"
            className="w-fit transform font-bold text-2xl text-theme-700 transition-colors duration-200 hover:scale-105 hover:text-theme-500"
            data-umami-event="Home GitHub Link Clicked"
            rel="noopener"
          >
            GITHUB
          </a>
          <ContactMenu />
        </nav>

        {/* Small Caption */}
        <p className="max-w-sm text-sm text-theme-600">
          Full-stack developer building intuitive web applications
        </p>
      </div>

      {/* Right Side - Background Area */}
      <div className="relative w-1/2">
        {/* This area will be filled by the background component */}
      </div>
    </div>
  )
}
