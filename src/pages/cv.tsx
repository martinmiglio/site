import { faExternalLink, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { StickyBackButton } from '@/components/ui/sticky-back-button'
import { StickyDownloadButton } from '@/components/ui/sticky-download-button'
import { RESUME_DATA } from '@/data/resume-data'
import {
  groupBadges,
  groupConsecutiveRoles,
  type WorkEntry,
  type WorkGroup
} from '@/data/resume-groups'

const MONTH_YEAR_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
})

function formatMonthYear(s: string): string {
  if (s === 'present') return 'Present'
  if (/^\d{4}$/.test(s)) return s
  return MONTH_YEAR_FORMAT.format(new Date(s))
}

const WORK_GROUPS = groupConsecutiveRoles(RESUME_DATA.work)

/**
 * Two groups can share a company (a stint, a gap, then another stint), so the
 * company alone is not a unique key.
 */
function workGroupKey(group: WorkGroup, index: number): string {
  return `${group.company}-${index}`
}

function DateRange({ start, end }: { start: string; end: string }) {
  return (
    <div className="font-medium text-sm text-theme-600 tabular-nums">
      {formatMonthYear(start)} - {formatMonthYear(end)}
    </div>
  )
}

function Highlights({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null

  return (
    <ul className="mt-1 list-disc space-y-1 pl-5">
      {items.map((highlight) => (
        <li key={highlight}>{highlight}</li>
      ))}
    </ul>
  )
}

function CompanyHeading({ company, link }: { company: string; link: string }) {
  return (
    <a
      className="transition-colors duration-200 hover:text-theme-500"
      href={link}
      data-umami-event={`CV Company - ${company} Link Clicked`}
    >
      {company}
    </a>
  )
}

/** One role, one card — the default presentation. */
function RoleCard({ work }: { work: WorkEntry }) {
  return (
    <Card className="mb-4 rounded-lg border border-theme-200 bg-theme-50 p-4 sm:p-6">
      <CardHeader className="px-0 pb-4">
        {/* Company and Date Row */}
        <div className="mb-3 flex flex-col gap-x-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h3 className="mb-1 font-bold text-theme-800 text-xl">
              <CompanyHeading company={work.company} link={work.link} />
            </h3>
            <h4 className="font-semibold text-lg text-theme-700">{work.title}</h4>
          </div>
          <div className="mt-2 text-left sm:mt-0 sm:text-right">
            <DateRange start={work.start} end={work.end} />
          </div>
        </div>

        {/* Badges Row */}
        <div
          className={`flex flex-wrap gap-2 border-theme-300 pb-4 ${
            work.highlights.length > 0 ? 'border-b' : ''
          }`}
        >
          {work.badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="px-2 py-1 font-medium text-xs">
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-0 pt-2 text-theme-600 leading-relaxed">
        <Highlights items={work.highlights} />
      </CardContent>
    </Card>
  )
}

/**
 * Consecutive roles at one company, simplified to a single card with the
 * company once and one title-and-dates row per role, so a promotion reads as a
 * progression instead of two near-identical cards.
 */
function CompanyGroupCard({ group }: { group: WorkGroup }) {
  const badges = groupBadges(group)

  return (
    <Card className="mb-4 rounded-lg border border-theme-200 bg-theme-50 p-4 sm:p-6">
      <CardHeader className="px-0 pb-4">
        <h3 className="font-bold text-theme-800 text-xl">
          <CompanyHeading company={group.company} link={group.link} />
        </h3>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2 border-theme-300 border-b pb-4">
          {badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="px-2 py-1 font-medium text-xs">
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-0 pt-4 text-theme-600 leading-relaxed">
        <ol className="space-y-4">
          {group.roles.map((role) => (
            <li key={`${role.title}-${role.start}`}>
              <div className="flex flex-col gap-x-4 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-semibold text-theme-700">{role.title}</span>
                <span className="sm:text-right">
                  <DateRange start={role.start} end={role.end} />
                </span>
              </div>
              <Highlights items={role.highlights} />
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

export default function CVPage() {
  return (
    <div id="page">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-8">
        <StickyBackButton />
        <section className="space-y-8 print:space-y-6" id="to-pdf">
          {/* Page Title */}
          <h1 className="mb-8 font-extrabold text-4xl text-theme-950 sm:text-5xl md:text-6xl">
            <span
              className="animate-shine bg-linear-to-r from-35% from-theme-500 via-theme-300 to-65% to-theme-500 bg-clip-text fill-mode-forwards text-transparent"
              id="print-ignore"
            >
              EXPERIENCE
            </span>
          </h1>

          {/* Header Info */}
          <div className="mb-8">
            <h2 className="mb-2 font-bold text-2xl text-theme-800">{RESUME_DATA.name}</h2>
            <p className="mb-4 text-lg text-theme-700">{RESUME_DATA.about}</p>
            {/* martinmiglio.dev */}
            <a
              className="pdf-only inline-flex gap-x-1.5 align-baseline leading-none transition-colors duration-200 hover:text-theme-500"
              href={RESUME_DATA.personalWebsiteUrl}
              target="_blank"
              data-umami-event="CV Personal Website Link Clicked"
            >
              <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
              martinmiglio.dev
            </a>
            <p className="items-center text-theme-600" id="print-ignore">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none transition-colors duration-200 hover:text-theme-500"
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
            <h2 className="font-bold text-2xl text-theme-800">About</h2>
            <p className="text-lg text-theme-700 leading-relaxed">{RESUME_DATA.summary}</p>
          </section>
          <section className="flex min-h-0 flex-col gap-y-4">
            <h2 className="font-bold text-2xl text-theme-800">Work Experience</h2>
            {WORK_GROUPS.map((group, index) =>
              group.roles.length > 1 ? (
                <CompanyGroupCard key={workGroupKey(group, index)} group={group} />
              ) : (
                <RoleCard key={workGroupKey(group, index)} work={group.roles[0]} />
              )
            )}
          </section>
          <section className="flex min-h-0 flex-col gap-y-4">
            <h2 className="font-bold text-2xl text-theme-800">Education</h2>
            {RESUME_DATA.education.map((education) => (
              <Card
                key={education.school}
                className="mb-4 rounded-lg border border-theme-200 bg-theme-50 p-4 sm:p-6"
              >
                <CardHeader className="px-0 pb-4">
                  <div className="flex flex-col gap-x-2 border-theme-300 border-b pb-4 text-base sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-bold text-theme-800 leading-none">{education.school}</h3>
                    <div className="mt-1 font-medium text-sm text-theme-600 tabular-nums sm:mt-0">
                      {formatMonthYear(education.start)} - {formatMonthYear(education.end)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pt-2 font-medium text-lg text-theme-600">
                  {education.degree}
                </CardContent>
              </Card>
            ))}
          </section>
          <section className="flex min-h-0 flex-col gap-y-4">
            <h2 className="font-bold text-2xl text-theme-800">Skills</h2>
            <dl className="space-y-2">
              {RESUME_DATA.skills.map((skill) => (
                <div key={skill.label} className="flex flex-col gap-x-3 sm:flex-row">
                  <dt className="font-semibold text-theme-800 sm:min-w-28">{skill.label}</dt>
                  <dd className="text-theme-600">{skill.details}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="print-force-new-page flex min-h-0 scroll-mb-16 flex-col gap-y-4">
            <h2 className="font-bold text-2xl text-theme-800">Projects</h2>
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

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 border-theme-300 border-b pb-4">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-2 py-1 font-medium text-xs"
                        >
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
          </section>
        </section>
        <StickyDownloadButton href="/resume.pdf" filename="Martin_Miglio_Resume.pdf" />
      </div>
    </div>
  )
}
