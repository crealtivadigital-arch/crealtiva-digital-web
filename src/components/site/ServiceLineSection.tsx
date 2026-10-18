import { lineHref } from "@/lib/content/links";
import NaturalImage from "@/components/site/NaturalImage";
import Link from "next/link";
import { formatPrice } from "@/lib/content/format";
import type { Package, ServiceLine } from "@/lib/content/types";

interface ServiceLineSectionProps {
  line: ServiceLine;
  packages: Package[];
  index: number;
}

// Fondos detrás de la foto: rotan entre tres formas y alternan turquesa y magenta,
// para que cada línea tenga su propio ritmo visual sin tocar la foto (proporción original).
const accents = [
  { text: "text-teal", solid: "bg-teal", soft: "bg-teal/25", glow: "shadow-[0_30px_60px_-20px_rgba(21,154,162,0.55)]", pill: "bg-teal" },
  { text: "text-magenta", solid: "bg-magenta", soft: "bg-magenta/20", glow: "shadow-[0_30px_60px_-20px_rgba(234,27,126,0.5)]", pill: "bg-magenta" },
];

function Backdrop({ variant, accent }: { variant: number; accent: (typeof accents)[number] }) {
  if (variant === 0) {
    // Bloque sólido desplazado
    return <div aria-hidden className={`absolute inset-0 translate-x-5 translate-y-5 rounded-block ${accent.solid} opacity-90`} />;
  }
  if (variant === 1) {
    // Círculo difuminado y órbita punteada
    return (
      <>
        <div aria-hidden className={`absolute -right-10 -top-10 h-56 w-56 rounded-full ${accent.soft} blur-2xl`} />
        <div aria-hidden className={`absolute -bottom-8 -left-8 h-40 w-40 rounded-full border-2 border-dashed ${accent.text} border-current opacity-40`} />
      </>
    );
  }
  // Plano girado con degradado de marca
  return (
    <div aria-hidden className="absolute inset-0 -rotate-3 scale-[1.03] rounded-block bg-gradient-to-br from-teal to-magenta opacity-80" />
  );
}

// Trafficker: marco redondo y, alrededor, íconos de publicidad pautada
const adIcons: { pos: string; tone: string; label: string; path: React.ReactNode }[] = [
  { pos: "-left-4 top-10", tone: "text-magenta", label: "Anuncios", path: <path d="M3 10v4h4l8 5V5L7 10zM19 9a4 4 0 010 6" /> },
  { pos: "-right-5 top-1/3", tone: "text-teal", label: "Segmentación", path: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" /></> },
  { pos: "-left-6 bottom-16", tone: "text-teal", label: "Resultados", path: <path d="M4 19h16M6 15l4-4 3 3 5-6M14 8h4v4" /> },
  { pos: "-right-3 bottom-8", tone: "text-magenta", label: "Clics", path: <path d="M9 3v3M4.5 5l2 2M3 10h3M10 10l10 4-4 1.5L14.5 20z" /> },
];

function AdsDecor() {
  return (
    <>
      <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/15 ring-2 ring-teal/30" />
      <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[138%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-magenta/30" />
      {adIcons.map((ic) => (
        <span
          key={ic.label}
          aria-hidden
          className={`absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_25px_-8px_rgba(26,26,46,0.35)] ${ic.pos} ${ic.tone}`}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {ic.path}
          </svg>
        </span>
      ))}
      <span aria-hidden className="absolute -top-3 right-8 z-10 rounded-full bg-magenta px-3 py-1 text-xs font-bold text-cream shadow-lg">
        ADS
      </span>
    </>
  );
}

// Bloque de una línea en /servicios: lo clave de la línea, una muestra de sus paquetes
// y el acceso a la página con todos los paquetes de esa línea.
export default function ServiceLineSection({ line, packages, index }: ServiceLineSectionProps) {
  const reversed = index % 2 === 1;
  const accent = accents[index % 2];
  const ads = line.slug === "trafficker-digital";
  const preview = [...packages].sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order).slice(0, 3);
  const href = lineHref(line.slug);

  return (
    <section id={line.slug} className={`scroll-mt-32 overflow-hidden py-20 md:py-24 ${reversed ? "bg-white" : "bg-cream"}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
        {line.cover && (
          <Link
            href={href}
            className={`group relative mx-auto block w-fit max-w-full p-2 ${reversed ? "lg:order-2" : ""}`}
            aria-label={`Ver ${line.name}`}
          >
            {ads ? <AdsDecor /> : <Backdrop variant={index % 3} accent={accent} />}
            <NaturalImage
              img={line.cover}
              sizes="(min-width: 1024px) 540px, 100vw"
              maxHeight={520}
              className={`mx-auto ${ads ? "rounded-[3rem]" : "rounded-block"} bg-navy ring-1 ring-white/40 transition-transform duration-500 group-hover:-translate-y-1.5 ${accent.glow}`}
              imgClassName="transition-opacity duration-300 group-hover:opacity-90"
            >
              <span
                className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-semibold text-cream shadow-lg ${accent.pill}`}
              >
                {packages.length} paquetes
              </span>
            </NaturalImage>
          </Link>
        )}

        <div>
          <p className={`text-sm font-semibold ${accent.text}`}>
            {String(index + 1).padStart(2, "0")} · {line.tagline}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy md:text-4xl">{line.name}</h2>
          <p className="mt-4 leading-relaxed text-navy/65">{line.intro}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {line.keyPoints.map((k) => (
              <li key={k} className="flex gap-2.5 text-sm leading-snug text-navy/80">
                <span aria-hidden className={`mt-0.5 font-bold ${accent.text}`}>✓</span>
                {k}
              </li>
            ))}
          </ul>

          {preview.length > 0 && (
            <ul className="mt-8 divide-y divide-navy/5 overflow-hidden rounded-card bg-white shadow-[0_12px_30px_-12px_rgba(26,26,46,0.18)] ring-1 ring-navy/5">
              {preview.map((p) => {
                const price = formatPrice(p.price);
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/servicios/${line.slug}/${p.slug}`}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-teal/[0.06]"
                    >
                      <span className="font-semibold text-navy">
                        {p.name}
                        {p.featured && <span className="ml-2 rounded-full bg-magenta/[0.12] px-2 py-0.5 text-[11px] text-magenta">Más elegido</span>}
                      </span>
                      <span className="shrink-0 text-sm text-navy/60">
                        {price.prefix && `${price.prefix} `}
                        <strong className="text-navy">{price.main}</strong>
                        {price.suffix && ` ${price.suffix}`}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <Link
            href={href}
            className="mt-8 inline-flex rounded-full bg-magenta px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_12px_24px_-10px_rgba(234,27,126,0.6)] transition-colors hover:bg-magenta-light"
          >
            Ver todos los paquetes de {line.name} →
          </Link>
        </div>
      </div>
    </section>
  );
}
