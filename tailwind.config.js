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
      colors: {
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
