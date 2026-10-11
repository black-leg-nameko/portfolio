"use client";

import { usePathname } from "next/navigation";
import { SocialLinks } from "@/components/SocialLinks";

/**
 * One quiet line. Not on the home page: with its sections closed, the page is short
 * enough that the header's profile links and the footer's would share one screen.
 */
export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="column pb-16">
      <SocialLinks />
    </footer>
  );
}
