/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./app/**/*.{ts,tsx}",
    // "./components/**/*.{ts,tsx}",
    // "./node_modules/@rnr/**/*.{ts,tsx}",
    "./app/index.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
