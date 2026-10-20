import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/site/ProjectCard";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";
import { formatPrice, getPackages, getProjects, getServiceLine, getServiceLines } from "@/lib/content";
import { SOCIAL_VIDEO_LINE } from "@/lib/content/links";
import { wa } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Crealtiva Movie Maker — Producción audiovisual en Quito",
  description:
    "Producción audiovisual de Crealtiva Digital en Quito y Valles: video para redes, filmación institucional, podcast, documentales y films. Grabación 4K, audio profesional y postproducción.",
  alternates: { canonical: "/movie-maker" },
};

const WA_PRODUCCION = wa("Hola, quiero cotizar una producción con Crealtiva Movie Maker.");

// Redes usa los paquetes del catálogo. Los otros cuatro formatos se cotizan por proyecto
// (PRODUCTOS Y SERVICIOS.md, "Proyectos especiales"): no publicar precios hasta que el cliente los defina.
const formats = [
  {
    id: "redes",
    name: "Redes",
    detail: "Videos verticales de hasta un minuto para Reels y TikTok, grabados en locación y listos para publicar o pautar.",
  },
  {
    id: "filmacion",
    name: "Filmación",
    detail: "Videos institucionales y corporativos de más de tres minutos, comerciales y rodajes de más de un día.",
  },
  {
    id: "podcast",
    name: "Podcast",
    detail: "Grabación en video de tu podcast o videocast de marca, con cámaras y audio profesional.",
  },
  {
    id: "documentales",
    name: "Documentales",
    detail: "Documentales corporativos que cuentan la historia de tu empresa, tu gente o tus proyectos.",
  },
  {
    id: "films",
    name: "Films",
    detail: "Piezas narrativas para marcas, desde el guion hasta la postproducción.",
  },
];

export default async function MovieMakerPage() {
  const [line, packages, projects, lines] = await Promise.all([
    getServiceLine(SOCIAL_VIDEO_LINE),
    getPackages(SOCIAL_VIDEO_LINE),
    getProjects({ lineSlug: SOCIAL_VIDEO_LINE }),
    getServiceLines(),
  ]);
  const lineNames = Object.fromEntries(lines.map((l) => [l.slug, l.name]));

  return (
    <main className="bg-black text-cream">
      {/* Pantalla: franjas letterbox que se cierran y el título como créditos de apertura */}
      <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 pt-28">
        <div aria-hidden className="letterbox-top absolute inset-x-0 top-0 h-[12vh] bg-navy" />
        <div aria-hidden className="letterbox-bottom absolute inset-x-0 bottom-0 h-[12vh] bg-navy" />

        <div className="relative mx-auto w-full max-w-6xl">
          <nav aria-label="Áreas de Crealtiva" className="mb-14 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/servicios/marketing-digital" className="text-cream/45 transition-colors hover:text-cream">
              Marketing
            </Link>
            <Link href="/servicios/diseno-web" className="text-cream/45 transition-colors hover:text-cream">
              Sitios web
            </Link>
            <span aria-current="page" className="flex items-center gap-2 font-semibold text-cream">
              <span aria-hidden className="h-2 w-2 rounded-full bg-magenta" />
              Producción
            </span>
          </nav>

          <p className="text-lg text-cream/60">Crealtiva presenta</p>
          <h1 className="credits-in mt-3 font-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] tracking-tight">
            Movie
            <br />
            Maker
          </h1>
          <p className="mt-10 max-w-xl text-lg font-light leading-relaxed text-cream/65">
            Producción audiovisual en Quito y los Valles. Grabamos en 4K, con audio profesional, y entregamos cada
            pieza editada, con color y sonido.
          </p>
          <a
            href={WA_PRODUCCION}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-magenta px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-magenta-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            <WhatsAppIcon /> Cotizar mi producción
          </a>
        </div>
      </section>

      {/* Cartelera: los cinco formatos */}
      <section aria-labelledby="cartelera" className="border-t border-cream/10 bg-black py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="cartelera" className="max-w-xl font-display text-3xl leading-tight md:text-4xl">
            Qué producimos
          </h2>

          <ul className="mt-14 divide-y divide-cream/10 border-y border-cream/10">
            {formats.map((f) => (
              <li key={f.id} id={f.id} className="scroll-mt-24 py-10 md:py-14">
                <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-end">
                  <h3 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] tracking-tight text-cream">
                    {f.name}
                  </h3>
                  <div className="md:pb-3">
                    <p className="max-w-md leading-relaxed text-cream/60">{f.detail}</p>
                    {f.id !== "redes" && (
                      <a
                        href={wa(`Hola, quiero cotizar una producción de ${f.name} con Crealtiva Movie Maker.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline"
                      >
                        <WhatsAppIcon size={14} /> Cotización a medida
                      </a>
                    )}
                  </div>
                </div>

                {f.id === "redes" && packages.length > 0 && (
                  <ul className="mt-10 grid gap-4 md:grid-cols-3">
                    {packages.map((p) => {
                      const price = formatPrice(p.price);
                      return (
                        <li key={p.slug}>
                          <Link
                            href={`/servicios/${p.lineSlug}/${p.slug}`}
                            className="flex h-full flex-col rounded-card bg-navy p-6 ring-1 ring-cream/10 transition-colors hover:ring-teal/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
                          >
                            <span className="font-bold text-cream">{p.name}</span>
                            <span className="mt-1 text-sm text-cream/50">{p.includes[0]}</span>
                            <span className="mt-6 font-display text-3xl text-cream">
                              {price.prefix && <span className="mr-1 text-sm text-cream/50">{price.prefix}</span>}
                              {price.main}
                              {price.suffix && <span className="ml-1 text-sm text-cream/50">{price.suffix}</span>}
                            </span>
                            <span className="mt-4 text-sm font-semibold text-teal">Ver qué incluye</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Estándar técnico de todas las producciones */}
      {line && line.alwaysIncluded.length > 0 && (
        <section className="bg-navy py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-xl font-display text-3xl leading-tight md:text-4xl">En cada producción</h2>
            <dl className="mt-12 grid gap-10 md:grid-cols-3">
              {line.alwaysIncluded.map((item) => (
                <div key={item.title} className="border-t-2 border-teal pt-5">
                  <dt className="font-bold text-cream">{item.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-cream/60">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Proyectos de producción del portafolio */}
      {projects.length > 0 && (
        <section className="bg-black py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-xl font-display text-3xl leading-tight md:text-4xl">En pantalla</h2>
              <Link href="/portafolio" className="text-sm font-semibold text-teal hover:underline">
                Ver todo el portafolio
              </Link>
            </div>
            <div className="columns-2 gap-3 sm:gap-6 lg:columns-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} lineNames={lineNames} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cierre */}
      <section className="relative overflow-hidden bg-black px-6 pb-28 pt-10">
        <div className="mx-auto max-w-6xl border-t border-cream/10 pt-20 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight md:text-5xl">
            Cuéntanos qué quieres grabar
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-cream/60">
            Te respondemos con una propuesta: formato, días de rodaje, entregables y precio.
          </p>
          <a
            href={WA_PRODUCCION}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-magenta px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-magenta-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            <WhatsAppIcon /> Cotizar mi producción
          </a>
        </div>
      </section>
    </main>
  );
}
