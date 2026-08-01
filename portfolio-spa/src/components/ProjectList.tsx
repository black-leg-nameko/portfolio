"use client";

import { useState } from "react";
import { ProjectDialog } from "@/components/ProjectDialog";
import { ProjectThumb } from "@/components/ProjectThumb";
import type { Project } from "@/data/projects";
import { profile } from "@/data/profile";

/**
 * A reading list, not a card grid: one row per project — figure on the left, title and
 * one line of prose on the right. The row opens the dialog that holds the demo.
 */
export function ProjectList({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  if (projects.length === 0) {
    return (
      <p>
        Nothing published here yet — the work in progress is on{" "}
        <a href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
    );
  }

  return (
    <>
      <ul className="border-t border-hairline">
        {projects.map((project, index) => (
          <li key={project.slug} className="border-b border-hairline">
            <button
              type="button"
              onClick={() => setSelected(project)}
              aria-haspopup="dialog"
              className="group flex w-full gap-5 py-6 text-left"
            >
              <ProjectThumb
                src={project.media[0]!.src}
                alt={project.media[0]!.alt}
                eager={index < 3}
                // self-start, or the flex row stretches the well and its 16:10 dies
                className="w-[96px] shrink-0 self-start sm:w-[152px]"
              />
              <span className="flex-1">
                <span className="entry-title underline decoration-hairline-strong decoration-1 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-ink">
                  {project.title}
                </span>
                <span className="mt-1 block">{project.summary}</span>
                <span className="meta mt-2 block">
                  {project.field} · {project.stack.join(" · ")}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
