/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#2563EB",
        success: "#22C55E",
        danger: "#EF4444",
        warning: "#F97316",
        info: "#EAB308",
        black: "#0F172A",
        white: "#FFFFFF",
        gray: {
          light: "#F1F5F9",
          border: "#E2E8F0",
          text: "#64748B"
        }
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #0F172A, #020617)',
        'btn-gradient': 'linear-gradient(to right, #2563EB, #22C55E)',
      },
      boxShadow: {
        'glow-blue': '0 0 15px rgba(37, 99, 235, 0.6)',
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.6)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.6)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.8)',
      }
    },
  },
  plugins: [],
}
