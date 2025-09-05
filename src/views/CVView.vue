<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ProjectCard } from '@/components/ui/projectCard'
import { RESUME_DATA } from '@/data/resume-data'
import { renderHTML2PDF } from '@/lib/pdf'
import { faExternalLink, faGlobe, faLink } from '@fortawesome/free-solid-svg-icons'
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
      
      // Make card backgrounds transparent for PDF export
      const cards = clonedDoc.querySelectorAll('.rounded-lg.border')
      cards?.forEach((card) => {
        card.classList.remove('bg-theme-50', 'dark:bg-theme-800/50')
        card.classList.add('bg-transparent')
      })
    },
    ignoreElements: (element) => {
      return element.id === 'print-ignore'

    }
  })
}
</script>

<template>
  <div class="flex-grow flex h-full" id="page">
    <div class="flex flex-col justify-center w-full px-8 py-16 max-w-4xl mx-auto">
      <section class="space-y-8 print:space-y-6" :id="pdfElementId">
        <!-- Page Title -->
        <h1 class="mb-8 text-4xl font-extrabold text-theme-950 dark:text-theme-300 sm:text-5xl md:text-6xl">
          <span
            class="animate-shine bg-gradient-to-r from-theme-500 from-35% via-theme-300 to-theme-500 to-65% bg-clip-text text-transparent fill-mode-forwards"
            id="print-ignore"
          >
            CURRICULUM VITAE
          </span>
        </h1>
        
        <!-- Header Info -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-theme-800 dark:text-theme-200 mb-2">{{ RESUME_DATA.name }}</h2>
          <p class="text-lg text-theme-700 dark:text-theme-300 mb-4">{{ RESUME_DATA.about }}</p>
          <!-- martinmiglio.dev -->
          <a
            class="pdf-only inline-flex gap-x-1.5 align-baseline leading-none hover:text-theme-500 dark:hover:text-theme-300 transition-colors duration-200"
            :href="RESUME_DATA.personalWebsiteUrl"
            target="_blank"
            data-umami-event="CV Personal Website Link Clicked"
          >
            <FontAwesomeIcon :icon="faExternalLink" class="h-4 w-4" />
            martinmiglio.dev
          </a>
          <p class="items-center text-theme-600 dark:text-theme-400" id="print-ignore">
            <a
              class="inline-flex gap-x-1.5 align-baseline leading-none hover:text-theme-500 dark:hover:text-theme-300 transition-colors duration-200"
              :href="RESUME_DATA.locationLink"
              target="_blank"
              data-umami-event="CV Location Link Clicked"
            >
              <FontAwesomeIcon :icon="faGlobe" class="h-4 w-4" />
              {{ RESUME_DATA.location }}
            </a>
          </p>
        </div>
        <section class="flex min-h-0 flex-col gap-y-4">
          <h2 class="text-2xl font-bold text-theme-800 dark:text-theme-200">About</h2>
          <p class="text-lg text-theme-700 dark:text-theme-300 leading-relaxed">{{ RESUME_DATA.summary }}</p>
        </section>
        <section class="flex min-h-0 flex-col gap-y-4">
          <h2 class="text-2xl font-bold text-theme-800 dark:text-theme-200">Work Experience</h2>
          <Card
            v-for="work in RESUME_DATA.work"
            v-bind:key="work.company"
            class="rounded-lg border border-theme-200 dark:border-theme-700 bg-theme-50 dark:bg-theme-800/50 mb-4 p-6"
          >
            <CardHeader class="pb-4 px-0">
              <!-- Company and Date Row -->
              <div class="flex items-start justify-between gap-x-4 mb-3">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-theme-800 dark:text-theme-200 mb-1">
                    <a
                      class="hover:text-theme-500 dark:hover:text-theme-400 transition-colors duration-200"
                      :href="work.link"
                      :data-umami-event="'CV Company - ' + work.company + ' Link Clicked'"
                    >
                      {{ work.company }}
                    </a>
                  </h3>
                  <h4 class="text-lg font-semibold text-theme-700 dark:text-theme-300">{{ work.title }}</h4>
                </div>
                <div class="text-right">
                  <div class="text-sm tabular-nums text-theme-600 dark:text-theme-400 font-medium whitespace-nowrap">
                    {{ work.start }} - {{ work.end }}
                  </div>
                </div>
              </div>
              
              <!-- Badges Row -->
              <div class="flex flex-wrap gap-2 border-b border-theme-300 dark:border-theme-600 pb-4">
                <Badge
                  v-for="badge in work.badges"
                  v-bind:key="badge"
                  variant="secondary"
                  class="text-xs font-medium px-2 py-1"
                >
                  {{ badge }}
                </Badge>
              </div>
            </CardHeader>
            <CardContent class="text-theme-600 dark:text-theme-400 leading-relaxed px-0 pt-2"> {{ work.description }} </CardContent>
          </Card>
      </section>
        <section class="flex min-h-0 flex-col gap-y-4">
          <h2 class="text-2xl font-bold text-theme-800 dark:text-theme-200">Education</h2>
          <Card
            v-for="education in RESUME_DATA.education"
            v-bind:key="education.school"
            class="rounded-lg border border-theme-200 dark:border-theme-700 bg-theme-50 dark:bg-theme-800/50 mb-4 p-6"
          >
            <CardHeader class="pb-4 px-0">
              <div
                class="flex items-center justify-between gap-x-2 border-b border-theme-300 dark:border-theme-600 pb-4 text-base"
              >
                <h3 class="font-bold leading-none text-theme-800 dark:text-theme-200">
                  {{ education.school }}
                </h3>
                <div class="text-sm tabular-nums text-theme-600 dark:text-theme-400 font-medium">
                  {{ education.start }} - {{ education.end }}
                </div>
              </div>
            </CardHeader>
            <CardContent class="text-theme-600 dark:text-theme-400 text-lg font-medium px-0 pt-2">{{ education.degree }}</CardContent>
          </Card>
        </section>
        <section class="flex min-h-0 flex-col gap-y-4">
          <h2 class="text-2xl font-bold text-theme-800 dark:text-theme-200">Skills</h2>
          <div class="flex flex-wrap gap-2">
            <Badge 
              v-for="skill in RESUME_DATA.skills" 
              v-bind:key="skill"
              class="text-sm font-medium px-3 py-1 bg-theme-100 dark:bg-theme-700 text-theme-700 dark:text-theme-300 border border-theme-200 dark:border-theme-600"
            >
              {{ skill }}
            </Badge>
          </div>
        </section>
        <section class="gap-y-4 print-force-new-page flex min-h-0 scroll-mb-16 flex-col">
          <h2 class="text-2xl font-bold text-theme-800 dark:text-theme-200">Projects</h2>
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
        
        <!-- Back to Home Link -->
        <div class="mt-12" id="print-ignore">
          <Button
            as-child
            variant="ghost"
            class="text-lg font-bold text-theme-700 hover:text-theme-500 dark:text-theme-200 dark:hover:text-theme-400 hover:scale-105 transform p-0 h-auto"
          >
            <router-link
              to="/"
              data-umami-event="CV Back to Home Clicked"
            >
              ← Back to Home
            </router-link>
          </Button>
        </div>
        
        <!-- PDF Export Button -->
        <div class="mt-8" id="print-ignore">
          <Button
            @click="exportToPdf"
            data-umami-event="CV Exported to PDF"
            class="bg-theme-500 hover:bg-theme-600 dark:bg-theme-600 dark:hover:bg-theme-700 text-white font-bold hover:scale-105 transform transition-transform duration-200"
            size="lg"
          >
            Export to PDF
          </Button>
        </div>
      </section>
    </div>
  </div>
</template>
