import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        waveAnimation: {
          from: { transform: 'translate(-50%, 100%) rotate(0deg)' },
          to: { transform: 'translate(-50%, 100%) rotate(360deg)' },
        },
      },
      animation: {
        wave: 'waveAnimation 5s infinite linear',
        waveSlow: 'waveAnimation 7s infinite linear',
        waveMedium: 'waveAnimation 9s infinite linear',
      },
    },
  },
  plugins: [typography()],
} satisfies Config;
