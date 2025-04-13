/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        volkhov: ['Volkhov', 'serif'], 
      },
      colors: {
        customBlue: '#181E4B', // Adding the custom blue color
      },
    },
  },
  plugins: [],
};
