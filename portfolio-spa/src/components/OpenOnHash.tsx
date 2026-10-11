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
      if (target instanceof HTMLDetailsElement && !target.open) {
        target.open = true;
        target.scrollIntoView();
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return null;
}
