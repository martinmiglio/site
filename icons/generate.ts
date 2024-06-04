import favicon from './favicon'
import opengraph from './opengraph'
import type { Icon } from './types'
import { createCanvas, Image } from '@napi-rs/canvas'
import fs from 'fs'
import satori from 'satori'

const render = async (icon: Icon): Promise<Buffer> => {
  const svg = await satori(icon.element, icon.options)

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
  try {
    const path = `dist/${icon.name}`
    fs.writeFileSync(path, await render(icon))
    console.log(`Generated ${path}`)
  } catch (e) {
    console.error(`Failed to generate ${icon.name}: ${e}`)
  }
}
