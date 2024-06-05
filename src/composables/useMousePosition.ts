// a composable function that returns the current mouse position
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  const updateMouse = (e: MouseEvent) => {
    x.value = e.clientX
    y.value = e.clientY
  }

  onMounted(() => {
    window.addEventListener('mousemove', updateMouse)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouse)
  })

  return { x, y }
}
