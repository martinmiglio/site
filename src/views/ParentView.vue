<script setup lang="ts">
import ContactMenu from '@/components/ContactMenu.vue'
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer'
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { routes } from '@/router/index'
import { useMediaQuery } from '@/composables/useMediaQuery'

const route = useRoute()
const router = useRouter()
const isDrawerOpen = ref(false)

// Responsive drawer direction
const isDesktop = useMediaQuery("(min-width: 768px)")
const drawerDirection = computed(() => isDesktop.value ? 'right' : 'bottom')

// Get routes that should open the drawer
const drawerRoutes = routes[0].children?.filter(route => route.inHeader) || []
const isDrawerRoute = (routeName: string | symbol | null | undefined) => 
  typeof routeName === 'string' && drawerRoutes.some(route => route.name === routeName)

watch(
  () => route.name,
  (newRoute) => {
    isDrawerOpen.value = isDrawerRoute(newRoute)
  },
  { immediate: true }
)

watch(isDrawerOpen, (newValue) => {
  if (!newValue && isDrawerRoute(route.name)) {
    router.push('/')
  }
})

// Dynamic navigation functions based on route configuration
const navigationFunctions = drawerRoutes.reduce((acc, route) => {
  const funcName = `navigateTo${route.name?.charAt(0).toUpperCase()}${route.name?.slice(1)}`
  acc[funcName] = () => router.push(`/${route.path}`)
  return acc
}, {} as Record<string, () => void>)

const { navigateToAbout, navigateToCv } = navigationFunctions
</script>

<template>
  <div class="flex h-full flex-grow" id="page">
    <!-- Left Side - Menu -->
    <div class="flex w-1/2 flex-col justify-center px-8 py-16">
      <!-- Main Title -->
      <h1
        class="mb-12 text-5xl font-extrabold text-theme-950 dark:text-theme-300 sm:text-6xl md:text-7xl"
      >
        <span
          class="animate-shine bg-gradient-to-r from-theme-500 from-35% via-theme-300 to-theme-500 to-65% bg-clip-text text-transparent fill-mode-forwards"
        >
          MARTIN
        </span>
      </h1>

      <!-- Navigation Links -->
      <nav class="mb-8 flex flex-col gap-4">
        <Drawer v-model:open="isDrawerOpen" :direction="drawerDirection" should-scale-background>
          <DrawerTrigger asChild>
            <button
              @click="navigateToAbout"
              class="w-fit transform text-left text-2xl font-bold text-theme-700 transition-colors duration-200 hover:scale-105 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400"
              data-umami-event="Home Bio Link Clicked"
            >
              ABOUT
            </button>
          </DrawerTrigger>
          <DrawerTrigger asChild>
            <button
              @click="navigateToCv"
              class="w-fit transform text-left text-2xl font-bold text-theme-700 transition-colors duration-200 hover:scale-105 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400"
              data-umami-event="Home CV Link Clicked"
            >
              EXPERIENCE
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div class="flex-1 overflow-y-auto p-6">
              <router-view />
            </div>
          </DrawerContent>
        </Drawer>
        <a
          href="https://github.com/martinmiglio"
          target="_blank"
          class="w-fit transform text-2xl font-bold text-theme-700 transition-colors duration-200 hover:scale-105 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400"
          data-umami-event="Home GitHub Link Clicked"
        >
          GITHUB
        </a>
        <ContactMenu />
      </nav>

      <!-- Small Caption -->
      <p class="max-w-sm text-sm text-theme-600 dark:text-theme-400">
        Full-stack developer building intuitive web applications
      </p>
    </div>

    <!-- Right Side - Background Area -->
    <div class="relative w-1/2">
      <!-- This area will be filled by the background component -->
    </div>
  </div>
</template>
