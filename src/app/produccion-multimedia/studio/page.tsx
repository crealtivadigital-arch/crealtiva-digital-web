import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import { WA_COTIZAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Fotografía de Producto y Video Corporativo en Quito — Producción Profesional",
  description:
    "Fotografía profesional de producto, e-commerce y corporativa en Quito. Video corporativo, comerciales y videos de capacitación con equipo técnico propio y postproducción completa.",
  keywords: [
    "fotografía producto Quito",
    "fotografía corporativa Ecuador",
    "video corporativo Quito",
    "producción comerciales Ecuador",
    "fotografía empresarial Quito",
    "empresa fotografía producto Ecuador",
  ],
};

const services = [
  {
    title: "Fotografía de Producto y E-commerce",
    icon: "📦",
    color: "text-teal",
    bgColor: "bg-teal/8",
    desc: "Sesiones de fotografía para catálogos, tiendas online y redes sociales. Fondo blanco, lifestyle y fotografía creativa con hasta 300 productos por sesión.",
    items: ["Fondo blanco y neutro para e-commerce", "Fotografía lifestyle en locación", "Hasta 300 productos por sesión", "Retoque profesional incluido", "Archivos en alta resolución web y print"],
  },
  {
    title: "Fotografía Corporativa y de Equipos",
    icon: "👔",
    color: "text-magenta",
    bgColor: "bg-magenta/8",
    desc: "Perfiles profesionales para directivos, headshots para equipos y documentación de instalaciones. Ideal para presentaciones, LinkedIn y materiales corporativos.",
    items: ["Perfiles ejecutivos y headshots", "Fotografía de equipo y staff", "Documentación de instalaciones", "Sesiones en oficina o locación", "Entrega individual y grupal editada"],
  },
  {
    title: "Video Corporativo e Institucional",
    icon: "🎥",
    color: "text-green",
    bgColor: "bg-green/8",
    desc: "Videos de presentación de empresa, testimoniales de clientes, tour virtual de instalaciones y contenido para el sitio web. Duración 1–3 minutos con guión incluido.",
    items: ["Video de presentación de empresa (1–3 min)", "Testimoniales de clientes reales", "Tour virtual de instalaciones", "Guión y dirección incluidos", "Versión con y sin locución"],
  },
  {
    title: "Comerciales para Pauta",
    icon: "📺",
    color: "text-teal",
    bgColor: "bg-teal/8",
    desc: "Spots de 15, 30 y 60 segundos diseñados para convertir en Meta Ads, Google Ads y TikTok. Concepto creativo, producción y postproducción completa.",
    items: ["Conceptualización creativa del spot", "Producción en locación o estudio", "Edición con motion graphics", "Formatos 16:9, 9:16 y 1:1 incluidos", "Versiones para cada plataforma"],
  },
  {
    title: "Videos de Capacitación",
    icon: "🎓",
    color: "text-magenta",
    bgColor: "bg-magenta/8",
    desc: "Contenido educativo interno: onboarding de empleados, procesos operativos y capacitación de ventas. Duración variable con pantallas, presentadores o ambos.",
    items: ["Guión técnico del proceso", "Grabación con presentador o pantallas", "Infografías y motion animado", "Subtítulos y accesibilidad", "Distribución en plataformas LMS"],
  },
];

const portfolio = [
  { type: "E-commerce", client: "Tienda de moda", deliverable: "300 productos fotografiados", time: "2 días de producción" },
  { type: "Corporativo", client: "Empresa de servicios profesionales", deliverable: "Video institucional 2 min", time: "1 jornada + 5 días edición" },
  { type: "Comercial", client: "Restaurante cadena", deliverable: "Spot 30s para Meta Ads", time: "1 jornada + 7 días edición" },
  { type: "Fotografía equipo", client: "Firma legal Quito", deliverable: "22 perfiles ejecutivos", time: "4 horas de sesión" },
  { type: "Capacitación", client: "Empresa logística", deliverable: "6 módulos de inducción", time: "3 jornadas + 10 días edición" },
  { type: "E-commerce lifestyle", client: "Marca natural skincare", deliverable: "80 fotos lifestyle", time: "1 jornada + 3 días edición" },
];

