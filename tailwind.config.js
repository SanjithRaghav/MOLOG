/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html','./public/*.js','./views/*.ejs'],
  theme: {
    fontFamily: {
      RaleWay: ['Open Sans', 'sans-serif'],
      OpenSans: ['Raleway', 'sans-serif'],
      Montserrat: ['Montserrat', 'sans-serif']
    },
    screens: {
      sm: '375px',
      md: '768px',
      bt: '815px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors:{
      }
    },
  },
  plugins: [],
}
