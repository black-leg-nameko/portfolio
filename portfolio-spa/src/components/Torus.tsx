"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";

const POSTER = asset("/assets/torus-poster.png");
const ANIMATION = asset("/assets/torus.webp");
const MOBILE_ANIMATION = asset("/assets/torus-mobile.webp");

/**
 * The site's only decoration: the ASCII torus, keyed to transparency and re-inked
 * so it reads as printed glyph density on white paper. It sits beside the name, small —
 * where a researcher's page would put a portrait.
 *
 * It animates everywhere, unconditionally: no reduced-motion, Save-Data, or
 * in-viewport gate. Phones get a half-resolution cut of the same loop at the same
 * frame rate — picked by the browser from <picture>, so the animation is the first and
 * only frame anyone downloads. The poster is kept solely as the fallback if the WebP fails.
 */
export function Torus({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- animated WebP, intentionally unoptimised
    <img
      src={failed ? POSTER : ANIMATION}
      alt=""
      aria-hidden="true"
      width={244}
      height={353}
      onError={() => setFailed(true)}
      draggable={false}
      className={`pointer-events-none select-none opacity-70 ${className}`}
    />
  );

  if (failed) return image;

  return (
    // `display: contents` keeps <picture> out of the layout, so the <img> stays the
    // flex item its className sizes.
    <picture style={{ display: "contents" }}>
      <source media="(max-width: 699px)" srcSet={MOBILE_ANIMATION} type="image/webp" />
      {image}
    </picture>
  );
}
