import type { Publication } from "@/data/publications";

/**
 * One labelled group of publications. The label is set in the metadata voice, not as a
 * heading: it has to name the group without competing with the paper titles under it.
 */
export function PublicationList({
  label,
  publications,
}: {
  label: string;
  publications: Publication[];
}) {
  if (publications.length === 0) return null;

  return (
    <div>
      <h3 className="meta">{label}</h3>
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
