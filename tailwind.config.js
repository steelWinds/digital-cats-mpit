/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        human: "url('public/images/bg-main.png')"
      },
      colors: {
        green: '#4C6F6C',
        'light-green': '#6C928F',
        'base-gray': '#333333',
        black: '#000000',
        'dark-gray': '#121212',
        gray: '#494949',
        aqua: '#AEC3C1'
      },
      borderRadius: {
        base: '10px'
      },
      maxWidth: {
        base: '1310px'
      }
    }
  },
  plugins: []
}
