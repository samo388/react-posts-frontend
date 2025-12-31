/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc",
        card: "#ffffff",
        primary: "#4f46e5",
        accent: "#eef2ff",
        muted: "#94a3b8",
      },
    },
  },
  plugins: [],
};
