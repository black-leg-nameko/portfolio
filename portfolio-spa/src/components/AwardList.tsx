import type { Award } from "@/data/awards";

/**
 * What the entry is, in the awarding body's own word. It sits on each entry rather than
 * over a group of them: the list is one timeline, and splitting it by kind would be the
 * same distinction bought at the cost of the chronology. It is set in the metadata voice
 * and carries no box — a bordered token would be the badge the system does not have.
 */
const kindLabel: Record<Award["kind"], string> = {
  grant: "採択",
  award: "受賞",
  fellowship: "採用",
};

/** The award list — one run, reverse chronological, no grouping. */
export function AwardList({ awards }: { awards: Award[] }) {
  if (awards.length === 0) return null;

  return (
    <ol className="space-y-6">
      {awards.map((award) => {
        // lang is set per entry, not per site, exactly as in the publication list: it is
        // what puts a Japanese title in the sans face and keeps English out of it.
        const ja = award.ja ? { lang: "ja" } : {};

        return (
          <li key={award.title}>
            {/* The label runs on from the title as text, rather than being pushed to the
                right edge of the column: flushing it right would be a second column the
                layout does not have, it would not collapse below 700px, and holding a
                fixed slot for it takes 42px off the title's measure — enough to break a
                Japanese title mid-word. As text it costs nothing until it is needed. */}
            <p className="entry-title" {...ja}>
              {award.title}{" "}
              <span className="meta ml-1" lang="ja">
                {kindLabel[award.kind]}
              </span>
            </p>

            {/* The track gets a line of its own rather than a slot in the run below:
                it is the one long value here, and `dotted` would hold it unbreakable
                and push the page sideways at 375px instead of letting it fold. */}
            {award.track && (
              <p className="meta mt-1" {...ja}>
                {award.track}
              </p>
            )}

            {/* Every value on this line is short Latin, so `dotted` can hold each one
                together with its separator — a wrap never strands a dot at a line end. */}
            <p className={`meta dotted ${award.track ? "" : "mt-1"}`}>
              {award.organization && <span>{award.organization}</span>}
              {award.amount && <span>{award.amount}</span>}
              {/* Not a <time>: a Japanese fiscal year is not a date, and "2026" as a
                  machine value would claim the calendar year instead. */}
              <span>FY{award.date}</span>
            </p>
          </li>
        );
      })}
    </ol>
  );
}
