<script setup lang="ts">
import { DrawerRoot, type DrawerRootEmits, type DrawerRootProps } from 'vaul-vue'

const props = defineProps<DrawerRootProps>()
const emits = defineEmits<DrawerRootEmits>()
</script>

<template>
  <DrawerRoot v-bind="props" @update:open="emits('update:open', $event)">
    <slot />
  </DrawerRoot>
</template>