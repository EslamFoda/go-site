import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "var(--container-padding, 2rem)",
        sm: "var(--container-padding-sm, 2rem)",
        lg: "var(--container-padding-lg, 4rem)",
      },
    },
    extend: {
      maxWidth: {
        container: "var(--container-max-width)",
      },
      colors: {
        textColor: "hsl(var(--text-color))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          bg: "hsl(var(--muted-bg))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        draw: {
          "0%": { strokeDashoffset: "100" },
          "5%": { strokeDashoffset: "95" },
          "10%": { strokeDashoffset: "90" },
          "15%": { strokeDashoffset: "85" },
          "20%": { strokeDashoffset: "80" },
          "25%": { strokeDashoffset: "75" },
          "30%": { strokeDashoffset: "70" },
          "35%": { strokeDashoffset: "65" },
          "40%": { strokeDashoffset: "60" },
          "45%": { strokeDashoffset: "55" },
          "50%": { strokeDashoffset: "50" },
          "55%": { strokeDashoffset: "45" },
          "60%": { strokeDashoffset: "40" },
          "65%": { strokeDashoffset: "35" },
          "70%": { strokeDashoffset: "30" },
          "75%": { strokeDashoffset: "25" },
          "80%": { strokeDashoffset: "20" },
          "85%": { strokeDashoffset: "15" },
          "90%": { strokeDashoffset: "10" },
          "95%": { strokeDashoffset: "5" },
          "100%": { strokeDashoffset: "0" },
        },
        pulseExpand: {
          "0%": { r: "0.5", fill: "none" },
          "100%": { r: "2", fill: "rgba(0, 0, 0, 0.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideIn: "slideIn 0.5s ease-in-out",
        draw: "draw 2s ease-in infinite",
        pulseExpand: "pulseExpand ease-in-out  alternate infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
