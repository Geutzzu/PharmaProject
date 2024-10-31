/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#4a5de4', 
        accentDarkBlue: '#1a2159', 
      },
    },
  },
  plugins: [],
}
