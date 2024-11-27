/** @type {import('tailwindcss').Config}*/
const defaultTheme = require("tailwindcss/defaultTheme");
const config = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        svelte: '#ff3e00',
      },
      fontFamily: {
        mono: ['Operator Mono', 'JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
};

module.exports = config;
