import favicon from './favicon'
import opengraph from './opengraph'
import type { FileType, Icon } from './types'
import { createCanvas, Image } from '@napi-rs/canvas'
import fs from 'fs'
import satori from 'satori'

const render = async (icon: Icon, fileType: FileType): Promise<Buffer> => {
  const svg = await satori(icon.element, icon.options)

  if (fileType === 'svg') {
    return Buffer.from(svg)
  }

  const canvas = createCanvas(icon.options.width, icon.options.height)

  const img = new Image()
  img.src = Buffer.from(svg)
  canvas.getContext('2d').drawImage(img, 0, 0)

  return canvas.encode('png')
}

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

for (const icon of [favicon, opengraph]) {
  for (const target of icon.targets) {
    try {
      const path = `dist/${target.name}`
      fs.writeFileSync(path, new Uint8Array(await render(icon, target.fileType)))
      console.log(`Generated ${path}`)
    } catch (e) {
      console.error(`Failed to generate ${target.name}: ${e}`)
    }
  }
}
