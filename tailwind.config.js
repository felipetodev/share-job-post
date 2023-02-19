/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fade-top': 'linear-gradient(0deg,#0000 10%,#000)',
        'fade-bottom': 'linear-gradient(180deg,#0000 15%,#000)'
      }
    },
  },
  plugins: [],
}
