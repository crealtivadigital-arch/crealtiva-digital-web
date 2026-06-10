import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import { WA_COTIZAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Trafficker Digital en Ecuador — Meta Ads, Google Ads y TikTok Ads",
  description:
    "Servicio de trafficker digital en Quito. Gestión profesional de campañas en Meta Ads, Google Ads y TikTok Ads con especialistas dedicados, optimización continua y reportes de retorno.",
  keywords: [
    "trafficker digital Ecuador",
    "Meta Ads Quito",
    "Google Ads Ecuador",
    "TikTok Ads agencia Quito",
    "pauta digital Ecuador",
    "campañas publicitarias redes sociales",
  ],
};

const platforms = [
  {
    name: "Meta Ads",
    sub: "Facebook + Instagram",
    color: "teal",
    borderColor: "border-teal/25",
    desc: "Campañas de alto impacto en el ecosistema Meta: tráfico, generación de leads, conversiones y alcance de marca en Facebook e Instagram.",
    features: [
      "Configuración y estructura de cuentas publicitarias",
      "Segmentación por intereses, comportamientos y datos demográficos",
      "Audiencias personalizadas y lookalike",
      "Pixel de Meta e integración de conversiones",
      "Pruebas A/B de creativos y copys",
      "Optimización semanal de presupuesto y pujas",
      "Reporte mensual con ROAS y métricas de negocio",
    ],
  },
  {
    name: "Google Ads",
    sub: "Search + Display + Shopping",
    color: "magenta",
    borderColor: "border-magenta/25",
    featured: true,
    desc: "Captura demanda activa: usuarios que ya buscan lo que tú ofreces. Campañas de búsqueda, display y shopping con enfoque en costo por adquisición.",
    features: [
      "Investigación y selección de palabras clave estratégicas",
      "Estructuración de campañas por intención de búsqueda",
      "Anuncios responsivos y extensiones optimizadas",
      "Seguimiento de conversiones vía Google Tag",
      "Red de Display para remarketing y alcance",
      "Optimización de Quality Score y CPC",
      "Reporte mensual con costo por lead y conversiones",
    ],
  },
  {
    name: "TikTok Ads",
    sub: "In-Feed + TopView + Spark",
    color: "green",
    borderColor: "border-green/25",
    desc: "Alcanza audiencias jóvenes y en expansión con formatos nativos de TikTok. Ideal para marcas que quieren visibilidad y viralidad con presupuesto controlado.",
    features: [
      "Configuración del TikTok Ads Manager y Pixel",
      "Campañas In-Feed, Spark Ads y TopView",
      "Segmentación por intereses, hashtags y comportamientos",
      "Estrategia de creativos adaptados al formato nativo",
      "Coordinación con producción UGC si aplica",
      "Optimización de entrega y frecuencia",
      "Reporte mensual de alcance, CTR y conversiones",
    ],
  },
];

const whyDedicated = [
  {
    title: "Especialización por plataforma",
    desc: "Cada canal tiene su lógica, su algoritmo y su tipo de audiencia. Un trafficker generalista diluye resultados.",
  },
  {
    title: "Optimización continua",
    desc: "Las campañas no se configuran y se olvidan. Revisamos rendimiento, ajustamos pujas y rotamos creativos cada semana.",
  },
  {
    title: "Sin conflicto de interés en el presupuesto",
    desc: "Tu presupuesto de pauta va directo a las plataformas. Nosotros solo cobramos por la gestión estratégica.",
  },
  {
    title: "Reportes de retorno real",
    desc: "No te reportamos impresiones. Te reportamos leads, ventas y costo por adquisición — métricas que importan.",
  },
];

