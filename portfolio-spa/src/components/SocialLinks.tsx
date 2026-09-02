import { profile } from "@/data/profile";

/**
 * The marks are the official ones, inlined rather than pulled from a package: three
 * glyphs are not a dependency, and an icon font would drag a second typeface onto a page
 * that has exactly two.
 *
 * Each carries its own viewBox and render size. The three marks are drawn on different
 * grids and none of them fills its box, so a single size renders them at three different
 * optical weights — the sizes below are the correction, measured rather than guessed:
 * ink coverage inside the 44px box is within a point of 8% for all three.
 */
const links = [
  {
    label: "GitHub",
    href: profile.links.github,
    viewBox: "0 0 24 24",
    size: 18,
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    /* The mark is 24 wide but only 21.7 tall in its box, so at a shared 18px it stands
       shorter than the other two and reads as the light one in the middle. */
    label: "X",
    href: profile.links.x,
    viewBox: "0 0 24 24",
    size: 20,
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    /* The plain "in" letterform, not the boxed mark. simple-icons ships LinkedIn with its
       rounded blue plate baked into the path; rendered in ink it is a filled, round-
       cornered tile — the one filled surface on a site whose whole premise is that nothing
       is filled and nothing is rounded. The plate is dropped and only the letterform is
       kept, which is also what puts its ink weight next to the other two. */
    label: "LinkedIn",
    href: profile.links.linkedin,
    viewBox: "0 0 448 512",
    size: 19,
    path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z",
  },
];

/**
 * The three profile links, as square hairline boxes carrying their own mark. The box is
 * the `control` vocabulary — square, white, one hairline — at the 44px touch floor, so
 * nothing new enters the system except the glyphs themselves.
 */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex list-none items-center gap-2 p-0 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a className="icon-button" href={link.href} target="_blank" rel="noreferrer">
            {/* The accessible name, since the glyph carries no text. It names the new tab
                too: the visible label that used to say so is gone. */}
            <span className="sr-only">{link.label} (opens in a new tab)</span>
            <svg
              viewBox={link.viewBox}
              width={link.size}
              height={link.size}
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={link.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
