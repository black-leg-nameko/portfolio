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
  useParallaxBg(ref, '.parallax-bg', -7, 9);
  useSectionBg(ref, '#060a10', '#0a0f18');

  const publications: Publication[] = [
    // ここに学会発表や論文の情報を追加してください
    // 例:
    // {
    //   title: '論文の題目',
    //   authors: ['著者名1', '著者名2'],
    //   venue: '学会名・ジャーナル名',
    //   date: '2025年1月',
    //   link: 'https://example.com', // オプション
    //   doi: '10.xxxx/xxxxx', // オプション
    // },
    {
      title: '所有権不変条件によるクロスチェーン NFT の脆弱性分類',
      authors: ['北島琉斗', '櫻井幸一'],
      venue: '電子情報通信学会',
      date: '2026年3月',
      link: 'https://pub.confit.atlas.jp/ja/event/general2026/presentation/A-12-03',
    },
  ];

  const formatAuthors = (authors: string[]): string => {
    return authors.join(', ');
  };

  return (
    <section id="research" className="page-section" ref={ref}>
      <div className="parallax-bg" aria-hidden="true" />
      <h2 className="reveal typewriter">RESEARCH &amp; PUBLICATIONS</h2>
      <div className="my-field-container reveal">
        <h3 className="my-field">Blockchain Security</h3>
        <h3 className="my-field">LLM Security</h3>
      </div>

      {publications.length > 0 && (
        <div className="research-details reveal">
          <h3>Publications & Presentations</h3>
          <div className="publications-list">
            {publications.map((pub, index) => (
              <div key={index} className="publication-item">
                <div className="publication-header">
                  <h4 className="publication-title">
                    {pub.link ? (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer">
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h4>
                </div>
                <div className="publication-authors">{formatAuthors(pub.authors)}</div>
                <div className="publication-venue">{pub.venue}</div>
                <div className="publication-meta">
                  <span className="publication-date">{pub.date}</span>
                  {pub.doi && (
                    <span className="publication-doi">
                      DOI: <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">{pub.doi}</a>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
