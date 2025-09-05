<script setup lang="ts">
import { RESUME_DATA } from '@/data/resume-data'
import { useHead } from '@unhead/vue'

useHead({
  title: 'About'
})
</script>

<template>
  <div class="flex-grow flex h-full" id="page">
    <!-- Main Content -->
    <div class="flex flex-col justify-center w-full px-8 py-16 max-w-4xl mx-auto">
      <!-- Page Title -->
      <h1 class="mb-8 text-4xl font-extrabold text-theme-950 dark:text-theme-300 sm:text-5xl md:text-6xl">
        <span
          class="animate-shine bg-gradient-to-r from-theme-500 from-35% via-theme-300 to-theme-500 to-65% bg-clip-text text-transparent fill-mode-forwards"
        >
          ABOUT
        </span>
      </h1>
      
      <!-- Bio Content -->
      <div class="space-y-6 text-lg text-theme-700 dark:text-theme-200 leading-relaxed">
        <!-- Short Bio -->
        <p class="text-xl font-medium text-theme-800 dark:text-theme-100">
          {{ RESUME_DATA.about }}
        </p>
        
        <!-- Detailed Summary -->
        <p class="text-base">
          {{ RESUME_DATA.summary }}
        </p>
        
        <!-- Location -->
        <div class="pt-4">
          <p class="text-sm text-theme-600 dark:text-theme-400">
            <a 
              :href="RESUME_DATA.locationLink" 
              target="_blank"
              class="hover:text-theme-500 dark:hover:text-theme-300 transition-colors duration-200"
            >
              {{ RESUME_DATA.location }}
            </a>
          </p>
        </div>
      </div>
      
      <!-- Back to Home Link -->
      <div class="mt-12">
        <router-link
          to="/"
          class="inline-flex items-center text-lg font-bold text-theme-700 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400 transition-colors duration-200 hover:scale-105 transform"
          data-umami-event="Bio Back to Home Clicked"
        >
          ← Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>
