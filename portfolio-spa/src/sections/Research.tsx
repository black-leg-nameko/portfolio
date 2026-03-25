import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTypewriter } from '../hooks/useTypewriter';
import { useParallaxBg } from '../hooks/useParallaxBg';
import { useSectionBg } from '../hooks/useSectionBg';

type Publication = {
  title: string;
  authors: string[];
  venue: string;
  date: string;
  link?: string;
  doi?: string;
};

export function Research() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref, '.reveal, .publication-item');
  useTypewriter(ref, 'h2');
  useParallaxBg(ref, '.parallax-bg', -5, 8);
  useSectionBg(ref, '#0c0c0e', '#111113');

  const publications: Publication[] = [
    {
      title: '所有権不変条件によるクロスチェーン NFT の脆弱性分類',
      authors: ['北島琉斗', '櫻井幸一'],
      venue: '電子情報通信学会',
      date: '2026年3月',
      link: 'https://pub.confit.atlas.jp/ja/event/general2026/presentation/A-12-03',
    },
    {
      title: 'クロスチェーンブリッジ遅延の予測に基づく時間的不整合脆弱性の機械学習的評価',
      authors: ['北島琉斗', '櫻井幸一'],
      venue: '第112回CSEC',
      date: '2026年3月',
      link: 'https://www.ipsj.or.jp/kenkyukai/event/dps206csec112.html',
    },
  ];

  return (
    <section id="research" className="page-section" ref={ref}>
      <div className="parallax-bg" aria-hidden="true" />

      <div className="section-head">
        <h2 className="reveal typewriter">RESEARCH &amp; PUBLICATIONS</h2>
        <p className="section-copy reveal">
          Current interests include blockchain security, LLM security, and machine-learning-based
          evaluation of attack surfaces.
        </p>
      </div>

      <div className="simple-panel reveal">
        <div className="my-field-container">
          <span className="my-field">Blockchain Security</span>
          <span className="my-field">LLM Security</span>
          <span className="my-field">Applied ML</span>
        </div>

        <hr className="section-divider" />

        <div className="publications-list">
          {publications.map((pub, index) => (
            <article key={`${pub.title}-${index}`} className="publication-item">
              <h3 className="publication-title">{pub.title}</h3>
              <p className="publication-authors">{pub.authors.join(', ')}</p>
              <p className="publication-venue">{pub.venue}</p>
              <div className="publication-meta">
                <span className="publication-date">{pub.date}</span>
                {pub.link && (
                  <a className="publication-link" href={pub.link} target="_blank" rel="noopener noreferrer">
                    View publication
                  </a>
                )}
                {pub.doi && (
                  <a
                    className="publication-doi"
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DOI: {pub.doi}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
