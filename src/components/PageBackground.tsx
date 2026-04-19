import { useEffect, useRef } from 'react'
import noise from '@/assets/noise.webp'

const SPOTLIGHT_RADIUS = 512

export default function PageBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0
          el.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px))`
        })
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="-z-50 fixed inset-0 h-full w-screen" aria-hidden="true">
      <div
        className="-z-40 noise-jitter absolute inset-[-200%] h-[400%] w-[400%] opacity-[0.16]"
        style={{ background: `url('${noise}')` }}
      />
      <div className="-z-30 absolute top-0 left-0 h-[100vh] w-[50vw] translate-x-[-10%] translate-y-[-30%] rounded-r-full bg-theme-50 blur-[64px]" />
      <div
        ref={spotlightRef}
        className="-z-30 mouse-spotlight absolute top-0 left-0 rounded-full bg-theme-50 blur-[128px]"
        style={{
          height: `${SPOTLIGHT_RADIUS}px`,
          width: `${SPOTLIGHT_RADIUS}px`,
          transform: 'translate(calc(-50% + 50vw), calc(-50% + 50vh))'
        }}
      />
    </div>
  )
}
