export default function typographyStyles({
  theme,
}: {
  theme: (path: string) => string
}) {
  return {
    DEFAULT: {
      css: {
        // Improved light mode colors for better readability
        '--tw-prose-body': theme('colors.zinc.700'),
        '--tw-prose-bold': theme('colors.zinc.900'),
        '--tw-prose-bullets': theme('colors.zinc.700'),
        '--tw-prose-captions': theme('colors.zinc.500'),
        '--tw-prose-code': theme('colors.zinc.800'),
        '--tw-prose-code-bg': theme('colors.zinc.100'),
        '--tw-prose-counters': theme('colors.zinc.700'),
        '--tw-prose-headings': theme('colors.zinc.900'),
        '--tw-prose-hr': theme('colors.zinc.200'),

        // Improved dark mode colors for better contrast
        '--tw-prose-invert-body': theme('colors.zinc.300'),
        '--tw-prose-invert-bold': theme('colors.zinc.100'),
        '--tw-prose-invert-bullets': theme('colors.zinc.300'),
        '--tw-prose-invert-captions': theme('colors.zinc.400'),
        '--tw-prose-invert-code': theme('colors.zinc.200'),
        '--tw-prose-invert-code-bg': theme('colors.zinc.800'),
        '--tw-prose-invert-counters': theme('colors.zinc.300'),
        '--tw-prose-invert-headings': theme('colors.zinc.100'),
        '--tw-prose-invert-hr': theme('colors.zinc.700'),
        '--tw-prose-invert-links': theme('colors.teal.400'),
        '--tw-prose-invert-links-hover': theme('colors.teal.300'),
        '--tw-prose-invert-pre-bg': theme('colors.zinc.900'),
        '--tw-prose-invert-pre-border': theme('colors.zinc.700'),
        '--tw-prose-invert-pre-code': theme('colors.zinc.200'),
        '--tw-prose-invert-quote-borders': theme('colors.zinc.700'),
        '--tw-prose-invert-td-borders': theme('colors.zinc.700'),
        '--tw-prose-invert-th-borders': theme('colors.zinc.600'),
        '--tw-prose-invert-underline': theme('colors.teal.400 / 0.4'),
        '--tw-prose-invert-underline-hover': theme('colors.teal.300'),
        '--tw-prose-links': theme('colors.teal.600'),
        '--tw-prose-links-hover': theme('colors.teal.700'),
        '--tw-prose-pre-bg': theme('colors.zinc.50'),
        '--tw-prose-pre-border': theme('colors.zinc.200'),
        '--tw-prose-pre-code': theme('colors.zinc.800'),
        '--tw-prose-quote-borders': theme('colors.zinc.300'),
        '--tw-prose-td-borders': theme('colors.zinc.200'),
        '--tw-prose-th-borders': theme('colors.zinc.300'),
        '--tw-prose-underline': theme('colors.teal.600 / 0.3'),
        '--tw-prose-underline-hover': theme('colors.teal.700'),
        ':is(h2, h3) + *': {
          marginTop: 0,
        },
        ':is(h2, h3) code': {
          fontWeight: theme('fontWeight.bold'),
        },
        ':is(tbody, tfoot) td': {
          paddingBottom: theme('spacing.2'),
          paddingTop: theme('spacing.2'),
        },
        ':is(tbody, tfoot) td:not(:first-child)': {
          paddingLeft: theme('spacing.2'),
        },
        ':is(tbody, tfoot) td:not(:last-child)': {
          paddingRight: theme('spacing.2'),
        },
        '> *': {
          marginBottom: theme('spacing.10'),
          marginTop: theme('spacing.10'),
        },

        // Inline elements
        a: {
          color: 'var(--tw-prose-links)',
          fontWeight: theme('fontWeight.semibold'),
          textDecoration: 'underline',
          textDecorationColor: 'var(--tw-prose-underline)',
          transitionDuration: theme('transitionDuration.150'),
          transitionProperty: 'color, text-decoration-color',
          transitionTimingFunction: theme('transitionTimingFunction.in-out'),
        },
        'a code': {
          color: 'inherit',
        },
        'a:hover': {
          color: 'var(--tw-prose-links-hover)',
          textDecorationColor: 'var(--tw-prose-underline-hover)',
        },

        // Quotes
        blockquote: {
          borderLeftColor: 'var(--tw-prose-quote-borders)',
          borderLeftWidth: theme('borderWidth.2'),
          fontStyle: 'italic',
          paddingLeft: theme('spacing.6'),
        },
        code: {
          backgroundColor: 'var(--tw-prose-code-bg)',
          borderRadius: theme('borderRadius.lg'),
          color: 'var(--tw-prose-code)',
          display: 'inline-block',
          fontSize: theme('fontSize.sm')[0],
          fontWeight: theme('fontWeight.semibold'),
          paddingLeft: theme('spacing.1'),
          paddingRight: theme('spacing.1'),
        },

        // Base
        color: 'var(--tw-prose-body)',

        // Figures
        figcaption: {
          color: 'var(--tw-prose-captions)',
          fontSize: theme('fontSize.sm')[0],
          lineHeight: theme('lineHeight.6'),
          marginTop: theme('spacing.3'),
        },
        'figcaption > p': {
          margin: 0,
        },
        h2: {
          fontSize: theme('fontSize.xl')[0],
          lineHeight: theme('lineHeight.7'),
          marginBottom: theme('spacing.4'),
          marginTop: theme('spacing.20'),
        },

        // Headings
        'h2, h3': {
          color: 'var(--tw-prose-headings)',
          fontWeight: theme('fontWeight.semibold'),
        },
        h3: {
          fontSize: theme('fontSize.base')[0],
          lineHeight: theme('lineHeight.7'),
          marginBottom: theme('spacing.4'),
          marginTop: theme('spacing.16'),
        },

        // Horizontal rules
        hr: {
          '@media (min-width: 1024px)': {
            marginLeft: `calc(${theme('spacing.12')} * -1)`,
            marginRight: `calc(${theme('spacing.12')} * -1)`,
          },
          borderColor: 'var(--tw-prose-hr)',
          borderTopWidth: '1px',
          marginBottom: theme('spacing.20'),
          marginTop: theme('spacing.20'),
        },

        // Images
        img: {
          borderRadius: theme('borderRadius.3xl'),
        },
        li: {
          marginBottom: theme('spacing.2'),
          marginTop: theme('spacing.2'),
          paddingLeft: theme('spacing[3.5]'),
        },
        'li :is(li, p)': {
          marginBottom: theme('spacing.1'),
          marginTop: theme('spacing.1'),
        },
        'li :is(ol, ul)': {
          marginBottom: theme('spacing.2'),
          marginTop: theme('spacing.2'),
        },
        'li::marker': {
          fontSize: theme('fontSize.sm')[0],
          fontWeight: theme('fontWeight.semibold'),
        },
        // Improved line height for better readability (1.6 for body text)
        lineHeight: '1.6',
        // Maximum width for optimal reading (60-75 characters)
        maxWidth: '65ch',
        ol: {
          listStyleType: 'decimal',
        },
        'ol > li::marker': {
          color: 'var(--tw-prose-counters)',
        },
        p: {
          marginBottom: theme('spacing.6'),
          marginTop: theme('spacing.6'),
          // Minimum font size for comfortable reading
          fontSize: '1.0625rem', // 17px
        },

        // Code blocks
        pre: {
          backgroundColor: 'var(--tw-prose-pre-bg)',
          border: '1px solid',
          borderColor: 'var(--tw-prose-pre-border)',
          borderRadius: theme('borderRadius.3xl'),
          color: 'var(--tw-prose-pre-code)',
          fontSize: theme('fontSize.sm')[0],
          fontWeight: theme('fontWeight.medium'),
          overflowX: 'auto',
          padding: theme('spacing.8'),
        },
        'pre code': {
          backgroundColor: 'transparent',
          borderRadius: 0,
          color: 'inherit',
          display: 'inline',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          padding: 0,
        },
        strong: {
          color: 'var(--tw-prose-bold)',
          fontWeight: theme('fontWeight.semibold'),
        },

        // Tables
        table: {
          fontSize: theme('fontSize.sm')[0],
          tableLayout: 'auto',
          textAlign: 'left',
          width: '100%',
        },
        'tbody td': {
          verticalAlign: 'baseline',
        },
        'tbody tr': {
          borderBottomColor: 'var(--tw-prose-td-borders)',
          borderBottomWidth: '1px',
        },
        'tbody tr:last-child': {
          borderBottomWidth: 0,
        },
        tfoot: {
          borderTopColor: 'var(--tw-prose-th-borders)',
          borderTopWidth: '1px',
        },
        'tfoot td': {
          verticalAlign: 'top',
        },
        thead: {
          borderBottomColor: 'var(--tw-prose-th-borders)',
          borderBottomWidth: '1px',
        },
        'thead th': {
          color: 'var(--tw-prose-headings)',
          fontWeight: theme('fontWeight.semibold'),
          paddingBottom: theme('spacing.2'),
          verticalAlign: 'bottom',
        },
        'thead th:not(:first-child)': {
          paddingLeft: theme('spacing.2'),
        },
        'thead th:not(:last-child)': {
          paddingRight: theme('spacing.2'),
        },

        // Lists
        ul: {
          listStyleType: 'disc',
        },
        'ul > li::marker': {
          color: 'var(--tw-prose-bullets)',
        },
        'ul, ol': {
          paddingLeft: theme('spacing.6'),
        },
      },
    },
    invert: {
      css: {
        '--tw-prose-body': 'var(--tw-prose-invert-body)',
        '--tw-prose-bold': 'var(--tw-prose-invert-bold)',
        '--tw-prose-bullets': 'var(--tw-prose-invert-bullets)',
        '--tw-prose-captions': 'var(--tw-prose-invert-captions)',
        '--tw-prose-code': 'var(--tw-prose-invert-code)',
        '--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
        '--tw-prose-counters': 'var(--tw-prose-invert-counters)',
        '--tw-prose-headings': 'var(--tw-prose-invert-headings)',
        '--tw-prose-hr': 'var(--tw-prose-invert-hr)',
        '--tw-prose-links': 'var(--tw-prose-invert-links)',
        '--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
        '--tw-prose-pre-bg': 'var(--tw-prose-invert-pre-bg)',
        '--tw-prose-pre-border': 'var(--tw-prose-invert-pre-border)',
        '--tw-prose-pre-code': 'var(--tw-prose-invert-pre-code)',
        '--tw-prose-quote-borders': 'var(--tw-prose-invert-quote-borders)',
        '--tw-prose-td-borders': 'var(--tw-prose-invert-td-borders)',
        '--tw-prose-th-borders': 'var(--tw-prose-invert-th-borders)',
        '--tw-prose-underline': 'var(--tw-prose-invert-underline)',
        '--tw-prose-underline-hover': 'var(--tw-prose-invert-underline-hover)',
      },
    },
  }
}
