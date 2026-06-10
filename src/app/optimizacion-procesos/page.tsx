import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import { WA_COTIZAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Automatización de Procesos con IA en Ecuador — n8n, Make, Agentes Inteligentes",
  description:
    "Automatización empresarial con inteligencia artificial en Ecuador. Flujos con n8n y Make, agentes IA, ecosistemas digitales y aplicaciones a medida. Partnership con Zero Stress Web.",
  keywords: [
    "automatización procesos Ecuador",
    "agentes inteligencia artificial empresas",
    "n8n Ecuador",
    "chatbots empresas Quito",
    "automatización empresarial Ecuador",
    "aplicaciones a medida Ecuador",
  ],
};

const levels = [
  {
    level: "01",
    name: "Automatizaciones",
    sub: "Alta eficiencia inmediata",
    color: "teal",
    desc: "Flujos programables que resuelven tareas repetitivas sin intervención humana. La entrada más accesible al mundo de la eficiencia operativa.",
    cases: [
      "Clasificación automática de correos y leads",
      "Reportes centralizados desde múltiples fuentes",
      "Notificaciones automáticas por WhatsApp o email",
      "Sincronización entre herramientas (CRM, sheets, apps)",
      "Chatbots de atención básica 24/7",
      "Scraping y procesamiento de datos automático",
    ],
    tools: ["n8n", "Make", "Zapier"],
  },
  {
    level: "02",
    name: "Agentes con IA",
    sub: "Razonamiento autónomo",
    color: "magenta",
    featured: true,
    desc: "Entidades digitales que cubren funciones de empleados especializados, tomando decisiones y ejecutando tareas complejas de forma autónoma.",
    cases: [
      "Asistente de atención al cliente inteligente",
      "Control y gestión de inventarios automatizado",
      "Análisis de riesgos y alertas inteligentes",
      "Facturación y seguimiento de pagos automático",
      "Análisis de datos y generación de informes",
      "Seguimiento y nutrición de prospectos",
    ],
    tools: ["GPT-4o", "Claude", "n8n + IA"],
  },
  {
    level: "03",
    name: "Ecosistemas",
    sub: "Departamentos completos con IA",
    color: "green",
    desc: "Múltiples agentes trabajando coordinadamente para gestionar departamentos enteros: ventas, atención, operaciones y logística de forma autónoma.",
    cases: [
      "Ventas automatizadas end-to-end",
      "Atención al cliente 24/7 multicanal",
      "Operaciones administrativas sin intervención",
      "Logística e inventario coordinados",
      "Inteligencia de mercado en tiempo real",
      "Onboarding de clientes automatizado",
    ],
    tools: ["Arquitectura multi-agente", "Custom"],
  },
  {
    level: "04",
    name: "Aplicaciones a Medida",
    sub: "Software propio para tu empresa",
    color: "teal",
    desc: "Desarrollo de software completamente personalizado según las necesidades operacionales únicas de tu empresa.",
    cases: [
      "CRM personalizado con tus procesos",
      "E-commerce con lógica de negocio propia",
      "Dashboards de operaciones en tiempo real",
      "Plataformas de membresía y suscripción",
      "Integraciones con sistemas contables locales",
      "Apps móviles para operaciones internas",
    ],
    tools: ["React", "Node.js", "Python", "SQL"],
  },
];

const tools = [
  {
    name: "n8n",
    type: "Self-hosted · Máximo control",
    best: "Equipos técnicos, datos sensibles, presupuesto ajustado",
    pros: ["Sin límite de ejecuciones", "Datos en tus servidores", "Personalización total"],
    color: "teal",
  },
  {
    name: "Make",
    type: "Cloud · Complejidad mediana",
    best: "Empresas medianas sin equipo técnico, flujos moderados",
    pros: ["Interfaz visual intuitiva", "Amplio catálogo de integraciones", "Sin necesidad de servidor"],
    color: "magenta",
  },
  {
    name: "Zapier",
    type: "Cloud · Facilidad máxima",
    best: "Necesidades simples de 1–3 pasos, implementación rápida",
    pros: ["Sin curva de aprendizaje", "Miles de integraciones nativas", "Ideal para equipos no técnicos"],
    color: "green",
  },
];

const faqs = [
  {
    q: "¿Qué tipo de empresa puede beneficiarse de la automatización?",
    a: "Cualquier empresa que tenga procesos repetitivos: responder las mismas preguntas, mover datos entre sistemas, generar reportes, hacer seguimiento de clientes. No necesitas ser una empresa grande — una PyME con 5 personas puede ahorrar decenas de horas al mes.",
  },
  {
    q: "¿Cuánto tiempo toma implementar una automatización?",
    a: "Automatizaciones simples (notificaciones, sincronización de datos) se implementan en 1–3 días. Agentes IA más complejos requieren 1–3 semanas. Ecosistemas completos y aplicaciones a medida tienen plazos específicos según el alcance.",
  },
  {
    q: "¿Necesito conocimientos técnicos para usar las automatizaciones?",
    a: "No. Las implementamos, las probamos y te capacitamos en cómo supervisarlas y editarlas. Nuestro objetivo es que tu equipo sea autónomo después de la entrega.",
  },
  {
    q: "¿Qué pasa si la automatización falla?",
    a: "Incluimos soporte post-implementación durante 30 días. Configuramos alertas automáticas cuando un flujo falla para que puedas actuar rápidamente. Adicionalmente, diseñamos los flujos con manejo de errores incorporado.",
  },
  {
    q: "¿Trabajan con software específico de mi empresa (ERP, CRM)?",
    a: "Sí. Si tu software tiene API o webhooks, podemos integrarlo. Si no la tiene, evaluamos alternativas como scraping controlado o exportaciones automáticas. El diagnóstico inicial define las posibilidades técnicas.",
  },
];

