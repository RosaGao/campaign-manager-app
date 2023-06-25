/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['var(--font-merriweather)'],
        nunito: ['var(--font-nunito)']
      },
      height: {
        container: '100vh',
      },
      width: {
        content: '75%'
      }
    },
  },
  
  
  plugins: [],
}
