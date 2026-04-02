/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#122033',
        slate: {
          950: '#081324',
        },
        crisis: {
          bg: '#08111F',
          panel: '#101A2A',
          border: '#243245',
          muted: '#94A3B8',
          text: '#E5EEF8',
          blue: '#7FA7D6',
          blueSoft: '#18273B',
          green: '#55B985',
          greenSoft: '#11271C',
          amber: '#D7A14B',
          amberSoft: '#2D2113',
          red: '#C56C63',
          redSoft: '#301918',
        },
      },
      boxShadow: {
        panel: '0 18px 45px rgba(2, 6, 23, 0.34)',
        glow: '0 0 0 1px rgba(197, 108, 99, 0.22), 0 22px 50px rgba(197, 108, 99, 0.18)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(197, 108, 99, 0.12)' },
          '50%': { boxShadow: '0 0 0 10px rgba(197, 108, 99, 0)' },
        },
      },
      animation: {
        rise: 'rise 0.7s ease-out forwards',
        ring: 'pulseRing 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
