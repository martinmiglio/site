import type React from 'react'
import { useEffect, useRef } from 'react'

type Tone = 'light' | 'mid' | 'deep' | 'accent'
type Column = {
  id: string
  setpointY: number
  gapSize: number
  tone: Tone
  /** hidden on mobile — column is only rendered at md+ breakpoints */
  desktopOnly?: boolean
}

const COLUMNS: Column[] = [
  { id: 'c0', setpointY: 0.28, gapSize: 0.05, tone: 'light', desktopOnly: true },
  { id: 'c1', setpointY: 0.62, gapSize: 0.07, tone: 'mid', desktopOnly: true },
  { id: 'c2', setpointY: 0.38, gapSize: 0.06, tone: 'deep', desktopOnly: true },
  { id: 'c3', setpointY: 0.55, gapSize: 0.08, tone: 'accent', desktopOnly: true },
  { id: 'c4', setpointY: 0.42, gapSize: 0.05, tone: 'light' },
  { id: 'c5', setpointY: 0.7, gapSize: 0.07, tone: 'mid' },
  { id: 'c6', setpointY: 0.33, gapSize: 0.06, tone: 'accent' }
]

// Per-column indices: desktop (all 7) and mobile (only non-desktopOnly, in DOM order).
// Mobile-hidden columns get -1 because the `@media` swap picks `--i-md` on desktop.
const COLUMN_INDICES: { iMd: number; iSm: number }[] = (() => {
  let sm = 0
  return COLUMNS.map((c, i) => ({ iMd: i, iSm: c.desktopOnly ? -1 : sm++ }))
})()

export default function CapsulesBackground() {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    let rafPending = false
    let clientX = 0
    let clientY = 0

    const commit = () => {
      rafPending = false
      const rect = stage.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const relX = (clientX - rect.left) / rect.width
      const relY = (clientY - rect.top) / rect.height
      const inRange = relY >= 0 && relY <= 1
      if (inRange) {
        stage.style.setProperty('--px', String(relX))
        stage.style.setProperty('--py', String(Math.max(0.01, Math.min(0.87, relY))))
      }
      stage.style.setProperty('--active', inRange ? '1' : '0')
    }

    const schedule = () => {
      if (!rafPending) {
        rafPending = true
        requestAnimationFrame(commit)
      }
    }

    const onMove = (e: PointerEvent) => {
      clientX = e.clientX
      clientY = e.clientY
      schedule()
    }

    const deactivate = () => {
      stage.style.setProperty('--active', '0')
    }

    // Touch/pen release returns columns to setpoint; mouse button release should not.
    const onRelease = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') deactivate()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onRelease, { passive: true })
    window.addEventListener('pointercancel', onRelease, { passive: true })
    document.documentElement.addEventListener('pointerleave', deactivate, { passive: true })
    document.addEventListener('visibilitychange', deactivate)
    window.addEventListener('blur', deactivate)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onRelease)
      window.removeEventListener('pointercancel', onRelease)
      document.documentElement.removeEventListener('pointerleave', deactivate)
      document.removeEventListener('visibilitychange', deactivate)
      window.removeEventListener('blur', deactivate)
    }
  }, [])

  return (
    <div className="-z-50 pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-theme-50" />

      <div
        ref={stageRef}
        className="capsules-stage absolute top-[-8%] bottom-[-8%] left-[45%] flex gap-[1.5%] md:right-auto md:bottom-auto md:left-[40%] md:h-[116%] md:w-[76%]"
        style={{ right: '-8%' }}
      >
        {COLUMNS.map((c, i) => {
          const { iMd, iSm } = COLUMN_INDICES[i]
          return (
            <div
              key={c.id}
              data-tone={c.tone}
              className={`capsules-col relative h-full flex-1 ${c.desktopOnly ? 'hidden md:block' : ''}`}
              style={
                {
                  '--i-md': iMd,
                  '--i-sm': iSm,
                  '--setpoint': c.setpointY,
                  '--gap-size': c.gapSize
                } as React.CSSProperties
              }
            >
              <div className="capsules-pill capsules-pill--top" />
              <div className="capsules-pill capsules-pill--bottom" />
            </div>
          )
        })}
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
            'linear-gradient(to right, rgba(232, 232, 232, 1) 0%, rgba(232, 232, 232, 0.95) 35%, rgba(232, 232, 232, 0.3) 55%, transparent 70%)'
        }}
      />
    </div>
  )
}
