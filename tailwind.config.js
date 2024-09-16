/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          secondary: "#DB2777",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          secondary: "#DB2777",
        },
      },
    ],
  },
};
