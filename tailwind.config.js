const { mauve, violet, red, blackA } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: "280px",

      heroImage: "300px",

      carousel: "360px",

      xs: "420px",

      ssm: "550px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1120px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      fontFamily: {
        poppins: ["Poppins, sans-serif"],
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      colors: {
        ...mauve,
        ...violet,
        ...red,
        ...blackA,
        pink: {
          500: "#FB3C61",
        },
        gray: {
          100: "#F7F7FF",
          250: "#F4F4F4",
          260: "#F4F4F4",
          300: "#B6B6B6",
          400: "#B7B7B7",
          450: "#B9B9B9",
          500: "#7D7D7D",
          700: "#595A5F",
          900: "#222222",
        },
        yellow: {
          500: "#FCD632",
        },
        orange: {
          500: "#EC6C53",
        },
        purple: {
          500: "#5452A2",
          400: "#7E3EE3",
          300: "#C563B8",
        },
        blue: {
          400: "#659FE8",
          500: "#3B87F9",
          600: "#11344D",
          900: "#032339",
        },
        green: {
          500: "#52BE8D",
        },
        slate: {
          900: "#0B2330",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/typography")],
};
