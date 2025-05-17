/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F68B29', // Primary color
          light: '#353535',   // Light variant
        },
        secondary: {
          DEFAULT: '#FEAE01'
        }
      }
    }
  },
  plugins: [
    // ...
    require("tailwind-scrollbar")({
      nocompatible: true,
    }),
  ],
  variants: {
    extend: {
      scrollbar: ["rounded"], // Enable rounded scrollbar variants
    },
  },
}

