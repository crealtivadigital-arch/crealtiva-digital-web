export default function Hero() {
  return (
    <section className="relative min-h-screen bg-navy flex items-center overflow-hidden pt-16">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-teal/10 blur-[120px] -translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-magenta/8 blur-[100px] translate-x-1/3 translate-y-1/4" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left — copy */}
        <div>
          <span className="inline-block bg-teal/15 text-teal text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            Agencia de Marketing Digital · Quito, Ecuador
          </span>

          <h1 className="font-grotesk font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            ¿Tu marca proyecta el éxito que tu empresa{" "}
            <span className="text-teal">ya alcanzó?</span>
          </h1>

          <p className="font-sans text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
            Deja de apagar incendios digitales. Profesionaliza tu crecimiento
            con un equipo completo de marketing — sin contratar en planilla.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="https://api.whatsapp.com/send?phone=593959227420&text=Hola%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20gratuito"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal text-white font-grotesk font-bold px-7 py-3.5 rounded-full hover:bg-teal-dark transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Diagnóstico Gratuito
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 font-grotesk font-semibold px-7 py-3.5 rounded-full hover:border-teal hover:text-teal transition-colors"
            >
              Ver servicios →
            </a>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal"></span>
              +50 empresas en Ecuador
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-magenta"></span>
              Sin contratos forzosos
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal"></span>
              Equipo completo asignado
            </span>
          </div>
        </div>

        {/* Right — visual card grid */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          {[
            { label: "Marketing Estratégico", icon: "📊", color: "bg-teal/10 border-teal/20" },
            { label: "Producción Multimedia", icon: "🎬", color: "bg-magenta/10 border-magenta/20" },
            { label: "Trafficker Digital", icon: "🎯", color: "bg-green/10 border-green/20" },
            { label: "Diseño & Desarrollo Web", icon: "💻", color: "bg-teal/10 border-teal/20" },
          ].map((item) => (
            <div
              key={item.label}
              className={`${item.color} border rounded-card p-5 flex flex-col gap-3`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-grotesk font-semibold text-white text-sm leading-snug">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
