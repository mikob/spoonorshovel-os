/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        primary: {
          100: "#f7fffe",
          200: "#cef0ee",
          300: "#a9e2df",
          400: "#88d3d1",
          500: "#6ac4c3",
          600: "#3da6a7",
          700: "#21868a",
          800: "#10686c",
          900: "#064b4f",
        },
        secondary: {
          100: "#fff0f6",
          200: "#f0ccda",
          300: "#e0abc0",
          400: "#d18ea7",
          500: "#c27390",
          600: "#a34b6a",
          700: "#852f4d",
          800: "#661c36",
          900: "#471023",
        },
        tertiary: {
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "base",
    }),
    require("@tailwindcss/aspect-ratio"),
    
  ],
};
