<script setup lang="ts">
import { DrawerTitle } from 'vaul-vue'
import { cn } from '@/lib/utils'

interface DrawerTitleProps {
  class?: string
}

const props = withDefaults(defineProps<DrawerTitleProps>(), {
  class: ''
})
</script>

<template>
  <DrawerTitle
    :class="cn('text-lg font-semibold leading-none tracking-tight', props.class)"
  >
    <slot />
  </DrawerTitle>
</template>