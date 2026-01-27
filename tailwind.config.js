/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./markdown/**/*.md",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};