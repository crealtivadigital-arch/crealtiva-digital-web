import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import FilterGrid from "@/components/site/FilterGrid";
import ProjectCard from "@/components/site/ProjectCard";
import CTABanner from "@/components/CTABanner";
import { getProjects, getServiceLines } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portafolio — Trabajos de producción, fotografía, UGC y web",
  description:
    "Proyectos reales de Crealtiva Digital: producción en campo, video institucional, fotografía gastronómica y de producto, contenido UGC y sitios web.",
  alternates: { canonical: "/portafolio" },
};

export default async function PortafolioPage() {
  const [projects, lines] = await Promise.all([getProjects(), getServiceLines()]);
  const lineNames = Object.fromEntries(lines.map((l) => [l.slug, l.name]));
  // Solo se ofrecen como filtro las líneas que tienen trabajos publicados.
  const usedLines = lines.filter((l) => projects.some((p) => p.lineSlugs.includes(l.slug)));

  return (
    <main>
      <PageHeader
        eyebrow="Portafolio"
        title="Trabajos que hablan por nosotros"
        intro="Producción en campo, video institucional, fotografía, contenido con actores y sitios web. Cada proyecto partió de un brief y un objetivo comercial."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Portafolio" }]}
      />

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FilterGrid
            gridClassName="columns-1 gap-6 sm:columns-2 lg:columns-3"
            options={usedLines.map((l) => ({ value: l.slug, label: l.name }))}
            items={projects.map((p) => ({
              key: p.slug,
              tags: p.lineSlugs,
              node: <ProjectCard project={p} lineNames={lineNames} />,
            }))}
          />
        </div>
      </section>

      <CTABanner headline="¿Quieres un proyecto así para tu marca?" />
    </main>
  );
}
