/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1280px'
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      container: {
        center: true,
        padding: 16
      },
      colors: {
        headerBg: '#020D18',
        headerMenuColor: '#abb7c4',
        loginBtnBg: '#DD003F',
        categoryBg: '#DD003F',
        searchInputBg: '#233A50',
        mainBorderColor: '#405266'
      }
    }
  },
  plugins: []
}
