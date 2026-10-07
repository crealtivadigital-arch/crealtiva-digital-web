import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content/types";

interface ProjectCardProps {
  project: Project;
  lineNames: Record<string, string>;
}

export default function ProjectCard({ project, lineNames }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-card bg-navy">
      <div className="relative aspect-[4/3]">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {project.lineSlugs.map((s) => (
            <span key={s} className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-cream backdrop-blur-sm">
              {lineNames[s] ?? s}
            </span>
          ))}
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-teal">{project.client}</p>
        <h3 className="mt-1 text-lg font-bold leading-snug text-cream">
          <Link href={`/portafolio/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
