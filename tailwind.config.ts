import typography from '@tailwindcss/typography'
import tailwindcssAnimate from 'tailwindcss-animate'

import typographyStyles from './typography.js'

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: ['class'],
  plugins: [tailwindcssAnimate, typography],
  theme: {
    screens: {
      xs: '390px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // shadcn/ui colors
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
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
    },
    // Typography scale - Updated for improved readability
    // Base increased to 18px, all sizes scaled proportionally
    fontSize: {
      // 12px - Overline, fine print
      xs: ['0.75rem', { lineHeight: '1.5' }],
      // 14px - Caption, secondary text (was 13px)
      sm: ['0.875rem', { lineHeight: '1.5' }],
      // 16px - Body small (was base)
      base: ['1rem', { lineHeight: '1.75' }],
      // 18px - Body default (INCREASED from 16px)
      lg: ['1.125rem', { lineHeight: '1.75' }],
      // 20px - Body large, H4
      xl: ['1.25rem', { lineHeight: '1.75' }],
      // 24px - H3
      '2xl': ['1.5rem', { lineHeight: '1.4' }],
      // 30px - H2
      '3xl': ['1.875rem', { lineHeight: '1.35' }],
      // 36px - H1 mobile
      '4xl': ['2.25rem', { lineHeight: '1.25' }],
      // 48px - H1 desktop, Display
      '5xl': ['3rem', { lineHeight: '1.2' }],
      // 60px - Display large
      '6xl': ['3.75rem', { lineHeight: '1.1' }],
      // 72px - Hero
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      // 96px - Mega
      '8xl': ['6rem', { lineHeight: '1' }],
      // 128px - Ultra
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    typography: typographyStyles,
  },
}

export default config
