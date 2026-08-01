"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import type { Project } from "@/data/projects";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && <DialogBody key={project.slug} project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}

/** Keyed by slug, so selecting another project resets the gallery and playback. */
function DialogBody({ project, onClose }: { project: Project; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [demoFailed, setDemoFailed] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  // The CSS reduced-motion rule cannot reach a JS-driven animation, so the fade reads the
  // preference itself — otherwise it is the one transition that ignores the setting.
  const fade = { duration: useReducedMotion() ? 0 : 0.18 };

  // aria-modal claims the rest of the page is inert, so the keyboard has to behave that
  // way too: focus moves in, Tab cycles inside, and the trigger gets focus back on close.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (node) => node.offsetParent !== null,
      );
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (!panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const current = project.media[index];
  const showAnimation = Boolean(playing && current?.animated);

  return (
    <>
      {current && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Not a button: a full-viewport "Close" control is noise in the accessibility
              tree, and Escape plus the header's Close already cover the keyboard. */}
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-ink/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            tabIndex={-1}
            className="relative flex max-h-[92vh] w-full max-w-[760px] flex-col overflow-hidden border border-hairline bg-canvas shadow-[0_12px_40px_-16px_#00000033] outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
          >
            <div className="flex items-start justify-between gap-4 border-b border-hairline px-6 py-6 sm:px-8">
              <div>
                <h2 id="project-dialog-title" className="heading">
                  {project.title}
                </h2>
                {project.titleJa && (
                  <p className="meta mt-1" lang="ja">
                    {project.titleJa}
                  </p>
                )}
              </div>
              <button type="button" onClick={onClose} className="control shrink-0">
                Close
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 sm:px-8">
              <div className="relative overflow-hidden border border-hairline bg-canvas-soft">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                <img
                  src={asset(showAnimation && current.animated ? current.animated : current.src)}
                  alt={current.alt}
                  onLoad={() => {
                    if (showAnimation) setLoadingDemo(false);
                  }}
                  onError={() => {
                    setPlaying(false);
                    setLoadingDemo(false);
                    setDemoFailed(true);
                  }}
                  // capped, not free-standing: a portrait screenshot at full column width
                  // pushes the description out of the panel entirely
                  className="mx-auto block max-h-[52vh] w-full object-contain p-2"
                />
                {current.animated && !playing && (
                  <button
                    type="button"
                    onClick={() => {
                      setDemoFailed(false);
                      setLoadingDemo(true);
                      setPlaying(true);
                    }}
                    // no plate over the poster: dimming it makes the still read as disabled
                    className="group absolute inset-0 grid place-items-center"
                  >
                    <span className="control group-hover:border-ink">
                      {demoFailed ? "Retry demo" : "Play demo"}
                      {current.animatedSize && !demoFailed && (
                        <span className="ml-2 text-mute">{current.animatedSize}</span>
                      )}
                    </span>
                  </button>
                )}
                {playing && !loadingDemo && !demoFailed && (
                  <button
                    type="button"
                    onClick={() => setPlaying(false)}
                    className="control absolute right-3 top-3 bg-canvas/90"
                  >
                    Stop
                  </button>
                )}
                {loadingDemo && (
                  <p className="meta absolute inset-x-0 bottom-0 bg-canvas/85 py-2 text-center">
                    Loading demo…
                  </p>
                )}
                {demoFailed && (
                  <p className="meta absolute inset-x-0 bottom-0 bg-error-soft py-2 text-center text-error">
                    The demo could not be loaded.
                  </p>
                )}
              </div>

              {/* Desktop screen recordings do not shrink well — let people open one at full size. */}
              <p className="meta mt-1 -mb-3">
                {current.animated ? "Screen recording · " : ""}
                <a
                  className="meta-link"
                  href={asset(showAnimation && current.animated ? current.animated : current.src)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open full size ↗
                </a>
              </p>

              {project.media.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.media.map((item, itemIndex) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => {
                        setIndex(itemIndex);
                        setPlaying(false);
                        setLoadingDemo(false);
                        setDemoFailed(false);
                      }}
                      aria-label={`Show image ${itemIndex + 1}`}
                      aria-current={itemIndex === index}
                      className={`h-16 w-24 overflow-hidden border bg-canvas-soft transition-colors ${
                        itemIndex === index ? "border-ink" : "border-hairline hover:border-hairline-strong"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                      <img
                        src={asset(item.src)}
                        alt=""
                        // contain here too — a cropped thumbnail of a diagram picks one
                        // meaningless corner of it
                        className="h-full w-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}

              <p className="mt-6 max-w-[68ch]">{project.description}</p>

              <p className="meta mt-4">
                {project.field} · {project.stack.join(" · ")}
              </p>

              {project.link && (
                <p className="mt-4">
                  <a href={project.link.href} target="_blank" rel="noreferrer">
                    {project.link.label} ↗
                  </a>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
