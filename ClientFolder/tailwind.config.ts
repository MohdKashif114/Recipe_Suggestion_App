import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: "#123524",
        leafGreen: "#3E7B27",
        oliveGreen: "#85A947",
        lightBeige: "#EFE3C2",
      },
    },
  },
  plugins: [],
};

export default config;
