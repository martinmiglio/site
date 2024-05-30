<script setup lang="ts">
import { AvatarFallback, type AvatarFallbackProps } from 'radix-vue'

const props = defineProps<AvatarFallbackProps>()
</script>

<template>
  <AvatarFallback
    class="flex h-full w-full items-center justify-center rounded-xl bg-theme-500"
    v-bind="props"
  >
    <slot />
  </AvatarFallback>
</template>
