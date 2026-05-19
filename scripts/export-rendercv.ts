#!/usr/bin/env bun
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { RESUME_DATA } from '../src/data/resume-data'
import { socialBarData } from '../src/data/social-bar'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '..', 'resume', 'cv.yaml')

const MONTHS: Record<string, string> = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12'
}

function normalizeDate(s: string): string {
  const trimmed = s.trim()
  if (!trimmed || trimmed.toLowerCase() === 'present') return 'present'
  // "April 2025" -> "2025-04"
  const m = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (m) {
    const month = MONTHS[m[1].toLowerCase()]
    if (month) return `${m[2]}-${month}`
  }
  // "2018" -> "2018"
  if (/^\d{4}$/.test(trimmed)) return trimmed
  return trimmed
}

function splitHighlights(description: string): string[] {
  return description
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim().replace(/\.$/, ''))
    .filter(Boolean)
}

function findSocial(name: string): string | undefined {
  const hit = socialBarData.find((s) => s.name.toLowerCase() === name.toLowerCase())
  return hit?.link
}

function usernameFromUrl(url: string | undefined): string | undefined {
  if (!url) return undefined
  const u = url.replace(/\/$/, '')
  return u.slice(u.lastIndexOf('/') + 1)
}

const email = findSocial('Email')?.replace(/^mailto:/, '')
const github = usernameFromUrl(findSocial('Github'))
const linkedin = usernameFromUrl(findSocial('LinkedIn'))

const cv = {
  cv: {
    name: RESUME_DATA.name,
    location: RESUME_DATA.location,
    email,
    website: RESUME_DATA.personalWebsiteUrl,
    social_networks: [
      github && { network: 'GitHub', username: github },
      linkedin && { network: 'LinkedIn', username: linkedin }
    ].filter(Boolean),
    sections: {
      summary: [RESUME_DATA.summary],
      experience: RESUME_DATA.work.map((w) => ({
        company: w.company,
        position: w.badges.length > 0 ? `${w.title} (${w.badges.join(', ')})` : w.title,
        start_date: normalizeDate(w.start),
        end_date: normalizeDate(w.end),
        highlights: splitHighlights(w.description)
      })),
      education: RESUME_DATA.education.map((e) => ({
        institution: e.school,
        area: e.degree,
        start_date: normalizeDate(e.start),
        end_date: normalizeDate(e.end)
      })),
      projects: RESUME_DATA.projects.map((p) => {
        const META_TAGS = new Set(['Side Project', 'Open Source', 'Contract Work'])
        const tech = p.techStack.filter((t) => !META_TAGS.has(t))
        return {
          name: `[${p.title}](${p.link.href})`,
          summary: `${p.description}. *${tech.join(', ')}*`,
          highlights: []
        }
      }),
      skills: [
        { label: 'Languages', details: 'TypeScript, JavaScript, Python, SQL' },
        {
          label: 'Stack',
          details:
            'React, Next.js, Node.js, Vue.js, Django, Hono, AWS, GCP, Docker, PostgreSQL, REST, GraphQL'
        },
        {
          label: 'AI Tooling',
          details: 'Claude Code, MCP, LLM application development'
        }
      ]
    }
  },
  design: {
    theme: 'engineeringresumes',
    page: {
      size: 'us-letter',
      top_margin: '0.4in',
      bottom_margin: '0.4in',
      left_margin: '0.55in',
      right_margin: '0.55in',
      show_top_note: false
    },
    section_titles: {
      space_above: '0.25cm',
      space_below: '0.1cm'
    },
    sections: {
      space_between_regular_entries: '0.1cm',
      space_between_text_based_entries: '0.05cm'
    }
  }
}

function toYaml(value: unknown, indent = 0): string {
  const pad = '  '.repeat(indent)
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string') {
    if (/^[\d\-+]/.test(value) && /^[0-9]{4}(-[0-9]{2})?$/.test(value)) return value
    if (value === 'present') return 'present'
    return JSON.stringify(value)
  }
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    return value
      .map((item) => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          const block = toYaml(item, indent + 1)
          const stripLen = (indent + 1) * 2
          const lines = block.split('\n')
          const first = lines[0].slice(stripLen)
          const rest = lines.slice(1).join('\n')
          return `${pad}- ${first}${rest ? `\n${rest}` : ''}`
        }
        return `${pad}- ${toYaml(item, indent + 1)}`
      })
      .join('\n')
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined
    )
    if (entries.length === 0) return '{}'
    return entries
      .map(([k, v]) => {
        if (v && typeof v === 'object') {
          if (Array.isArray(v) && v.length === 0) return `${pad}${k}: []`
          if (!Array.isArray(v) && Object.keys(v).length === 0) return `${pad}${k}: {}`
          return `${pad}${k}:\n${toYaml(v, indent + 1)}`
        }
        return `${pad}${k}: ${toYaml(v, indent + 1)}`
      })
      .join('\n')
  }
  return JSON.stringify(value)
}

const yaml = `# Generated by scripts/export-rendercv.ts — edit the source data, not this file.\n${toYaml(cv)}\n`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, yaml)
console.log(`wrote ${OUT}`)
