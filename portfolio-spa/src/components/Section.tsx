"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

const DURATION = 240;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * A home-page section, closed until it is asked for. Native <details>, so it opens
 * without JavaScript, the content stays in the HTML for crawlers, and Chromium's
 * find-in-page opens a closed section when a match lands inside it.
 *
 * A click on the summary animates the height instead of snapping. The browser's own
 * toggle is cancelled and replayed by hand: open first and grow to the measured
 * height, or shrink to the summary and close at the end. A click mid-animation
 * reverses from wherever the height is. Fragment and find-in-page opens stay instant.
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
  const ref = useRef<HTMLDetailsElement>(null);
  const animation = useRef<Animation | null>(null);
  const opening = useRef(false);

  const toggle = (event: MouseEvent<HTMLElement>) => {
    const details = ref.current;
    if (!details) return;
    // The CSS reduced-motion rule cannot reach a JS animation, so read it here.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();

    // "running", not merely present: OpenOnHash may have cancelled a close from outside.
    const running = animation.current?.playState === "running";
    const willOpen = running ? !opening.current : !details.open;
    const from = details.offsetHeight;
    animation.current?.cancel();

    details.open = true;
    // The sign follows the click, not the attribute: a closing section shows "+" now.
    details.toggleAttribute("data-closing", !willOpen);
    const to = willOpen
      ? details.offsetHeight
      : (details.querySelector("summary")?.offsetHeight ?? 0);

    details.style.overflow = "hidden";
    opening.current = willOpen;
    const current = details.animate(
      { height: [`${from}px`, `${to}px`] },
      { duration: DURATION, easing: EASING },
    );
    animation.current = current;
    current.onfinish = () => {
      if (!willOpen) details.open = false;
      details.removeAttribute("data-closing");
      details.style.overflow = "";
      animation.current = null;
    };
  };

  return (
    <details id={id} ref={ref} className="section">
      <summary onClick={toggle}>
        <h2 className="heading">{title}</h2>
      </summary>
      <div className="section-body">{children}</div>
    </details>
  );
}
