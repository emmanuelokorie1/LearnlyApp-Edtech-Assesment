/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E7E0F3",
        secondary: "#380C95",
        secondary2: "#5B12F2",
        border: "#DCD2F6",
        bg1: "#F7F3FB",
        black1: "#29292C",
        success: "#EBFDC6",
        failed: "#F9DEDE",
      },
    },
  },
  plugins: [],
};
