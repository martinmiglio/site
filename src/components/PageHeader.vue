<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const links = [
  { href: '/', label: 'Home' },
  { href: '/cv', label: 'My CV' },
  { href: '/message', label: 'Message me' }
]

const route = useRoute()

const visibleLinks = links.filter((link) => link.href !== route.path)
</script>

<template>
  <nav className="flex w-full justify-between py-8">
    <RouterLink to="/" data-umami-event="Header Home Clicked">
      <h1 className="font-bold text-theme-500">Martin Miglio</h1>
    </RouterLink>
    <div className="flex items-center gap-4">
      <RouterLink
        v-for="link in visibleLinks"
        :key="link.href"
        :to="link.href"
        className="hover:underline"
        :data-umami-event="link.label + ' Link Clicked'"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </nav>
</template>
