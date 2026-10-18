// Antes de los paquetes: qué significa hacer estrategia (no solo publicar), como un flujo de
// cinco pasos. Al pasar el mouse (o tocar, en celular) cada paso se amplía y muestra más detalle.

const pillars: { title: string; detail: string; more: string; icon: React.ReactNode }[] = [
  {
    title: "Tu web, la matriz",
    detail: "La base propia de tu marca en internet.",
    more: "Ahí viven tu catálogo, tu información y tu forma de atender. Las redes llevan público hacia ella.",
    icon: <path d="M3 11l9-7 9 7v9H3zM9 20v-6h6v6" />,
  },
  {
    title: "Presencia diversificada en redes",
    detail: "Cada red es como una sucursal con su propio público.",
    more: "Facebook, Instagram, TikTok, LinkedIn y Google Business: cada canal con su tono y su estrategia.",
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
    title: "Calidad de producción",
    detail: "Tu marca se percibe por lo que muestra.",
    more: "Video, foto y diseño a la altura de tu negocio, en cada publicación y en cada red.",
    icon: <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />,
  },
  {
    title: "Constancia mensual",
    detail: "Un plan de contenido cada mes.",
    more: "Calendario, producción y publicación sin pausas: una sucursal sin atención solo acumula polvo.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4M8 15l2.5 2.5L16 13" />
      </>
    ),
  },
  {
    title: "Pauta mes a mes",
    detail: "Campañas que impulsan tus productos clave.",
    more: "Cada mes elegimos qué productos o servicios impulsar con publicidad y medimos lo que funciona.",
    icon: (
      <>
        <path d="M3 10v4h4l8 5V5L7 10z" />
        <path d="M19 9a4 4 0 010 6" />
      </>
    ),
  },
];

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

        {/* Flujo de 5 pasos con flechas */}
        <ol className="mt-12 flex flex-col items-stretch gap-2 lg:min-h-[17rem] lg:flex-row lg:items-start lg:gap-0">
          {pillars.map((p, i) => (
            <li key={p.title} className="flex flex-col items-center lg:flex-1 lg:flex-row lg:items-start">
              <div
                tabIndex={0}
                className="group relative w-full cursor-default rounded-card bg-cream p-5 outline-none ring-1 ring-navy/5 transition-all duration-300 ease-out hover:z-10 hover:bg-white hover:shadow-[0_24px_48px_-16px_rgba(26,26,46,0.3)] hover:ring-teal/40 focus:z-10 focus:bg-white focus:shadow-[0_24px_48px_-16px_rgba(26,26,46,0.3)] focus:ring-teal/40 lg:hover:scale-[1.06] lg:focus:scale-[1.06]"
              >
                <div className="flex items-center gap-3 lg:block">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-cream transition-transform duration-300 group-hover:scale-110 group-focus:scale-110 ${
                      i % 2 ? "bg-magenta" : "bg-teal"
                    }`}
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {p.icon}
                    </svg>
                  </span>
                  <h3 className="font-bold leading-snug text-navy lg:mt-4">
                    <span className={`mr-1 font-display ${i % 2 ? "text-magenta" : "text-teal"}`}>{i + 1}.</span>
                    {p.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{p.detail}</p>
                <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-navy/80 opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100 group-focus:mt-3 group-focus:max-h-40 group-focus:opacity-100">
                  {p.more}
                </p>
              </div>
              {i < pillars.length - 1 && (
                <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center text-magenta lg:mt-12 lg:h-auto lg:w-6">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>

        <a href="#quiz" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-magenta hover:text-magenta-light">
          ¿No sabes qué plan necesitas? Responde 7 preguntas rápidas ↓
        </a>
      </div>
    </section>
  );
}
