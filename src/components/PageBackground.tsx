import noise from '@/assets/noise.webp'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useUpdatingRandom } from '@/hooks/useUpdatingRandom'

export default function PageBackground() {
  const isTouch = useIsTouchDevice()
  const { x: mouseX, y: mouseY } = useMousePosition()

  const noiseInterval = 100
  const noiseMax = 10
  const noiseMin = -10

  const noiseX = useUpdatingRandom(noiseInterval, noiseMin, noiseMax)
  const noiseY = useUpdatingRandom(noiseInterval, noiseMin, noiseMax)

  const radius = 512

  return (
    <div className="-z-50 fixed inset-0 h-full w-screen">
      {/* Animated noise texture */}
      <div
        className="-z-40 absolute inset-[-200%] h-[400%] w-[400%] opacity-[0.16]"
        style={{
          transform: `translate(${noiseX}%, ${noiseY}%)`,
          background: `url('${noise}')`
        }}
      />
      {/* Spotlight on the left side */}
      <div className="-z-30 absolute top-0 left-0 h-[100vh] w-[50vw] translate-x-[-10%] translate-y-[-30%] rounded-r-full bg-theme-50 blur-[64px] transition-opacity duration-300" />

      {/* Mouse-following spotlight */}
      <div
        className="-z-30 absolute top-0 left-0 rounded-full bg-theme-50 blur-[128px] transition-opacity duration-300"
        style={{
          height: `${radius}px`,
          width: `${radius}px`,
          transform: `translate(calc(-50% + ${mouseX}px), calc(-50% + ${mouseY}px))`,
          opacity: isTouch ? 0 : 1
        }}
      />
    </div>
  )
}
