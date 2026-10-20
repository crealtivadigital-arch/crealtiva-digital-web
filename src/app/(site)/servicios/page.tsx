import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import ServiceLineSection from "@/components/site/ServiceLineSection";
import CTABanner from "@/components/CTABanner";
import MovieMakerTeaser from "@/components/site/MovieMakerTeaser";
import { getPackages, getServiceLines } from "@/lib/content";

export const metadata: Metadata = {
  title: "Servicios — Marketing, producción, pauta, web y automatización",
  description:
    "Servicios de Crealtiva Digital en Quito: marketing digital, videos para redes sociales, modelos para contenido orgánico (UGC e influencers), fotografía de producto, trafficker digital, diseño web y automatización con IA.",
  alternates: { canonical: "/servicios" },
};

// Nombres cortos para el menú de líneas (los completos alargan demasiado la fila)
const shortNames: Record<string, string> = {
  "marketing-digital": "Marketing",
  "videos-para-redes-sociales": "Videos para redes",
  "modelos-contenido-organico": "Modelos",
  "fotografia-de-producto": "Fotografía",
  "trafficker-digital": "Publicidad Ads",
  "diseno-web": "Sitios web",
  "optimizacion-procesos": "Procesos con IA",
};

export default async function ServiciosPage() {
  const [lines, packages] = await Promise.all([getServiceLines(), getPackages()]);

  return (
    <main>
      <PageHeader
        eyebrow="Servicios"
        title="Todo lo que tu marca necesita, en un solo equipo"
        intro={`${lines.length} líneas de servicio conectadas entre sí. Conoce lo clave de cada una y entra a ver todos sus paquetes, con lo que incluyen y su precio.`}
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
      />

      {/* Índice de líneas: fijo bajo el menú para saltar entre secciones */}
      <nav aria-label="Líneas de servicio" className="sticky top-16 z-40 border-b border-navy/5 bg-cream/95 backdrop-blur-sm">
        <ul className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
          {lines.map((l) => (
            <li key={l.slug} className="shrink-0">
              <a
                href={`#${l.slug}`}
                className="block rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy/70 ring-1 ring-navy/5 transition-colors hover:bg-teal hover:text-cream"
              >
                {shortNames[l.slug] ?? l.name}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a
              href="#movie-maker"
              className="block rounded-full bg-black px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-magenta"
            >
              Movie Maker
            </a>
          </li>
          {/* Espaciador: en un flex con scroll horizontal el padding derecho no cuenta en el área desplazable */}
          <li aria-hidden className="w-4 shrink-0" />
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

      {/* Producciones de gran escala: viven en Crealtiva Movie Maker */}
      <MovieMakerTeaser id="movie-maker" />

      <CTABanner
        headline="¿No sabes por dónde empezar?"
        subtitle="En un diagnóstico de 45 minutos revisamos tu situación y te recomendamos la combinación de servicios adecuada para tu marca."
      />
    </main>
  );
}
