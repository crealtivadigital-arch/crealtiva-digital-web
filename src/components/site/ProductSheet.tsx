import Link from "next/link";
import ExclusionList from "@/components/site/ExclusionList";
import { STAGES, formatPrice } from "@/lib/content/format";
import { wa } from "@/lib/constants";
import type { Package } from "@/lib/content/types";

interface ProductSheetProps {
  pkg: Package;
  lineName: string;
}

// Ficha completa de un producto dentro de la página de su categoría:
// qué resuelve, fase de crecimiento, qué entrega, precio, qué no incluye (y cómo conseguirlo) y complementos.
export default function ProductSheet({ pkg, lineName }: ProductSheetProps) {
  const price = formatPrice(pkg.price);
  const stage = STAGES[pkg.stage];
  const detailHref = `/servicios/${pkg.lineSlug}/${pkg.slug}`;
  const quote = wa(`Hola, quiero cotizar el paquete "${pkg.name}" (${lineName}) con Crealtiva Digital.`);

  return (
    <article
      id={pkg.slug}
      className={`scroll-mt-36 overflow-hidden rounded-block bg-white ${pkg.featured ? "ring-2 ring-magenta" : "ring-1 ring-navy/5"}`}
    >
      <div className="grid lg:grid-cols-[1fr_300px]">
        {/* Contenido */}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stage.tone}`}>{stage.label}</span>
            {pkg.badge && <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy/60">{pkg.badge}</span>}
            {pkg.featured && <span className="rounded-full bg-magenta px-3 py-1 text-xs font-semibold text-cream">Más elegido</span>}
          </div>

          <h3 className="mt-4 font-display text-2xl leading-tight text-navy md:text-3xl">{pkg.name}</h3>
          {pkg.tagline && <p className="mt-1 font-semibold text-teal">{pkg.tagline}</p>}
          <p className="mt-3 font-light leading-relaxed text-navy/70">{pkg.summary}</p>

          <div className="mt-6 rounded-card border-l-4 border-magenta bg-magenta/[0.05] px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-magenta">Qué resuelve</p>
            <p className="mt-1 text-navy/80">{pkg.solves}</p>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-navy/50">Qué entrega</h4>
              <ul className="mt-4 space-y-2.5">
                {pkg.includes.map((x) => (
                  <li key={x} className="flex gap-2.5 text-sm leading-relaxed text-navy/80">
                    <span aria-hidden className="font-bold text-teal">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
              {pkg.idealFor.length > 0 && (
                <>
                  <h4 className="mt-7 text-sm font-semibold uppercase tracking-widest text-navy/50">Ideal para</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {pkg.idealFor.map((x) => (
                      <li key={x} className="rounded-full bg-cream px-3 py-1 text-xs text-navy/70">
                        {x}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {pkg.excludes.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-navy/50">No incluye</h4>
                <div className="mt-4">
                  <ExclusionList items={pkg.excludes} />
                </div>
              </div>
            )}
          </div>

          {pkg.addons.length > 0 && (
            <div className="mt-8 border-t border-navy/5 pt-6">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-navy/50">Complementos opcionales</h4>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {pkg.addons.map((a) => (
                  <li key={a.name} className="flex items-start justify-between gap-3 rounded-card bg-cream px-4 py-3">
                    <span className="text-sm font-medium text-navy">{a.name}</span>
                    {a.price && <span className="shrink-0 text-sm font-bold text-teal">+{formatPrice(a.price).main}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Precio y acciones */}
        <aside className="flex flex-col bg-navy p-6 text-cream md:p-8">
          {price.prefix && <span className="text-xs font-semibold uppercase tracking-wide text-cream/50">{price.prefix}</span>}
          <p>
            <span className="font-display text-4xl">{price.main}</span>
            {price.suffix && <span className="ml-1 text-cream/60">{price.suffix}</span>}
          </p>
          {pkg.price.note && <p className="mt-1 text-xs text-cream/50">{pkg.price.note}</p>}

          {pkg.details.length > 0 && (
            <dl className="mt-6 space-y-3 border-t border-cream/10 pt-5 text-sm">
              {pkg.details.map((d) => (
                <div key={d.label}>
                  <dt className="text-xs text-cream/50">{d.label}</dt>
                  <dd className="font-semibold">{d.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <a
              href={quote}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center rounded-full bg-magenta px-5 py-3 text-sm font-semibold transition-colors hover:bg-magenta-light"
            >
              Cotizar este paquete
            </a>
            <Link href={detailHref} className="flex justify-center text-sm text-cream/60 transition-colors hover:text-teal">
              Ver ficha completa →
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
