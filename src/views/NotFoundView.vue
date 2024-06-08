<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Not Found'
})
</script>

<template>
  <div class="flex flex-grow flex-col items-center justify-center">
    <h1 class="text-center text-9xl">404</h1>
    <h2 class="text-center text-4xl">Page Not Found</h2>
    <p class="m-8 text-center opacity-70">
      <a href="/" class="text-theme-500 hover:underline" data-umami-event="Home Link Clicked">
        go home
      </a>
    </p>
  </div>
</template>
