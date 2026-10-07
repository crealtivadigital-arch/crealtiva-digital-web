import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/content/format";
import type { Package, ServiceLine } from "@/lib/content/types";

interface ServiceLineSectionProps {
  line: ServiceLine;
  packages: Package[];
  index: number;
}

// Bloque de una línea en /servicios: lo clave de la línea, una muestra de sus paquetes
// y el acceso a la página con todos los paquetes de esa línea.
export default function ServiceLineSection({ line, packages, index }: ServiceLineSectionProps) {
  const reversed = index % 2 === 1;
  const preview = [...packages].sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order).slice(0, 3);
  const lineHref = `/servicios/${line.slug}`;

  return (
    <section id={line.slug} className={`scroll-mt-32 py-20 md:py-24 ${reversed ? "bg-white" : "bg-cream"}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
        {line.cover && (
          <Link
            href={lineHref}
            className={`group relative block aspect-[4/3] overflow-hidden rounded-block bg-navy ${reversed ? "lg:order-2" : ""}`}
            aria-label={`Ver ${line.name}`}
          >
            <Image
              src={line.cover.src}
              alt={line.cover.alt}
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute left-5 top-5 rounded-full bg-navy/70 px-4 py-1.5 text-xs font-semibold text-cream backdrop-blur-sm">
              {packages.length} paquetes
            </span>
          </Link>
        )}

        <div>
          <p className="text-sm font-semibold text-teal">
            {String(index + 1).padStart(2, "0")} · {line.tagline}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy md:text-4xl">{line.name}</h2>
          <p className="mt-4 leading-relaxed text-navy/65">{line.intro}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {line.keyPoints.map((k) => (
              <li key={k} className="flex gap-2.5 text-sm leading-snug text-navy/80">
                <span aria-hidden className="mt-0.5 font-bold text-teal">✓</span>
                {k}
              </li>
            ))}
          </ul>

          {preview.length > 0 && (
            <ul className="mt-8 divide-y divide-navy/5 overflow-hidden rounded-card bg-white ring-1 ring-navy/5">
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
            href={lineHref}
            className="mt-8 inline-flex rounded-full bg-magenta px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-magenta-light"
          >
            Ver todos los paquetes de {line.name} →
          </Link>
        </div>
      </div>
    </section>
  );
}
