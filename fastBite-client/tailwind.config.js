/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange" : "#ff8c18",
        "red" : "FF6868",
        "secondary" : "#555",
        "primaryBG" : "#fcfcfc",

      },
      fontFamily:{
        "primary" : ['Poppins', 'system-ui']
      }
    },
  },
  plugins: [],
}

