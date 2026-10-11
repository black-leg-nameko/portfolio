import type { ReactNode } from "react";

/**
 * A home-page section, closed until it is asked for. Native <details>, so it opens
 * without JavaScript, the content stays in the HTML for crawlers, and Chromium's
 * find-in-page opens a closed section when a match lands inside it.
 */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <details id={id} className="section">
      <summary>
        <h2 className="heading">{title}</h2>
      </summary>
      <div className="section-body">{children}</div>
    </details>
  );
}
