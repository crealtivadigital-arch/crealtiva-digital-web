import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/site/PageHeader";
import PackageCard from "@/components/site/PackageCard";
import ProjectCard from "@/components/site/ProjectCard";
import SectionTitle from "@/components/site/SectionTitle";
import { formatPrice, getPackage, getPackages, getProjects, getServiceLine, getServiceLines } from "@/lib/content";
import { wa } from "@/lib/constants";

type Props = { params: Promise<{ linea: string; paquete: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPackages()).map((p) => ({ linea: p.lineSlug, paquete: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { linea, paquete } = await params;
  const [line, pkg] = await Promise.all([getServiceLine(linea), getPackage(linea, paquete)]);
  if (!line || !pkg) return {};
  return {
    title: `${pkg.name} — ${line.name}`,
    description: pkg.summary,
    alternates: { canonical: `/servicios/${line.slug}/${pkg.slug}` },
  };
}

export default async function PaquetePage({ params }: Props) {
  const { linea, paquete } = await params;
  const [line, pkg] = await Promise.all([getServiceLine(linea), getPackage(linea, paquete)]);
  if (!line || !pkg) notFound();

  const [siblings, allProjects, lines] = await Promise.all([
    getPackages(line.slug),
    getProjects({ lineSlug: line.slug }),
    getServiceLines(),
  ]);
  const lineNames = Object.fromEntries(lines.map((l) => [l.slug, l.name]));
  // Primero los trabajos hechos con este paquete exacto, luego el resto de la línea.
  const projects = [...allProjects].sort((a, b) => Number(b.packageSlug === pkg.slug) - Number(a.packageSlug === pkg.slug)).slice(0, 3);
  const others = siblings.filter((p) => p.slug !== pkg.slug);
  const price = formatPrice(pkg.price);
  const quote = wa(`Hola, quiero cotizar el paquete "${pkg.name}" (${line.name}) con Crealtiva Digital.`);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pkg.name,
    description: pkg.summary,
    serviceType: line.name,
    areaServed: "Ecuador",
    provider: { "@type": "Organization", name: "Crealtiva Digital", url: "https://crealtivadigital.com" },
    ...(pkg.price.amount !== null && {
      offers: { "@type": "Offer", price: pkg.price.amount, priceCurrency: pkg.price.currency },
    }),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <PageHeader
        eyebrow={pkg.badge ?? line.name}
        title={pkg.name}
        intro={pkg.summary}
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: line.name, href: `/servicios/${line.slug}` },
          { label: pkg.name },
        ]}
      />

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_360px]">
          {/* Detalle */}
          <div className="space-y-8">
            {pkg.tagline && <p className="text-lg font-semibold text-teal">{pkg.tagline}</p>}

            {pkg.includes.length > 0 && (
              <div className="rounded-block bg-white p-8 ring-1 ring-navy/5">
                <h2 className="font-display text-2xl text-navy">Qué incluye</h2>
                <ul className="mt-6 space-y-3">
                  {pkg.includes.map((x) => (
                    <li key={x} className="flex gap-3 text-navy/75">
                      <span aria-hidden className="mt-0.5 font-bold text-teal">✓</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(pkg.excludes.length > 0 || pkg.idealFor.length > 0) && (
              <div className="grid gap-6 md:grid-cols-2">
                {pkg.idealFor.length > 0 && (
                  <div className="rounded-card bg-white p-6 ring-1 ring-navy/5">
                    <h3 className="font-bold text-navy">Ideal para</h3>
                    <ul className="mt-4 space-y-2 text-sm text-navy/70">
                      {pkg.idealFor.map((x) => (
                        <li key={x}>• {x}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {pkg.excludes.length > 0 && (
                  <div className="rounded-card bg-white p-6 ring-1 ring-navy/5">
                    <h3 className="font-bold text-navy">No incluye</h3>
                    <ul className="mt-4 space-y-2 text-sm text-navy/70">
                      {pkg.excludes.map((x) => (
                        <li key={x}>— {x}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {line.conditions.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-navy">Condiciones del servicio</h2>
                <dl className="mt-4 space-y-3">
                  {line.conditions.map((c, i) => (
                    <div key={`${c.title}-${i}`} className="text-sm leading-relaxed">
                      <dt className="inline font-semibold text-navy">{c.title}: </dt>
                      <dd className="inline text-navy/60">{c.detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Precio y CTA */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-block bg-navy p-8 text-white">
              {price.prefix && <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">{price.prefix}</span>}
              <span className="font-display text-5xl">{price.main}</span>
              {price.suffix && <span className="ml-1 text-white/60">{price.suffix}</span>}
              {pkg.price.note && <p className="mt-2 text-sm text-white/50">{pkg.price.note}</p>}

              {pkg.details.length > 0 && (
                <dl className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
                  {pkg.details.map((d) => (
                    <div key={d.label} className="flex justify-between gap-4">
                      <dt className="text-white/50">{d.label}</dt>
                      <dd className="text-right font-semibold">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <a
                href={quote}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex justify-center rounded-full bg-magenta px-6 py-3.5 font-semibold transition-colors hover:bg-magenta-light"
              >
                Cotizar este paquete
              </a>
              <Link href="/contactanos" className="mt-3 flex justify-center text-sm text-white/60 hover:text-teal">
                o escríbenos por el formulario
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="bg-navy py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle dark eyebrow="Portafolio" title="Trabajos relacionados" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} lineNames={lineNames} />
              ))}
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle
              eyebrow={line.name}
              title="Otros paquetes de esta línea"
              action={
                <Link href={`/servicios/${line.slug}`} className="text-sm font-semibold text-teal hover:text-navy">
                  Ver la línea completa →
                </Link>
              }
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.slice(0, 3).map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
