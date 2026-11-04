/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/mobile-ui/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        /* Primary (Plum) */
        primary: '#8b5fa0',
        'primary-light': '#f6ebfa',
        'on-primary': '#ffffff',

        /* Surface */
        background: '#fff8fc',
        surface: '#ffffff',
        'surface-dim': '#f6ebfa',
        'on-surface': '#5b2e8a',
        'on-surface-variant': '#c97a9e',

        /* Border */
        outline: '#f5d8e1',
        'outline-variant': '#c97a9e',

        /* Text */
        'text-primary': '#5b2e8a',
        'text-secondary': '#8b5fa0',
        'text-tertiary': '#c97a9e',
        'text-muted': '#c97a9e',
        'text-placeholder': '#c97a9e',
        'text-disabled': '#f5d8e1',

        /* Semantic */
        error: '#ff1744',
        'on-error': '#ffffff',
        info: '#2979ff',
      },
      fontSize: {
        h1: ['48px', { lineHeight: '110%', fontWeight: '800', letterSpacing: '-0.02em' }],
        h2: ['32px', { lineHeight: '120%', fontWeight: '700', letterSpacing: '-0.01em' }],
        h3: ['20px', { lineHeight: '130%', fontWeight: '600' }],
        body: ['15px', { lineHeight: '150%', fontWeight: '400' }],
        caption: ['11px', { lineHeight: '140%', fontWeight: '600' }],
        'label-md': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'label-sm': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        mono: ['28px', { lineHeight: '110%', fontWeight: '700' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        gutter: '20px',
      },
    },
  },
  plugins: [],
};
