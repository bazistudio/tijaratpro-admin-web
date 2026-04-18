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
        success: "#16A34A",
        danger: "#DC2626",
        warning: "#F59E0B",
        info: "#0EA5E9",
        black: "#0F172A",
        white: "#FFFFFF",
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5F5",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#020617",
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
