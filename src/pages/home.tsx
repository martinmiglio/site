import ContactMenu from '@/components/ContactMenu'
import { Link } from '@tanstack/react-router'

export default function HomePage() {
  return (
    <div className="flex h-full grow" id="page">
      {/* Left Side - Menu */}
      <div className="flex w-1/2 flex-col justify-center px-8 py-16">
        {/* Main Title */}
        <h1 className="text-theme-950 mb-12 text-5xl font-extrabold sm:text-6xl md:text-7xl">
          <span className="animate-shine from-theme-500 via-theme-300 to-theme-500 fill-mode-forwards bg-linear-to-r from-35% to-65% bg-clip-text text-transparent">
            MARTIN
          </span>
        </h1>

        {/* Navigation Links */}
        <nav className="mb-8 flex flex-col gap-4">
          <Link
            to="/about"
            className="text-theme-700 hover:text-theme-500 w-fit transform text-left text-2xl font-bold transition-colors duration-200 hover:scale-105"
            data-umami-event="Home Bio Link Clicked"
          >
            ABOUT
          </Link>
          <Link
            to="/cv"
            className="text-theme-700 hover:text-theme-500 w-fit transform text-left text-2xl font-bold transition-colors duration-200 hover:scale-105"
            data-umami-event="Home CV Link Clicked"
          >
            EXPERIENCE
          </Link>
          <a
            href="https://github.com/martinmiglio"
            target="_blank"
            className="text-theme-700 hover:text-theme-500 w-fit transform text-2xl font-bold transition-colors duration-200 hover:scale-105"
            data-umami-event="Home GitHub Link Clicked"
          >
            GITHUB
          </a>
          <ContactMenu />
        </nav>

        {/* Small Caption */}
        <p className="text-theme-600 max-w-sm text-sm">
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
