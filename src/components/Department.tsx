const attributes = [
  {
    icon: "🔍",
    title: "Diagnóstico estratégico",
    description:
      "Antes de ejecutar, analizamos tu negocio, tu competencia y tus objetivos para construir una estrategia con sentido.",
  },
  {
    icon: "🔗",
    title: "Servicios integrados",
    description:
      "Marketing, producción, pauta y web trabajan juntos bajo una sola estrategia — no como piezas desconectadas.",
  },
  {
    icon: "📈",
    title: "Resultados medibles",
    description:
      "Cada acción tiene métricas claras. Recibes reportes mensuales con lo que funcionó, lo que se ajustó y los próximos pasos.",
  },
];

const differentiators = [
  {
    title: "Equipo completo, no un freelancer",
    description: "Diseñadores, redactores, productores y traffickers asignados a tu cuenta.",
  },
  {
    title: "Sin contratos forzosos",
    description: "Flexibilidad para adaptar el servicio a cada etapa de tu negocio.",
  },
  {
    title: "Ecosistemas, no tareas sueltas",
    description: "Construimos sistemas digitales que crecen contigo a largo plazo.",
  },
  {
    title: "Enfoque en el mercado medio-premium",
    description: "Entendemos el perfil de empresa que quiere crecer con estándares altos.",
  },
];

export default function Department() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Department header */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="inline-block bg-navy text-teal text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide">
              Nuestro Modelo
            </span>
            <h2 className="font-grotesk font-bold text-navy text-3xl md:text-4xl leading-tight mb-5">
              Tu departamento de marketing externo
            </h2>
            <p className="font-sans text-navy/60 text-lg leading-relaxed">
              No somos una agencia que ejecuta órdenes. Somos el equipo de marketing
              que tu empresa necesita sin los costos de tenerlo en planilla.
            </p>
          </div>

          <div className="grid gap-5">
            {attributes.map((a) => (
              <div key={a.title} className="bg-white rounded-card px-6 py-5 flex gap-4 items-start shadow-sm">
                <span className="text-2xl mt-0.5">{a.icon}</span>
                <div>
                  <h3 className="font-grotesk font-bold text-navy text-base mb-1">{a.title}</h3>
                  <p className="font-sans text-navy/55 text-sm leading-relaxed">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Crealtiva */}
        <div id="nosotros">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal/15 text-teal text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
              ¿Por qué Crealtiva Digital?
            </span>
            <h2 className="font-grotesk font-bold text-navy text-3xl md:text-4xl">
              Lo que nos hace diferentes
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentiators.map((d, i) => (
              <div
                key={d.title}
                className="bg-white rounded-block p-6 flex flex-col gap-3 shadow-sm"
              >
                <span className="font-grotesk font-black text-teal text-3xl opacity-30">
                  0{i + 1}
                </span>
                <h3 className="font-grotesk font-bold text-navy text-base leading-snug">{d.title}</h3>
                <p className="font-sans text-navy/55 text-sm leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
