<script setup lang="ts">
import { useMediaQuery } from './composables/useMediaQuery'
import PageBackground from '@/components/PageBackground.vue'
import PageFooter from '@/components/PageFooter.vue'
import PageHeader from '@/components/PageHeader.vue'
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const title = 'Martin Miglio'

useHead({
  titleTemplate: (t) => (t ? `${t} | ${title}` : title)
})

const route = useRoute()
const isDesktop = useMediaQuery('(min-width: 768px)')
const computedVisible = computed(() => !isDesktop.value && route.path !== '/')
</script>

<template>
  <client-only><PageBackground /></client-only>
  <div
    class="mx-auto flex h-full min-h-screen w-full flex-col justify-between text-theme-900 dark:text-theme-100"
  >
    <PageHeader :visible="computedVisible" />
    <RouterView />
    <PageFooter />
  </div>
</template>
