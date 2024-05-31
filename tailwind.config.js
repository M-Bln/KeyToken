/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#D3E5FF',
          medium: '#6D8CD7',
          DEFAULT: '#1D4ED8',
          dark: '#1E40AF',
        },
        secondary: {
          light: '#FFD700',
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
        accent: {
          light: '#34D399',
          DEFAULT: '#10B981',
          dark: '#047857',
        },
        neutral: {
          light: '#F3F4F6',
          DEFAULT: '#9CA3AF',
          dark: '#4B5563',
        },
        negative: {
          light: '#FECACA',
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
      },
      boxShadow: {
        'inner-lg': 'inset 0 4px 12px 0 rgba(0, 0, 0, 0.6)',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
};
