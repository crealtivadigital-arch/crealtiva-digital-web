import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import PortfolioExplorer from "@/components/portfolio/PortfolioExplorer";
import { getPortfolioCategories, getServiceLines } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portafolio — Fotografía y video por sector",
  description:
    "Trabajos reales de Crealtiva Digital por sector: gastronomía, imagen empresarial, salud, hotelería, inmobiliario, turismo, moda, e-commerce, automotriz, construcción y agroindustria.",
  alternates: { canonical: "/portafolio" },
};

export default async function PortafolioPage() {
  const [categories, lines] = await Promise.all([getPortfolioCategories(), getServiceLines()]);
  const lineNames = Object.fromEntries(lines.map((l) => [l.slug, l.name]));

  return (
    <main>
      <PageHeader
        eyebrow="Portafolio"
        title="Lo que hacemos se ve"
        intro="Elige tu sector y mira el trabajo."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Portafolio" }]}
      />
      <PortfolioExplorer categories={categories} lineNames={lineNames} />
    </main>
  );
}
