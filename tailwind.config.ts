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
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
      },
      animation: {
        floatUp: 'floatUp .6s ease-out',
      },
    },
  },
  plugins: [typography()],
} satisfies Config;