const colorMap: Record<string, { accent: string; bg: string; badge: string }> = {
  teal: { accent: "text-teal", bg: "bg-teal/8", badge: "bg-teal/10 text-teal" },
  magenta: { accent: "text-magenta", bg: "bg-magenta/8", badge: "bg-magenta/10 text-magenta" },
  green: { accent: "text-green", bg: "bg-green/8", badge: "bg-green/10 text-green" },
};

export default function OptimizacionProcesos() {
  return (
    <main>
      <ServiceHero
        badge="Automatización con IA · n8n · Make · Agentes Inteligentes"
        headline="Opera más rápido, con menos esfuerzo"
        accent=" y más inteligencia."
        subtitle="Automatizamos tareas repetitivas, implementamos agentes con inteligencia artificial y desarrollamos aplicaciones a medida para que tu empresa escale sin contratar más personas."
        stats={[
          { value: "4", label: "niveles de automatización disponibles" },
          { value: "24h", label: "entrega de diagnóstico inicial" },
          { value: "30d", label: "soporte post-implementación" },
        ]}
        accentColor="teal"
      />

      {/* Levels */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl mb-3">
              Cuatro niveles de transformación digital
            </h2>
            <p className="font-sans text-navy/55 text-base max-w-xl">
              Desde automatizaciones simples hasta ecosistemas completos con IA. Empiezas donde estás y escala.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {levels.map((l) => {
              const c = colorMap[l.color];
              return (
                <div
                  key={l.name}
                  className={`${l.featured ? "bg-navy text-white" : "bg-white"} rounded-block p-7 shadow-sm border ${l.featured ? "border-magenta/30" : "border-navy/8"}`}
                >
                  {l.featured && (
                    <span className="inline-block bg-magenta text-white text-xs font-grotesk font-bold px-3 py-1 rounded-full mb-4 self-start">
                      Mayor demanda
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`font-grotesk font-black text-4xl opacity-20 ${l.featured ? "text-white" : c.accent}`}>
                      {l.level}
                    </span>
                    <div>
                      <h3 className={`font-grotesk font-bold text-xl ${l.featured ? "text-white" : "text-navy"}`}>{l.name}</h3>
                      <span className={`font-sans text-xs ${l.featured ? "text-white/50" : "text-navy/40"}`}>{l.sub}</span>
                    </div>
                  </div>
                  <p className={`font-sans text-sm leading-relaxed mb-4 ${l.featured ? "text-white/60" : "text-navy/60"}`}>{l.desc}</p>
                  <div className="grid grid-cols-2 gap-1.5 mb-4">
                    {l.cases.map((c) => (
                      <span key={c} className={`font-sans text-xs leading-snug flex items-start gap-1.5 ${l.featured ? "text-white/55" : "text-navy/65"}`}>
                        <span className="mt-1 flex-shrink-0 text-teal">·</span>
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {l.tools.map((t) => (
                      <span
                        key={t}
                        className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${l.featured ? "bg-white/10 text-white/60" : c.badge}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tool selection */}
      <section className="bg-navy py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="font-grotesk font-bold text-white text-2xl md:text-3xl mb-3">
              ¿Qué herramienta es la correcta para tu empresa?
            </h2>
            <p className="font-sans text-white/50 text-base">
              Seleccionamos la herramienta según tu escala, equipo técnico y presupuesto — no la más cara, la más adecuada.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {tools.map((t) => {
              const c = colorMap[t.color];
              return (
                <div key={t.name} className="bg-white/4 border border-white/8 rounded-block p-6">
                  <h3 className={`font-grotesk font-black text-2xl ${c.accent} mb-1`}>{t.name}</h3>
                  <span className="font-sans text-white/40 text-xs block mb-3">{t.type}</span>
                  <p className="font-sans text-white/60 text-xs mb-4 italic">Ideal para: {t.best}</p>
                  <ul className="flex flex-col gap-1.5">
                    {t.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 font-sans text-white/55 text-xs">
                        <span className={`${c.accent} mt-0.5 font-bold flex-shrink-0`}>✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="bg-cream py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-block p-8 shadow-sm border border-navy/8 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <span className="inline-block bg-teal/10 text-teal text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-4">
                Partnership
              </span>
              <h2 className="font-grotesk font-bold text-navy text-xl mb-3">
                Crealtiva Digital + Zero Stress Web
              </h2>
              <p className="font-sans text-navy/60 text-sm leading-relaxed">
                Crealtiva Digital aporta la estrategia de negocio, el diagnóstico y el acompañamiento comercial.
                Zero Stress Web ejecuta el desarrollo técnico, las automatizaciones, los agentes IA y las aplicaciones.
                Un equipo integrado, un solo punto de contacto para ti.
              </p>
            </div>
            <a
              href={WA_COTIZAR}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-teal text-white font-grotesk font-bold text-sm px-7 py-3.5 rounded-full hover:bg-teal-dark transition-colors"
            >
              Solicitar auditoría gratuita →
            </a>
          </div>
        </div>
      </section>

      <FAQ items={faqs} bg="navy" />
      <CTABanner
        headline="¿Cuántas horas pierde tu equipo en tareas que podría hacer una automatización?"
        subtitle="Diagnóstico gratuito de procesos con propuesta de automatización en menos de 24 horas hábiles."
        ctaText="Solicitar Auditoría Gratuita"
        waMessage="Hola, quiero una auditoría gratuita de procesos para identificar automatizaciones en mi empresa."
      />
    </main>
  );
}
