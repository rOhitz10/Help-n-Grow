/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 5s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      width: {
        'custom': 'calc( 100vw - 13rem)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-y': {
          'max-height': '400px',
          'overflow-y': 'auto',
        },
        '.scrollbar-y::-webkit-scrollbar': {
          'width': '2px',
        },
        '.scrollbar-y::-webkit-scrollbar-track': {
          'background': '#f3f4f6',
          'border-radius': '9999px',
        },
        '.scrollbar-y::-webkit-scrollbar-thumb': {
          'background': '#d1d5db',
          'border-radius': '9999px',
        },
        '.dark .scrollbar-y::-webkit-scrollbar-track': {
          'background': '#374151',
        },
        '.dark .scrollbar-y::-webkit-scrollbar-thumb': {
          'background': '#6b7280',
        },
      })
    }
  ],
}
