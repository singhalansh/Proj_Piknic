/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce4ca',
          300: '#8dd0a6',
          400: '#58b47b',
          500: '#1B4D3E',
          600: '#167a3a',
          700: '#146030',
          800: '#144d28',
          900: '#124023',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#D4AF37',
          500: '#ca8a04',
          600: '#a16207',
          700: '#854d0e',
          800: '#713f12',
          900: '#633313',
        },
        cream: {
          50: '#FAF7F2',
          100: '#f7f0e8',
          200: '#ede1d1',
          300: '#e0ccb0',
          400: '#d1b48c',
          500: '#c8a882',
          600: '#b8956f',
          700: '#9a7c5e',
          800: '#7c6450',
          900: '#655242',
        },
        sand: {
          50: '#faf9f7',
          100: '#f4f1eb',
          200: '#e8e1d4',
          300: '#d9ccb8',
          400: '#c7b299',
          500: '#b89d7f',
          600: '#a68a6d',
          700: '#8a7159',
          800: '#715d4b',
          900: '#5c4d3f',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'parallax': 'parallax 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        parallax: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      }
    },
  },
  plugins: [],
};