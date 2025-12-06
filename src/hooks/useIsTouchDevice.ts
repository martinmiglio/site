import { useEffect, useState } from 'react'

/**
 * A React hook that detects if the current device supports touch input
 * @returns A boolean indicating whether the device is a touch device
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return
    }

    const updateIsTouch = () => {
      setIsTouch('ontouchstart' in window)
    }

    // Set initial value
    updateIsTouch()

    // Listen for touch events to detect touch devices
    window.addEventListener('touchstart', updateIsTouch)

    return () => {
      window.removeEventListener('touchstart', updateIsTouch)
    }
  }, [])

  return isTouch
}
