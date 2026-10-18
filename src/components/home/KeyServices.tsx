import { lineHref } from "@/lib/content/links";
import Link from "next/link";
import NaturalImage, { imageRatio } from "@/components/site/NaturalImage";
import SectionTitle from "@/components/site/SectionTitle";
import type { ServiceLine } from "@/lib/content/types";

type Tone = "navy" | "teal" | "magenta";

// Mosaico: tarjetas de distinto ancho. Cada foto ocupa todo el ancho de su tarjeta, de borde a borde
// y en su proporción original, así que la tarjeta toma la forma de la foto (sin franjas vacías).
// "banner": en escritorio, foto a la izquierda en su tamaño natural y texto al lado.
const layout: Record<string, { span: string; banner?: boolean; tone: Tone }> = {
  "marketing-digital": { span: "sm:col-span-2", tone: "teal" },
  "videos-para-redes-sociales": { span: "", tone: "navy" },
  "modelos-contenido-organico": { span: "", tone: "navy" },
  "fotografia-de-producto": { span: "", tone: "magenta" },
  "optimizacion-procesos": { span: "sm:col-span-2", tone: "navy" },
  "trafficker-digital": { span: "", tone: "teal" },
  "diseno-web": { span: "sm:col-span-2 lg:col-span-4", banner: true, tone: "navy" },
};
const ORDER = Object.keys(layout);

const tones: Record<Tone, { card: string; tagline: string; summary: string }> = {
  navy: { card: "bg-navy", tagline: "text-teal", summary: "text-cream/65" },
  teal: { card: "bg-teal-dark", tagline: "text-cream/75", summary: "text-cream/80" },
  magenta: { card: "bg-magenta", tagline: "text-cream/80", summary: "text-cream/85" },
};

export default function KeyServices({ lines }: { lines: ServiceLine[] }) {
  const shown = lines
    .slice()
    .sort((a, b) => rank(a.slug) - rank(b.slug));

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Servicios clave"
          title={`${shown.length} servicios conectados en un solo ecosistema`}
          intro="Cada servicio funciona solo, pero rinde más junto a los demás: la estrategia define el contenido, la producción alimenta la pauta y la web convierte."
          action={
            <Link href="/servicios" className="text-sm font-semibold text-teal hover:text-navy">
              Ver todos los servicios →
            </Link>
          }
        />

        <div className="grid gap-5 sm:grid-flow-dense sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((l) => {
            const cfg = layout[l.slug] ?? { span: "", tone: "navy" as Tone };
            const tone = tones[cfg.tone];
            const wide = cfg.span.includes("col-span-2");
            // Celular: foto en miniatura al lado del texto (tarjeta compacta, sin scroll eterno).
            // Tablet: las tarjetas anchas ponen la foto al costado. Escritorio: el mosaico original.
            const compact = !cfg.banner && (imageRatio(l.cover?.src ?? "") ?? 1) < 1.4;
            const side = wide && !cfg.banner;
            return (
              <Link
                key={l.slug}
                href={lineHref(l.slug)}
                className={`group flex overflow-hidden rounded-block ${tone.card} ${cfg.span} ${layoutClass(compact, side, !!cfg.banner)}`}
              >
                {l.cover && (
                  <div className={imageClass(compact, side, !!cfg.banner)}>
                    <NaturalImage
                      img={l.cover}
                      sizes={
                        cfg.banner
                          ? "(min-width: 1024px) 760px, 100vw"
                          : wide
                            ? "(min-width: 1024px) 540px, 100vw"
                            : "(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                      }
                      className={compact ? `overflow-hidden rounded-xl ${side ? "sm:rounded-none" : "lg:rounded-none"}` : ""}
                      imgClassName="transition-opacity duration-300 group-hover:opacity-85"
                    />
                  </div>
                )}
                <div className={`flex min-w-0 flex-1 flex-col ${compact ? "p-4 lg:p-5" : "p-5"} ${cfg.banner ? "lg:justify-center lg:p-8" : ""}`}>
                  <p className={`text-xs font-semibold ${tone.tagline}`}>{l.tagline}</p>
                  <h3 className={`mt-1 font-bold leading-tight text-cream ${wide ? "text-2xl" : "text-lg lg:text-xl"}`}>
                    {l.name}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${tone.summary} ${compact ? "line-clamp-3 lg:line-clamp-none" : ""}`}>
                    {l.summary}
                  </p>
                  <span
                    className={`mt-auto inline-block pt-4 text-sm font-semibold text-cream transition-transform group-hover:translate-x-1 ${
                      cfg.banner ? "lg:mt-0" : ""
                    }`}
                  >
                    Conocer más →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Celular y tablet: compact = miniatura al lado del texto; side = foto al costado en tarjetas anchas (tablet).
function layoutClass(compact: boolean, side: boolean, banner: boolean): string {
  if (banner) return "flex-col lg:flex-row";
  if (compact && side) return "flex-row items-center lg:flex-col lg:items-stretch";
  if (compact) return "flex-row items-center lg:flex-col lg:items-stretch";
  if (side) return "flex-col sm:flex-row sm:items-center lg:flex-col lg:items-stretch";
  return "flex-col";
}

function imageClass(compact: boolean, side: boolean, banner: boolean): string {
  if (banner) return "lg:shrink-0";
  if (compact && side) return "w-[38%] shrink-0 p-2 sm:w-1/2 sm:p-0 lg:w-auto";
  if (compact) return "w-[38%] shrink-0 p-2 lg:w-auto lg:p-0";
  if (side) return "sm:w-1/2 sm:shrink-0 lg:w-auto";
  return "";
}

function rank(slug: string): number {
  const i = ORDER.indexOf(slug);
  return i === -1 ? ORDER.length : i;
}
