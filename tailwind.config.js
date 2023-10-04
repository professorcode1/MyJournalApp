/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors:{
          "theme-blue" : "#a2d5e2",
          "theme-brown": "#e1c0a0",
          "theme-green": "#a0e4b5"
        }
      },
    },
    plugins: [],
  }
  
  