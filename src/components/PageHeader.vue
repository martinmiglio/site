<script setup lang="ts">
const props = defineProps<{
  visible: boolean
}>()
</script>

<template>
  <nav
    key="NavBarComponent"
    :class="`flex w-full justify-between px-8 py-8 transition-opacity duration-200 ${props.visible ? 'opacity-100' : 'opacity-0'}`"
  >
    <router-link to="/" data-umami-event="Header Home Clicked">
      <h1
        class="transform text-2xl font-bold text-theme-700 transition-colors duration-200 hover:scale-105 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400"
      >
        MARTIN
      </h1>
    </router-link>
  </nav>
</template>
