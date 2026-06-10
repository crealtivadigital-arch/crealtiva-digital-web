import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import { WA_COTIZAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Fotógrafo y Filmmaker para Eventos Corporativos en Quito — Cobertura por Horas",
  description:
    "Fotógrafo profesional para eventos corporativos en Quito. Premiaciones, lanzamientos, convenciones y transmisiones en vivo. Contrata por horas con entrega en 3–7 días.",
  keywords: [
    "fotógrafo eventos corporativos Quito",
    "filmación eventos Ecuador",
    "cobertura fotográfica eventos Quito",
    "fotógrafo por horas Ecuador",
    "fotografía eventos empresariales Quito",
    "livestreaming eventos Ecuador",
  ],
};

const eventTypes = [
  { icon: "🏆", title: "Premiaciones y reconocimientos", desc: "Captura cada momento de entrega de premios, aplausos y celebraciones con cobertura completa de sala y detalles." },
  { icon: "🚀", title: "Lanzamientos de producto", desc: "Documentamos el antes, durante y después. Incluye cobertura de producto, audiencia y momentos clave del evento." },
  { icon: "🎤", title: "Convenciones y conferencias", desc: "Fotografía y video de ponentes, paneles, networking y momentos de audiencia para uso en comunicados y redes." },
  { icon: "💼", title: "Reuniones ejecutivas", desc: "Cobertura discreta y profesional de juntas directivas, retreats de liderazgo y reuniones de socios." },
  { icon: "📚", title: "Capacitaciones y talleres", desc: "Documentamos el proceso formativo para archivos internos, materiales de comunicación y marketing del programa." },
  { icon: "📡", title: "Transmisiones en vivo", desc: "Equipo para livestreaming a YouTube, LinkedIn, Facebook o plataformas corporativas con encuadre profesional." },
];

const packages = [
  {
    service: "Fotografía",
    options: [
      { name: "1 hora", detail: "20 fotos editadas" },
      { name: "2 horas", detail: "40 fotos editadas" },
      { name: "4 horas", detail: "80 fotos editadas" },
    ],
    color: "teal",
  },
  {
    service: "Filmación",
    options: [
      { name: "1 hora", detail: "Video editado + resumen del evento" },
      { name: "3 horas", detail: "Video completo + highlights" },
      { name: "6–12 horas", detail: "Cobertura total del día" },
    ],
    color: "magenta",
    featured: true,
  },
  {
    service: "Foto + Video",
    options: [
      { name: "Combo estándar", detail: "2h foto + 2h video" },
      { name: "Combo completo", detail: "4h foto + 4h video" },
      { name: "Cobertura total", detail: "Día completo foto + video" },
    ],
    color: "green",
  },
];

const process = [
  { step: "01", title: "Reserva por WhatsApp", desc: "Confirma fecha, tipo de evento, duración y servicio requerido. Respondemos en menos de 2 horas hábiles." },
  { step: "02", title: "Brief del evento", desc: "Compartimos una ficha de brief para conocer el programa, momentos clave y requerimientos específicos." },
  { step: "03", title: "Cobertura en vivo", desc: "El equipo llega 30 minutos antes al venue con todo el equipo técnico listo para operar desde el primer momento." },
  { step: "04", title: "Entrega digital", desc: "Archivos editados y organizados entregados en 3–7 días hábiles vía Google Drive o WeTransfer." },
];

const faqs = [
  {
    q: "¿Con cuánta anticipación debo reservar?",
    a: "Recomendamos reservar con al menos 3–5 días de anticipación para garantizar disponibilidad. Para eventos en fin de semana, lo ideal es reservar con 1–2 semanas de anticipación.",
  },
  {
    q: "¿El material en crudo (RAW o sin editar) está disponible?",
    a: "El material sin editar está disponible bajo pedido expreso al momento de contratar. Por defecto entregamos archivos finales editados.",
  },
  {
    q: "¿Pueden cubrir eventos fuera de Quito?",
    a: "Sí, cubrimos eventos en otras ciudades del Ecuador. Los costos de desplazamiento se cotizan según la ubicación y duración del evento.",
  },
  {
    q: "¿Cuántas personas del equipo asisten al evento?",
    a: "Depende del paquete. Para cobertura fotográfica estándar asiste 1 fotógrafo. Para eventos grandes o combos foto+video, asiste un equipo de 2 personas.",
  },
  {
    q: "¿Puedo solicitar material para redes sociales con entrega el mismo día?",
    a: "Ofrecemos entrega express de un set reducido (5–10 fotos o un clip de 30 segundos) para el mismo día o las primeras horas post-evento, bajo solicitud al contratar.",
  },
];

