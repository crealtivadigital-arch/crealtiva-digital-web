import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/site/PageHeader";
import ProjectCard from "@/components/site/ProjectCard";
import SectionTitle from "@/components/site/SectionTitle";
import CTABanner from "@/components/CTABanner";
import { getPackage, getProject, getProjects, getServiceLines } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.client}`,
    description: project.summary,
    alternates: { canonical: `/portafolio/${project.slug}` },
    openGraph: { images: [project.cover.src] },
  };
}

export default async function ProyectoPage({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  const [lines, all] = await Promise.all([getServiceLines(), getProjects()]);
  const lineNames = Object.fromEntries(lines.map((l) => [l.slug, l.name]));
  const usedPackage = project.packageSlug ? await getPackage(project.lineSlugs[0], project.packageSlug) : undefined;
  const related = all
    .filter((p) => p.slug !== project.slug && p.lineSlugs.some((s) => project.lineSlugs.includes(s)))
    .slice(0, 3);

  return (
    <main>
      <PageHeader
        eyebrow={project.client}
        title={project.title}
        intro={project.summary}
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Portafolio", href: "/portafolio" }, { label: project.client }]}
      >
        <div className="flex flex-wrap gap-2">
          {project.lineSlugs.map((s) => (
            <Link
              key={s}
              href={`/servicios/${s}`}
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80 transition-colors hover:border-teal hover:text-teal"
            >
              {lineNames[s] ?? s}
            </Link>
          ))}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-teal px-4 py-1.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              Ver sitio ↗
            </a>
          )}
        </div>
      </PageHeader>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-block">
            <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
          </div>

          {(project.challenge || project.solution || usedPackage) && (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {project.challenge && (
                <div className="rounded-card bg-white p-6 ring-1 ring-navy/5">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-magenta">El reto</h2>
                  <p className="mt-3 leading-relaxed text-navy/75">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div className="rounded-card bg-white p-6 ring-1 ring-navy/5">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-teal">La solución</h2>
                  <p className="mt-3 leading-relaxed text-navy/75">{project.solution}</p>
                </div>
              )}
              {usedPackage && (
                <Link
                  href={`/servicios/${usedPackage.lineSlug}/${usedPackage.slug}`}
                  className="group rounded-card bg-navy p-6 text-white"
                >
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50">Paquete utilizado</h2>
                  <p className="mt-3 text-lg font-bold">{usedPackage.name}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-teal group-hover:translate-x-1">Ver paquete →</span>
                </Link>
              )}
            </div>
          )}

          {project.gallery.length > 0 && (
            <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {project.gallery.map((img) => (
                <div key={img.src} className="mb-4 break-inside-avoid overflow-hidden rounded-card">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-navy py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle dark eyebrow="Portafolio" title="Proyectos relacionados" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} lineNames={lineNames} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner headline="¿Quieres un proyecto así para tu marca?" />
    </main>
  );
}
