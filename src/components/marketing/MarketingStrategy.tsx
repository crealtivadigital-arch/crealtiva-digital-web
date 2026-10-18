// Antes de los paquetes: cómo trabajamos la estrategia, de la auditoría al reporte, como un flujo
// de cinco pasos. Al pasar el mouse (o tocar, en celular) cada paso se amplía y muestra el detalle.

const pillars: { title: string; detail: string; more: string[]; icon: React.ReactNode }[] = [
  {
    title: "Auditoría",
    detail: "Visitamos tu negocio y definimos objetivos SMART.",
    more: [
      "Te acompañamos a conocer tu negocio e identificar su calidad",
      "Definimos qué quieres lograr",
      "Objetivos claros, medibles, con plazo y alineados a tu crecimiento",
    ],
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3M8 11l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Levantamiento de recursos",
    detail: "Nos empapamos de tu negocio y tu marca.",
    more: [
      "Contrato sin permanencia obligatoria: te quedas por la calidad y los resultados",
      "Registro de cómo recibimos tu marca, para medir su crecimiento",
      "Brief: mercado, competencia, claves de contenido y forma de comunicar",
      "Kit creativo: logo, manual de marca, tipografías",
    ],
    icon: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2zM12 11v5M9.5 13.5h5" />,
  },
  {
    title: "Producción",
    detail: "Filmamos en tu negocio y armamos el calendario.",
    more: [
      "Filmación en tu negocio o locación para el contenido del mes",
      "Calendario o plan de publicaciones",
      "Gráficas de nuestro departamento de diseño",
    ],
    icon: (
      <>
        <rect x="3" y="7" width="13" height="10" rx="2" />
        <path d="M16 10.5 21 8v8l-5-2.5" />
      </>
    ),
  },
  {
    title: "Gestión de comunidad",
    detail: "Revisamos, publicamos e interactuamos.",
    more: [
      "Revisión y corrección del material antes de publicar",
      "El community manager publica e interactúa con tu comunidad",
      "Reporte de cómo avanza la gestión de tus redes",
    ],
    icon: (
      <>
        <path d="M4 5h16v10H9l-5 4z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
  },
  {
    title: "Reporte estratégico",
    detail: "Medimos el avance hacia tu objetivo.",
    more: [
      "Cómo los esfuerzos se alinean al plan aprobado al inicio",
      "El avance de etapa en etapa hacia el objetivo",
      "Propuesta de nuevos canales, recursos e ideas para crecer",
    ],
    icon: <path d="M4 19h16M6 15l4-4 3 3 5-6M14 8h4v4" />,
  },
];

export default function MarketingStrategy() {
  return (
    <section className="relative z-10 overflow-x-clip bg-white py-20 md:py-24">
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
            El crecimiento de una marca no es subir posts: empieza con un análisis estratégico, objetivos claros y un
            proceso que se mide mes a mes. Así trabajamos en todos los planes:
          </p>
        </div>

        {/* Flujo de 5 pasos con flechas */}
        <ol className="mt-12 flex flex-col items-stretch gap-2 lg:flex-row lg:items-start lg:gap-0">
          {pillars.map((p, i) => (
            <li key={p.title} className="flex flex-col items-center lg:flex-1 lg:flex-row lg:items-start">
              <div
                tabIndex={0}
                className="group relative w-full cursor-default rounded-card bg-cream p-5 outline-none ring-1 ring-navy/5 transition-all duration-300 ease-out hover:z-20 hover:bg-white hover:shadow-[0_24px_48px_-16px_rgba(26,26,46,0.3)] hover:ring-teal/40 focus:z-20 focus:bg-white focus:shadow-[0_24px_48px_-16px_rgba(26,26,46,0.3)] focus:ring-teal/40 lg:hover:scale-[1.06] lg:hover:rounded-b-none lg:focus:scale-[1.06] lg:focus:rounded-b-none"
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
                <ul className="max-h-0 space-y-1.5 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-80 group-hover:opacity-100 group-focus:mt-3 group-focus:max-h-80 group-focus:opacity-100 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-full lg:mt-0 lg:max-h-none lg:-translate-y-1 lg:rounded-b-card lg:bg-white lg:px-5 lg:pb-5 lg:pt-1 lg:shadow-[0_24px_48px_-16px_rgba(26,26,46,0.3)] lg:ring-1 lg:ring-teal/40 lg:[clip-path:inset(0_-40px_-40px_-40px)] lg:group-hover:mt-0 lg:group-hover:translate-y-0 lg:group-focus:mt-0 lg:group-focus:translate-y-0">
                  {p.more.map((m) => (
                    <li key={m} className="flex gap-2 text-[0.8125rem] leading-snug text-navy/80">
                      <span aria-hidden className={`font-bold ${i % 2 ? "text-magenta" : "text-teal"}`}>
                        ✓
                      </span>
                      {m}
                    </li>
                  ))}
                </ul>
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
