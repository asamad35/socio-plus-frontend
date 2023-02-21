/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2962ff",
        secondary: "#a9c0ff",
        input: "#4f4f4f",
      },
      backgroundColor: {
        primary: "#2962ff",
        secondary: "#a9c0ff",
        input: "#E8F0FE",
      },
      borderColor: {
        input: "#CDCDCD",
        primary: "#2962ff",
        "input-focus": "#b4b4b4",
      },
      accentColor: {
        primary: "#2962ff",
      },
    },
  },
  plugins: [],
};
