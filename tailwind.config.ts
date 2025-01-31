import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DAA520',
        secondary: '#00A3E1',
        accent: '#F9A825',
        background: '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        serif: ['var(--font-bodoni-moda)', ...fontFamily.serif],
      },
      boxShadow: {
        smooth: '0 0 10px rgba(0, 0, 0, 0.1)',
        deep: '0 0 20px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-in-out forwards',
        fadeOut: 'fadeOut 300ms ease-in-out forwards',
        slideLeft: 'slideLeft 300ms ease-in-out forwards',
        slideLeftOut: 'slideLeftOut 300ms ease-in-out forwards',
        slideRight: 'slideRight 300ms ease-in-out forwards',
        slideRightOut: 'slideRightOut 300ms ease-in-out forwards',
        slideUp: 'slideUp 300ms ease-in-out forwards',
        slideUpOut: 'slideUpOut 300ms ease-in-out forwards',
        slideDown: 'slideDown 300ms ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translate(-50%, 100%) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 100%) scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translate(-50%, 100%) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(-50%, 100%) scale(0.95)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0%)' },
        },
        slideLeftOut: {
          '0%': { opacity: '1', transform: 'translateX(0%)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0%)' },
        },
        slideRightOut: {
          '0%': { opacity: '1', transform: 'translateX(0%)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0%)' },
        },
        slideUpOut: {
          '0%': { opacity: '1', transform: 'translateY(0%)' },
          '100%': { opacity: '0', transform: 'translateY(100%)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0%)' },
        },
        slideDownOut: {
          '0%': { opacity: '1', transform: 'translateY(0%)' },
          '100%': { opacity: '0', transform: 'translateY(-100%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
