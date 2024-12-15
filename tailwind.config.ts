import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "header-gradient":
          "linear-gradient(to right, #feb2da 0%, #d495e0 20%, #ad8fdc 40%, #8475c5 60%, #86dcf4 80%, #71bcec 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
