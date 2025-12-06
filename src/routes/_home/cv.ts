import { createFileRoute } from '@tanstack/react-router'
import CVPage from '@/pages/cv'

export const Route = createFileRoute('/_home/cv')({
  component: CVPage
})
