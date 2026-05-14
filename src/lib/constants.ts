/**
 * Number of articles rendered per page on the /articles index.
 * Sized so iPhone 14 (390px viewport) stays well under Playwright's
 * 32767px screenshot dimension limit even as the archive grows.
 */
export const ARTICLES_PER_PAGE = 10
