const animate = require('tailwindcss-animate')
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette'
import svgToDataUri from 'mini-svg-data-uri'
import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}'
  ],

  theme: {
    fontFamily: {
      sans: ['"Golos Text"'],
      mono: ['"Source Code Pro"']
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        theme: {
          50: '#E8E8E8',
          100: '#D8DAD3',
          200: '#B4CD9D',
          300: '#7BCE5F',
          400: '#25C922',
          500: '#00A824',
          600: '#188316',
          700: '#31651F',
          800: '#3A4D28',
          900: '#32352C',
          950: '#2E2E2E'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        shine: {
          '0%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
          '100%': {
            'background-size': '250% 200%',
            'background-position': 'left center'
          }
        },
        shake: {
          '0%': {
            'margin-left': '0rem',
            'margin-right': '0rem'
          },
          '25%': {
            'margin-left': '0.2rem',
            'margin-right': '-0.2rem'
          },
          '75%': {
            'margin-left': '-0.2rem',
            'margin-right': '0.2rem'
          },
          '100%': {
            'margin-left': '0rem',
            'margin-right': '0rem'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shine: 'shine 9s',
        shake: 'shake 0.4s ease-in-out 0s 2'
      }
    }
  },
  plugins: [
    function ({ matchUtilities, theme }) {
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
