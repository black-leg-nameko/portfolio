import { startTransition, useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTypewriter } from '../hooks/useTypewriter';
import { useParallaxBg } from '../hooks/useParallaxBg';
import { useSectionBg } from '../hooks/useSectionBg';
import { ProjectModal } from '../components/ProjectModal';

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

const projects = [
  {
    title: 'LeftaR',
    img: asset('images/LeftaR3DEMO1.png'),
    images: [asset('images/LeftaR3DEMO1.png'), asset('images/LeftaR4.jpeg'), asset('images/LeftaR-demo2.jpeg')],
    desc: 'AR-based rehabilitation tool for people with Unilateral Spatial Neglect (USN), especially those who tend to ignore stimuli on the left side.',
    tech: 'Swift',
  },
  {
    title: 'NNAST (GNN+LLM型脆弱性診断ツール)',
    img: asset('images/NNAST1.png'),
    images: [asset('images/NNAST1.png'), asset('images/NNAST2.png')],
    desc: 'AI-driven security system that analyzes web app code, detects vulnerable locations, and proposes fixes.',
    tech: 'PyTorch, GNN, LLM',
  },
  {
    title: 'AegisID protocol (分散型ID認証プロトコル)',
    img: asset('images/aegis-id-oidc.svg'),
    desc: 'Decentralized ID and verifiable credentials platform combining SD-JWT, DID, WebAuthn, and OIDC.',
    tech: 'SD-JWT, DID, WebAuthn, OIDC',
  },
  {
    title: 'Rust-based /proc Scanner',
    img: asset('images/proc-scanner-demo.gif'),
    desc: 'Scanner exploring potential vulnerabilities in the /proc file system using a custom scoring method.',
    tech: 'Rust, Linux',
  },
  {
    title: 'CLI Tool for Operating Bash with Natural Language',
    img: asset('images/llmshell-agent-demo.gif'),
    desc: 'Local LLM-based CLI assistant for inferring and executing bash commands.',
    tech: 'Llama, Python',
  },
  {
    title: 'EEG Analysis Project at University',
    img: asset('images/brain_waves_analysis-demo.gif'),
    desc: 'Spectral analysis of measured data using DFT and topographic visualization.',
    tech: 'Octave, DFT',
  },
  {
    title: 'AI-Powered Email Generation App',
    img: asset('images/AI_mail_generator.png'),
    desc: 'Email generation app with selectable type, content, and tone.',
    tech: 'OpenAI API, Python, React',
  },
  {
    title: 'Rubik\'s Cube Solver',
    img: asset('images/rubikdemo.gif'),
    desc: 'Browser-based 3D Rubik\'s Cube simulator and automated solver.',
    tech: 'Three.js, HTML/CSS',
  },
];

export function Portfolio() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref, '.reveal, .project-card');
  useTypewriter(ref, 'h2');
  useParallaxBg(ref, '.parallax-bg', -5, 8);
  useSectionBg(ref, '#0a0a0c', '#101013');

  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="portfolio" className="page-section" ref={ref}>
      <div className="parallax-bg" aria-hidden="true" />

      <div className="section-head">
        <h2 className="reveal typewriter">PORTFOLIO</h2>
        <p className="section-copy reveal">
          Selected work across security research, AI tooling, and product experiments.
        </p>
      </div>

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <button
            key={project.title}
            className="project-card card-button"
            onClick={() => startTransition(() => setSelected(index))}
            aria-haspopup="dialog"
            aria-controls="project-detail"
          >
            <img src={project.img} alt={project.title} loading="lazy" decoding="async" />
            <div className="project-card-body">
              <h3 dangerouslySetInnerHTML={{ __html: project.title.replace('\n', '<br/>') }} />
              <p className="project-card-desc">{project.desc}</p>
              <span className="tech-line">{project.tech}</span>
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <ProjectModal id="project-detail" project={projects[selected]} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
