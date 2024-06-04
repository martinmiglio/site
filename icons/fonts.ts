import { readFile } from 'fs/promises'
import type {SatoriOptions} from 'satori'

const fontDataBold = await readFile('./icons/assets/GolosText-Bold.ttf')
const fontDataRegular = await readFile('./icons/assets/GolosText-Regular.ttf')

export default [
  {
    name: 'Golos Text Regular',
    data: fontDataRegular,
    style: 'normal'
  },
  {
    name: 'Golos Text Bold',
    data: fontDataBold,
    style: 'normal'
  }
] satisfies SatoriOptions['fonts']
