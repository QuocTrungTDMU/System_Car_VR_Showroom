module.exports = {
  content: ["./src/**/*.{html,js}"],
  // theme: {
  //   extend: {},
  // },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#95D1CC",
          secondary: "#22577E",
          accent: "#F1F6F9",
          neutral: "#ffffff",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}
