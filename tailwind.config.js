/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['"Inter"', "sans-serif"],
      },
      colors : {
        "VeryViolet": "#6F3DDA",
        "LightViolet": "#7B4EE5",
        "VeryDark": "#121826",
        "Dark": "#212936",
        "VeryGray": "#394050",
        "Gray": "#4D5562",
        "DesaturedGray": "#A1A1A9",
        "DesaturedWhite": "#E5E7EB",
      }
    },
  },
  plugins: [],
}

