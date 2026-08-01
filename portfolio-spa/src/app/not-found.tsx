import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="column py-20 sm:py-28">
      <p className="meta">404</p>
      <h1 className="name mt-3">This page does not exist.</h1>
      <p className="mt-6">
        The link may be out of date. Everything is one page away:{" "}
        <Link href="/">{profile.name}</Link> or <Link href="/products">the projects</Link>.
      </p>
    </div>
  );
}
