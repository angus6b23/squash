/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        iceberg: {
          primary: "#89b8c2",
          "primary-focus": "#76a0a8",
          "primary-content": "#161822",
          secondary: "#84a0c6",
          "secondary-focus": "#9cb3d2",
          "secondary-content": "#161822",
          accent: "#a093c7",
          "accent-focus": "#b2a8d3",
          "accent-content": "#161822",
          neutral: "#2a2e37",
          "neutral-focus": "#16181d",
          "neutral-content": "#ffffff",
          "base-100": "#161822",
          "base-200": "#1f2233",
          "base-300": "#26293b",
          "base-content": "#c7c9d1",
          info: "#89b8c2",
          success: "#b4be82",
          warning: "#e2a478",
          error: "#e27878",
          "--rounded-box": "0px",
          "--rounded-btn": "0px",
          "--rounded-badge": "0px",
          "--animation-btn": ".25s",
          "--animation-input": ".2s",
          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "2px",
        },
      },
      "winter",
      "dracula",
    ],
  },
};
