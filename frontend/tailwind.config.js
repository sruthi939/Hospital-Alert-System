/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hospital: {
          dark: '#0A432F',
          light: '#0D8F4F',
          bg: '#f8f9fa',
          panel: '#f0f4f8',
          border: '#eaedf0'
        }
      }
    },
  },
  plugins: [],
}
