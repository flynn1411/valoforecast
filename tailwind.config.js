/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      fondo: '#0F1923',
      texto1: '#FFFFFF',
      texto2: '#201F1F',
      verde: '#5EE790',
      rojo: '#FF4655',

    },
    fontFamily:{
      titulo:"'Aldrich', sans-serif",
      ubuntu: "'Ubuntu', sans-serif"
    },
    extend: {},
  },
  plugins: [],
}

