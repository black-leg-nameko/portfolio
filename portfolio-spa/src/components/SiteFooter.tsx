import { SocialLinks } from "@/components/SocialLinks";

/** One quiet line. Everything else on the site is already a link in the prose. */
export function SiteFooter() {
  return (
    <footer className="column pb-16">
      <SocialLinks />
    </footer>
  );
}
