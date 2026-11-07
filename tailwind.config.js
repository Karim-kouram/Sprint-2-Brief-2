/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js"
  ],
  theme: {
    extend: {
                    colors: {
                        empire: {
                            dark: "#11110f",
                            card: "#1c1b18",
                            gold: "#d4af63",
                            muted: "#a8a29e"
                        }
                    }
                }
  },
  plugins: [],
}