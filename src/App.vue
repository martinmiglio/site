<script setup lang="ts">
import MouseBackground from '@/components/MouseBackground.vue'
import PageFooter from '@/components/PageFooter.vue'
import PageHeader from '@/components/PageHeader.vue'
import { useMeta } from 'vue-meta'
import { RouterView } from 'vue-router'

useMeta({
  title: '',
  htmlAttrs: { lang: 'en', amp: true }
})
</script>

<template>
  <header>
    <metainfo>
      <template v-slot:title="{ content }">{{
        content ? `${content} | Martin Miglio` : `Martin Miglio`
      }}</template>
    </metainfo>
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
