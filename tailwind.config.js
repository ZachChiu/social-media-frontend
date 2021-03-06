module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "1400px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      gray: {
        DEFAULT: "#9b9893",
        dark: "#efece7",
        light: "#f3f4f6",
      },
      white: "#fff",
      dark: "#000400",
      primary: "#03438D",
      secondary: "#eec32a",
      info: "#e2edfa",
      danger: "#f57375",
      disabled: "#a8b0b9",
      // "baby-blue": "#cadae6",
    },
    fontFamily: {
      paytone: ["Paytone One", "Noto Sans TC"],
      azeret: ["Azeret Mono", "Noto Sans TC"],
      noto: ["Noto Sans TC"],
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {},
      animation: {
        "spin-slow": "spin 1.5s linear infinite",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "540px",
          },
          "@screen md": {
            maxWidth: "720px",
          },
          "@screen lg": {
            maxWidth: "870px",
          },
        },
      });
    },
  ],
};
