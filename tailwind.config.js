/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        lightBlue: "#EDF0F2", // Base color
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(256.3deg, #0D509F 0%, #1373E3 100%)",
      },
    },
  },
  plugins: [],
};
