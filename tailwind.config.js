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
      white: "#f8f6fe",
      black: "#0d0623",
      theme: {
        50: "#EBE5FB",
        100: "#DBCFF7",
        200: "#B79FEF",
        300: "#936FE7",
        400: "#6F3FDF",
        500: "#5221C4",
        600: "#421A9D",
        700: "#311476",
        800: "#210D4F",
        900: "#100727",
        950: "#070311",
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
