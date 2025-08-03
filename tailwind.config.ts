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
        terminal: {
          green: "#00ff00",
          black: "#000000",
        },
      },
      fontFamily: {
        mono: ["var(--font-vt323)", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;