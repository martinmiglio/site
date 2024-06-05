<script setup lang="ts">
import { socialBarData } from '@/data/social-bar'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <ul class="flex flex-row gap-4">
    <li v-for="social in socialBarData" :key="social.name">
      <a
        :href="social.link"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="social.name + ' ' + social.link"
        :data-umami-event="'Social link clicked: ' + social.name"
        class="text-xl opacity-60 transition-all duration-200 ease-in-out hover:text-theme-950 hover:opacity-100 hover:dark:text-theme-50"
      >
        <FontAwesomeIcon :icon="social.icon" :aria-label="social.name + ' icon'" />
      </a>
    </li>
  </ul>
</template>
