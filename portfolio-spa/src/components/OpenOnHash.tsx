"use client";

import { useEffect } from "react";

/**
 * Sections are closed by default, so a link to /#publications would land on a bare
 * heading. Open the section the fragment names, on load and on every hash change.
 */
export function OpenOnHash() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!(target instanceof HTMLDetailsElement)) return;
      // A section mid-close is still `open`, and would close at the end of its animation.
      if (target.hasAttribute("data-closing")) {
        target.getAnimations().forEach((animation) => animation.cancel());
        target.removeAttribute("data-closing");
        target.style.overflow = "";
      } else if (target.open) {
        return;
      }
      target.open = true;
      target.scrollIntoView();
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return null;
}
