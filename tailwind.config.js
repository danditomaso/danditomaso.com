const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./mdx-components.tsx", "content/**/*.mdx"],

  theme: {
    extend: {
      letterSpacing: {
        widerest: "2px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-calsans)"],
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(150px, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(150px, 1fr))",
      },
      animation: {
        "fade-in": "fade-in 1.25s ease-in-out forwards",
        "fade-out": "fade-out 1.25s ease-in-out forwards",
        title: "title 1s ease-out forwards",
        "fade-left": "fade-left 1.25s ease-in-out forwards",
        "fade-right": "fade-right 1.25s ease-in-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0%",
          },
          "75%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "100%",
          },
          "75%": {
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        "fade-left": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        "fade-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        title: {
          "0%": {
            "line-height": "0%",
            "letter-spacing": ".75em",
            opacity: "0",
          },
          "25%": {
            "line-height": "0%",
            opacity: "0%",
          },
          "90%": {
            opacity: "100%",
          },

          "100%": {
            "line-height": "100%",
            opacity: "100%",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-debug-screens"),
    require("tailwind-fluid-typography"),
  ],
};
