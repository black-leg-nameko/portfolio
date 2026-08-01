"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

const POSTER = asset("/assets/torus-poster.png");
const ANIMATION = asset("/assets/torus.webp");

type Connection = { saveData?: boolean };

/**
 * The site's only decoration: the ASCII torus, keyed to transparency and re-inked
 * so it reads as printed glyph density on white paper. It sits beside the name, small —
 * where a researcher's page would put a portrait.
 *
 * The poster frame renders first and is kept — never swapped for the 1.7 MB animation —
 * for reduced-motion visitors, phone-sized viewports, and anyone on Save-Data. Everyone
 * else gets the animation once the glyph is actually on screen. At the top of the page
 * that is immediately; the observer stays because it is what keeps the rule true if the
 * glyph is ever moved further down.
 */
export function Torus({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState(POSTER);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallScreen = window.matchMedia("(max-width: 699px)").matches;
    const saveData = Boolean((navigator as Navigator & { connection?: Connection }).connection?.saveData);
    if (reduceMotion || smallScreen || saveData) return;

    const node = ref.current;
    if (!node) return;

    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const image = new Image();
        image.src = ANIMATION;
        image
          .decode()
          .then(() => {
            if (!cancelled) setSrc(ANIMATION);
          })
          .catch(() => {
            /* keep the poster frame — a failed animation must not blank the glyph */
          });
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- animated WebP, intentionally unoptimised
    <img
      ref={ref}
      src={src}
      alt=""
      aria-hidden="true"
      width={244}
      height={353}
      draggable={false}
      className={`pointer-events-none select-none opacity-70 ${className}`}
    />
  );
}
