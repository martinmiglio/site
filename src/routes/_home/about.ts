import { createFileRoute } from '@tanstack/react-router'
import AboutPage from '@/pages/about'

export const Route = createFileRoute('/_home/about')({
  component: AboutPage,
  ssr: false
})
