import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import { WA_COTIZAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Diseño y Desarrollo Web en Quito — Páginas Web que Convierten Clientes",
  description:
    "Agencia de diseño web en Quito. Sitios corporativos, landing pages, e-commerce y portafolios digitales. Mobile-first, PageSpeed +80, dominio y hosting siempre a nombre del cliente.",
  keywords: [
    "diseño web Quito",
    "desarrollo web Ecuador",
    "páginas web empresas Quito",
    "agencia diseño web Ecuador",
    "e-commerce Quito",
    "landing page Ecuador",
  ],
};

const projectTypes = [
  {
    name: "Web Starter",
    sub: "Primera presencia digital profesional",
    color: "teal",
    borderColor: "border-teal/30",
    time: "10–15 días hábiles",
    ideal: "Médicos, estudios jurídicos, consultoras, negocios en digitalización",
    items: [
      "Hasta 5 páginas internas",
      "Diseño responsivo mobile-first",
      "Botón WhatsApp integrado",
      "Formulario de contacto activo",
      "SEO básico on-page",
      "Google Analytics 4 configurado",
    ],
  },
  {
    name: "Web Profesional",
    sub: "Sitio robusto con estrategia de conversión",
    color: "magenta",
    borderColor: "border-magenta/30",
    featured: true,
    time: "15–20 días hábiles",
    ideal: "Empresas de servicios, agencias, profesionales con múltiples servicios",
    items: [
      "Hasta 10 páginas + blog integrado",
      "Brief estratégico + mapa UX",
      "Integración CRM y formularios avanzados",
      "Velocidad optimizada (PageSpeed +80)",
      "Google Analytics + seguimiento de conversiones",
      "Capacitación de 1 hora al equipo",
    ],
  },
  {
    name: "E-Commerce",
    sub: "Tienda online lista para vender",
    color: "green",
    borderColor: "border-green/30",
    time: "15–20 días hábiles",
    ideal: "Marcas de moda, gastronomía, salud, accesorios y retail",
    items: [
      "Catálogo hasta 50 productos",
      "Payphone / Kushki integrado",
      "Panel de gestión de pedidos",
      "Diseño de fichas de producto",
      "Notificaciones automáticas",
      "Analytics e-commerce configurado",
    ],
  },
  {
    name: "Landing Page",
    sub: "Página única orientada a conversión",
    color: "teal",
    borderColor: "border-teal/30",
    time: "5 días hábiles",
    ideal: "Campañas de Meta Ads, Google Ads, lanzamientos de producto",
    items: [
      "1 página de alto rendimiento",
      "Optimizada para Meta y Google Ads",
      "Estructura testeable A/B",
      "Formulario + CTA WhatsApp",
      "Pixel de Meta integrado",
      "Entrega express en 5 días hábiles",
    ],
  },
];

const includes = [
  { icon: "🔑", title: "Propiedad total desde el día 1", desc: "Dominio, hosting y CMS siempre registrados a nombre de tu empresa. Sin dependencia del proveedor." },
  { icon: "📱", title: "Diseño mobile-first", desc: "Más del 70% del tráfico llega desde celulares. Diseñamos primero para móvil." },
  { icon: "⚡", title: "PageSpeed +80 garantizado", desc: "Sitios optimizados para carga en menos de 3 segundos — factor clave de conversión y SEO." },
  { icon: "📊", title: "Google Analytics 4", desc: "Configuración completa de métricas y eventos para tomar decisiones basadas en datos reales." },
  { icon: "💬", title: "WhatsApp integrado", desc: "Botón flotante y formularios que conectan directamente con tu equipo de ventas." },
  { icon: "🛡️", title: "30 días de soporte post-lanzamiento", desc: "Acompañamiento técnico sin costo adicional durante el primer mes después de publicar." },
];

const portfolio = [
  { name: "Dacartours", sector: "Transporte turístico", type: "Corporativo SEO Local", features: "Formulario de cotización, presentación de flota, optimización SEO" },
  { name: "Crealtiva Studio", sector: "Producción multimedia", type: "Landing Portafolio", features: "Catálogo de servicios, formulario integrado, galería" },
  { name: "Andean Roots Travel", sector: "Turismo experiencial", type: "Turismo/Reservas", features: "Rutas, galería inmersiva, flujo de reserva" },
];

