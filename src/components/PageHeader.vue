<script setup lang="ts">
import { routes } from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()

const visibleLinks = routes.filter((link) => link.inHeader && link.path !== route.path)
</script>

<template>
  <nav class="flex w-full justify-between py-8 px-8">
    <router-link to="/" data-umami-event="Header Home Clicked">
      <h1 class="text-2xl font-bold text-theme-700 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400 transition-colors duration-200 hover:scale-105 transform">
        MARTIN
      </h1>
    </router-link>
    <div class="flex items-center gap-6">
      <router-link
        v-for="link in visibleLinks"
        :key="link.path"
        :to="link.path"
        class="text-lg font-bold text-theme-700 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400 transition-colors duration-200 hover:scale-105 transform"
        :data-umami-event="link.name + ' Link Clicked'"
      >
        {{ link.name.toUpperCase() }}
      </router-link>
    </div>
  </nav>
</template>
