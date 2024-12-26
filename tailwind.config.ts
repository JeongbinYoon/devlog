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
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        wave: 'waveAnimation 10s infinite linear',
        waveSlow: 'waveAnimation 13.5s infinite linear',
        waveMedium: 'waveAnimation 11s infinite linear',
      },
    },
  },
  plugins: [typography()],
} satisfies Config;
