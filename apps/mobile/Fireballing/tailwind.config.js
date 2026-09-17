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
        /* Primary Hot Core */
        primary: '#ff5a26',
        'primary-deep': '#ff2e00',
        'primary-amber': '#ff9f1c',
        'on-primary': '#0d0b0a',

        /* Surface (Ember Charcoal & Neutrals) */
        background: '#0d0b0a',
        surface: '#171311',
        'surface-dim': '#0d0b0a',
        'on-surface': '#f4efef',
        'on-surface-variant': '#9e928e',

        /* Border */
        outline: '#261e1c',
        'outline-variant': '#261e1c',

        /* Neutral Tones */
        'white-smoke': '#f4efef',
        'cream-soft': '#faf8f5',
        'cool-charcoal': '#9e928e',

        /* Yield Semantics */
        profit: '#00e676',
        loss: '#ff1744',
        info: '#2979ff',

        /* Error */
        error: '#ff1744',
        'on-error': '#ffffff',
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
