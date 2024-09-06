/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        "orange" : "#ff8c18",
        "red" : "FF6868",
        "secondary" : "#555",
        "primaryBG" : "#fcfcfc",
        "bg-orange-500": "#ff8c18",

      },
      fontFamily:{
        "primary" : ['Poppins', 'system-ui']
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

