import Link from "next/link";
import NaturalImage from "@/components/site/NaturalImage";
import { lineHref } from "@/lib/content/links";

// Cada especialidad lleva a la línea de servicio que la representa.
const team = [
  { role: "Dirección estratégica", href: lineHref("marketing-digital"), icon: "strategy" },
  { role: "Videos para redes sociales", href: lineHref("videos-para-redes-sociales"), icon: "camera" },
  { role: "Modelos para Contenido Orgánico", href: lineHref("modelos-contenido-organico"), icon: "community" },
  { role: "Diseño y desarrollo web", href: lineHref("diseno-web"), icon: "web" },
  { role: "Pauta digital", href: lineHref("trafficker-digital"), icon: "ads" },
] as const;

const icons: Record<(typeof team)[number]["icon"], React.ReactNode> = {
  strategy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="13" height="10" rx="2" />
      <path d="M16 10.5 21 8v8l-5-2.5" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 14l-2 2 2 2M15 14l2 2-2 2" />
    </>
  ),
  ads: (
    <>
      <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      <path d="m15 5 3-2 3 2" />
    </>
  ),
  community: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="m18 4 .9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1L15 6.2l2.1-.3z" />
    </>
  ),
};

const values = ["Pasión", "Empatía", "Eficiencia", "Innovación", "Confianza"];

export default function AboutSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      {/* Especialidades: una sola fila de accesos a cada departamento */}
      <div className="mx-auto mb-16 max-w-6xl px-6 md:mb-20">
        <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-navy/50">
          5 especialistas trabajando como uno solo
        </h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((t, i) => (
            <li key={t.role}>
              <Link
                href={t.href}
                className="group flex h-full flex-col items-center gap-3 rounded-card bg-white px-3 py-5 text-center ring-1 ring-navy/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-teal/40"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-cream ${
                    i % 2 === 0 ? "bg-teal" : "bg-magenta"
                  }`}
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons[t.icon]}
                  </svg>
                </span>
                <span className="text-sm font-semibold leading-snug text-navy">{t.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Foto con detalles de marca: marco desplazado turquesa, órbita punteada y punto magenta */}
        <div className="relative mx-auto w-fit max-w-full self-start p-4 lg:mt-1">
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[3rem] border-2 border-teal/40" />
          <svg
            aria-hidden
            className="absolute -left-6 -top-6 h-32 w-32 text-magenta/50"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" />
          </svg>
          <span aria-hidden className="absolute -bottom-1 right-10 h-5 w-5 rounded-full bg-magenta" />
          <span aria-hidden className="absolute right-0 top-16 h-3 w-3 rounded-full bg-teal" />
          <NaturalImage
            img={{
              src: "https://crealtivadigital.com/wp-content/uploads/2026/02/portada-nico-y-alexis.webp",
              alt: "Estrategas de Crealtiva Digital trabajando con una tablet",
            }}
            sizes="(min-width: 1024px) 520px, 100vw"
            maxHeight={620}
            className="mx-auto rounded-[3rem] bg-navy"
          />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-0.5 w-10 rounded-full bg-gradient-to-r from-teal to-magenta" />
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">Quiénes somos</p>
          </div>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy md:text-5xl">
            No somos una agencia más. Somos el equipo que tu marca necesitaba.
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-navy/65">
            Crealtiva Digital nació en Quito con una convicción clara: las marcas ecuatorianas merecen estrategia
            digital de calidad, no solo publicaciones bonitas. Trabajamos con empresarios que ya tienen un negocio
            sólido y quieren escalarlo en digital con autoridad y criterio.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Nuestros valores">
            {values.map((v) => (
              <li key={v} className="rounded-full bg-teal/[0.12] px-4 py-1.5 text-sm font-semibold text-teal">
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
