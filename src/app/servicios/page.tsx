import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import ServiceLineSection from "@/components/site/ServiceLineSection";
import CTABanner from "@/components/CTABanner";
import { getPackages, getServiceLines } from "@/lib/content";

export const metadata: Metadata = {
  title: "Servicios — Marketing, producción, pauta, web y automatización",
  description:
    "Servicios de Crealtiva Digital en Quito: marketing digital, producción multimedia, video UGC, fotografía de producto, trafficker digital, diseño web y automatización con IA.",
  alternates: { canonical: "/servicios" },
};

export default async function ServiciosPage() {
  const [lines, packages] = await Promise.all([getServiceLines(), getPackages()]);

  return (
    <main>
      <PageHeader
        eyebrow="Servicios"
        title="Todo lo que tu marca necesita, en un solo equipo"
        intro="Siete líneas de servicio conectadas entre sí. Conoce lo clave de cada una y entra a ver todos sus paquetes, con lo que incluyen y su precio."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
      />

      {/* Índice de líneas: fijo bajo el menú para saltar entre secciones */}
      <nav aria-label="Líneas de servicio" className="sticky top-16 z-40 border-b border-navy/5 bg-cream/95 backdrop-blur-sm">
        <ul className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
          {lines.map((l) => (
            <li key={l.slug} className="shrink-0">
              <a
                href={`#${l.slug}`}
                className="block rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy/70 ring-1 ring-navy/5 transition-colors hover:bg-teal hover:text-white"
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {lines.map((line, i) => (
        <ServiceLineSection
          key={line.slug}
          line={line}
          index={i}
          packages={packages.filter((p) => p.lineSlug === line.slug)}
        />
      ))}

      <CTABanner
        headline="¿No sabes por dónde empezar?"
        subtitle="En un diagnóstico de 45 minutos revisamos tu situación y te recomendamos la combinación de servicios adecuada para tu marca."
      />
    </main>
  );
}
