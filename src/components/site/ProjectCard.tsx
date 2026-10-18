import Link from "next/link";
import NaturalImage from "@/components/site/NaturalImage";
import type { Project } from "@/lib/content/types";

interface ProjectCardProps {
  project: Project;
  lineNames: Record<string, string>;
}

// Tarjeta de portafolio para grillas tipo mampostería: la foto conserva su proporción original.
export default function ProjectCard({ project, lineNames }: ProjectCardProps) {
  return (
    <article className="group relative mb-3 break-inside-avoid overflow-hidden rounded-card bg-navy sm:mb-6">
      <NaturalImage
        img={project.cover}
        sizes="(min-width: 1024px) 360px, 50vw"
        className="mx-auto"
        imgClassName="transition-opacity duration-300 group-hover:opacity-90"
      />
      <div className="p-3 sm:p-5">
        <div className="mb-2 hidden flex-wrap gap-1.5 sm:flex">
          {project.lineSlugs.map((s) => (
            <span key={s} className="rounded-full bg-cream/10 px-2.5 py-0.5 text-[11px] font-semibold text-cream/80">
              {lineNames[s] ?? s}
            </span>
          ))}
        </div>
        <p className="line-clamp-1 text-[10px] font-semibold uppercase tracking-wide text-teal sm:text-xs">{project.client}</p>
        <h3 className="mt-1 text-sm font-bold leading-snug text-cream sm:text-lg">
          <Link href={`/portafolio/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
