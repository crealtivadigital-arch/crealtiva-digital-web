import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import { WA_COTIZAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marketing Digital Estratégico en Quito — Gestión de Redes Sociales",
  description:
    "Agencia de marketing digital en Quito. Gestión integral de redes sociales, estrategia de contenido, community manager y campañas de pauta. Resultados medibles para tu empresa.",
  keywords: [
    "marketing digital Quito",
    "gestión redes sociales Ecuador",
    "community manager Quito",
    "estrategia de contenido Ecuador",
    "agencia marketing digital Quito",
  ],
};

const plans = [
  {
    name: "Tasty",
    tag: "Presencia y Mantenimiento",
    color: "border-teal/30",
    items: [
      "Estudio de mercado + Buyer Persona",
      "Estrategia digital + Calendario editorial",
      "1 jornada de producción mensual (3h)",
      "8 Reels editados al mes",
      "28 gráficas + 20 historias",
      "Community Manager activo",
      "Facebook + Instagram",
      "Reporte mensual de métricas",
    ],
  },
  {
    name: "Elemental",
    tag: "Crecimiento y Pauta",
    color: "border-magenta/30",
    featured: true,
    items: [
      "Todo del plan Tasty",
      "2 jornadas de producción (6h total)",
      "13–14 Reels editados",
      "31 gráficas + 20 historias",
      "1 Campaña Meta Ads gestionada",
      "Facebook + Instagram (gestión avanzada)",
      "Trafficker dedicado a campañas",
      "Reporte de pauta + métricas",
    ],
  },
  {
    name: "Elemental Pro",
    tag: "Escalabilidad y Multicanal",
    color: "border-teal/30",
    items: [
      "Todo del plan Elemental",
      "14 Reels + 32 gráficas + historias",
      "2 Campañas multicanal (Meta + TikTok)",
      "Facebook + Instagram + TikTok activos",
      "Estudio avanzado + mapa de oportunidades",
      "Estrategia de ventas multicanal",
      "Soporte prioritario del equipo",
      "Reporte ejecutivo mensual",
    ],
  },
];

const deliverables = [
  { icon: "📅", title: "Calendario Editorial Mensual", desc: "Planificación estratégica de todo el contenido del mes alineada a tus objetivos comerciales." },
  { icon: "🎬", title: "8–14 Reels Editados", desc: "Producción audiovisual profesional: grabación, edición, subtítulos y música incluidos." },
  { icon: "🖼️", title: "Gráficas + Historias", desc: "Diseño de piezas estáticas y animadas con identidad visual coherente de tu marca." },
  { icon: "✍️", title: "Copy Estratégico", desc: "Textos con propósito: cada publicación comunica, posiciona y lleva a la acción." },
  { icon: "💬", title: "Gestión de Comunidad", desc: "Moderación, respuestas y construcción activa de relaciones con tu audiencia." },
  { icon: "📊", title: "Reporte Mensual de KPIs", desc: "Métricas conectadas a objetivos reales — no solo likes, sino resultados de negocio." },
];

const faqs = [
  {
    q: "¿Cuánto tiempo tarda en verse resultados?",
    a: "Los primeros cambios visibles (mayor consistencia, engagement inicial) se notan entre las semanas 3 y 4. Para evaluar conversiones y crecimiento sostenido, el segundo mes es el punto de referencia más fiable.",
  },
  {
    q: "¿Necesito firmar un contrato de permanencia?",
    a: "No. Trabajamos con compromisos mensuales renovables. No hay permanencia forzosa — si no estás conforme con los resultados, puedes salir cuando quieras.",
  },
  {
    q: "¿El presupuesto de pauta (Meta Ads) está incluido?",
    a: "No. El presupuesto de pauta se paga directamente a Meta/TikTok desde tu tarjeta. Crealtiva gestiona la estrategia, los anuncios y la optimización.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Una sesión diagnóstica inicial (gratuita), acceso a tus redes sociales, logo en alta resolución y, si tienes, manual de marca. Nosotros nos encargamos del resto.",
  },
  {
    q: "¿Puedo cambiar de plan durante el servicio?",
    a: "Sí. Puedes escalar o ajustar tu plan en cualquier momento según las necesidades de tu negocio en cada etapa.",
  },
];

