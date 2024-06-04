<script setup lang="ts">
import PageBackground from '@/components/PageBackground.vue'
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
  <PageBackground />
  <div
    className="mx-auto flex h-full w-11/12 max-w-screen-md flex-col justify-between text-theme-900 dark:text-theme-100"
  >
    <PageHeader :key="$route.fullPath" />
    <RouterView />
    <PageFooter />
  </div>
</template>
