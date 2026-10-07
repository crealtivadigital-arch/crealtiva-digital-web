import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/site/PageHeader";
import PackageCard from "@/components/site/PackageCard";
import ProjectCard from "@/components/site/ProjectCard";
import PostCard from "@/components/site/PostCard";
import SectionTitle from "@/components/site/SectionTitle";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import { formatPrice, getPackages, getPosts, getProjects, getServiceLine, getServiceLines } from "@/lib/content";
import { wa } from "@/lib/constants";

type Props = { params: Promise<{ linea: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getServiceLines()).map((l) => ({ linea: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const line = await getServiceLine((await params).linea);
  if (!line) return {};
  return {
    title: `${line.name} en Quito — ${line.tagline}`,
    description: line.summary,
    alternates: { canonical: `/servicios/${line.slug}` },
  };
}

export default async function LineaPage({ params }: Props) {
  const { linea } = await params;
  const line = await getServiceLine(linea);
  if (!line) notFound();

  const [packages, projects, posts, lines] = await Promise.all([
    getPackages(line.slug),
    getProjects({ lineSlug: line.slug }),
    getPosts({ lineSlug: line.slug, limit: 3 }),
    getServiceLines(),
  ]);
  const lineNames = Object.fromEntries(lines.map((l) => [l.slug, l.name]));

  return (
    <main>
      <PageHeader
        eyebrow={line.tagline}
        title={line.name}
        intro={line.intro}
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios", href: "/servicios" }, { label: line.name }]}
      >
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          {line.highlights.map((h) => (
            <div key={h.label}>
              <span className="block text-2xl font-bold text-teal">{h.value}</span>
              <span className="text-xs text-cream/50">{h.label}</span>
            </div>
          ))}
        </div>
        <a
          href={wa(`Hola, quiero cotizar ${line.name} con Crealtiva Digital.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex rounded-full bg-magenta px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-magenta-light"
        >
          Cotizar {line.name.toLowerCase()} →
        </a>
      </PageHeader>

      {/* Paquetes */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle eyebrow="Paquetes" title={`Elige tu paquete de ${line.name.toLowerCase()}`} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>

          {line.alwaysIncluded.length > 0 && (
            <div className="mt-14 rounded-block bg-white p-8 ring-1 ring-navy/5">
              <h3 className="text-lg font-bold text-navy">Incluido en todos los paquetes</h3>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {line.alwaysIncluded.map((t) => (
                  <li key={t.title} className="flex gap-3">
                    <span aria-hidden className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                    <span className="text-sm leading-relaxed text-navy/70">
                      <strong className="font-semibold text-navy">{t.title}</strong>
                      {t.detail && ` — ${t.detail}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {line.extras && (
            <div className="mt-14">
              <h3 className="mb-5 text-lg font-bold text-navy">{line.extras.title}</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {line.extras.items.map((x) => {
                  const price = x.price ? formatPrice(x.price) : null;
                  return (
                    <div key={x.name} className="flex flex-col rounded-card border border-teal/20 bg-white/60 p-5">
                      <h4 className="font-semibold text-navy">{x.name}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-navy/60">{x.detail}</p>
                      {price && (
                        <p className="mt-auto pt-4 text-sm font-bold text-teal">
                          {price.prefix && `${price.prefix} `}
                          {price.main}
                          {price.suffix && ` ${price.suffix}`}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Proceso */}
      {line.process.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle eyebrow="Cómo trabajamos" title="Un proceso claro, sin improvisar" />
            <ol className="grid gap-6 md:grid-cols-4">
              {line.process.map((s, i) => (
                <li key={s.title} className="rounded-card bg-cream p-6">
                  <span className="font-display text-3xl text-teal">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">{s.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Portafolio relacionado */}
      {projects.length > 0 && (
        <section className="bg-navy py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle
              dark
              eyebrow="Portafolio"
              title="Trabajos de esta línea"
              action={
                <Link href="/portafolio" className="text-sm font-semibold text-teal hover:text-cream">
                  Ver todo el portafolio →
                </Link>
              }
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((p) => (
                <ProjectCard key={p.slug} project={p} lineNames={lineNames} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Condiciones */}
      {line.conditions.length > 0 && (
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle eyebrow="Condiciones" title="Lo que debes saber" />
            <dl className="grid gap-4 md:grid-cols-2">
              {line.conditions.map((c, i) => (
                <div key={`${c.title}-${i}`} className="rounded-card bg-white p-6 ring-1 ring-navy/5">
                  <dt className="font-semibold text-navy">{c.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-navy/60">{c.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Artículos relacionados */}
      {posts.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle eyebrow="News" title="Para profundizar" />
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {line.faqs.length > 0 && <FAQ items={line.faqs} bg="cream" />}

      <CTABanner waMessage={`Hola, quiero cotizar ${line.name} con Crealtiva Digital.`} />
    </main>
  );
}
