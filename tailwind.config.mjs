import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        surface: {
          light: "#ffffff",
          dark: "#0f1115"
        },
        text: {
          light: "#0f172a",
          dark: "#f8fafc"
        }
      },
      boxShadow: {
        card: "0 10px 24px -14px rgba(15, 23, 42, 0.26)"
      },
      typography: {
        DEFAULT: {
          css: {
            lineHeight: "1.75",
            maxWidth: "none"
          }
        }
      }
    }
  },
  plugins: [typography]
};
