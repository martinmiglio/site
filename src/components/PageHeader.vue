<script setup lang="ts">
import { routes } from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()

const visibleLinks = routes.filter((link) => link.inHeader && link.path !== route.path)
</script>

<template>
  <nav class="flex w-full justify-between py-8">
    <router-link to="/" data-umami-event="Header Home Clicked">
      <h1 class="font-bold text-theme-500">Martin Miglio</h1>
    </router-link>
    <div class="flex items-center gap-4">
      <router-link
        v-for="link in visibleLinks"
        :key="link.path"
        :to="link.path"
        class="hover:underline"
        :data-umami-event="link.name + ' Link Clicked'"
      >
        {{ link.name }}
      </router-link>
    </div>
  </nav>
</template>
