/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      colors: {
        javascript: '#f0db4f',
        twitter: '#1DA1F2',
      },
      fontFamily: {
        'emoji': ["Twemoji Country Flags", "Helvetica", "Comic Sans", 'serif'],
      }
    }
  }  
}