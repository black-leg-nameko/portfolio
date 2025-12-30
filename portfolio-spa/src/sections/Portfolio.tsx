import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useMaskedHeadings } from '../hooks/useMaskedHeadings';
import { useParallaxBg } from '../hooks/useParallaxBg';
import { useSectionBg } from '../hooks/useSectionBg';
const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

export function Portfolio() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);
  useMaskedHeadings(ref);
  useParallaxBg(ref, '.parallax-bg', -6, 10);
  useSectionBg(ref, '#07090f', '#0a0d14');

  // Advanced: pinned timeline revealing cards as you scroll (desktop only)
  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    const mm = ScrollTrigger.matchMedia;
    const ctx = gsap.context(() => {
      mm({
        '(min-width: 826px)': () => {
          const cards = gsap.utils.toArray<HTMLElement>('.project-card', ref);
          if (cards.length === 0) return;
          gsap.set(cards, { autoAlpha: 0, y: 32 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current!,
              start: 'top top',
              end: '+=200%',
              scrub: true,
              pin: true,
              anticipatePin: 1,
            },
          });
          cards.forEach((card, i) => {
            tl.to(card, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, i === 0 ? 0.2 : '+=0.6');
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="portfolio" className="page-section" ref={ref}>
      <div className="parallax-bg" aria-hidden="true" />
      <h2 className="reveal">PORTFOLIO</h2>
      <div className="portfolio-wrapper reveal">
        <div className="project-card">
          <img src={asset('images/ghost-protocol.png')} alt="ghost-ptorocol" />
          <h3>Ghost protocol<br/>(P2Pの新しい通信プロトコル)</h3>
          <h4>In this protocol, a node’s Ghost persona—the key pair `sk_e`/`pk_e` and its derived address—is regenerated and updated each Epoch.</h4>
          <h4 className="tech-line">Technologies: Rust, AEAD, P2P</h4>
        </div>
        <div className="project-card">
          <img src={asset('images/proc-scanner-demo.gif')} alt="proc-scanner" />
          <h3>Rust-based /proc Scanner</h3>
          <h4>Explores potential vulnerabilities in the /proc file system using a custom scoring method</h4>
          <h4 className="tech-line">Technologies: Rust, Linux</h4>
        </div>
        <div className="project-card">
          <img src={asset('images/llmshell-agent-demo.gif')} alt="LLM-based shell agent" />
          <h3>CLI Tool for Operating Bash with Natural Language</h3>
          <h4>Infers and executes bash commands using a local LLM, with an improved UI for command interaction</h4>
          <h4 className="tech-line">Technologies: Llama, Python</h4>
        </div>
        <div className="project-card">
          <img src={asset('images/brain_waves_analysis-demo.gif')} alt="EEG Analysis with Octave" />
          <h3>EEG Analysis Project at University</h3>
          <h4>Performed spectal analysis of measured data using DFT and visualized results with topographic mapping</h4>
          <h4 className="tech-line">Technologies: Octave, DFT</h4>
        </div>
        <div className="project-card">
          <img src={asset('images/AI_mail_generator.png')} alt="AI Mail Generator App Screenshot" />
          <h3>AI-Powered Email Generation App</h3>
          <h4>Allows users to specify the type, content, and tone of emails for automatic generation</h4>
          <h4 className="tech-line">Technologies: OpenAI API, Python, React</h4>
        </div>
      </div>
    </section>
  );
}


