import typography from '@tailwindcss/typography'
import tailwindcssAnimate from 'tailwindcss-animate'

import { typography as designTokens } from './src/lib/design-tokens.js'
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
    // Typography scale — derived from design-tokens.ts (single source of truth)
    // Responsive 3-step: mobile (default) → tablet (sm:) → desktop (lg:)
    fontSize: {
      // 12px - Overline mobile
      xs: [designTokens.overline.mobile, { lineHeight: designTokens.overline.lineHeight }],
      // 14px - Caption, overline desktop
      sm: [designTokens.caption.mobile, { lineHeight: designTokens.caption.lineHeight }],
      // 16px - Body mobile, caption desktop
      base: [designTokens.body.mobile, { lineHeight: designTokens.body.lineHeight }],
      // 18px - Body tablet, bodySmall desktop
      lg: [designTokens.body.tablet, { lineHeight: designTokens.body.lineHeight }],
      // 20px - Body desktop
      xl: [designTokens.body.fontSize, { lineHeight: designTokens.body.lineHeight }],
      // 24px - H3 tablet, H4 desktop
      '2xl': [designTokens.h4.fontSize, { lineHeight: designTokens.h4.lineHeight }],
      // 28px - H3 desktop (custom)
      '3xl': [designTokens.h3.fontSize, { lineHeight: designTokens.h3.lineHeight }],
      // 36px - H2 desktop, H1 tablet
      '4xl': [designTokens.h2.fontSize, { lineHeight: designTokens.h2.lineHeight }],
      // 48px - H1 desktop, Display tablet
      '5xl': [designTokens.h1.fontSize, { lineHeight: designTokens.h1.lineHeight }],
      // 60px - Display desktop
      '6xl': [designTokens.display.fontSize, { lineHeight: designTokens.display.lineHeight }],
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
