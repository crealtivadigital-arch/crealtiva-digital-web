import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NaturalImage from "@/components/site/NaturalImage";
import ProductSheet from "@/components/site/ProductSheet";
import ProjectCard from "@/components/site/ProjectCard";
import PostCard from "@/components/site/PostCard";
import SectionTitle from "@/components/site/SectionTitle";
import CTABanner from "@/components/CTABanner";
import MarketingStrategy from "@/components/marketing/MarketingStrategy";
import PackageQuiz, { type QuizPackage } from "@/components/marketing/PackageQuiz";
import PackageCompare, { type ComparePackage } from "@/components/marketing/PackageCompare";
import PackageFamilies from "@/components/marketing/PackageFamilies";
import { familyOf } from "@/content/marketing";
import FAQ from "@/components/FAQ";
import { formatPrice, getPackages, getPosts, getProjects, getServiceLine, getServiceLines } from "@/lib/content";
import { STAGES, STAGE_ORDER } from "@/lib/content/format";
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

  // Marketing Digital tiene su propia guía: estrategia, quiz, familias de planes y comparador
  const isMarketing = line.slug === "marketing-digital";
  const priceLabel = (p: (typeof packages)[number]) => {
    const pr = formatPrice(p.price);
    return [pr.prefix, pr.main, pr.suffix].filter(Boolean).join(" ");
  };
  const quizPkgs: Record<string, QuizPackage> = isMarketing
    ? Object.fromEntries(
        packages.map((p) => [p.slug, { name: p.name, tagline: p.tagline, price: priceLabel(p), family: familyOf(p.slug).name }]),
      )
    : {};
  const comparePkgs: ComparePackage[] = isMarketing
    ? packages.map((p) => ({ slug: p.slug, name: p.name, price: priceLabel(p), family: familyOf(p.slug).name, stage: STAGES[p.stage].short }))
    : [];

  return (
    <main>
      {/* Cabecera: qué es la línea + su foto en proporción original */}
      <section className="relative overflow-hidden bg-navy pb-16 pt-32 md:pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <nav aria-label="Ruta de navegación" className="mb-6 text-xs text-cream/40">
              <Link href="/" className="hover:text-teal">Inicio</Link> / <Link href="/servicios" className="hover:text-teal">Servicios</Link> /{" "}
              <span className="text-cream/60">{line.name}</span>
            </nav>
            <span className="inline-block rounded-full bg-teal/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-teal">{line.tagline}</span>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] text-cream md:text-6xl">{line.name}</h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-cream/65">{line.intro}</p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              {line.highlights.map((h) => (
                <div key={h.label}>
                  <dd className="text-2xl font-bold text-teal">{h.value}</dd>
                  <dt className="text-xs text-cream/50">{h.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#paquetes"
                className="inline-flex rounded-full bg-magenta px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-magenta-light"
              >
                Ver los {packages.length} paquetes ↓
              </a>
              <a
                href={wa(`Hola, quiero cotizar ${line.name} con Crealtiva Digital.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-cream/20 px-7 py-3.5 text-sm font-semibold text-cream/85 transition-colors hover:border-teal hover:text-teal"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
          {line.cover && (
            <div className="relative">
              <NaturalImage img={line.cover} sizes="(min-width: 1024px) 520px, 100vw" maxHeight={500} priority className="mx-auto rounded-block" />
              {/* Lo clave de la línea, al pie de la foto (como en el inicio) */}
              <ul className="relative z-10 mx-auto -mt-12 grid w-[calc(100%-2rem)] max-w-[480px] gap-x-5 gap-y-2.5 rounded-2xl border border-white/25 bg-white/15 p-5 text-sm text-cream shadow-xl backdrop-blur-md sm:grid-cols-2">
                {line.keyPoints.map((k) => (
                  <li key={k} className="flex gap-2.5 leading-snug">
                    <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-[11px] font-bold text-cream">
                      ✓
                    </span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>


      {isMarketing && <MarketingStrategy />}
      {isMarketing && <PackageQuiz pkgs={quizPkgs} />}

      {/* Guía por fase de crecimiento */}
      {!isMarketing && (
      <section className="bg-cream pt-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle
            eyebrow="¿En qué fase está tu marca?"
            title="Elige según el momento de tu negocio"
            intro="Cada paquete apunta a una fase de crecimiento. Ubica la tuya y salta directo a la ficha."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {STAGE_ORDER.filter((st) => packages.some((p) => p.stage === st)).map((st) => (
              <div key={st} className="rounded-card bg-white p-6 ring-1 ring-navy/5">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STAGES[st].tone}`}>{STAGES[st].short}</span>
                <p className="mt-3 text-sm leading-relaxed text-navy/65">{STAGES[st].description}</p>
                <ul className="mt-4 space-y-1.5">
                  {packages
                    .filter((p) => p.stage === st)
                    .map((p) => {
                      const pr = formatPrice(p.price);
                      return (
                        <li key={p.slug}>
                          <a href={`#${p.slug}`} className="flex justify-between gap-3 text-sm font-semibold text-navy hover:text-teal">
                            <span>{p.name}</span>
                            <span className="shrink-0 font-normal text-navy/50">
                              {pr.main}
                              {pr.suffix && ` ${pr.suffix}`}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Fichas completas */}
      <section id="paquetes" className={`scroll-mt-20 bg-cream ${isMarketing ? "pb-2 pt-20" : "py-20"}`}>
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle
            eyebrow="Paquetes"
            title={`Todos los paquetes de ${line.name}`}
            intro={isMarketing ? "Agrupados por familia: cada una es una etapa de crecimiento y suma sobre la anterior." : undefined}
          />
          {!isMarketing && (
            <div className="space-y-8">
              {packages.map((p) => (
                <ProductSheet key={p.slug} pkg={p} lineName={line.name} />
              ))}
            </div>
          )}

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

      {isMarketing && <PackageFamilies packages={packages} lineName={line.name} />}
      {isMarketing && <PackageCompare pkgs={comparePkgs} />}

      {/* Proceso (en Marketing ya lo cuenta la sección de estrategia) */}
      {line.process.length > 0 && !isMarketing && (
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
            <div className="columns-2 gap-3 sm:gap-6 lg:columns-3">
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
            {/* Mosaico en 3 columnas: los textos de distinto largo se acomodan sin filas vacías */}
            <dl className="gap-4 sm:columns-2 lg:columns-3">
              {line.conditions.map((c, i) => (
                <div
                  key={`${c.title}-${i}`}
                  className={`mb-4 flex break-inside-avoid gap-3 rounded-card border-l-4 bg-white p-4 shadow-[0_8px_20px_-12px_rgba(26,26,46,0.18)] ${
                    i % 2 ? "border-magenta" : "border-teal"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-cream ${
                      i % 2 ? "bg-magenta" : "bg-teal"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <dt className="text-sm font-bold text-navy">{c.title}</dt>
                    <dd className="mt-1 text-[0.8125rem] leading-relaxed text-navy/60">{c.detail}</dd>
                  </div>
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
            <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
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
