/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        falah: {
          indigo: '#1a1a2e',
          gold: '#d4af37',
          teal: '#2a9d8f',
          parchment: '#fdf6e3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        arabic: ['Amiri', 'serif'],
      }
    },
  },
  plugins: [],
}
