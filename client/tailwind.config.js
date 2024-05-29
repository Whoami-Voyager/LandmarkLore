/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        FallingSky: ['FallingSky', 'sans-serif']
      },
      colors: {
        brightMarker: '#ff2e39',
        dullMarker: '#cb5241',
        grass: '#74915b',
        bush: '#4c5e34',
        earth: '#b26656',
        darkEarth: '#7a4e4d'
      }
    },
  },
  plugins: [],
}
