import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import FilterGrid from "@/components/site/FilterGrid";
import PackageCard from "@/components/site/PackageCard";
import SectionTitle from "@/components/site/SectionTitle";
import CTABanner from "@/components/CTABanner";
import { getPackages, getServiceLines } from "@/lib/content";

export const metadata: Metadata = {
  title: "Servicios y paquetes — Marketing, producción, pauta y web",
  description:
    "Catálogo de servicios de Crealtiva Digital en Quito: marketing digital, producción multimedia, video UGC, fotografía de producto, trafficker digital, diseño web y automatización con IA.",
  alternates: { canonical: "/servicios" },
};

export default async function ServiciosPage() {
  const [lines, packages] = await Promise.all([getServiceLines(), getPackages()]);
  const lineName = Object.fromEntries(lines.map((l) => [l.slug, l.name]));

  return (
    <main>
      <PageHeader
        eyebrow="Servicios"
        title="Todo lo que tu marca necesita, en un solo equipo"
        intro="Elige una línea de servicio o explora todos los paquetes. Cada uno indica qué incluye y su precio; si necesitas algo a medida, lo cotizamos contigo."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
      />

      {/* Líneas de servicio */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle eyebrow="Líneas de servicio" title="Siete pilares conectados" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lines.map((l, i) => (
              <Link
                key={l.slug}
                href={`/servicios/${l.slug}`}
                className="group flex flex-col rounded-card bg-white p-6 ring-1 ring-navy/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5"
              >
                <span className="text-xs font-semibold text-teal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-bold leading-snug text-navy">{l.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{l.summary}</p>
                <span className="mt-auto pt-5 text-sm font-semibold text-magenta transition-transform group-hover:translate-x-1">
                  {packages.filter((p) => p.lineSlug === l.slug).length} paquetes →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de productos */}
      <section id="paquetes" className="bg-cream pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle
            eyebrow="Galería de productos"
            title="Paquetes y planes"
            intro="Filtra por línea para comparar. Los precios están en USD."
          />
          <FilterGrid
            options={lines.map((l) => ({ value: l.slug, label: l.name }))}
            items={packages.map((p) => ({
              key: `${p.lineSlug}/${p.slug}`,
              tags: [p.lineSlug],
              node: <PackageCard pkg={p} lineName={lineName[p.lineSlug]} />,
            }))}
          />
        </div>
      </section>

      <CTABanner
        headline="¿No sabes qué paquete necesitas?"
        subtitle="En un diagnóstico de 45 minutos revisamos tu situación y te recomendamos la combinación adecuada para tu marca."
      />
    </main>
  );
}
