import type { Metadata } from "next";
import ServiceHero from "@/components/ServiceHero";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import { WA_COTIZAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Videos UGC con Actores en Ecuador — Reels y TikTok para Marcas",
  description:
    "Producción de contenido UGC en Quito con actores reales. Videos para Reels, TikTok y anuncios que conectan auténticamente con tu audiencia. Planes Starter, Growth y Pro.",
  keywords: [
    "videos UGC Ecuador",
    "actores contenido digital Quito",
    "reels con actores Ecuador",
    "content creators Quito",
    "videos TikTok marcas Ecuador",
    "producción UGC profesional",
  ],
};

const actors = [
  { name: "Emilia", focus: "Lifestyle, bienestar y moda", traits: ["Tono cercano", "Audiencia femenina", "Estética premium"] },
  { name: "Ali", focus: "Corporativo e institucional", traits: ["Tono profesional", "B2B y servicios", "Presentaciones ejecutivas"] },
  { name: "David", focus: "Cultura joven y tendencias", traits: ["Tono dinámico", "Audiencia Gen Z", "Humor y entretenimiento"] },
  { name: "Naya", focus: "Deportes, outdoor y skincare", traits: ["Tono activo", "Estilo de vida saludable", "Marcas naturales"] },
];

const plans = [
  {
    name: "Starter",
    hours: "1 hora de producción",
    videos: "6–8 videos finales",
    items: [
      "1 actor de contenido",
      "10 gráficas de contenido",
      "Uso de imagen por 3 meses",
      "Edición dinámica para Reels y TikTok",
      "Subtítulos y música incluidos",
      "Versión orgánico + versión para pauta",
    ],
  },
  {
    name: "Growth",
    hours: "2 horas de producción",
    videos: "10 videos finales",
    featured: true,
    items: [
      "1–2 actores de contenido",
      "10 gráficas de contenido",
      "Uso de imagen por 3 meses",
      "Múltiples conceptos de video",
      "Subtítulos, música y motion",
      "Versión orgánico + versión para pauta",
      "Entrega en 5–10 días hábiles",
    ],
  },
  {
    name: "Pro",
    hours: "2 × 2 horas de producción",
    videos: "14 videos finales",
    items: [
      "1 actor fijo de marca",
      "10 gráficas de contenido",
      "Uso de imagen por 3 meses",
      "Mayor variedad de escenas y conceptos",
      "Edición premium con motion avanzado",
      "Versión orgánico + versión para pauta",
      "Aprobación conceptual antes del rodaje",
    ],
  },
];

const process = [
  { step: "01", title: "Brief de marca", desc: "Definimos objetivos, mensajes clave, público objetivo y referencias visuales de la marca." },
  { step: "02", title: "Guión y moodboard", desc: "Escribimos los scripts de cada video y preparamos el moodboard para aprobación antes del rodaje." },
  { step: "03", title: "Día de producción", desc: "Rodamos en locación en Quito con equipo técnico: cámara, iluminación y dirección profesional." },
  { step: "04", title: "Edición y entrega", desc: "Editamos con subtítulos, música y motion. Entregamos en 5–10 días hábiles con 1 ronda de ajustes." },
];

const faqs = [
  {
    q: "¿Qué es el UGC y por qué funciona?",
    a: "User Generated Content (UGC) son videos que imitan el estilo de contenido orgánico de los usuarios, pero producidos profesionalmente. Las plataformas los favorecen porque no parecen anuncios tradicionales, generando mayor alcance y CTR tanto en orgánico como en pauta pagada.",
  },
  {
    q: "¿Puedo usar los videos para Meta Ads o TikTok Ads?",
    a: "Sí. Cada entregable incluye una versión optimizada para orgánico y una versión para pauta publicitaria con los ajustes de formato y duración correctos para cada plataforma.",
  },
  {
    q: "¿Los actores trabajan exclusivamente con mi marca?",
    a: "Los actores del catálogo estándar trabajan con múltiples marcas. Si necesitas exclusividad (que el actor no aparezca con competidores directos), lo coordinamos con un acuerdo de exclusividad que se cotiza por separado.",
  },
  {
    q: "¿Cuánto dura el derecho de uso de imagen?",
    a: "El uso de imagen estándar incluido es de 3 meses desde la fecha de entrega. Extensiones de uso se pueden negociar al momento de contratar.",
  },
  {
    q: "¿Dónde se realiza la producción?",
    a: "Producimos en Quito, Ecuador. Podemos usar locaciones del cliente o coordinar locaciones neutras según el concepto del video.",
  },
];

