<script setup lang="ts">
import SocialBar from './SocialBar.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="flex w-full flex-row flex-wrap items-center justify-between py-8 px-8 text-sm"
  >
    <div class="pb-1">
      <p class="text-theme-600 dark:text-theme-400">© {{ year }} Martin Miglio</p>
      <a
        href="https://github.com/martinmiglio/site"
        class="text-theme-500 hover:text-theme-400 dark:text-theme-400 dark:hover:text-theme-300 transition-colors duration-200 hover:underline"
        data-umami-event="View Source Link Clicked"
      >
        <div>view source</div>
      </a>
    </div>
    <SocialBar />
  </footer>
</template>
