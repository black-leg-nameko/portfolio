/**
 * Prefixes a public asset with the deploy base path.
 * `next/link` and `next/image` handle this automatically; plain <img>/<a> do not.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
