const steps = [
  {
    step: "01",
    time: "45 minutos",
    title: "Diagnóstico Gratuito",
    description:
      "Conversamos sobre tu negocio, tu competencia y tus objetivos actuales. Sin costo y sin compromiso.",
    icon: "🔍",
  },
  {
    step: "02",
    time: "24 horas",
    title: "Propuesta Personalizada",
    description:
      "Recibes un plan de acción diseñado específicamente para tu etapa de negocio y tus metas.",
    icon: "📋",
  },
  {
    step: "03",
    time: "Semana 1",
    title: "Onboarding del Equipo",
    description:
      "Presentamos al equipo asignado, definimos accesos, recursos y los primeros 30 días de ejecución.",
    icon: "🤝",
  },
  {
    step: "04",
    time: "Mensual",
    title: "Ejecución y Reportes",
    description:
      "Ejecutamos, medimos y ajustamos. Recibes reportes claros con resultados y próximas acciones.",
    icon: "📈",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="bg-navy py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-block bg-teal/15 text-teal text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
            Cómo Trabajamos
          </span>
          <h2 className="font-grotesk font-bold text-white text-3xl md:text-4xl leading-tight mb-4">
            De la idea a la ejecución en 4 pasos
          </h2>
          <p className="font-sans text-white/50 text-lg">
            Un proceso claro para que sepas exactamente qué esperar en cada etapa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px bg-white/10 -translate-y-1/2 z-0" />
              )}

              <div className="relative bg-white/3 border border-white/8 rounded-block p-6 flex flex-col gap-4 hover:border-teal/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-grotesk font-black text-teal text-3xl opacity-40">{s.step}</span>
                  <span className="text-xl">{s.icon}</span>
                </div>
                <div>
                  <span className="font-sans text-teal/70 text-xs font-medium block mb-1">{s.time}</span>
                  <h3 className="font-grotesk font-bold text-white text-base mb-2">{s.title}</h3>
                  <p className="font-sans text-white/50 text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://api.whatsapp.com/send?phone=593959227420&text=Hola%2C%20quiero%20agendar%20mi%20diagn%C3%B3stico%20gratuito"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-teal text-white font-grotesk font-bold px-8 py-4 rounded-full hover:bg-teal-dark transition-colors text-base"
          >
            Empezar con el Paso 1 →
          </a>
        </div>
      </div>
    </section>
  );
}
