<script setup lang="ts">
import noise from '@/assets/noise.webp'
import { useIsTouchDevice } from '@/composables/useIsTouchDevice'
import { useMousePosition } from '@/composables/useMousePosition'
import { useUpdatingRandom } from '@/composables/useUpdatingRandom'

const isTouch = useIsTouchDevice()

const { x: mouseX, y: mouseY } = useMousePosition()

const noiseInterval = 100
const noiseMax = 10
const noiseMin = -10

const noiseX = useUpdatingRandom(noiseInterval, noiseMin, noiseMax)
const noiseY = useUpdatingRandom(noiseInterval, noiseMin, noiseMax)

const radius = 512
</script>

<template>
  <div
    class="fixed inset-0 -z-50 h-full w-screen bg-theme-50 bg-grid-theme-100 dark:bg-theme-900 dark:bg-grid-theme-950"
  >
    <div
      class="absolute inset-[-200%] -z-40 h-[400%] w-[400%] opacity-[0.05]"
      :style="{
        transform: `translate(${noiseX}%, ${noiseY}%)`,
        background: `url('${noise}')`
      }"
    />
    <div
      class="absolute left-0 top-0 -z-30 rounded-full bg-theme-50 blur-[128px] transition-opacity duration-300 dark:bg-theme-900"
      :style="{
        height: radius + 'px',
        width: radius + 'px',
        transform: `translate(calc(-50% + ${mouseX}px), calc(-50% + ${mouseY}px))`,
        opacity: isTouch ? 0 : 1
      }"
    />
  </div>
</template>