const faqs = [
  {
    q: "¿El presupuesto de pauta está incluido en el servicio?",
    a: "No. El presupuesto se paga directamente a Meta, Google o TikTok desde tu tarjeta. Crealtiva cobra únicamente por la gestión estratégica y operativa de las campañas.",
  },
  {
    q: "¿Cuánto presupuesto mínimo necesito para empezar?",
    a: "Depende del canal y el objetivo. En Meta Ads recomendamos un mínimo de $150–200/mes para tener datos significativos. En Google, $200–300/mes dependiendo de la competencia por las palabras clave. Lo definimos en el diagnóstico.",
  },
  {
    q: "¿Puedo contratar solo un canal (ej. solo Google)?",
    a: "Sí. Puedes contratar la gestión de Meta Ads, Google Ads o TikTok Ads por separado, o combinarlos según tu presupuesto y objetivos.",
  },
  {
    q: "¿Cómo miden el retorno de las campañas?",
    a: "Configuramos píxeles y eventos de conversión en tu sitio web o landing page. Así podemos rastrear leads, ventas y formularios completados y calcular el costo real por resultado.",
  },
  {
    q: "¿Cuánto tiempo toma ver resultados en pauta?",
    a: "Las campañas necesitan al menos 2–3 semanas para que el algoritmo aprenda y optimice. Los resultados más estables y predecibles aparecen entre el mes 2 y el mes 3.",
  },
];

const colorMap: Record<string, { accent: string; dot: string }> = {
  teal: { accent: "text-teal", dot: "bg-teal" },
  magenta: { accent: "text-magenta", dot: "bg-magenta" },
  green: { accent: "text-green", dot: "bg-green" },
};

export default function TraffickerDigital() {
  return (
    <main>
      <ServiceHero
        badge="Trafficker Digital · Meta Ads · Google Ads · TikTok Ads"
        headline="Pauta digital con trafficker dedicado que"
        accent=" maximiza tu inversión publicitaria."
        subtitle="Gestión profesional de campañas en Meta, Google y TikTok Ads. Segmentación precisa, optimización continua y reportes de retorno — sin desperdiciar ni un dólar de presupuesto."
        stats={[
          { value: "3", label: "plataformas de pauta gestionadas" },
          { value: "24h", label: "tiempo de respuesta a alertas" },
          { value: "100%", label: "transparencia en el presupuesto" },
        ]}
        accentColor="magenta"
      />

      {/* Platforms */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl mb-3">
              Gestión especializada por plataforma
            </h2>
            <p className="font-sans text-navy/55 text-base max-w-xl">
              Cada canal de pauta tiene su propio ecosistema. Tratamos cada uno con la estrategia que se merece.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {platforms.map((p) => {
              const c = colorMap[p.color];
              return (
                <div
                  key={p.name}
                  className={`bg-white rounded-block border-2 ${p.borderColor} p-7 flex flex-col ${p.featured ? "shadow-xl" : "shadow-sm"}`}
                >
                  {p.featured && (
                    <span className="inline-block bg-magenta text-white text-xs font-grotesk font-bold px-3 py-1 rounded-full mb-4 self-start">
                      Alta demanda
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${c.dot} flex-shrink-0`} />
                    <div>
                      <h3 className={`font-grotesk font-black text-lg ${c.accent}`}>{p.name}</h3>
                      <span className="font-sans text-navy/40 text-xs">{p.sub}</span>
                    </div>
                  </div>
                  <p className="font-sans text-navy/60 text-sm leading-relaxed mb-5">{p.desc}</p>
                  <ul className="flex flex-col gap-2 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 font-sans text-navy/65 text-xs">
                        <span className={`${c.accent} mt-0.5 flex-shrink-0 font-bold`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WA_COTIZAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 text-center bg-navy text-white font-grotesk font-bold text-sm px-5 py-3 rounded-full hover:bg-teal transition-colors"
                  >
                    Cotizar {p.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why dedicated trafficker */}
      <section className="bg-navy py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-grotesk font-bold text-white text-2xl md:text-3xl mb-10">
            ¿Por qué necesitas un trafficker dedicado?
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {whyDedicated.map((w, i) => (
              <div key={w.title} className="bg-white/4 border border-white/8 rounded-block p-6">
                <span className="font-grotesk font-black text-teal text-3xl opacity-30 block mb-3">
                  0{i + 1}
                </span>
                <h3 className="font-grotesk font-bold text-white text-base mb-2">{w.title}</h3>
                <p className="font-sans text-white/50 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} bg="cream" />
      <CTABanner
        headline="¿Quieres que tu presupuesto publicitario trabaje más inteligente?"
        subtitle="Analizamos tus campañas actuales o te ayudamos a crear las primeras. Diagnóstico sin costo."
        waMessage="Hola, quiero información sobre el servicio de trafficker digital para campañas de pauta."
      />
    </main>
  );
}
