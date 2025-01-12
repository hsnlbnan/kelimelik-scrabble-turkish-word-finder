import type { Config } from "tailwindcss";
import { tailwindColors } from "./lib/constants/colors";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: tailwindColors
    },
  },
  plugins: [],
  darkMode: "class",

} satisfies Config;
