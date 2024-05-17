<script setup lang="ts">
import SocialBar from './SocialBar.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    className="flex w-full flex-row flex-wrap items-center justify-between py-8 text-sm opacity-60"
  >
    <div className="pb-1">
      <p>© {{ year }} Martin Miglio</p>
      <a
        href="https://github.com/martinmiglio/site"
        className="text-theme-500 hover:underline"
        data-umami-event="View Source Link Clicked"
      >
        <div>view source</div>
      </a>
    </div>
    <SocialBar />
  </footer>
</template>
