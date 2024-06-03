<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const props = defineProps<{
  title: string
  description: string
  tags: readonly string[]
  link?: string
}>()
</script>

<template>
  <Card
    class="flex flex-col overflow-hidden border border-theme-900/40 p-3 dark:border-theme-100/40"
  >
    <CardHeader class="">
      <div class="space-y-1">
        <CardTitle class="border-b border-theme-900/50 pb-[1px] text-base dark:border-theme-50/50">
          <a
            v-if="props.link"
            :href="props.link"
            target="_blank"
            class="inline-flex items-center gap-1 hover:underline"
            :data-umami-event="'CV Project - ' + props.title + ' Link Clicked'"
          >
            {{ props.title }}
            <span class="ml-2 h-1 w-1 rounded-full bg-green-500"></span>
          </a>
          <h3 v-else>
            {{ props.title }}
          </h3>
        </CardTitle>
        <div class="hidden font-mono text-xs underline print:visible">
          {{ props.link?.replace('https://', '').replace('www.', '').replace('/', '') }}
        </div>
        <CardDescription class="font-mono text-xs"> {{ props.description }} </CardDescription>
      </div>
    </CardHeader>
    <CardContent class="mt-auto flex">
      <div class="mt-2 flex flex-wrap gap-1">
        <Badge
          v-for="tag in props.tags"
          v-bind:key="tag"
          class="px-1 py-0 text-[10px]"
          variant="secondary"
        >
          {{ tag }}
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>
