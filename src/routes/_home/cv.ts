import CVPage from '@/pages/cv'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/cv')({
  component: CVPage
})
