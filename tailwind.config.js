/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm)', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#FFFFFF',
        blush: '#F0D5D9',
        rose: '#C4788A',
        burgundy: '#7D2E46',
        navy: '#1C2B45',
        chocolate: '#1C2B45',
        muted: '#5A6478',
      },
    },
  },
  plugins: [],
}
