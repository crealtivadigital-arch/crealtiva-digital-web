import type { Metadata } from "next";
import { WA_DIAGNOSTICO, EMAIL } from "@/lib/constants";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Contacto — Agencia de Marketing Digital en Quito, Ecuador",
  description:
    "Contáctanos para un diagnóstico gratuito de 45 minutos. Crealtiva Digital: agencia de marketing en Quito. WhatsApp, email o formulario — respondemos en menos de 2 horas.",
  keywords: [
    "contacto agencia marketing Quito",
    "diagnóstico gratuito marketing digital",
    "crealtiva digital contacto",
    "agencia marketing Ecuador contacto",
  ],
};

const services = [
  { label: "Marketing Digital Estratégico", href: "/marketing-digital" },
  { label: "Trafficker Digital (Meta, Google, TikTok)", href: "/trafficker-digital" },
  { label: "UGC y Contenido con Actores", href: "/produccion-multimedia/ugc" },
  { label: "Producción Profesional (Foto/Video)", href: "/produccion-multimedia/studio" },
  { label: "Eventos y Cobertura por Horas", href: "/produccion-multimedia/eventos" },
  { label: "Diseño y Desarrollo Web", href: "/diseno-web" },
  { label: "Automatización de Procesos con IA", href: "/optimizacion-procesos" },
];

const faqs = [
  {
    q: "¿Qué pasa en el diagnóstico gratuito?",
    a: "Una sesión de 45 minutos donde analizamos tu situación digital actual, tu competencia, tus objetivos y los cuellos de botella en tu marketing. Al final recibes un plan de acción preliminar sin costo ni compromiso de contratar.",
  },
  {
    q: "¿Cuánto tiempo tardan en responder?",
    a: "Por WhatsApp respondemos en menos de 2 horas hábiles (lunes a viernes, 9am–6pm). Por email, antes de 24 horas.",
  },
  {
    q: "¿Trabajan con empresas de cualquier sector?",
    a: "Sí, aunque estamos especializados en empresas del mercado medio-premium: servicios profesionales, salud, retail, tecnología, gastronomía y marcas de moda en Ecuador.",
  },
  {
    q: "¿Tienen contratos de permanencia?",
    a: "No. Trabajamos con compromisos mensuales renovables. Puedes continuar, escalar o pausar el servicio según las necesidades de tu negocio.",
  },
];

export default function Contacto() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-block bg-white/8 text-white/60 text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            Diagnóstico Gratuito · Sin Compromiso · 45 minutos
          </span>
          <h1 className="font-grotesk font-bold text-white text-4xl md:text-5xl leading-[1.1] mb-5 max-w-2xl">
            Hablemos sobre tu <span className="text-teal">negocio.</span>
          </h1>
          <p className="font-sans text-white/55 text-lg leading-relaxed max-w-xl">
            No necesitas saber exactamente qué necesitas. Cuéntanos en qué estás y nosotros te proponemos el camino.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <a
              href={WA_DIAGNOSTICO}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-block p-7 shadow-sm border border-teal/20 hover:border-teal/50 hover:shadow-md transition-all flex flex-col gap-4"
            >
              <span className="text-3xl">💬</span>
              <div>
                <h2 className="font-grotesk font-bold text-navy text-lg mb-1">WhatsApp</h2>
                <p className="font-sans text-navy/55 text-sm leading-relaxed">
                  La forma más rápida. Respondemos en menos de 2 horas hábiles.
                </p>
              </div>
              <span className="font-sans text-teal text-sm font-semibold group-hover:underline">
                +593 959 227 420 →
              </span>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="group bg-white rounded-block p-7 shadow-sm border border-magenta/20 hover:border-magenta/50 hover:shadow-md transition-all flex flex-col gap-4"
            >
              <span className="text-3xl">📧</span>
              <div>
                <h2 className="font-grotesk font-bold text-navy text-lg mb-1">Email</h2>
                <p className="font-sans text-navy/55 text-sm leading-relaxed">
                  Para propuestas formales o proyectos más detallados. Respondemos en menos de 24h.
                </p>
              </div>
              <span className="font-sans text-magenta text-sm font-semibold group-hover:underline">
                {EMAIL} →
              </span>
            </a>

            <div className="bg-white rounded-block p-7 shadow-sm border border-green/20 flex flex-col gap-4">
              <span className="text-3xl">📍</span>
              <div>
                <h2 className="font-grotesk font-bold text-navy text-lg mb-1">Ubicación</h2>
                <p className="font-sans text-navy/55 text-sm leading-relaxed">
                  Operamos en Quito, Ecuador y atendemos a empresas en todo el país.
                </p>
              </div>
              <span className="font-sans text-green text-sm font-semibold">
                Quito, Ecuador
              </span>
            </div>
          </div>

          {/* Services quick links */}
          <div className="bg-navy rounded-block p-8">
            <h2 className="font-grotesk font-bold text-white text-xl mb-6">
              ¿Qué servicio te interesa?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="flex items-center justify-between bg-white/5 border border-white/8 rounded-card px-5 py-3.5 hover:border-teal/40 hover:bg-white/8 transition-all group"
                >
                  <span className="font-sans text-white/70 text-sm group-hover:text-white transition-colors">
                    {s.label}
                  </span>
                  <span className="text-white/30 group-hover:text-teal transition-colors text-sm">→</span>
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/8 text-center">
              <p className="font-sans text-white/40 text-sm mb-4">
                ¿No sabes por dónde empezar? Agenda el diagnóstico y lo definimos juntos.
              </p>
              <a
                href={WA_DIAGNOSTICO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-teal text-white font-grotesk font-bold text-sm px-7 py-3.5 rounded-full hover:bg-teal-dark transition-colors"
              >
                Agendar Diagnóstico Gratuito →
              </a>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqs} bg="navy" title="Preguntas sobre el proceso de contacto" />
    </main>
  );
}
