import { RESUME_DATA } from '@/data/resume-data'
import { socialBarData } from '@/data/social-bar'

const SITE_URL = RESUME_DATA.personalWebsiteUrl

const escapeMd = (s: string): string => s.replace(/([\\`*_[\]<>])/g, '\\$1')

const link = (label: string, href: string): string => `[${escapeMd(label)}](${href})`

export const renderHome = (): string => {
  const lines: string[] = []
  lines.push(`# ${RESUME_DATA.name}`)
  lines.push('')
  lines.push(RESUME_DATA.about)
  lines.push('')
  lines.push('## Pages')
  lines.push('')
  lines.push(`- ${link('About', `${SITE_URL}/about`)}`)
  lines.push(`- ${link('Experience', `${SITE_URL}/cv`)}`)
  lines.push('')
  lines.push('## Elsewhere')
  lines.push('')
  for (const { name, link: href } of socialBarData) {
    lines.push(`- ${link(name, href)}`)
  }
  lines.push('')
  return lines.join('\n')
}

export const renderAbout = (): string => {
  const lines: string[] = []
  lines.push(`# About — ${RESUME_DATA.name}`)
  lines.push('')
  lines.push(RESUME_DATA.about)
  lines.push('')
  lines.push(RESUME_DATA.summary)
  lines.push('')
  lines.push(`Location: ${link(RESUME_DATA.location, RESUME_DATA.locationLink)}`)
  lines.push('')
  return lines.join('\n')
}

export const renderCv = (): string => {
  const lines: string[] = []
  lines.push(`# ${RESUME_DATA.name} — Experience`)
  lines.push('')
  lines.push(RESUME_DATA.summary)
  lines.push('')

  lines.push('## Work')
  lines.push('')
  for (const w of RESUME_DATA.work) {
    const badges = w.badges.length ? ` _(${w.badges.join(', ')})_` : ''
    lines.push(`### ${escapeMd(w.title)} — ${link(w.company, w.link)}${badges}`)
    lines.push('')
    lines.push(`${w.start} – ${w.end}`)
    lines.push('')
    lines.push(w.description)
    lines.push('')
  }

  lines.push('## Education')
  lines.push('')
  for (const e of RESUME_DATA.education) {
    lines.push(`### ${escapeMd(e.school)}`)
    lines.push('')
    lines.push(`${e.degree} (${e.start} – ${e.end})`)
    lines.push('')
  }

  lines.push('## Skills')
  lines.push('')
  lines.push(RESUME_DATA.skills.map((s) => `\`${s}\``).join(', '))
  lines.push('')

  lines.push('## Projects')
  lines.push('')
  for (const p of RESUME_DATA.projects) {
    lines.push(`### ${link(p.title, p.link.href)}`)
    lines.push('')
    lines.push(`_${p.techStack.join(' · ')}_`)
    lines.push('')
    lines.push(p.description)
    lines.push('')
  }

  return lines.join('\n')
}

export const markdownRoutes: Record<string, () => string> = {
  '/': renderHome,
  '/about': renderAbout,
  '/cv': renderCv
}

export const renderLlmsTxt = (): string => {
  const lines: string[] = []
  lines.push(`# ${RESUME_DATA.name}`)
  lines.push('')
  lines.push(`> ${RESUME_DATA.about}`)
  lines.push('')
  lines.push('## Pages')
  lines.push('')
  lines.push(`- [Home](${SITE_URL}/index.md): Landing page`)
  lines.push(`- [About](${SITE_URL}/about.md): Bio and summary`)
  lines.push(`- [Experience](${SITE_URL}/cv.md): Work history, skills, projects`)
  lines.push('')
  return lines.join('\n')
}

export const renderLlmsFullTxt = (): string => {
  return [renderHome(), renderAbout(), renderCv()].join('\n\n---\n\n')
}
