<script setup lang="ts">
import { routes } from '@/router'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const visibleLinks = routes.filter((link) => link.inHeader && link.path !== route.path)
</script>

<template>
  <nav className="flex w-full justify-between py-8">
    <RouterLink to="/" data-umami-event="Header Home Clicked">
      <h1 className="font-bold text-theme-500">Martin Miglio</h1>
    </RouterLink>
    <div className="flex items-center gap-4">
      <RouterLink
        v-for="link in visibleLinks"
        :key="link.path"
        :to="link.path"
        className="hover:underline"
        :data-umami-event="link.name + ' Link Clicked'"
      >
        {{ link.name }}
      </RouterLink>
    </div>
  </nav>
</template>
