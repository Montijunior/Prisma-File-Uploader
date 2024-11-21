/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{ejs,js}",
    "!./node_modules/**/*",
    "./controllers/**/*",
    "./public/**/*.js",
    "./views/**/*.ejs",
  ],
  theme: {
    extend: { fontFamily: ["Poppins", "sans-serif"] },
  },
  plugins: [],
};
