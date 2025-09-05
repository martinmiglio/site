<script setup lang="ts">
import ContactMenu from '@/components/ContactMenu.vue'
</script>

<template>
  <div class="flex-grow flex h-full" id="page">
    <!-- Left Side - Menu -->
    <div class="flex flex-col justify-center w-1/2 px-8 py-16">
      <!-- Main Title -->
      <h1 class="mb-12 text-5xl font-extrabold text-theme-950 dark:text-theme-300 sm:text-6xl md:text-7xl">
        <span
          class="animate-shine bg-gradient-to-r from-theme-500 from-35% via-theme-300 to-theme-500 to-65% bg-clip-text text-transparent fill-mode-forwards"
        >
          MARTIN
        </span>
      </h1>
      
      <!-- Navigation Links -->
      <nav class="flex flex-col gap-4 mb-8">
        <router-link
          to="/about"
          class="text-2xl font-bold text-theme-700 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400 transition-colors duration-200 hover:scale-105 transform w-fit"
          data-umami-event="Home Bio Link Clicked"
        >
          ABOUT
        </router-link>
        <router-link
          to="/cv"
          class="text-2xl font-bold text-theme-700 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400 transition-colors duration-200 hover:scale-105 transform w-fit"
          data-umami-event="Home CV Link Clicked"
        >
          EXPERIENCE
        </router-link>
        <a
          href="https://github.com/martinmiglio"
          target="_blank"
          class="text-2xl font-bold text-theme-700 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400 transition-colors duration-200 hover:scale-105 transform w-fit"
          data-umami-event="Home GitHub Link Clicked"
        >
          GITHUB
        </a>
        <ContactMenu />
      </nav>
      
      <!-- Small Caption -->
      <p class="text-sm text-theme-600 dark:text-theme-400 max-w-sm">
        Full-stack developer building intuitive web applications
      </p>
    </div>
    
    <!-- Right Side - Background Area -->
    <div class="w-1/2 relative">
      <!-- This area will be filled by the background component -->
    </div>
  </div>
</template>
