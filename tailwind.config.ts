import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5dae3",
          300: "#b0bac9",
          400: "#8593a8",
          500: "#65728a",
          600: "#505b71",
          700: "#42495c",
          800: "#393f4e",
          900: "#1f2330",
          950: "#13151d",
        },
        brand: {
          50: "#fef4ec",
          100: "#fde5d0",
          200: "#fbc89f",
          300: "#f8a366",
          400: "#f57e3b",
          500: "#f15a1a",
          600: "#e24410",
          700: "#bb3210",
          800: "#952915",
          900: "#782314",
        },
        accent: {
          400: "#7c5cff",
          500: "#5e3aff",
          600: "#4a25f5",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,22,30,0.06), 0 8px 24px -8px rgba(20,22,30,0.10)",
        pop: "0 10px 30px -10px rgba(94,58,255,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
