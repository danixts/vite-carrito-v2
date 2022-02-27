const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./main.js", "./src/**/*.js"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      keyframes: {
        zoom: {
          from: { transform: "scale(0)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        zoom: "animation: zoom .3s linear;",
      },
      colors: {
        primary: colors.red,
        secondary: colors.cyan,
      },
      gridTemplateRows: {
        "template-3": "115px auto 60px",
      },
    },
  },
  plugins: [],
};
