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
        ink: '#0F172A',
        slate: {
          950: '#06101F',
        },
        crisis: {
          bg: '#F4F7FB',
          panel: '#FFFFFF',
          border: '#D8E1EC',
          muted: '#6B7280',
          text: '#102033',
          blue: '#2563EB',
          blueSoft: '#DCE9FF',
          green: '#15803D',
          greenSoft: '#DCFCE7',
          amber: '#D97706',
          amberSoft: '#FEF3C7',
          red: '#C62828',
          redSoft: '#FEE2E2'
        },
      },
      boxShadow: {
        panel: '0 18px 45px rgba(15, 23, 42, 0.08)',
        glow: '0 0 0 1px rgba(198, 40, 40, 0.16), 0 22px 50px rgba(198, 40, 40, 0.16)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(198, 40, 40, 0.12)' },
          '50%': { boxShadow: '0 0 0 10px rgba(198, 40, 40, 0)' },
        },
      },
      animation: {
        rise: 'rise 0.7s ease-out forwards',
        ring: 'pulseRing 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
