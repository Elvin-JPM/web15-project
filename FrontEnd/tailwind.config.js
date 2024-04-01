/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#54acb4',
        primaryDark: '#2c7d85',
        secondary: '#75c4cc',
        accent: '#0c2c4c',
        primaryVariant: '#808080',
        secondaryVariant: '#373737',
    },
  },
  plugins: [],
},
}
