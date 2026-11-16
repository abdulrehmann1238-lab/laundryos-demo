/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F1',
        secondary: '#E9EDE5',
        sage: {
          50: '#F4F6F4',
          100: '#E6EAE6',
          200: '#D0D9D1',
          300: '#ADC0AF',
          400: '#86A189',
          500: '#657B68', // Primary sage
          600: '#516554',
          700: '#415243',
          800: '#344B3B', // Deep forest
          900: '#26372B',
          950: '#141E17',
        },
        forest: {
          DEFAULT: '#344B3B',
          light: '#425D4A',
          dark: '#243529',
        },
        charcoal: {
          DEFAULT: '#252A26',
          muted: '#777C74',
          light: '#9BA098',
        },
        linen: {
          DEFAULT: '#E7DDD0',
          light: '#F4EFEA',
          dark: '#D5C7B4',
        },
        border: '#E6E5DD',
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#FAF9F5',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(37, 42, 38, 0.04), 0 1px 2px -1px rgba(37, 42, 38, 0.04)',
        'card': '0 4px 20px -2px rgba(37, 42, 38, 0.05), 0 2px 6px -1px rgba(37, 42, 38, 0.03)',
        'elevated': '0 10px 30px -4px rgba(37, 42, 38, 0.08), 0 4px 12px -2px rgba(37, 42, 38, 0.04)',
        'drawer': '0 20px 40px -8px rgba(37, 42, 38, 0.16)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
        '2xl': '28px',
      }
    },
  },
  plugins: [],
}
