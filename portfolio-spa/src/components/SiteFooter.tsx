import { profile } from "@/data/profile";

const links = [
  { label: "GitHub", href: profile.links.github },
  { label: "X", href: profile.links.x },
  { label: "LinkedIn", href: profile.links.linkedin },
];

/** One quiet line. Everything else on the site is already a link in the prose. */
export function SiteFooter() {
  return (
    <footer className="column pb-16">
      {/* Each link is wrapped in a span, so the "·" separator stays outside the anchor —
          inside it, it is underlined and joins the link's accessible name. */}
      <p className="meta dotted -my-3">
        {links.map((link) => (
          <span key={link.label}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </span>
        ))}
      </p>
    </footer>
  );
}
