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
        /* Apple dark palette */
        primary:       "#2997ff",   /* Apple blue */
        "primary-light":"#74c2ff",
        secondary:     "#64d2ff",
        accent:        "#ff9f0a",   /* Apple amber */
        gold:          "#ffd60a",
        green:         "#30d158",
        purple:        "#bf5af2",
        red:           "#ff453a",
        dark:          "#000000",
        "dark-2":      "#0a0a0a",
        "dark-card":   "#111111",
        "dark-border": "rgba(255,255,255,0.1)",
        "slate-350":   "#94a3b8",
      },
      fontFamily: {
        sans: ["-apple-system", "SF Pro Display", "SF Pro Text", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["SF Mono", "JetBrains Mono", "Menlo", "monospace"],
      },
      animation: {
        "float":           "float 7s ease-in-out infinite",
        "glow":            "glow 2.5s ease-in-out infinite alternate",
        "slide-up":        "slideUp 0.6s ease-out forwards",
        "fade-in":         "fadeInAnim 0.8s ease-out forwards",
        "pulse-slow":      "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow":       "spin 20s linear infinite",
        "gradient-shift":  "gradientShift 8s ease infinite",
        "claude-pulse":    "claudePulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-18px)" },
        },
        glow: {
          "0%":   { boxShadow: "0 0 20px rgba(41,151,255,0.25)" },
          "100%": { boxShadow: "0 0 60px rgba(41,151,255,0.7), 0 0 120px rgba(100,210,255,0.3)" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInAnim: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":       { backgroundPosition: "100% 50%" },
        },
        claudePulse: {
          "0%, 100%": { boxShadow: "0 0 30px rgba(255,214,10,0.4), 0 0 60px rgba(255,159,10,0.2)" },
          "50%":       { boxShadow: "0 0 50px rgba(255,214,10,0.7), 0 0 100px rgba(255,159,10,0.4)" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