export default function UGCPage() {
  return (
    <main>
      <ServiceHero
        badge="Creación de Contenido UGC · Actores · Quito, Ecuador"
        headline="Videos con personas reales que"
        accent=" conectan con tu audiencia."
        subtitle="Producimos contenido UGC profesional en Quito: actores reales, guión estratégico, edición completa. Reels, TikToks y anuncios que se sienten auténticos y generan resultados."
        stats={[
          { value: "6–14", label: "videos por paquete" },
          { value: "5–10d", label: "tiempo de entrega" },
          { value: "3m", label: "derechos de imagen incluidos" },
        ]}
        accentColor="teal"
      />

      {/* Why UGC */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl mb-5">
                ¿Por qué el UGC supera a la publicidad tradicional?
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  ["Mayor alcance orgánico", "Las plataformas priorizan contenido que parece natural y auténtico sobre los anuncios tradicionales."],
                  ["Mejor rendimiento en pauta", "Los videos UGC tienen CTR hasta 4x mayor que los anuncios de producción clásica."],
                  ["Conecta emocionalmente", "Ver a personas reales usando tu producto o servicio genera confianza y reduce la fricción de compra."],
                  ["Versátil por canal", "Un mismo video se adapta a Reels, TikTok, Stories y anuncios de Meta o TikTok Ads."],
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-teal/10 text-teal flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                    <div>
                      <span className="font-grotesk font-semibold text-navy text-sm block">{title}</span>
                      <span className="font-sans text-navy/55 text-sm">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {actors.map((a) => (
                <div key={a.name} className="bg-white rounded-block p-5 shadow-sm border border-navy/8">
                  <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center font-grotesk font-black text-teal text-lg mb-3">
                    {a.name[0]}
                  </div>
                  <h3 className="font-grotesk font-bold text-navy text-sm mb-1">{a.name}</h3>
                  <p className="font-sans text-navy/50 text-xs mb-3">{a.focus}</p>
                  <div className="flex flex-col gap-1">
                    {a.traits.map((t) => (
                      <span key={t} className="font-sans text-navy/60 text-xs flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-navy py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="font-grotesk font-bold text-white text-2xl md:text-3xl mb-3">
              Paquetes de producción UGC
            </h2>
            <p className="font-sans text-white/50 text-base">
              Todos incluyen guión, producción, edición y derechos de imagen.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`bg-white/5 border ${p.featured ? "border-teal/50 bg-teal/5" : "border-white/10"} rounded-block p-7 flex flex-col`}
              >
                {p.featured && (
                  <span className="inline-block bg-teal text-white text-xs font-grotesk font-bold px-3 py-1 rounded-full mb-4 self-start">
                    Más elegido
                  </span>
                )}
                <h3 className="font-grotesk font-black text-white text-xl mb-1">{p.name}</h3>
                <span className="font-sans text-teal text-xs font-medium block mb-1">{p.videos}</span>
                <span className="font-sans text-white/40 text-xs block mb-5">{p.hours}</span>
                <ul className="flex flex-col gap-2 flex-1 mb-6">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-sans text-white/60 text-sm">
                      <span className="text-teal mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_COTIZAR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-teal text-white font-grotesk font-bold text-sm px-5 py-3 rounded-full hover:bg-teal-dark transition-colors"
                >
                  Cotizar {p.name}
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
            Proceso de producción UGC
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((s) => (
              <div key={s.step} className="bg-white rounded-card p-5 shadow-sm border border-navy/8">
                <span className="font-grotesk font-black text-teal text-3xl opacity-30 block mb-3">{s.step}</span>
                <h3 className="font-grotesk font-bold text-navy text-sm mb-1.5">{s.title}</h3>
                <p className="font-sans text-navy/55 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} bg="navy" />
      <CTABanner
        headline="¿Quieres videos que realmente conecten con tu audiencia?"
        subtitle="Cuéntanos tu marca y te preparamos una propuesta de producción UGC en menos de 24 horas."
        waMessage="Hola, quiero cotizar producción de contenido UGC con actores para mi marca."
      />
    </main>
  );
}
