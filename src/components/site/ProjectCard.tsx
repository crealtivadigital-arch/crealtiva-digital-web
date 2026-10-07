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
    <article className="group relative mb-6 break-inside-avoid overflow-hidden rounded-card bg-navy">
      <NaturalImage
        img={project.cover}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        className="mx-auto"
        imgClassName="transition-opacity duration-300 group-hover:opacity-90"
      />
      <div className="p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {project.lineSlugs.map((s) => (
            <span key={s} className="rounded-full bg-cream/10 px-2.5 py-0.5 text-[11px] font-semibold text-cream/80">
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
