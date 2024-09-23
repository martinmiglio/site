import type { SatoriOptions } from 'satori'

export type FileType = 'svg' | 'png'

export type IconFile = {
  name: string
  fileType: FileType
}

export type Icon = {
  targets: IconFile[]
  options: { height: number; width: number } & SatoriOptions
  element: JSX.Element
}
