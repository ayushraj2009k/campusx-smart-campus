/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0c1324",
        surface: "#0c1324",
        "surface-container-lowest": "#070e1f",
        "surface-container-low": "#141b2d",
        "surface-container": "#181f31",
        "surface-container-high": "#232a3c",
        "surface-container-highest": "#2e3447",
        "on-surface": "#dce2fa",
        "on-surface-variant": "#c3c6d7",
        primary: "#b4c5ff",
        "primary-container": "#2563eb",
        "on-primary-container": "#eeefff",
        secondary: "#4cd7f6",
        "secondary-container": "#03b5d3",
        "on-secondary-container": "#00424e",
        tertiary: "#d0bcff",
        "tertiary-container": "#7d4ce7",
        outline: "#8d90a0",
        "outline-variant": "#434655",
        brand: {
          blue: "#2563eb",
          cyan: "#4cd7f6",
          purple: "#7d4ce7",
          dark: "#0c1324",
        }
      },
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "orbit-spin": "spin 12s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 15px rgba(76, 215, 246, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(76, 215, 246, 0.8), 0 0 45px rgba(37, 99, 235, 0.5)" }
        }
      }
    },
  },
  plugins: [],
}
