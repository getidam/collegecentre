/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#fdfcf9',
          100: '#fbf8f2',
          200: '#f4ebd7',
          300: '#e8dcbe',
          400: '#d7c59f',
        },
        ink: {
          DEFAULT: '#17191c',
          muted: '#4a515a',
          light: '#68717d',
        },
        cjpOrange: {
          DEFAULT: '#c9561e',
          hover: '#b24715',
          light: '#ff6f2c',
          tint: '#faeee5',
        },
        cjpGreen: {
          DEFAULT: '#166534',
          light: '#22c55e',
          tint: '#eaf8ee',
        },
        cjpGold: {
          DEFAULT: '#d97706',
          light: '#f59e0b',
          tint: '#fef3c7',
        },
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #17191c',
        'brutal': '4px 4px 0px #17191c',
        'brutal-lg': '6px 6px 0px #17191c',
        'brutal-xl': '8px 8px 0px #17191c',
        'brutal-orange': '4px 4px 0px #c9561e',
      }
    },
  },
  plugins: [],
}

