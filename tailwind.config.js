/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{ejs,js}", "!./node_modules/**/*", "./controllers/**/*"],
  theme: {
    extend: { fontFamily: ["Poppins", "sans-serif"] },
  },
  plugins: [],
};
