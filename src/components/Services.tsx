const services = [
  {
    number: "01",
    title: "Marketing Digital Estratégico",
    description:
      "Gestión integral de redes sociales, creación de contenido con propósito y construcción de comunidades activas alrededor de tu marca.",
    highlights: ["Estrategia de contenido", "Community management", "Calendario editorial", "Reporte mensual"],
    color: "teal",
    href: "https://crealtivadigital.com/marketing-digital/",
  },
  {
    number: "02",
    title: "Producción Multimedia",
    description:
      "Fotografía profesional para productos y negocios, video UGC con modelos y producción audiovisual que conecta con tu audiencia.",
    highlights: ["Fotografía de producto", "Video UGC", "Reels y contenido social", "Edición profesional"],
    color: "magenta",
    href: "https://crealtivadigital.com/produccion-multimedia/",
  },
  {
    number: "03",
    title: "Trafficker Digital",
    description:
      "Campañas de pauta pagada en Meta Ads, Google Ads y TikTok Ads gestionadas por especialistas con enfoque en retorno de inversión.",
    highlights: ["Meta Ads", "Google Ads", "TikTok Ads", "Optimización continua"],
    color: "green",
    href: "https://crealtivadigital.com/trafficker-digital/",
  },
  {
    number: "04",
    title: "Diseño y Desarrollo Web",
    description:
      "Sitios web que no solo se ven bien — están diseñados para convertir visitantes en clientes con hosting y dominio siempre a tu nombre.",
    highlights: ["Diseño UX/UI", "Desarrollo a medida", "E-commerce", "Hosting incluido"],
    color: "teal",
    href: "https://crealtivadigital.com/diseno-y-desarrollo-web/",
  },
  {
    number: "05",
    title: "Optimización de Procesos",
    description:
      "Automatizaciones, CRM y flujos de trabajo que liberan tu tiempo, reducen errores y preparan tu empresa para escalar.",
    highlights: ["Automatización", "CRM y seguimiento", "Flujos de ventas", "Integraciones digitales"],
    color: "magenta",
    href: "https://crealtivadigital.com/optimizacion-de-procesos/",
  },
];

const colorMap: Record<string, { badge: string; dot: string; border: string; num: string }> = {
  teal: {
    badge: "bg-teal/10 text-teal",
    dot: "bg-teal",
    border: "border-teal/20 hover:border-teal/50",
    num: "text-teal",
  },
  magenta: {
    badge: "bg-magenta/10 text-magenta",
    dot: "bg-magenta",
    border: "border-magenta/20 hover:border-magenta/50",
    num: "text-magenta",
  },
  green: {
    badge: "bg-green/10 text-green",
    dot: "bg-green",
    border: "border-green/20 hover:border-green/50",
    num: "text-green",
  },
};

export default function Services() {
  return (
    <section id="servicios" className="bg-navy py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 max-w-2xl">
          <span className="inline-block bg-teal/15 text-teal text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
            Nuestros Servicios
          </span>
          <h2 className="font-grotesk font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
            Los 5 pilares de tu crecimiento digital
          </h2>
          <p className="font-sans text-white/50 text-lg leading-relaxed">
            No ejecutamos tareas sueltas. Construimos ecosistemas digitales completos
            adaptados a cada etapa de tu negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const c = colorMap[s.color];
            return (
              <a
                key={s.number}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-white/3 border ${c.border} rounded-block p-7 flex flex-col gap-5 transition-all duration-200 hover:bg-white/5`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-grotesk font-black text-4xl ${c.num} opacity-30 group-hover:opacity-60 transition-opacity`}>
                    {s.number}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                </div>

                <div>
                  <h3 className="font-grotesk font-bold text-white text-lg leading-snug mb-2">
                    {s.title}
                  </h3>
                  <p className="font-sans text-white/50 text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2 mt-auto">
                  {s.highlights.map((h) => (
                    <li key={h} className={`${c.badge} text-xs font-sans font-medium px-3 py-1 rounded-full`}>
                      {h}
                    </li>
                  ))}
                </ul>
              </a>
            );
          })}

          {/* Last card — CTA */}
          <div className="bg-gradient-to-br from-teal to-green rounded-block p-7 flex flex-col justify-between">
            <div>
              <span className="font-grotesk font-black text-white/20 text-4xl">→</span>
              <h3 className="font-grotesk font-bold text-white text-lg mt-4 mb-2">
                ¿No sabes por dónde empezar?
              </h3>
              <p className="font-sans text-white/70 text-sm leading-relaxed">
                Agenda un diagnóstico gratuito y te decimos exactamente qué necesita tu negocio.
              </p>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=593959227420&text=Hola%2C%20quiero%20un%20diagn%C3%B3stico%20gratuito"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-white text-navy font-grotesk font-bold text-sm px-5 py-3 rounded-full hover:bg-cream transition-colors"
            >
              Diagnóstico Gratuito →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
