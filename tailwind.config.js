/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(240, 5%, 90%)",
        input: "hsl(240, 5%, 90%)",
        ring: "hsl(262, 100%, 55%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(240, 10%, 3%)",
        primary: {
          DEFAULT: "hsl(262, 100%, 55%)",
          foreground: "hsl(0, 0%, 100%)"
        },
        secondary: {
          DEFAULT: "hsl(240, 5%, 90%)",
          foreground: "hsl(240, 10%, 34%)"
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 100%)"
        },
        muted: {
          DEFAULT: "hsl(240, 5%, 96%)",
          foreground: "hsl(240, 10%, 45%)"
        },
        accent: {
          DEFAULT: "hsl(240, 5%, 96%)",
          foreground: "hsl(240, 10%, 45%)"
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(240, 10%, 3%)"
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(240, 10%, 3%)"
        }
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"]
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};