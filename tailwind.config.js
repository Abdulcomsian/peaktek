/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        lightBlue: "#EDF0F2", // Base color
      },
    },
  },
  plugins: [],
};
