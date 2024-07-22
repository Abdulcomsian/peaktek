/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
      backgroundColor: {
        lightBlue: "#EDF0F2",
        bluish: "#ebf4ff", // Base color
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(256.3deg, #0D509F 0%, #1373E3 100%)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
