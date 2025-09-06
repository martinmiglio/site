import fonts from './fonts'
import type { Icon } from './types'

const defaultOptions = {
  width: 64,
  height: 64,
  fonts
}

export default {
  targets: [
    {
      name: 'favicon.ico',
      fileType: 'png',
      options: defaultOptions
    },
    {
      name: 'icon.svg',
      fileType: 'svg',
      options: defaultOptions
    }
  ],
  element: (
    <div
      style={{ fontFamily: '"Golos Text Bold"' }}
      tw="text-[#00A824] bg-[#E8E8E8] text-5xl w-full h-full flex items-center justify-center rounded-2xl"
    >
      <div tw="flex">
        M<div tw="text-xl flex mb-auto">2</div>
      </div>
    </div>
  )
} satisfies Icon
