/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores da marca RYV
        ryv: {
          primary: "#718973", // Verde principal
          secondary: "#E7DFDB", // Bege/creme
          dark: "#2C2C2C", // Preto/cinza escuro
          white: "#FFFFFF", // Branco

          // Variações das cores principais
          "primary-light": "#8BA08B",
          "primary-dark": "#5A6F5A",
          "secondary-light": "#F0EAE6",
          "secondary-dark": "#D4C8C2",
          "dark-light": "#4A4A4A",
          "dark-lighter": "#6B6B6B",
        },

        // Mapeamento para uso semântico
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
