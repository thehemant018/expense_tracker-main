/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFB703",
        blue: "#219EBC",
        pointOrange: "#FB8500",
      },
    },
  },
  plugins: [],
};