const faqs = [
  {
    q: "¿Cuánto tiempo toma construir el sitio?",
    a: "Corporativos estándar: 10–15 días hábiles. E-commerce: 15–20 días. Landing pages: 5 días. Los plazos inician desde que recibes todos los materiales (textos, imágenes, accesos).",
  },
  {
    q: "¿Qué necesito tener listo antes de empezar?",
    a: "Acceso al dominio y hosting, manual de marca (o logo en alta resolución), y los textos principales del sitio. Sin estos materiales el plazo no puede comenzar.",
  },
  {
    q: "¿El sitio queda completamente en mis manos?",
    a: "Sí. Dominio, hosting y CMS (WordPress) siempre a nombre del cliente, con todos los accesos entregados al finalizar el proyecto.",
  },
  {
    q: "¿Cuántas revisiones incluye el proyecto?",
    a: "Máximo 2 rondas de revisión por entregable. Cambios de concepto realizados después de aprobar el brief se cotizan como adicionales.",
  },
  {
    q: "¿Desarrollan en WordPress o en código propio?",
    a: "Desarrollamos principalmente en WordPress con Elementor — la plataforma más flexible, fácil de actualizar y con mayor soporte. Para proyectos más complejos o e-commerce avanzado, evaluamos WooCommerce u otras soluciones.",
  },
  {
    q: "¿Aceptan pagos en cuotas?",
    a: "Sí. La estructura típica es 50% al inicio del proyecto y 50% a la entrega. Aceptamos transferencia local, Payphone y otras pasarelas ecuatorianas.",
  },
];

const colorMap: Record<string, { tag: string; badge: string; num: string }> = {
  teal: { tag: "text-teal", badge: "bg-teal/10 text-teal", num: "text-teal" },
  magenta: { tag: "text-magenta", badge: "bg-magenta/10 text-magenta", num: "text-magenta" },
  green: { tag: "text-green", badge: "bg-green/10 text-green", num: "text-green" },
};

export default function DisenoWeb() {
  return (
    <main>
      <ServiceHero
        badge="Diseño y Desarrollo Web · Quito, Ecuador"
        headline="Tu sitio web es tu vendedor"
        accent=" más eficiente."
        subtitle="Diseñamos y construimos activos digitales que convierten visitas en oportunidades de negocio reales — con estrategia, no solo código. Dominio y hosting siempre a nombre de tu empresa."
        stats={[
          { value: "+20", label: "proyectos web entregados" },
          { value: "5–20d", label: "tiempo de entrega según proyecto" },
          { value: "+80", label: "PageSpeed garantizado" },
        ]}
        accentColor="teal"
      />

      {/* Project types */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl mb-3">
              Tipos de proyecto web
            </h2>
            <p className="font-sans text-navy/55 text-base max-w-xl">
              Cada negocio necesita un tipo de sitio diferente. Elige el que mejor se adapta a tu etapa.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projectTypes.map((p) => {
              const c = colorMap[p.color];
              return (
                <div
                  key={p.name}
                  className={`bg-white rounded-block border-2 ${p.borderColor} p-7 shadow-sm ${p.featured ? "shadow-lg" : ""}`}
                >
                  {p.featured && (
                    <span className="inline-block bg-magenta text-white text-xs font-grotesk font-bold px-3 py-1 rounded-full mb-4 self-start">
                      Más contratado
                    </span>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-grotesk font-black text-navy text-xl">{p.name}</h3>
                      <p className="font-sans text-navy/50 text-xs">{p.sub}</p>
                    </div>
                    <span className={`font-sans text-xs font-semibold ${c.badge} px-2.5 py-1 rounded-full`}>
                      {p.time}
                    </span>
                  </div>
                  <p className="font-sans text-navy/40 text-xs mb-4 italic">Ideal para: {p.ideal}</p>
                  <ul className="flex flex-col gap-2 mb-5">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-sans text-navy/65 text-sm">
                        <span className={`${c.tag} mt-0.5 font-bold flex-shrink-0`}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WA_COTIZAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center block bg-navy text-white font-grotesk font-bold text-sm px-5 py-3 rounded-full hover:bg-teal transition-colors"
                  >
                    Cotizar {p.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Includes */}
      <section className="bg-navy py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-grotesk font-bold text-white text-2xl md:text-3xl mb-10">
            Lo que incluye todo proyecto web
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {includes.map((inc) => (
              <div key={inc.title} className="bg-white/4 border border-white/8 rounded-card p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{inc.icon}</span>
                <div>
                  <h3 className="font-grotesk font-bold text-white text-sm mb-1">{inc.title}</h3>
                  <p className="font-sans text-white/50 text-xs leading-relaxed">{inc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl mb-10">
            Proyectos destacados
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((p) => (
              <div key={p.name} className="bg-white rounded-block p-6 shadow-sm border border-navy/8">
                <span className="inline-block bg-teal/10 text-teal text-xs font-grotesk font-semibold px-3 py-1 rounded-full mb-4">
                  {p.type}
                </span>
                <h3 className="font-grotesk font-bold text-navy text-base mb-1">{p.name}</h3>
                <p className="font-sans text-navy/40 text-xs mb-3">{p.sector}</p>
                <p className="font-sans text-navy/60 text-sm">{p.features}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} bg="navy" />
      <CTABanner
        headline="¿Tu sitio web no está generando clientes?"
        subtitle="Analizamos tu caso y te proponemos la solución correcta. Sin costo."
        waMessage="Hola, quiero cotizar el diseño y desarrollo de un sitio web con Crealtiva Digital."
      />
    </main>
  );
}
