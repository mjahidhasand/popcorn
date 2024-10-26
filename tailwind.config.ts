import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground-color)",
        background: "var(--background-color)",
        header_border: "var(--header-border-color)",
      },
      fontWeight: {
        title: "var(--title-weight)",
      },
      fontSize: {
        sm: "var(--font-sm)",
      },
    },
  },
};

export default config;
