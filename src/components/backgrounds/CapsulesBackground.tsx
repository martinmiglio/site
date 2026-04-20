import type React from 'react'
import { useEffect, useRef } from 'react'

type Tone = 'light' | 'mid' | 'deep' | 'accent'
type Column = {
  id: string
  setpointY: number
  gapSize: number
  tone: Tone
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

// Desktop-only columns are display:none on mobile, so their -1 mobile index is never read.
const COLUMN_INDICES: { desktopIndex: number; mobileIndex: number }[] = (() => {
  let mobile = 0
  return COLUMNS.map((c, i) => ({
    desktopIndex: i,
    mobileIndex: c.desktopOnly ? -1 : mobile++
  }))
})()

export default function CapsulesBackground() {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    let updatePending = false
    let pointerClientX = 0
    let pointerClientY = 0
    // The stage is positioned in viewport percentages, so its rect only shifts on resize.
    let stageRect = stage.getBoundingClientRect()
    let lastActive = ''

    const refreshStageRect = () => {
      stageRect = stage.getBoundingClientRect()
    }

    const commit = () => {
      updatePending = false
      if (stageRect.width === 0 || stageRect.height === 0) return
      const relX = (pointerClientX - stageRect.left) / stageRect.width
      const relY = (pointerClientY - stageRect.top) / stageRect.height
      const inRange = relY >= 0 && relY <= 1
      if (inRange) {
        stage.style.setProperty('--pointer-x', String(relX))
        stage.style.setProperty('--pointer-y', String(Math.max(0.01, Math.min(0.87, relY))))
      }
      const nextActive = inRange ? '1' : '0'
      if (nextActive !== lastActive) {
        lastActive = nextActive
        stage.style.setProperty('--active', nextActive)
      }
    }

    const scheduleCommit = () => {
      if (!updatePending) {
        updatePending = true
        requestAnimationFrame(commit)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      pointerClientX = e.clientX
      pointerClientY = e.clientY
      scheduleCommit()
    }

    const deactivate = () => {
      if (lastActive !== '0') {
        lastActive = '0'
        stage.style.setProperty('--active', '0')
      }
    }

    // Mouse button release leaves the cursor in place; only touch/pen lift deactivates.
    const deactivateOnTouchOrPenRelease = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') deactivate()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerup', deactivateOnTouchOrPenRelease, { passive: true })
    window.addEventListener('pointercancel', deactivateOnTouchOrPenRelease, { passive: true })
    window.addEventListener('resize', refreshStageRect, { passive: true })
    document.documentElement.addEventListener('pointerleave', deactivate, { passive: true })
    document.addEventListener('visibilitychange', deactivate)
    window.addEventListener('blur', deactivate)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', deactivateOnTouchOrPenRelease)
      window.removeEventListener('pointercancel', deactivateOnTouchOrPenRelease)
      window.removeEventListener('resize', refreshStageRect)
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
        className="capsules-stage absolute top-[-8%] right-[-8%] bottom-[-8%] left-[45%] flex gap-[1.5%] md:right-auto md:bottom-auto md:left-[40%] md:h-[116%] md:w-[76%]"
      >
        {COLUMNS.map((c, i) => {
          const { desktopIndex, mobileIndex } = COLUMN_INDICES[i]
          return (
            <div
              key={c.id}
              data-tone={c.tone}
              className={`capsules-col relative h-full flex-1 ${c.desktopOnly ? 'hidden md:block' : ''}`}
              style={
                {
                  '--column-index-desktop': desktopIndex,
                  '--column-index-mobile': mobileIndex,
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
