import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RESUME_DATA } from '@/data/resume-data'

export default function CVProjects() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
      {RESUME_DATA.projects.map((project) => (
        <Card
          key={project.title}
          className="rounded-lg border border-theme-200 bg-theme-50 p-4 sm:p-6"
        >
          <CardHeader className="px-0 pb-4">
            <h3 className="mb-2 font-bold text-lg text-theme-800">
              <a
                className="transition-colors duration-200 hover:text-theme-500"
                href={project.link.href}
                target="_blank"
                data-umami-event={`CV Project - ${project.title} Link Clicked`}
              >
                {project.title}
              </a>
            </h3>
            <div className="flex flex-wrap gap-2 border-theme-300 border-b pb-4">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-2 py-1 font-medium text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="px-0 pt-2 text-theme-600 leading-relaxed">
            {project.description}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
