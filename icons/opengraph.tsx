import fonts from './fonts'
import { Icon } from './types'
import React from 'react'

export default {
  name: 'opengraph.png',
  element: (
    <div
      style={{ fontFamily: '"Golos Text Regular"' }}
      tw="w-full h-full flex flex-col pl-12 bg-[#E8E8E8]"
    >
      <div style={{ fontFamily: '"Golos Text Bold"' }} tw="flex flex-col">
        <h1 tw="text-[#00A824] py-8 text-7xl">Martin Miglio</h1>
        <h2 tw="text-[#32352C] pt-8 text-8xl">full-stack web dev</h2>
      </div>
      <h3 tw="text-[#32352C] text-6xl">React • Next.js • AWS</h3>
      <h4 tw="text-[#00A824] opacity-30 p-8 text-5xl mt-auto ml-auto">martinmiglio.dev</h4>
    </div>
  ),
  options: {
    width: 1200,
    height: 630,
    fonts
  }
} satisfies Icon
