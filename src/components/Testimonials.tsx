const testimonials = [
  {
    quote:
      "Aumentamos las consultas de nuevos clientes en un 30% en los primeros tres meses. El equipo de Crealtiva entiende el negocio, no solo las redes.",
    author: "Empresa de servicios legales",
    location: "Quito, Ecuador",
    metric: "+30%",
    metricLabel: "en consultas nuevas",
    color: "teal",
  },
  {
    quote:
      "El engagement de nuestras redes creció un 45% y empezamos a recibir pedidos directamente por Instagram. El contenido que producen realmente conecta.",
    author: "Marca de moda femenina",
    location: "Ecuador",
    metric: "+45%",
    metricLabel: "en engagement",
    color: "magenta",
  },
  {
    quote:
      "Pasamos de no tener presencia digital a ser referentes en nuestro sector en menos de seis meses. La estrategia fue clara desde el primer día.",
    author: "Empresa de tecnología B2B",
    location: "Quito, Ecuador",
    metric: "6 meses",
    metricLabel: "para ser referentes",
    color: "green",
  },
];

const colorMap: Record<string, { metric: string; border: string; quote: string }> = {
  teal: { metric: "text-teal", border: "border-teal/20", quote: "text-teal/60" },
  magenta: { metric: "text-magenta", border: "border-magenta/20", quote: "text-magenta/60" },
  green: { metric: "text-green", border: "border-green/20", quote: "text-green/60" },
};

export default function Testimonials() {
  return (
    <section id="resultados" className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 max-w-xl mx-auto">
          <span className="inline-block bg-teal/15 text-teal text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
            Casos de Éxito
          </span>
          <h2 className="font-grotesk font-bold text-navy text-3xl md:text-4xl leading-tight mb-4">
            Empresas que ya profesionalizaron su marketing
          </h2>
          <p className="font-sans text-navy/50 text-lg">
            Resultados reales de negocios en Ecuador que decidieron dar el siguiente paso.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => {
            const c = colorMap[t.color];
            return (
              <div
                key={t.author}
                className={`bg-white rounded-block p-7 flex flex-col gap-5 shadow-sm border ${c.border}`}
              >
                <span className={`font-grotesk font-black text-5xl leading-none ${c.quote}`}>"</span>
                <p className="font-sans text-navy/70 text-base leading-relaxed -mt-2 flex-1">
                  {t.quote}
                </p>
                <div className="flex items-end justify-between pt-4 border-t border-navy/8">
                  <div>
                    <span className="font-grotesk font-bold text-navy text-sm block">{t.author}</span>
                    <span className="font-sans text-navy/40 text-xs">{t.location}</span>
                  </div>
                  <div className="text-right">
                    <span className={`font-grotesk font-black text-2xl ${c.metric} block`}>{t.metric}</span>
                    <span className="font-sans text-navy/40 text-xs">{t.metricLabel}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
