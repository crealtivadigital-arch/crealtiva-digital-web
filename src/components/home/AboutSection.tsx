import NaturalImage from "@/components/site/NaturalImage";

const team = [
  { role: "Dirección estratégica", detail: "Estrategia de marca, planificación digital y gestión de proyectos" },
  { role: "Producción multimedia", detail: "Filmación, fotografía, dirección creativa y postproducción" },
  { role: "Diseño y desarrollo web", detail: "UI/UX, desarrollo web e identidad visual" },
  { role: "Pauta digital", detail: "Meta, Google y TikTok Ads, con análisis de resultados" },
  { role: "Contenido y comunidad", detail: "Community management, copywriting y reportes mensuales" },
];

const values = ["Pasión", "Empatía", "Eficiencia", "Innovación", "Confianza"];

export default function AboutSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <NaturalImage
          img={{
            src: "https://crealtivadigital.com/wp-content/uploads/2026/02/portada-nico-y-alexis.webp",
            alt: "Estrategas de Crealtiva Digital trabajando con una tablet",
          }}
          sizes="(min-width: 1024px) 520px, 100vw"
          maxHeight={620}
          className="mx-auto self-center rounded-block bg-navy"
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">Quiénes somos</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy md:text-5xl">
            No somos una agencia más. Somos el equipo que tu marca necesitaba.
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-navy/65">
            Crealtiva Digital nació en Quito con una convicción clara: las marcas ecuatorianas merecen estrategia
            digital de calidad, no solo publicaciones bonitas. Trabajamos con empresarios que ya tienen un negocio
            sólido y quieren escalarlo en digital con autoridad y criterio.
          </p>

          <h3 className="mt-10 text-sm font-semibold uppercase tracking-widest text-navy/50">
            5 especialistas trabajando como uno solo
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {team.map((t) => (
              <li key={t.role} className="rounded-card bg-white p-4 ring-1 ring-navy/5">
                <p className="font-semibold text-navy">{t.role}</p>
                <p className="mt-1 text-sm leading-snug text-navy/55">{t.detail}</p>
              </li>
            ))}
          </ul>

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
