"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/**
 * Thumbnail well. The skeleton sits *behind* the image rather than gating it on an
 * onLoad handler, so a row is never blank before hydration — but it has to be removed
 * once the image is there: `object-contain` letterboxes, so a skeleton left underneath
 * keeps pulsing around the picture forever.
 *
 * `complete` is checked on mount because a cached image can finish decoding before
 * hydration, and then `onLoad` never fires.
 */
export function ProjectThumb({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imageRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden border border-hairline bg-canvas-soft ${className}`}
      style={{ aspectRatio: "16 / 10" }}
    >
      {failed ? (
        <p className="meta absolute inset-0 grid place-items-center px-2 text-center">
          Preview unavailable
        </p>
      ) : (
        <>
          {!loaded && (
            <div className="skeleton-pulse absolute inset-0 bg-canvas-soft-2" aria-hidden="true" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
          <img
            ref={imageRef}
            src={asset(src)}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            // contain, not cover: these are screenshots and diagrams — cropping them loses the point
            className="relative h-full w-full object-contain p-2"
          />
        </>
      )}
    </div>
  );
}
