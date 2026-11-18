export const dynamic = 'force-static'

/**
 * Serves the Go import metadata that maps laststance.io/v to its Git repository.
 * Next.js calls this handler when Go or a browser requests /v.
 *
 * @example
 * ```http
 * GET /v?go-get=1
 * ```
 */
export function GET(): Response {
  return new Response(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="go-import" content="laststance.io/v git https://github.com/laststance/v">
  <title>laststance/v</title>
</head>
<body>
  <a href="https://github.com/laststance/v">laststance/v (GitHub)</a>
</body>
</html>`,
    { headers: { 'content-type': 'text/html; charset=utf-8' } },
  )
}
