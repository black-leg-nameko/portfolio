import type { Metadata } from "next";
import Link from "next/link";
import { ProjectList } from "@/components/ProjectList";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Research prototypes and tools — vulnerability analysis, decentralised identity, systems security, and LLM tooling.",
};

export default function ProductsPage() {
  return (
    <div className="column py-20 sm:py-28">
      <p className="meta">
        <Link href="/">← {profile.name}</Link>
      </p>

      <h1 className="name mt-10">Projects</h1>

      <div className="mt-10">
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