const faqs = [
  {
    q: "¿Cuánto tiempo toma una sesión de fotografía de producto?",
    a: "Depende del volumen. Una sesión estándar de 100 productos en fondo blanco toma 4–6 horas. Para volúmenes mayores (200–300 productos) se planifican 2 días. El tiempo de edición y entrega es de 3–7 días hábiles adicionales.",
  },
  {
    q: "¿Trabajan en estudio o se desplazan a nuestra empresa?",
    a: "Ambas opciones. Para fotografía de producto podemos trabajar en un espacio del cliente o en locación. Para fotografía corporativa y de equipos generalmente vamos a las instalaciones del cliente en Quito.",
  },
  {
    q: "¿Los archivos de video incluyen los derechos para publicidad?",
    a: "Sí. Todos los materiales producidos quedan en propiedad del cliente con derechos de uso ilimitados para publicidad digital, redes sociales, sitio web y presentaciones. No hay cargos adicionales por uso.",
  },
  {
    q: "¿Pueden hacer video con locución o solo con imagen?",
    a: "Podemos incluir locución, presentador en cámara, subtítulos o combinación de los tres. Lo definimos en el brief estratégico antes de producir.",
  },
];

export default function StudioPage() {
  return (
    <main>
      <ServiceHero
        badge="Producción Profesional · Fotografía y Video · Quito"
        headline="Fotografía y video de marca que"
        accent=" eleva el estándar visual de tu empresa."
        subtitle="Producción profesional en Quito: fotografía de producto, sesiones corporativas, video institucional y comerciales. Equipo técnico propio, dirección profesional y postproducción completa."
        stats={[
          { value: "3–7d", label: "tiempo de entrega" },
          { value: "2", label: "rondas de ajuste incluidas" },
          { value: "100%", label: "equipo técnico propio" },
        ]}
        accentColor="magenta"
      />

      {/* Services */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl mb-10">
            Tipos de producción disponibles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className={`${s.bgColor} rounded-block p-7 border border-navy/8`}>
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className={`font-grotesk font-bold text-navy text-lg mb-2`}>{s.title}</h3>
                <p className="font-sans text-navy/60 text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-sans text-navy/65 text-xs">
                      <span className={`${s.color} mt-0.5 font-bold flex-shrink-0`}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* CTA card */}
            <div className="bg-gradient-to-br from-teal to-green-deep rounded-block p-7 flex flex-col justify-between">
              <div>
                <h3 className="font-grotesk font-bold text-white text-lg mb-3">¿Necesitas algo específico?</h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed">
                  Cotizamos producciones personalizadas según el alcance, locación y formatos que necesitas.
                </p>
              </div>
              <a
                href={WA_COTIZAR}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center bg-white text-navy font-grotesk font-bold text-sm px-5 py-3 rounded-full hover:bg-cream transition-colors"
              >
                Cotizar producción →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-navy py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-grotesk font-bold text-white text-2xl md:text-3xl mb-10">
            Proyectos entregados
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolio.map((p) => (
              <div key={`${p.client}-${p.type}`} className="bg-white/4 border border-white/8 rounded-card p-5">
                <span className="inline-block bg-teal/15 text-teal text-xs font-grotesk font-semibold px-3 py-1 rounded-full mb-3">
                  {p.type}
                </span>
                <h3 className="font-grotesk font-bold text-white text-sm mb-1">{p.client}</h3>
                <p className="font-sans text-white/50 text-xs mb-2">{p.deliverable}</p>
                <span className="font-sans text-white/30 text-xs">{p.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} bg="cream" />
      <CTABanner
        headline="¿Tu marca merece mejor material visual?"
        subtitle="Cotizamos tu producción en menos de 24 horas hábiles. Sin compromiso."
        waMessage="Hola, quiero cotizar una producción de fotografía o video profesional para mi empresa."
      />
    </main>
  );
}
