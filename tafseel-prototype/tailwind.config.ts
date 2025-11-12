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
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        neutral: "rgb(var(--color-neutral) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "rgb(var(--color-on-primary) / <alpha-value>)",
          soft: "rgba(var(--color-primary), 0.14)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          foreground: "rgb(var(--color-on-secondary) / <alpha-value>)",
          soft: "rgba(var(--color-secondary), 0.14)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          foreground: "rgb(var(--color-on-accent) / <alpha-value>)",
          glow: "rgba(var(--color-accent), 0.5)",
        },
        text: {
          DEFAULT: "rgb(var(--color-text) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
          inverse: "rgb(var(--color-text-inverse) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-english)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1.75rem",
        "3xl": "2.25rem",
      },
      boxShadow: {
        glow: "0 0 40px rgba(var(--color-accent), 0.35)",
        card: "0 20px 50px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(var(--color-accent), 0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(var(--color-primary), 0.12), transparent 40%), linear-gradient(135deg, rgba(var(--color-primary), 0.08), transparent)",
      },
      keyframes: {
        "float-soft": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(var(--color-accent), 0.25)" },
          "50%": { boxShadow: "0 0 0 16px rgba(var(--color-accent), 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "float-soft": "float-soft 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
