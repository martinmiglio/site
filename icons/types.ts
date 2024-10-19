import type { SatoriOptions } from 'satori'

export type FileType = 'svg' | 'png' | 'webp'

export type IconFile = {
  name: string
  fileType: FileType
  options: { height: number; width: number } & SatoriOptions
}

export type Icon = {
  targets: IconFile[]
  element: JSX.Element
}
