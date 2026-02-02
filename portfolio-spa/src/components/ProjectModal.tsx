import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { pauseLenis, resumeLenis } from '../lib/lenis';

type Project = {
  title: string;
  img: string;
  images?: string[];
  desc: string;
  tech: string;
};

export function ProjectModal({
  id,
  project,
  onClose,
}: {
  id: string;
  project: Project;
  onClose: () => void;
}) {
  const [imageFull, setImageFull] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    const step = el.clientWidth;
    el.scrollBy({ left: direction === 'right' ? step : -step, behavior: 'smooth' });
  };

  // Lock body scroll while modal is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    pauseLenis();
    return () => {
      document.body.style.overflow = prevOverflow;
      resumeLenis();
    };
  }, []);

  return createPortal(
    (
      <AnimatePresence>
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.dialog
          id={id}
          className={`modal-panel ${imageFull ? 'full-image' : ''}`}
          aria-modal="true"
          open
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close details">×</button>
          <button
            className="modal-toggle"
            onClick={() => setImageFull((v) => !v)}
            aria-label={imageFull ? 'Shrink image' : 'Expand image'}
            title={imageFull ? 'Shrink image' : 'Expand image'}
          >
            {imageFull ? 'Fit to card' : 'View full image'}
          </button>
          <div className="modal-content-row">
          <div className="modal-media">
            {(project.images && project.images.length > 1) ? (
              <div className="modal-media-slider-wrap">
                <div
                  ref={sliderRef}
                  className="modal-media-slider"
                  onClick={() => setImageFull((v) => !v)}
                  style={{ cursor: imageFull ? 'zoom-out' : 'zoom-in' }}
                  role="img"
                  aria-label="Project images, scroll horizontally to see more"
                >
                  {project.images.map((src, idx) => (
                    <img key={idx} src={src} alt="" className="modal-slide-img" />
                  ))}
                </div>
                <button
                  type="button"
                  className="modal-slider-hint modal-slider-hint-prev"
                  onClick={(e) => { e.stopPropagation(); scrollSlider('left'); }}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="modal-slider-hint modal-slider-hint-next"
                  onClick={(e) => { e.stopPropagation(); scrollSlider('right'); }}
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            ) : (
              <img
                src={project.img}
                alt=""
                onClick={() => setImageFull((v) => !v)}
                style={{ cursor: imageFull ? 'zoom-out' : 'zoom-in' }}
              />
            )}
          </div>
          <div className="modal-body">
            <h3 className="modal-title" dangerouslySetInnerHTML={{ __html: project.title }} />
            <p className="modal-desc">{project.desc}</p>
            <p className="modal-tech">{project.tech}</p>
          </div>
          </div>
        </motion.dialog>
      </AnimatePresence>
    ),
    document.body
  );
}


