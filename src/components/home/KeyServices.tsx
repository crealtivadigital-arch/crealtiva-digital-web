import { lineHref } from "@/lib/content/links";
import Link from "next/link";
import NaturalImage from "@/components/site/NaturalImage";
import SectionTitle from "@/components/site/SectionTitle";
import type { ServiceLine } from "@/lib/content/types";

type Tone = "navy" | "teal" | "magenta";

// Mosaico: tarjetas de distinto ancho. Cada foto ocupa todo el ancho de su tarjeta, de borde a borde
// y en su proporción original, así que la tarjeta toma la forma de la foto (sin franjas vacías).
// "banner": en escritorio, foto a la izquierda en su tamaño natural y texto al lado.
const layout: Record<string, { span: string; banner?: boolean; tone: Tone }> = {
  "marketing-digital": { span: "sm:col-span-2", tone: "teal" },
  "produccion-multimedia": { span: "", tone: "navy" },
  "modelos-contenido-organico": { span: "", tone: "navy" },
  "fotografia-de-producto": { span: "", tone: "magenta" },
  "optimizacion-procesos": { span: "sm:col-span-2", tone: "navy" },
  "trafficker-digital": { span: "", tone: "navy" },
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
            return (
              <Link
                key={l.slug}
                href={lineHref(l.slug)}
                className={`group flex flex-col overflow-hidden rounded-block ${tone.card} ${cfg.span} ${
                  cfg.banner ? "lg:flex-row" : ""
                }`}
              >
                {l.cover && (
                  <div className={cfg.banner ? "lg:shrink-0" : ""}>
                    <NaturalImage
                      img={l.cover}
                      sizes={
                        cfg.banner
                          ? "(min-width: 1024px) 760px, 100vw"
                          : wide
                            ? "(min-width: 1024px) 540px, 100vw"
                            : "(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                      }
                      imgClassName="transition-opacity duration-300 group-hover:opacity-85"
                    />
                  </div>
                )}
                <div className={`flex flex-1 flex-col p-5 ${cfg.banner ? "lg:justify-center lg:p-8" : ""}`}>
                  <p className={`text-xs font-semibold ${tone.tagline}`}>{l.tagline}</p>
                  <h3 className={`mt-1 font-bold leading-tight text-cream ${wide ? "text-2xl" : "text-xl"}`}>
                    {l.name}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${tone.summary}`}>{l.summary}</p>
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

function rank(slug: string): number {
  const i = ORDER.indexOf(slug);
  return i === -1 ? ORDER.length : i;
}
