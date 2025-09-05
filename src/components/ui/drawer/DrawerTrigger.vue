<script setup lang="ts">
import { DrawerTrigger } from 'vaul-vue'
</script>

<template>
  <DrawerTrigger as-child>
    <slot />
  </DrawerTrigger>
</template>