import svgToDataUri from 'mini-svg-data-uri'
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette'
import type { PluginAPI } from 'tailwindcss/plugin'

const config = {
  prefix: '',

  content: ['./index.html', './src/**/*.{ts,tsx,jsx,js}'],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      keyframes: {
        shine: {
          '0%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
          '100%': {
            'background-size': '250% 200%',
            'background-position': 'left center'
          }
        }
      },
      animation: {
        shine: 'shine 9s infinite linear alternate'
      }
    }
  },
  plugins: [
    function ({ matchUtilities, theme }: PluginAPI) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none" stroke="${value}"><path d="M0 .5H99.5V100"/></svg>`
            )}")`
          })
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: 'color'
        }
      )
    },
    animate
  ]
} satisfies Config

export default config
