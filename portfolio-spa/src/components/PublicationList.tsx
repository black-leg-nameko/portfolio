import type { Publication } from "@/data/publications";

/**
 * One labelled group of publications. The label is set in the metadata voice, not as a
 * heading: it has to name the group without competing with the paper titles under it.
 */
export function PublicationList({
  label,
  labelEn,
  publications,
}: {
  /** Japanese, and carrying `lang` itself: JetBrains Mono has no CJK and would fall back
   *  mid-string without it, which is why it is the sans face at 13px. */
  label: string;
  /** The same label in English, so a reader who has no Japanese still gets the split. */
  labelEn: string;
  publications: Publication[];
}) {
  if (publications.length === 0) return null;

  return (
    <div>
      {/* Two languages on one line, the way a Japanese venue already sits in an English
          meta line: the dot is on the wrapper, so a wrap moves it with the run it belongs
          to rather than leaving it at the end of a line. */}
      <h3 className="meta dotted">
        {/* The space between the two runs is load-bearing twice over: JSX drops the
            newline, and without it the two `nowrap` spans form one unbreakable line that
            overruns the right gutter below 375px — and the generated dot lands in the
            heading's accessible name as a single token, "査読付き国際会議·Peer-reviewed". */}
        <span lang="ja">{label}</span> <span>{labelEn}</span>
      </h3>
      <ol className="mt-3 space-y-6">
        {publications.map((publication) => {
          // lang is set per entry, not per site: it is what puts Japanese metadata in the
          // sans face, and what keeps English venues out of it.
          const ja = publication.ja ? { lang: "ja" } : {};

          return (
            <li key={publication.title}>
              <p className="entry-title" {...ja}>
                {publication.title}
              </p>
              <p className="meta mt-1" {...ja}>
                {publication.authors.join(publication.ja ? "・" : ", ")}
                {publication.affiliation && ` · ${publication.affiliation}`}
              </p>
              <p className="meta">
                {/* state first: on a long venue it would otherwise wrap onto a line of its
                    own and read as a stray word */}
                {publication.status && `${publication.status} · `}
                <span {...ja}>{publication.venue}</span>
                {publication.number && ` · ${publication.number}`}
                {publication.date && (
                  <>
                    {" · "}
                    <time dateTime={publication.date}>{publication.date}</time>
                  </>
                )}
                {publication.href && (
                  <>
                    {" · "}
                    <a href={publication.href} target="_blank" rel="noreferrer">
                      page
                    </a>
                  </>
                )}
                {publication.doi && (
                  <>
                    {" · "}
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      doi
                    </a>
                  </>
                )}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
