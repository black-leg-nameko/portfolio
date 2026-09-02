import Link from "next/link";
import { AwardList } from "@/components/AwardList";
import { PublicationList } from "@/components/PublicationList";
import { SocialLinks } from "@/components/SocialLinks";
import { Torus } from "@/components/Torus";
import { awards } from "@/data/awards";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";

/** Reviewed work and unreviewed work are listed apart, and labelled as such. */
const peerReviewed = publications.filter((publication) => publication.peerReviewed);
const notPeerReviewed = publications.filter((publication) => !publication.peerReviewed);


export default function HomePage() {
  return (
    <div className="column py-20 sm:py-28">
      {/* col-reverse below 700px: the column is too narrow to hold the glyph beside the
          name, so it sits above it rather than shrinking into a smudge. */}
      <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div>
          <h1 className="name">{profile.name}</h1>

          <p className="mt-10">{profile.statement}</p>

          <p className="mt-6">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          {/* The three profiles are the one place the page uses marks instead of words —
              GitHub, X and LinkedIn are recognised faster as glyphs than as labels. */}
          <SocialLinks className="mt-6" />
        </div>

        {/* The one piece of decoration on the site. */}
        <Torus className="h-auto w-[140px] shrink-0" />
      </div>

      {/* ── Publications ─────────────────────────────────────────────────── */}
      <section id="publications" className="mt-16">
        <h2 className="heading">Publications</h2>

        {publications.length > 0 ? (
          <div className="mt-6 space-y-10">
            {/* The labels name the venue as well as the review status. That is true of
                every entry today, but it is a claim `peerReviewed` alone does not carry:
                a peer-reviewed domestic paper, or an unreviewed international one, needs
                the label changed rather than the entry filed under it. */}
            <PublicationList
              label="査読付き国際会議"
              labelEn="Peer-reviewed"
              publications={peerReviewed}
            />
            <PublicationList
              label="国内学会発表(査読無し)"
              labelEn="Not peer-reviewed"
              publications={notPeerReviewed}
            />
          </div>
        ) : (
          <p className="mt-6">
            Nothing published yet — work in progress is on{" "}
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            .
          </p>
        )}
      </section>

      {/* ── Awards & Grants ──────────────────────────────────────────────── */}
      {/* One timeline, not one list per kind: a funded selection and a prize are not the
          same claim, but the claim is stated on the entry itself (採択 / 受賞), which
          keeps the record in one chronological run. */}
      {awards.length > 0 && (
        <section id="awards" className="mt-16">
          <h2 className="heading">Awards &amp; Grants</h2>
          <div className="mt-6">
            <AwardList awards={awards} />
          </div>
        </section>
      )}

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <section id="projects" className="mt-16">
        <h2 className="heading">Projects</h2>
        <p className="mt-3">
          <Link href="/products">{projects.length} projects, with demos →</Link>
        </p>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section id="contact" className="mt-16">
        <h2 className="heading">Contact</h2>
        <p className="mt-3">
          Open to research collaboration and security work. Reach me at{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>
      </section>
    </div>
  );
}
