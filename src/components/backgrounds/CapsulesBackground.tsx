import { useEffect, useRef } from 'react'

type Tone = 'light' | 'mid' | 'deep' | 'accent'
type Column = { id: string; setpointY: number; gapSize: number; tone: Tone }

const COLUMNS: Column[] = [
  { id: 'c0', setpointY: 0.28, gapSize: 0.05, tone: 'light' },
  { id: 'c1', setpointY: 0.62, gapSize: 0.07, tone: 'mid' },
  { id: 'c2', setpointY: 0.38, gapSize: 0.06, tone: 'deep' },
  { id: 'c3', setpointY: 0.55, gapSize: 0.08, tone: 'accent' },
  { id: 'c4', setpointY: 0.42, gapSize: 0.05, tone: 'deep' },
  { id: 'c5', setpointY: 0.7, gapSize: 0.07, tone: 'mid' },
  { id: 'c6', setpointY: 0.33, gapSize: 0.06, tone: 'light' }
]

const GRADIENTS: Record<Tone, string> = {
  light: 'linear-gradient(180deg, #f4f6f2 0%, #e8eae3 45%, #d8dad3 100%)',
  mid: 'linear-gradient(180deg, #d8dad3 0%, #b4cd9d 50%, #e8eae3 100%)',
  deep: 'linear-gradient(180deg, #b4cd9d 0%, #25c922 45%, #7bce5f 80%, #f4f6f2 100%)',
  accent: 'linear-gradient(180deg, #e8eae3 0%, #7bce5f 40%, #00a824 70%, #d8dad3 100%)'
}

const PILL_SHADOW =
  '18px 18px 30px rgba(209, 217, 230, 0.9), -18px -18px 30px rgba(255, 255, 255, 0.95), inset 6px 6px 14px rgba(255, 255, 255, 0.55), inset -6px -6px 14px rgba(120, 138, 120, 0.18)'

const STIFFNESS = 161
const DAMPING = 20.5
const GAP_SCALE = 0.6
const MIN_GAP_Y = 0.01
const MAX_GAP_Y = 0.87
const INFLUENCE = 1.1

export default function CapsulesBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const columnRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const state = COLUMNS.map((c) => ({
      current: c.setpointY,
      velocity: 0,
      target: c.setpointY
    }))

    let pointerActive = false
    let pointerX = 0
    let pointerY = 0

    const updateTargets = () => {
      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const colWidth = rect.width / COLUMNS.length
      const relY = pointerY - rect.top
      const cursorNorm = Math.max(MIN_GAP_Y, Math.min(MAX_GAP_Y, relY / rect.height))
      const cursorCol = (pointerX - rect.left) / colWidth

      COLUMNS.forEach((c, i) => {
        if (!pointerActive || relY < 0 || relY > rect.height) {
          state[i].target = c.setpointY
          return
        }
        const dist = Math.abs(i + 0.5 - cursorCol)
        const w = dist >= INFLUENCE ? 0 : 0.5 + 0.5 * Math.cos((Math.PI * dist) / INFLUENCE)
        state[i].target = c.setpointY * (1 - w) + cursorNorm * w
      })
    }

    const onMove = (x: number, y: number) => {
      pointerActive = true
      pointerX = x
      pointerY = y
      updateTargets()
    }
    const onLeave = () => {
      pointerActive = false
      updateTargets()
    }

    const handleMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY)
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) onMove(t.clientX, t.clientY)
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchmove', handleTouch, { passive: true })
    window.addEventListener('touchend', onLeave)

    let last = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      for (let i = 0; i < state.length; i++) {
        const s = state[i]
        const force = STIFFNESS * (s.target - s.current)
        s.velocity = (s.velocity + force * dt) / (1 + DAMPING * dt)
        s.current += s.velocity * dt
        const el = columnRefs.current[i]
        if (el) el.style.setProperty('--gap-y', String(s.current))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('touchend', onLeave)
    }
  }, [])

  return (
    <div className="-z-50 pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-theme-50" />

      <div
        ref={containerRef}
        className="absolute top-[-8%] left-[-8%] flex h-[116%] w-[116%] gap-[1.5%] md:left-[40%] md:w-[76%]"
      >
        {COLUMNS.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => {
              columnRefs.current[i] = el
            }}
            className="relative h-full flex-1"
            style={
              {
                '--gap-y': c.setpointY,
                '--gap-size': c.gapSize * GAP_SCALE
              } as React.CSSProperties
            }
          >
            <div
              className="absolute inset-x-0 top-0 rounded-full"
              style={{
                height: 'calc((var(--gap-y) - var(--gap-size) / 2) * 100%)',
                background: GRADIENTS[c.tone],
                boxShadow: PILL_SHADOW
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 rounded-full"
              style={{
                top: 'calc((var(--gap-y) + var(--gap-size) / 2) * 100%)',
                background: GRADIENTS[c.tone],
                boxShadow: PILL_SHADOW
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 100% 50%, transparent 0%, transparent 35%, rgba(232, 232, 232, 0.92) 70%, rgba(232, 232, 232, 1) 100%)'
        }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(232, 232, 232, 0.85) 0%, rgba(232, 232, 232, 0.3) 35%, rgba(232, 232, 232, 0.3) 65%, rgba(232, 232, 232, 0.85) 100%)'
        }}
      />
    </div>
  )
}
