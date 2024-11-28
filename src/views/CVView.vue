<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ProjectCard } from '@/components/ui/projectCard'
import { RESUME_DATA } from '@/data/resume-data'
import { renderHTML2PDF } from '@/lib/pdf'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Curriculum Vitae',
  link: [
    {
      rel: 'canonical',
      href: new URL('/cv', import.meta.env.VITE_DEPLOY_URL).href
    }
  ]
})

const pdfElementId = 'to-pdf'

const exportToPdf = async () => {
  const today = new Date()
  const element = document.getElementById('page')

  if (!element) {
    console.error('Element not found')
    return
  }

  const dateString = today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear()

  renderHTML2PDF(element, `${RESUME_DATA.name} - ${dateString} Resume.pdf`, {
    width: 1050,
    scale: 0.53,
    xMargin: 15,
    yMargin: 10,
    documentModifier: (clonedDoc) => {
      const badges = clonedDoc.querySelectorAll('#shadcn-badge')
      badges?.forEach((badge) => {
        badge.classList.add('pb-3')
      })
    },
    ignoreElements: (element) => {
      return element.id === 'print-ignore'
    }
  })
}
</script>

<template>
  <main class="relative scroll-my-12 overflow-auto" id="page">
    <section class="mx-auto w-full space-y-8 print:space-y-6" :id="pdfElementId">
      <div class="flex items-center justify-between">
        <div class="flex-1 space-y-1.5">
          <h1 class="text-2xl font-bold">{{ RESUME_DATA.name }}</h1>
          <p class="text-pretty font-mono text-sm">{{ RESUME_DATA.about }}</p>
          <p class="items-center text-pretty font-mono text-xs" id="print-ignore">
            <a
              class="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
              :href="RESUME_DATA.locationLink"
              target="_blank"
              data-umami-event="CV Location Link Clicked"
            >
              <FontAwesomeIcon :icon="faGlobe" class="h-3 w-3" />
              {{ RESUME_DATA.location }}
            </a>
          </p>
        </div>
      </div>
      <section class="flex min-h-0 flex-col gap-y-3">
        <h2 class="text-xl font-bold">About</h2>
        <p class="text-pretty font-mono text-sm">{{ RESUME_DATA.summary }}</p>
      </section>
      <section class="flex min-h-0 flex-col gap-y-3">
        <h2 class="text-xl font-bold">Work Experience</h2>
        <Card
          v-for="work in RESUME_DATA.work"
          v-bind:key="work.company"
          class="rounded-none border-none"
        >
          <CardHeader>
            <div
              class="flex items-center justify-between gap-x-2 border-b border-theme-900/50 pb-[8px] text-base dark:border-theme-50/50"
            >
              <h3
                class="inline-flex items-center justify-center gap-x-1 font-semibold leading-none"
              >
                <a
                  class="hover:underline"
                  :href="work.link"
                  :data-umami-event="'CV Company - ' + work.company + ' Link Clicked'"
                >
                  {{ work.company }}
                </a>
                <span class="inline-flex gap-x-1">
                  <Badge
                    v-for="badge in work.badges"
                    v-bind:key="badge"
                    variant="secondary"
                    class="align-middle text-xs"
                  >
                    {{ badge }}
                  </Badge>
                </span>
              </h3>
              <div class="text-sm tabular-nums opacity-60">{{ work.start }} - {{ work.end }}</div>
            </div>
            <h4 class="font-mono text-sm leading-none">{{ work.title }}</h4>
          </CardHeader>
          <CardContent class="mt-2 text-xs"> {{ work.description }} </CardContent>
        </Card>
      </section>
      <section class="flex min-h-0 flex-col gap-y-3">
        <h2 class="text-xl font-bold">Education</h2>
        <Card
          v-for="education in RESUME_DATA.education"
          v-bind:key="education.school"
          class="rounded-none border-none"
        >
          <CardHeader>
            <div
              class="flex items-center justify-between gap-x-2 border-b border-theme-900/50 pb-[8px] text-base dark:border-theme-50/50"
            >
              <h3 class="font-semibold leading-none">
                {{ education.school }}
              </h3>
              <div class="text-sm tabular-nums opacity-60">
                {{ education.start }} - {{ education.end }}
              </div>
            </div>
          </CardHeader>
          <CardContent class="mt-2">{{ education.degree }}</CardContent>
        </Card>
      </section>
      <section class="flex min-h-0 flex-col gap-y-3">
        <h2 class="text-xl font-bold">Skills</h2>
        <div class="flex flex-wrap gap-1">
          <Badge v-for="skill in RESUME_DATA.skills" v-bind:key="skill">{{ skill }}</Badge>
        </div>
      </section>
      <section class="gap-y-3print-force-new-page flex min-h-0 scroll-mb-16 flex-col">
        <h2 class="text-xl font-bold">Projects</h2>
        <div
          class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2"
        >
          <ProjectCard
            v-for="project in RESUME_DATA.projects"
            v-bind:key="project.title"
            :title="project.title"
            :description="project.description"
            :tags="project.techStack"
            :link="project.link.href"
          />
        </div>
      </section>
    </section>
    <button
      class="pt-8 text-sm opacity-80 hover:underline"
      @click="exportToPdf"
      data-umami-event="CV Exported to PDF"
      id="print-ignore"
    >
      Export to PDF
    </button>
  </main>
</template>
