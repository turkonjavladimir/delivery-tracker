/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        header: "1000",
      },
    },
  },
  plugins: [],
};

module.exports = config;
