import { borderRadius, borderWidth, colors, fontSize, fontWeight, lineHeight, shadows, spacing } from './tailwind';

const plugin = require('tailwindcss/plugin');

const SCREENS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
};

function screenToPx(screen) {
  return `${screen}px`;
}

function screenUp(screen) {
  return { min: screenToPx(screen) };
}

function screenDown(screen) {
  return { max: screenToPx(screen - 1) };
}

const config = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontSize: fontSize,
      lineHeight: lineHeight,
      fontWeight: fontWeight,
      colors: colors,
      borderRadius: borderRadius,
      borderWidth: borderWidth,
      boxShadow: shadows,
      spacing: spacing,
      screens: {
        xs: screenUp(SCREENS.xs),
        xsDown: screenDown(SCREENS.sm),

        sm: screenUp(SCREENS.sm),
        smDown: screenDown(SCREENS.md),

        md: screenUp(SCREENS.md),
        mdDown: screenDown(SCREENS.lg),

        lg: screenUp(SCREENS.lg),
        lgDown: screenDown(SCREENS.xl),

        xl: screenUp(SCREENS.xl),
        xlDown: screenDown(SCREENS['2xl']),

        '2xl': screenUp(SCREENS['2xl']),
        '2xlDown': screenDown(SCREENS['3xl']),

        '3xl': screenUp(SCREENS['3xl']),
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.ds-text-subtitle-caption': {
          '@apply font-ds-semibold': {},
        },
        '.ds-text-body-small': {
          letterSpacing: '-0.1px',
          fontSize: '0.75rem',
          lineHeight: '1.125rem',
          ['@screen 3xl']: {
            fontSize: '0.875rem',
            lineHeight: '1.375rem',
          },
        },
        '.ds-text-body-small-semibold': {
          '@apply font-semibold ds-text-body-small': {},
          color: '#333333',
        },
        '.ds-text-body': {
          letterSpacing: '-0.1px',
          fontSize: '0.75rem',
          lineHeight: '1.125rem',
          fontWeight: 400,
          ['@screen xl']: {
            fontSize: '0.875rem',
            lineHeight: '1.375rem',
          },
          ['@screen 3xl']: {
            fontSize: '1rem',
            lineHeight: '1.5rem',
          },
        },
      });
    }),
  ],
};
export default config;