export default function MarketingDigital() {
  return (
    <main>
      <ServiceHero
        badge="Marketing Digital · Quito, Ecuador"
        headline="Gestionamos tu marca con criterio estratégico,"
        accent=" no solo publicaciones."
        subtitle="Tu marca merece más que un calendario lleno de posts sin dirección. Somos tu Departamento de Marketing Externo: estrategia real, identidad coherente y resultados medibles cada mes."
        stats={[
          { value: "+30%", label: "consultas promedio en 3 meses" },
          { value: "+45%", label: "crecimiento en engagement" },
          { value: "100%", label: "estrategia antes de publicar" },
        ]}
        accentColor="teal"
      />

      {/* Problem section */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-magenta/10 text-magenta text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-5">
                El Diagnóstico
              </span>
              <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl leading-tight mb-5">
                ¿Publicas sin ver resultados reales?
              </h2>
              <p className="font-sans text-navy/60 text-base leading-relaxed">
                La mayoría de las empresas en Ecuador tienen presencia en redes pero no tienen
                una estrategia detrás. El resultado: tiempo y dinero invertido sin retorno visible.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Contenido sin estrategia ni dirección",
                "Identidad visual inconsistente entre plataformas",
                "Métricas que no se conectan con ventas",
                "Tiempo del equipo mal invertido en redes",
              ].map((p) => (
                <div key={p} className="bg-white rounded-card p-4 shadow-sm border border-magenta/10">
                  <span className="text-magenta text-lg mb-2 block">✗</span>
                  <p className="font-sans text-navy/70 text-sm leading-snug">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-navy py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-grotesk font-bold text-white text-2xl md:text-3xl mb-3">
              ¿Qué recibe tu marca cada mes?
            </h2>
            <p className="font-sans text-white/50 text-base max-w-xl">
              Entregables concretos con máximo 2 rondas de revisión por pieza.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((d) => (
              <div key={d.title} className="bg-white/4 border border-white/8 rounded-card p-5">
                <span className="text-2xl mb-3 block">{d.icon}</span>
                <h3 className="font-grotesk font-bold text-white text-sm mb-1.5">{d.title}</h3>
                <p className="font-sans text-white/50 text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl mb-3">
              Tres niveles de acompañamiento estratégico
            </h2>
            <p className="font-sans text-navy/55 text-base max-w-lg mx-auto">
              Todos los planes incluyen estrategia, producción, gestión y reporte mensual.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`bg-white rounded-block border-2 ${p.color} p-7 flex flex-col ${p.featured ? "shadow-xl scale-[1.02]" : "shadow-sm"}`}
              >
                {p.featured && (
                  <span className="inline-block bg-magenta text-white text-xs font-grotesk font-bold px-3 py-1 rounded-full mb-4 self-start">
                    Más popular
                  </span>
                )}
                <h3 className="font-grotesk font-black text-navy text-xl mb-1">{p.name}</h3>
                <p className="font-sans text-navy/50 text-xs mb-5">{p.tag}</p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-sans text-navy/70 text-sm">
                      <span className="text-teal mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_COTIZAR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-navy text-white font-grotesk font-bold text-sm px-5 py-3 rounded-full hover:bg-teal transition-colors"
                >
                  Cotizar {p.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} bg="navy" />
      <CTABanner
        headline="¿Listo para tener un equipo de marketing que trabaja por tu marca?"
        subtitle="Agenda tu diagnóstico estratégico sin costo. Analizamos tu situación digital actual y te entregamos un plan de acción personalizado."
        waMessage="Hola, quiero un diagnóstico estratégico de marketing digital para mi empresa."
      />
    </main>
  );
}
