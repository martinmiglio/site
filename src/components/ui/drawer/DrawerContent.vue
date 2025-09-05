<script setup lang="ts">
import { DrawerContent, DrawerPortal, DrawerOverlay } from 'vaul-vue'
import { cn } from '@/lib/utils'

interface DrawerContentProps {
  class?: string
}

const props = withDefaults(defineProps<DrawerContentProps>(), {
  class: ''
})
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay class="fixed inset-0 z-50 bg-black/20 dark:bg-black/40" />
    <DrawerContent
      :class="cn(
        'fixed z-50 flex flex-col',
        // Mobile: bottom drawer
        'inset-x-0 bottom-0 h-[85%] rounded-t-[10px] border-t',
        // Desktop: right-side drawer  
        'md:right-0 md:left-auto md:top-0 md:bottom-0 md:h-full md:w-[500px] md:max-w-[50vw] md:rounded-none md:rounded-l-[10px] md:border-l md:border-t-0',
        'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800',
        props.class
      )"
    >
      <!-- Mobile drag handle -->
      <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-slate-300 dark:bg-slate-700 md:hidden" />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>