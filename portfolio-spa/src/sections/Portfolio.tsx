import { useRef, useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTypewriter } from '../hooks/useTypewriter';
import { useParallaxBg } from '../hooks/useParallaxBg';
import { useSectionBg } from '../hooks/useSectionBg';
import { ProjectModal } from '../components/ProjectModal';
const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

export function Portfolio() {
  const ref = useRef<HTMLElement | null>(null);
  // Reveal headings and each project card smoothly (mobile-like behavior)
  useScrollReveal(ref, '.reveal, .project-card');
  useTypewriter(ref, 'h2');
  useParallaxBg(ref, '.parallax-bg', -6, 10);
  useSectionBg(ref, '#07090f', '#0a0d14');
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const projects = [
    {
      title: 'AegisID protocol (分散型ID認証プロトコル)',
      img: asset('images/aegis-id-oidc.svg'),
      desc: 'A decentralized ID and verifiable credentials platform that combines SD-JWT, DID, WebAuthn, and OIDC. Achieves both privacy and interoperability through self-sovereign identity.',
      tech: 'Technologies: SD-JWT, DID, WebAuthn, OIDC',
    },
    {
      title: 'Ghost protocol (P2Pの新しい通信プロトコル)',
      img: asset('images/ghost-protocol.png'),
      desc: 'In this protocol, a node’s Ghost persona—the key pair `sk_e`/`pk_e` and its derived address—is regenerated and updated each Epoch.',
      tech: 'Technologies: Rust, AEAD, P2P',
    },
    {
      title: 'Rust-based /proc Scanner',
      img: asset('images/proc-scanner-demo.gif'),
      desc: 'Explores potential vulnerabilities in the /proc file system using a custom scoring method',
      tech: 'Technologies: Rust, Linux',
    },
    {
      title: 'CLI Tool for Operating Bash with Natural Language',
      img: asset('images/llmshell-agent-demo.gif'),
      desc: 'Infers and executes bash commands using a local LLM, with an improved UI for command interaction',
      tech: 'Technologies: Llama, Python',
    },
    {
      title: 'EEG Analysis Project at University',
      img: asset('images/brain_waves_analysis-demo.gif'),
      desc: 'Performed spectal analysis of measured data using DFT and visualized results with topographic mapping',
      tech: 'Technologies: Octave, DFT',
    },
    {
      title: 'AI-Powered Email Generation App',
      img: asset('images/AI_mail_generator.png'),
      desc: 'Allows users to specify the type, content, and tone of emails for automatic generation',
      tech: 'Technologies: OpenAI API, Python, React',
    },
  ];

  return (
    <section id="portfolio" className="page-section" ref={ref}>
      <div className="parallax-bg" aria-hidden="true" />
      <h2 className="reveal typewriter">PORTFOLIO</h2>
      <div className="portfolio-grid reveal">
        {projects.map((p, i) => (
          <button
            key={p.title}
            className="project-card card-button"
            onClick={() => setSelected(i)}
            aria-haspopup="dialog"
            aria-controls="project-detail"
          >
            <img src={p.img} alt={p.title} loading="lazy" decoding="async" />
            <h3 dangerouslySetInnerHTML={{ __html: p.title.replace('\n', '<br/>') }} />
            <h4>{p.desc}</h4>
            <h4 className="tech-line">{p.tech}</h4>
          </button>
        ))}
      </div>
      {selected !== null && (
        <ProjectModal
          id="project-detail"
          project={projects[selected]}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}


