/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
    extend: {
      colors: {
        c1: '#113567',
        c2: "#85AADD",
        c3: '#516980',
        c4: '#EBF1FDEE'
      },
      fontFamily: {
                   // font, callback, callbacks... 
        'sample': ['Babylonica', 'sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

