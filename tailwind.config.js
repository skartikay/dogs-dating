/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { nunito: ['Nunito', 'sans-serif'] },
      colors: {
        coral:  '#FF6B6B',
        'coral-light': '#FF9090',
        mint:   '#4ECDC4',
        yellow: '#FFE66D',
        purple: '#C3B1E1',
        cream:  '#FFF8F0',
        dark:   '#2D2D2D',
        grey:   '#6B7280',
      },
    },
  },
  plugins: [],
}
