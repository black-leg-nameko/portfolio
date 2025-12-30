import { motion, AnimatePresence } from 'framer-motion';

type Project = {
  title: string;
  img: string;
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
  return (
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
        className="modal-panel"
        aria-modal="true"
        open
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close details">×</button>
        <div className="modal-media">
          <img src={project.img} alt="" />
        </div>
        <div className="modal-body">
          <h3 className="modal-title" dangerouslySetInnerHTML={{ __html: project.title }} />
          <p className="modal-desc">{project.desc}</p>
          <p className="modal-tech">{project.tech}</p>
        </div>
      </motion.dialog>
    </AnimatePresence>
  );
}


