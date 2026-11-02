/**
 * Renderers for the markup that catalog prose may contain, passed to `t.rich`.
 *
 * ICU has no self-closing tags (`<br/>` prints as text), so catalogs write a line
 * break as `<br></br>` and the Uses and About pages render it with this.
 *
 * @example
 * ```tsx
 * <Tool title={t('tools.pnpm.title')}>{t.rich('tools.pnpm.body', proseTags)}</Tool>
 * ```
 */
export const proseTags = {
  br: () => <br />,
}
