import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, resolve } from 'node:path'
import type { Plugin } from 'vite'
import { exportResumeYaml } from './export'

const RENDERED_PDF = 'Martin_Miglio_CV.pdf'
const PUBLIC_PDF = 'resume.pdf'

export function resumePdfPlugin(): Plugin {
  let root = process.cwd()
  let ran = false

  function render(strict: boolean) {
    const resumeDir = resolve(root, 'resume')
    const yamlPath = resolve(resumeDir, 'cv.yaml')
    const lockPath = resolve(resumeDir, 'uv.lock')
    const renderedPdf = resolve(resumeDir, 'output', RENDERED_PDF)
    const publicPdf = resolve(root, 'public', PUBLIC_PDF)
    const cacheKey = resolve(resumeDir, '.pdf-cache-key')

    exportResumeYaml(yamlPath)
    const hash = createHash('sha256')
      .update(readFileSync(yamlPath))
      .update(readFileSync(lockPath))
      .digest('hex')

    const cached = existsSync(cacheKey) ? readFileSync(cacheKey, 'utf8').trim() : ''
    if (cached === hash && existsSync(publicPdf)) {
      console.log(`[resume-pdf] cache hit — public/${PUBLIC_PDF} up to date`)
      return
    }

    console.log('[resume-pdf] rendering PDF via rendercv…')
    const result = spawnSync(
      'uv',
      ['run', '--project', resumeDir, 'rendercv', 'render', 'cv.yaml', '-o', 'output'],
      { cwd: resumeDir, stdio: 'inherit' }
    )

    if (result.status !== 0) {
      const msg = `[resume-pdf] rendercv failed (exit ${result.status ?? 'n/a'}). Is uv installed and 'uv sync --project resume' run?`
      if (strict) throw new Error(msg)
      console.warn(msg)
      return
    }

    mkdirSync(dirname(publicPdf), { recursive: true })
    copyFileSync(renderedPdf, publicPdf)
    writeFileSync(cacheKey, hash)
    console.log(`[resume-pdf] wrote public/${PUBLIC_PDF}`)
  }

  function runOnce(strict: boolean) {
    if (ran) return
    ran = true
    render(strict)
  }

  return {
    name: 'resume-pdf',
    configResolved(config) {
      root = config.root
    },
    buildStart() {
      runOnce(true)
    },
    configureServer() {
      setImmediate(() => {
        try {
          runOnce(false)
        } catch (err) {
          console.warn('[resume-pdf]', err)
        }
      })
    }
  }
}
