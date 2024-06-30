/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D90429',
        'primary-tint': '#FA0B33',
        'primary-shade': '#B80422',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
