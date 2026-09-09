import { Fragment } from "react";
import type { Publication } from "@/data/publications";

/**
 * A dot bound to the value that follows it, for a value too long to sit in a `dotted`
 * run: the space in front of the dot is the only break opportunity, and the no-break
 * space behind it glues the dot to the value's first character, so a wrap carries the
 * separator down with the value it introduces instead of stranding it at a line end.
 * It is the same ink as the dot `dotted` generates — one entry, one separator.
 */
function BoundDot() {
  return (
    <>
      {" "}
      <span className="dot-bound">·</span>
      {"\u00a0"}
    </>
  );
}

/** What precedes a piece of a name run: nothing, a space, or a bound dot. */
type Lead = "none" | "space" | "dot";

/**
 * An author or affiliation line, cut into pieces that may not break internally. A name
 * and an institution are single tokens to a reader and several to the line breaker,
 * which otherwise splits "宮本 耕平" at its space and "金烏工科大学校" anywhere at all.
 * Each piece keeps the separator that follows it — a Japanese line may end on "・" but
 * may never begin with one — and carries what goes in front of it, which for a Japanese
 * author list is nothing at all: "・" is already a full-width separator, and a space
 * after it would open a wider gap between two authors than inside either of their names.
 */
function nameRun(publication: Publication): { text: string; lead: Lead }[] {
  const separator = publication.ja ? "・" : ",";
  const authors = publication.authors.map((author, index) => ({
    text: index < publication.authors.length - 1 ? `${author}${separator}` : author,
    lead: (publication.ja ? "none" : "space") as Lead,
  }));

  if (!publication.affiliation) return authors;

  // The institutions are already written as a "/"-separated run, and each one is its own
  // unbreakable token; the dot that opens the run belongs to the first of them.
  const institutions = publication.affiliation.split(" / ");
  return [
    ...authors,
    ...institutions.map((institution, index) => ({
      text: `${institution}${index < institutions.length - 1 ? " /" : ""}`,
      lead: (index === 0 ? "dot" : "space") as Lead,
    })),
  ];
}

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
          // The short values get a line of their own. They are the only ones `dotted` can
          // hold — and the only ones that carry links, which need a real target.
          const hasIndex = Boolean(
            publication.number || publication.date || publication.href || publication.doi,
          );
          const hasLink = Boolean(publication.href || publication.doi);

          return (
            <li key={publication.title}>
              <p className="entry-title" {...ja}>
                {publication.title}
              </p>
              <p className="meta mt-1" {...ja}>
                {nameRun(publication).map((piece, index) => (
                  <Fragment key={`${index}-${piece.text}`}>
                    {index > 0 && piece.lead === "none" && <wbr />}
                    {piece.lead === "space" && index > 0 && " "}
                    {piece.lead === "dot" && <BoundDot />}
                    <span className="whitespace-nowrap">{piece.text}</span>
                  </Fragment>
                ))}
              </p>
              <p className="meta">
                {/* state first: on a long venue it would otherwise wrap onto a line of its
                    own and read as a stray word */}
                {publication.status && (
                  <>
                    {publication.status}
                    <BoundDot />
                  </>
                )}
                {/* The venue is the one long value here, so it stays breakable rather
                    than joining the `dotted` run below and pushing the page sideways. */}
                <span {...ja}>{publication.venue}</span>
              </p>
              {hasIndex && (
                // The negative margins give back the block padding `dotted` puts on a link
                // to clear the touch-target floor — both sides of it, so the line sits in
                // the entry at the same 20px as the two above it.
                <p className={`meta dotted ${hasLink ? "-mt-3 -mb-3" : ""}`}>
                  {/* Each value is wrapped, never the anchor itself: the dot is generated
                      on the wrapper, and inside the anchor it would take the underline and
                      land in the link's accessible name as "·page". */}
                  {publication.number && <span>{publication.number}</span>}
                  {publication.date && (
                    <span>
                      <time dateTime={publication.date}>{publication.date}</time>
                    </span>
                  )}
                  {publication.href && (
                    <span>
                      <a href={publication.href} target="_blank" rel="noreferrer">
                        page
                      </a>
                    </span>
                  )}
                  {publication.doi && (
                    <span>
                      <a
                        href={`https://doi.org/${publication.doi}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        doi
                      </a>
                    </span>
                  )}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
