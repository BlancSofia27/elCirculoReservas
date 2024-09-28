/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: '#E8C4DE',
        pink1:'#D680BF',
        pink2:'#D467B7',
        smooke: "#C4C4C4",
        whitee: "#D4D4D4",
      },
      fontFamily: {
        regular: ['Poppins', 'sans-serif'],
        clear: ['DM Sans', 'sans-serif'],
        lashes: ['Allura', 'cursive'],
        lashes2: ['Playfair Display', 'serif'],
      },
      fontWeight: {
        regular: 400,
        clear: 400,
        lashes2:200,
      },
      fontStyle: {
        regular: 'normal',
        clear: 'normal',
      },
      transitionProperty: {
        'filter': 'filter',
        'opacity': 'opacity',
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-image': "url('/heroPinkLashes.jpg')", // Ruta correcta a la imagen
      },
    },
  },
  plugins: [],
}
