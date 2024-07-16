/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'biru': '#003350',
        'ijo': '#64C0B7',
        'abu': '#737373',
        'yellow': '#ffc82c',
        'putih': '#FFFFFF',
        'ijo_muda' : '#64C0B7',
        'abu_muda' : '#BFBFBF',
        'abu_muda_banget':'#EBEBEB',
        'merah' : '#D21C1C',
        'abu_abu_paling_muda':'#DFDFDF',
        'background_forum': '#E8F6F4',
        'border_ijo':'#CFEBE9',
        'birumuda':'#F0F9F8'
        
      },
    },
  },
  plugins: [],
}

