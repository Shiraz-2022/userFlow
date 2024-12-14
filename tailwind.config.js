const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        fade: "fadeIn 2s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { color: 1 },
        },
      },
    },
    colors: {
      customBlack: "#040404",
      customGray: "#717170",
      customLightGray: "#D9D9D9",
      customGreen: "#43B17F",
      customDarkGreen: "#11291C",
      customLightGreen: "#DDFFEF",
      white: "#ffffff",
      customOrange: "#FC904E",
      transparent: "#00000000",
    },
    screens: {
      phone: "580px",
      tablet: "650px",
      tablet_lg: "900px",
      laptop: "1124px",
      desktop: "1380px",
    },
  },
  plugins: [],
};
