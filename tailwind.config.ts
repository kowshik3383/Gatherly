import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        dark: {
          1: '#B4D4FF',
          2: '#EEF5EE',
          3: '#252A41',
          4: '#1E2757',
        },
        blue: {
          1: '#86B6F6',
        },
        sky: {
          1: '#C9DDFF',
          2: '#ECF0FF',
          3: '#F5FCFF',
        },
        orange: {
          1: '#86B6F6',
        },
        purple: {
          1: '#86B6F6',
        },
        yellow: {
          1: '#86B6F6',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        hero: "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fgettalkative.com%2Finfo%2Fwhat-is-video-chat&psig=AOvVaw0ELiLdsAwGsqvgKDjARA90&ust=1726633998125000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCAjIeTyYgDFQAAAAAdAAAAABAE')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