const colorMap: Record<string, string> = {
  teal: "bg-teal/10 text-teal",
  magenta: "bg-magenta/10 text-magenta",
  green: "bg-green/10 text-green",
};

export default function EventosPage() {
  return (
    <main>
      <ServiceHero
        badge="Eventos Corporativos · Fotografía y Filmación · Quito"
        headline="Cobertura profesional de tu evento:"
        accent=" cada momento documentado con criterio."
        subtitle="Contrata el tiempo exacto que necesitas. Fotógrafo y filmmaker profesional para premiaciones, lanzamientos, convenciones, reuniones ejecutivas y transmisiones en vivo en Quito y Ecuador."
        stats={[
          { value: "1–12h", label: "paquetes por horas disponibles" },
          { value: "3–7d", label: "entrega de archivos editados" },
          { value: "30min", label: "anticipación al inicio del evento" },
        ]}
        accentColor="green"
      />

      {/* Event types */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl mb-10">
            Tipos de evento que cubrimos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {eventTypes.map((e) => (
              <div key={e.title} className="bg-white rounded-block p-5 shadow-sm border border-navy/8">
                <span className="text-2xl mb-3 block">{e.icon}</span>
                <h3 className="font-grotesk font-bold text-navy text-sm mb-1.5">{e.title}</h3>
                <p className="font-sans text-navy/55 text-xs leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-navy py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="font-grotesk font-bold text-white text-2xl md:text-3xl mb-3">
              Paquetes de cobertura
            </h2>
            <p className="font-sans text-white/50 text-base">
              Sin contratos fijos — pagas solo el tiempo que necesitas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.service}
                className={`bg-white/4 border ${pkg.featured ? "border-magenta/40" : "border-white/10"} rounded-block p-7`}
              >
                {pkg.featured && (
                  <span className="inline-block bg-magenta text-white text-xs font-grotesk font-bold px-3 py-1 rounded-full mb-4 self-start block w-fit">
                    Alta demanda
                  </span>
                )}
                <h3 className="font-grotesk font-bold text-white text-lg mb-5">{pkg.service}</h3>
                <div className="flex flex-col gap-3 mb-6">
                  {pkg.options.map((opt) => (
                    <div key={opt.name} className="flex justify-between items-center border-b border-white/8 pb-3 last:border-0 last:pb-0">
                      <span className={`font-grotesk font-semibold text-sm ${colorMap[pkg.color].split(" ")[1].replace("text-", "text-")}`}>
                        {opt.name}
                      </span>
                      <span className="font-sans text-white/50 text-xs">{opt.detail}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={WA_COTIZAR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center w-full block bg-white/10 text-white font-grotesk font-bold text-sm px-5 py-3 rounded-full hover:bg-teal transition-colors"
                >
                  Reservar {pkg.service}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl mb-10">
            ¿Cómo reservar tu cobertura?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((s) => (
              <div key={s.step} className="bg-white rounded-card p-5 shadow-sm border border-navy/8">
                <span className="font-grotesk font-black text-green text-3xl opacity-30 block mb-3">{s.step}</span>
                <h3 className="font-grotesk font-bold text-navy text-sm mb-1.5">{s.title}</h3>
                <p className="font-sans text-navy/55 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} bg="navy" />
      <CTABanner
        headline="¿Tienes un evento próximo que necesitas documentar?"
        subtitle="Consulta disponibilidad ahora. Respondemos en menos de 2 horas hábiles."
        ctaText="Consultar Disponibilidad"
        waMessage="Hola, quiero consultar disponibilidad para cobertura fotográfica o de video de un evento corporativo."
      />
    </main>
  );
}
