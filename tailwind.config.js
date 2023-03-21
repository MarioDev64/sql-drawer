/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        ...defaultTheme.screens
      },
      colors: {
        'koombea': '#41d8a2',
        ...defaultTheme.colors
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
