import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#159AA2",
          dark: "#0d7880",
          light: "#e8f7f8",
        },
        magenta: {
          DEFAULT: "#EA1B7E",
          light: "#E758A5",
        },
        navy: {
          DEFAULT: "#1A1A2E",
        },
        green: {
          deep: "#005C53",
          DEFAULT: "#086A61",
        },
        cream: "#F1F1F1",
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        input: "8px",
        card: "14px",
        block: "22px",
      },
    },
  },
  plugins: [],
};
export default config;
