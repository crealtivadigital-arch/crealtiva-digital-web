import { families } from "@/content/marketing";

// Antes de los paquetes: qué significa hacer estrategia (no solo publicar) y la ruta de
// crecimiento Bite → Tasty → Elemental → Full House.

const pillars: { title: string; detail: string; icon: React.ReactNode }[] = [
  {
    title: "Tu web es la matriz",
    detail: "La base propia de tu marca en internet. Las redes llevan público hacia ella.",
    icon: <path d="M3 11l9-7 9 7v9H3zM9 20v-6h6v6" />,
  },
  {
    title: "Diversifica tu presencia",
    detail: "Cada red es como una sucursal en un barrio distinto, con su propio público e idioma.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="5" r="2" />
        <circle cx="20" cy="5" r="2" />
        <circle cx="4" cy="19" r="2" />
        <circle cx="20" cy="19" r="2" />
        <path d="M6 6.5l3.8 3.5M18 6.5l-3.8 3.5M6 17.5l3.8-3.5M18 17.5l-3.8-3.5" />
      </>
    ),
  },
  {
    title: "Calidad en cada vitrina",
    detail: "Tu marca se percibe por lo que muestra: diseño, foto y video a la altura de tu negocio.",
    icon: <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />,
  },
  {
    title: "Constancia mensual",
    detail: "Un plan de contenido cada mes. Una sucursal sin atención solo acumula polvo.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4M8 15l2.5 2.5L16 13" />
      </>
    ),
  },
  {
    title: "Pauta e interacción",
    detail: "La publicidad impulsa; la conversación y las reseñas construyen confianza.",
    icon: (
      <>
        <path d="M3 10v4h4l8 5V5L7 10z" />
        <path d="M19 9a4 4 0 010 6" />
      </>
    ),
  },
];

const steps: Record<string, { label: string; color: string }> = {
  bite: { label: "Arranque", color: "bg-teal" },
  tasty: { label: "Posicionamiento", color: "bg-magenta" },
  elemental: { label: "Multiplataforma", color: "bg-navy" },
  "full-house": { label: "Departamento completo", color: "bg-gradient-to-br from-teal to-magenta" },
};

export default function MarketingStrategy() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-magenta/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-0.5 w-10 rounded-full bg-gradient-to-r from-teal to-magenta" />
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">Estrategia de marketing</p>
          </div>
          <h2 className="mt-3 font-display text-3xl leading-tight text-navy md:text-5xl">
            Estrategia, <span className="text-magenta">no solo publicar</span>
          </h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-navy/65">
            El crecimiento de una marca no es subir posts: es diversificar tu presencia digital y decidir hacia dónde
            quieres crecer. Todo plan de Crealtiva incluye esta mirada.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => (
            <li key={p.title} className="rounded-card bg-cream p-5 ring-1 ring-navy/5">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-cream ${i % 2 ? "bg-magenta" : "bg-teal"}`}
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {p.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-bold leading-snug text-navy">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">{p.detail}</p>
            </li>
          ))}
        </ul>

        {/* Ruta de crecimiento */}
        <div className="mt-14 rounded-block bg-navy p-6 md:p-10">
          <h3 className="font-display text-2xl text-cream md:text-3xl">¿Hacia dónde quieres crecer?</h3>
          <p className="mt-2 text-cream/60">Cada familia de planes es una etapa. Puedes empezar en cualquiera y escalar cuando lo necesites.</p>
          <ol className="mt-8 grid gap-3 md:grid-cols-4">
            {families.map((f, i) => (
              <li key={f.id} className="relative">
                <a
                  href={`#familia-${f.id}`}
                  className="group flex h-full flex-col rounded-card bg-white/[0.05] p-5 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/[0.09]"
                >
                  <span className="flex items-center gap-2">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-cream ${steps[f.id].color} ring-1 ring-white/20`}>
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-teal">{steps[f.id].label}</span>
                  </span>
                  <span className="mt-3 font-display text-2xl text-cream">{f.name}</span>
                  <span className="mt-1 text-sm leading-snug text-cream/60">{f.description}</span>
                  <span className="mt-auto pt-4 text-sm font-semibold text-cream transition-transform group-hover:translate-x-1">
                    Ver planes →
                  </span>
                </a>
                {i < families.length - 1 && (
                  <span aria-hidden className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-lg text-magenta md:block">
                    ›
                  </span>
                )}
              </li>
            ))}
          </ol>
          <a href="#quiz" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-magenta hover:text-magenta-light">
            ¿No sabes cuál es tu etapa? Responde 7 preguntas rápidas ↓
          </a>
        </div>
      </div>
    </section>
  );
}
