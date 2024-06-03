<script setup lang="ts">
import { useMousePosition } from '@/composables/useMousePosition'

const { x, y } = useMousePosition()

const props = defineProps({
  radius: {
    type: Number,
    default: 256
  }
})

console.log('MouseBackground.vue', x.value, y.value)
</script>

<template>
  <div
    className="z-40 absolute left-0 top-0 rounded-full bg-theme-50 dark:bg-theme-900"
    :style="{
      height: props.radius + 'px',
      width: props.radius + 'px',
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
    }"
  />
</template>
