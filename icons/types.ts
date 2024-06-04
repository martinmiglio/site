import type { SatoriOptions } from 'satori'

export type Icon = {
  name: string
  options: { height: number; width: number } & SatoriOptions
  element: JSX.Element
}
