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
    extend: {
      colors: {
        primaryText: "#f65d4e",
      },
      screens: {
        "maxw-xsm": { max: "640px" },
        "maxw-sm": { max: "640px" },
        "maxw-md": { max: "768px" },
        "maxw-lg": { max: "992px" },
        "maxw-xl": { max: "1320px" },
      },
    },
  },
  plugins: [],
};
