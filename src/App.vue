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
  <client-only><PageBackground /></client-only>
  <div
    class="mx-auto flex min-h-screen w-full flex-col justify-between text-theme-900 dark:text-theme-100"
  >
    <PageHeader v-if="$route.path !== '/'" :key="$route.fullPath" />
    <RouterView />
    <PageFooter v-if="$route.path !== '/'" />
  </div>
</template>
