/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#1a1a1a',
        'light-gray': '#2d2d2d',
        'primary': '#4a90e2',
      },
    },
  },
  plugins: [],
}