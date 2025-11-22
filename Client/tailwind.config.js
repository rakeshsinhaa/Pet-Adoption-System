/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#fea034',
        hoverorange: '#ff9317',
        lightorange: 'rgb(231, 158, 75)',
        textGrey: 'rgb(237, 233, 233)',
        darkGrey: '#1F2130',
      },
      fontFamily: {
        'varela': ['Varela Round', 'sans-serif'],
        'oxygen': ['Oxygen', 'sans-serif'],
        'preahvihear': ['Preahvihear', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

