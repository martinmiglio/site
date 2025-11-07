import favicon from './favicon'
import opengraph from './opengraph'
import type { IconFile } from './types'
import { createCanvas, loadImage } from '@napi-rs/canvas'
import fs, { promises } from 'fs'
import satori from 'satori'

const render = async (element: React.ReactElement, icon: IconFile): Promise<Buffer> => {
  const svg = await satori(element, icon.options)

  if (icon.fileType === 'svg') {
    return Buffer.from(svg)
  }

  const canvas = createCanvas(icon.options.width, icon.options.height)
  const ctx = canvas.getContext('2d')

  const img = await loadImage(Buffer.from(svg))
  ctx.drawImage(img, 0, 0)

  return canvas.encode('png')
}

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

for (const icon of [favicon, opengraph]) {
  for (const target of icon.targets) {
    try {
      const path = `dist/${target.name}`
      const imageData = new Uint8Array(await render(icon.element, target))
      await promises.writeFile(path, imageData)
      console.log(`Generated ${path}`)
    } catch (e) {
      console.error(`Failed to generate ${target.name}: ${e}`)
    }
  }
}
