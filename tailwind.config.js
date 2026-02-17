/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'gallery': '#F5F2EE',
        'cement': '#EDE9E3',
        'stone': '#757575',
        'carbon': '#1A1A1A',
        'bronze': '#B89B7A',
        'terra': '#7C5C3E',
      },
      fontFamily: {
      'serif': ['"Playfair Display"', 'serif'],
      'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}