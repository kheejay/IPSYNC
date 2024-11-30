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
        c2: "#4682B4",
        c3: '#85AADD',
        c4: '#EBF1FD',
        c5: '#DFEAFF',
        c6: '#325F9D',
        font: '#3A3A3A'
      },
      screens: {
        xs: '400px'
      },
      boxShadow: {
        'glass': '7px 16px 15px -8px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}

