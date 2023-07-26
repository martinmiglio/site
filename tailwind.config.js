import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";
import svgToDataUri from "mini-svg-data-uri";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      theme: {
        50: "#FFFCFA",
        100: "#FDF3ED",
        200: "#F7E1CF",
        300: "#EFCBA4",
        400: "#E4B677",
        500: "#D29C3A",
        600: "#CC8829",
        700: "#BA7021",
        800: "#9F5519",
        900: "#71340F",
        950: "#451B07",
      },
    },
    extend: {
      animation: {
        shine: "shine 9s",
      },
      keyframes: {
        shine: {
          "0%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
          "100%": {
            "background-size": "250% 200%",
            "background-position": "left center",
          },
        },
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none" stroke="${value}"><path d="M0 .5H99.5V100"/></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        },
      );
    },
    require("tailwindcss-animate"),
  ],
};

export default config;
