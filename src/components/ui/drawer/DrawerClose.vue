<script setup lang="ts">
import { DrawerClose } from 'vaul-vue'
</script>

<template>
  <DrawerClose as-child>
    <slot />
  </DrawerClose>
</template>