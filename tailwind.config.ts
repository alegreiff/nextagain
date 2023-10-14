import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    daisyui: {
      themes: [
        {
          mytheme: {
            primary: "#d0db59",

            secondary: "#b1f257",

            accent: "#24e588",

            neutral: "#38273a",

            "base-100": "#4e464e",

            info: "#5192c8",

            success: "#2ac06b",

            warning: "#98560b",

            error: "#e75f7d",
          },
        },
      ],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        metricas: {
          azul: "#193d8a",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
