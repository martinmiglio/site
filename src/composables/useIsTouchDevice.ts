// a composable function that returns if the device is a touch device
import { ref, onMounted, onUnmounted } from 'vue'

export function useIsTouchDevice() {
  const isTouch = ref(false)

  const updateIsTouch = () => {
    isTouch.value = 'ontouchstart' in window
  }

  onMounted(() => {
    window.addEventListener('touchstart', updateIsTouch)
  })

  onUnmounted(() => {
    window.removeEventListener('touchstart', updateIsTouch)
  })

  return isTouch
}
