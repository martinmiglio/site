<script setup lang="ts">
import MouseBackground from '@/components/MouseBackground.vue'
import PageFooter from '@/components/PageFooter.vue'
import PageHeader from '@/components/PageHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
      rel="stylesheet"
    />
  </header>
  <div
    className="fixed inset-0 -z-50 h-screen w-screen bg-theme-50 bg-grid-theme-100 dark:bg-theme-900 dark:bg-grid-theme-950"
  >
    <MouseBackground />
  </div>
  <div
    className="mx-auto flex h-full w-11/12 max-w-screen-md flex-col justify-between text-theme-900 dark:text-theme-100"
  >
    <PageHeader :key="$route.fullPath" />
    <RouterView />
    <PageFooter />
  </div>
</template>
