/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#06030f',
          1: '#0c0720',
          2: '#140a2e',
        },
        violet: {
          900: '#1a0b3d',
          800: '#2a1660',
          700: '#3d1a8c',
          600: '#5b2bcc',
          500: '#7a3bff',
          400: '#9a6bff',
          300: '#bda1ff',
          200: '#d8c7ff',
        },
        neon: '#c084ff',
        ink: {
          DEFAULT: '#f3eeff',
          dim: '#a89cc8',
          faint: '#6b5d8f',
        },
        line: 'rgba(157,124,255,0.14)',
        line2: 'rgba(157,124,255,0.28)',
      },
      fontFamily: {
        display: ['"Syne"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'cosmos-gradient':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(122,59,255,.35), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 30%, rgba(192,132,255,.18), transparent 65%), radial-gradient(ellipse 70% 40% at 10% 80%, rgba(61,26,140,.35), transparent 70%), linear-gradient(180deg, #06030f 0%, #0a0520 50%, #06030f 100%)',
        'glow-violet': 'radial-gradient(circle at center, rgba(122,59,255,.5), transparent 70%)',
      },
      boxShadow: {
        glow: '0 0 60px rgba(122,59,255,.45)',
        'glow-lg': '0 0 120px rgba(122,59,255,.55)',
        'glow-sm': '0 0 30px rgba(122,59,255,.35)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 5s ease-in-out infinite',
        drift: 'drift 60s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'scroll-left': 'scroll-left 25s linear infinite',
        'scroll-right': 'scroll-right 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-400px,-400px,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scroll-left': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'scroll-right': {
          from: { transform: 'translateX(-50%)' },
          to:   { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};