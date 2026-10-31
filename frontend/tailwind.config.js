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
        background: "var(--bg-primary)",
        surface: "var(--color-surface)",
        "surface-container-lowest": "var(--color-surface-lowest)",
        "surface-container-low": "var(--color-surface-low)",
        "surface-container": "var(--color-surface-container)",
        "surface-container-high": "var(--color-surface-high)",
        "surface-container-highest": "var(--color-surface-highest)",
        "on-surface": "var(--color-on-surface)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        primary: "#b4c5ff",
        "primary-container": "#2563eb",
        "on-primary-container": "#eeefff",
        secondary: "#4cd7f6",
        "secondary-container": "#03b5d3",
        "on-secondary-container": "#00424e",
        tertiary: "#d0bcff",
        "tertiary-container": "#7d4ce7",
        outline: "var(--color-outline)",
        "outline-variant": "var(--color-outline-variant)",
        navy: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#070e1f",
        },
        electric: {
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
        },
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
