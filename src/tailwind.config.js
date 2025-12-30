/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // New color palette
        'navy': '#1e293b',
        'terracotta': '#c2410c',
        'sage': '#10b981',
        'cream': '#f8fafc',
        'charcoal': '#334155',
        'parchment': '#f5f1e8', // Book page color
      },
      fontFamily: {
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'body': ['"Source Serif Pro"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'texture-paper': "url('https://www.transparenttextures.com/patterns/paper.png')",
        'texture-linen': "url('https://www.transparenttextures.com/patterns/linen.png')",
      },
    },
  },
  plugins: [],
}