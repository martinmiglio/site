<script setup lang="ts">
import PageBackground from '@/components/PageBackground.vue'
import PageFooter from '@/components/PageFooter.vue'
import PageHeader from '@/components/PageHeader.vue'
import { useHead } from '@unhead/vue'
import { RouterView } from 'vue-router'

const title = 'Martin Miglio'

useHead({
  titleTemplate: (t) => (t ? `${t} | ${title}` : title)
})
</script>

<template>
  <PageBackground />
  <div
    class="mx-auto flex h-full w-11/12 max-w-screen-md flex-col justify-between text-theme-900 dark:text-theme-100"
  >
    <PageHeader :key="$route.fullPath" />
    <RouterView />
    <PageFooter />
  </div>
</template>
