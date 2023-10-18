module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sora: "Sora",
    },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        // sm: "640px",
        // md: "768px",
        // lg: "1024px",
        xl: "1320px",
        // "2xl": "1536px",
      },
    },
    fontSize: {
      lg: "1.2rem",
      xl: "1.4rem",
      "2xl": "1.6rem",
    },

    // screens: {
    //   "minw-xsm": { raw: "(min-width: 300px)" },
    //   "minw-sm": { raw: "(min-width: 640px)" },
    //   "minw-md": { raw: "(min-width: 768px)" },
    //   "minw-lg": { raw: "(min-width: 992px)" },
    //   "minw-xl": { raw: "(min-width: 1320px)" },

    //   "minw-1000": { raw: "(min-width: 1000px)" },
    // },
    screens: {
      "minw-xsm": "576px",
      "minw-sm": "640px",
      "minw-md": "768px",
      "minw-lg": "992px",
      "minw-xl": "1320px",
      "minw-1000": "1000px",
    },

    extend: {
      colors: {
        primaryText: "#f65d4e",
        secondaryText: "#e6e6e6",
        secondartTextBold: "#999999",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
