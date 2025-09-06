import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RESUME_DATA } from '@/data/resume-data'
import { faGlobe, faExternalLink } from '@fortawesome/free-solid-svg-icons'
// import { renderHTML2PDF } from '@/lib/pdf'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@tanstack/react-router'

export default function CVPage() {
  const pdfElementId = 'to-pdf'

  // TODO: Add PDF export functionality
  // const exportToPdf = async () => {
  //   const today = new Date()
  //   const element = document.getElementById('page')

  //   if (!element) {
  //     console.error('Element not found')
  //     return
  //   }

  //   const dateString = today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear()

  //   renderHTML2PDF(element, `${RESUME_DATA.name} - ${dateString} Resume.pdf`, {
  //     width: 1050,
  //     scale: 0.53,
  //     xMargin: 15,
  //     yMargin: 10,
  //     documentModifier: (clonedDoc) => {
  //       const badges = clonedDoc.querySelectorAll('#shadcn-badge')
  //       badges?.forEach((badge) => {
  //         badge.classList.add('pb-3')
  //       })

  //       // Make card backgrounds transparent for PDF export
  //       const cards = clonedDoc.querySelectorAll('.rounded-lg.border')
  //       cards?.forEach((card) => {
  //         card.classList.remove('bg-theme-50')
  //         card.classList.add('bg-transparent')
  //       })
  //     },
  //     ignoreElements: (element) => {
  //       return element.id === 'print-ignore'
  //     }
  //   })
  // }

  return (
    <div className="flex h-full grow" id="page">
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-16 sm:px-8">
        <section className="space-y-8 print:space-y-6" id={pdfElementId}>
          {/* Page Title */}
          <h1 className="text-theme-950 mb-8 text-4xl font-extrabold sm:text-5xl md:text-6xl">
            <span
              className="animate-shine from-theme-500 via-theme-300 to-theme-500 fill-mode-forwards bg-linear-to-r from-35% to-65% bg-clip-text text-transparent"
              id="print-ignore"
            >
              EXPERIENCE
            </span>
          </h1>

          {/* Header Info */}
          <div className="mb-8">
            <h2 className="text-theme-800 mb-2 text-2xl font-bold">{RESUME_DATA.name}</h2>
            <p className="text-theme-700 mb-4 text-lg">{RESUME_DATA.about}</p>
            {/* martinmiglio.dev */}
            <a
              className="pdf-only hover:text-theme-500 inline-flex gap-x-1.5 align-baseline leading-none transition-colors duration-200"
              href={RESUME_DATA.personalWebsiteUrl}
              target="_blank"
              data-umami-event="CV Personal Website Link Clicked"
            >
              <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
              martinmiglio.dev
            </a>
            <p className="text-theme-600 items-center" id="print-ignore">
              <a
                className="hover:text-theme-500 inline-flex gap-x-1.5 align-baseline leading-none transition-colors duration-200"
                href={RESUME_DATA.locationLink}
                target="_blank"
                data-umami-event="CV Location Link Clicked"
              >
                <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />
                {RESUME_DATA.location}
              </a>
            </p>
          </div>
          <section className="flex min-h-0 flex-col gap-y-4">
            <h2 className="text-theme-800 text-2xl font-bold">About</h2>
            <p className="text-theme-700 text-lg leading-relaxed">{RESUME_DATA.summary}</p>
          </section>
          <section className="flex min-h-0 flex-col gap-y-4">
            <h2 className="text-theme-800 text-2xl font-bold">Work Experience</h2>
            {RESUME_DATA.work.map((work) => (
              <Card
                key={work.company}
                className="border-theme-200 bg-theme-50 mb-4 rounded-lg border p-4 sm:p-6"
              >
                <CardHeader className="px-0 pb-4">
                  {/* Company and Date Row */}
                  <div className="mb-3 flex flex-col gap-x-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-theme-800 mb-1 text-xl font-bold">
                        <a
                          className="hover:text-theme-500 transition-colors duration-200"
                          href={work.link}
                          data-umami-event={`CV Company - ${work.company} Link Clicked`}
                        >
                          {work.company}
                        </a>
                      </h3>
                      <h4 className="text-theme-700 text-lg font-semibold">{work.title}</h4>
                    </div>
                    <div className="mt-2 text-left sm:mt-0 sm:text-right">
                      <div className="text-theme-600 text-sm font-medium tabular-nums">
                        {work.start} - {work.end}
                      </div>
                    </div>
                  </div>

                  {/* Badges Row */}
                  <div className="border-theme-300 flex flex-wrap gap-2 border-b pb-4">
                    {work.badges.map((badge) => (
                      <Badge
                        key={badge}
                        variant="secondary"
                        className="px-2 py-1 text-xs font-medium"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="text-theme-600 px-0 pt-2 leading-relaxed">
                  {work.description}
                </CardContent>
              </Card>
            ))}
          </section>
          <section className="flex min-h-0 flex-col gap-y-4">
            <h2 className="text-theme-800 text-2xl font-bold">Education</h2>
            {RESUME_DATA.education.map((education) => (
              <Card
                key={education.school}
                className="border-theme-200 bg-theme-50 mb-4 rounded-lg border p-4 sm:p-6"
              >
                <CardHeader className="px-0 pb-4">
                  <div className="border-theme-300 flex flex-col gap-x-2 border-b pb-4 text-base sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-theme-800 leading-none font-bold">{education.school}</h3>
                    <div className="text-theme-600 mt-1 text-sm font-medium tabular-nums sm:mt-0">
                      {education.start} - {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-theme-600 px-0 pt-2 text-lg font-medium">
                  {education.degree}
                </CardContent>
              </Card>
            ))}
          </section>
          <section className="flex min-h-0 flex-col gap-y-4">
            <h2 className="text-theme-800 text-2xl font-bold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.skills.map((skill) => (
                <Badge
                  key={skill}
                  className="bg-theme-100 text-theme-700 border-theme-200 border px-3 py-1 text-sm font-medium"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
          <section className="print-force-new-page flex min-h-0 scroll-mb-16 flex-col gap-y-4">
            <h2 className="text-theme-800 text-2xl font-bold">Projects</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
              {RESUME_DATA.projects.map((project) => (
                <Card
                  key={project.title}
                  className="border-theme-200 bg-theme-50 rounded-lg border p-4 sm:p-6"
                >
                  <CardHeader className="px-0 pb-4">
                    <h3 className="text-theme-800 mb-2 text-lg font-bold">
                      <a
                        className="hover:text-theme-500 transition-colors duration-200"
                        href={project.link.href}
                        target="_blank"
                        data-umami-event={`CV Project - ${project.title} Link Clicked`}
                      >
                        {project.title}
                      </a>
                    </h3>

                    {/* Tech Stack Badges */}
                    <div className="border-theme-300 flex flex-wrap gap-2 border-b pb-4">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-2 py-1 text-xs font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="text-theme-600 px-0 pt-2 leading-relaxed">
                    {project.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Back to Home Link */}
          <div className="my-12" id="print-ignore">
            <Button
              asChild
              variant="link"
              className="text-theme-700 hover:text-theme-500 h-auto transform p-0 text-lg font-bold hover:scale-105"
            >
              <Link to="/" data-umami-event="CV Back to Home Clicked">
                ← Back to Home
              </Link>
            </Button>
          </div>

          {/* PDF Export Button
          <div className="mt-8" id="print-ignore">
            <Button
              onClick={exportToPdf}
              data-umami-event="CV Exported to PDF"
            >
              Export to PDF
            </Button>
          </div> */}
        </section>
      </div>
    </div>
  )
}
