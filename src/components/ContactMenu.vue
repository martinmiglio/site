<script setup lang="ts">
import { ref } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { socialBarData } from '@/data/social-bar'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const isOpen = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpen" class="w-fit">
    <CollapsibleTrigger as-child>
      <button
        class="text-2xl font-bold text-theme-700 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400 transition-colors duration-200 hover:scale-105 transform w-fit"
        data-umami-event="Home Contact Menu Toggled"
      >
        CONTACT
      </button>
    </CollapsibleTrigger>
    <CollapsibleContent class="mt-4">
      <div class="flex flex-col gap-3 pl-4 border-l-2 border-theme-200 dark:border-theme-700">
        <a
          v-for="social in socialBarData"
          :key="social.name"
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.name + ' ' + social.link"
          :data-umami-event="'Contact Menu Social Link Clicked: ' + social.name"
          class="flex items-center gap-3 text-lg font-medium text-theme-600 hover:text-theme-500 dark:text-theme-300 dark:hover:text-theme-200 transition-colors duration-200 hover:scale-105 transform w-fit"
        >
          <FontAwesomeIcon 
            :icon="social.icon" 
            :aria-label="social.name + ' icon'"
            class="text-xl"
          />
          <span>{{ social.name }}</span>
        </a>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
