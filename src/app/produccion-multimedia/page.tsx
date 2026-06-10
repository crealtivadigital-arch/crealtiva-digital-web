import type { Metadata } from "next";
import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Producción Multimedia Profesional en Quito — Video, Fotografía y Contenido",
  description:
    "Empresa de producción multimedia en Quito. Video UGC con actores, fotografía de producto y corporativa, filmación de comerciales y cobertura de eventos. Equipo técnico propio.",
  keywords: [
    "producción multimedia Quito",
    "empresa producción audiovisual Ecuador",
    "fotografía producto Quito",
    "video corporativo Ecuador",
    "producción de contenido digital",
  ],
};

const lines = [
  {
    href: "/produccion-multimedia/ugc",
    number: "01",
    title: "UGC y Contenido con Actores",
    sub: "Videos auténticos para redes sociales",
    desc: "Producimos videos verticales con actores reales en Quito. Reels, TikToks y anuncios que se sienten naturales y conectan emocionalmente con tu audiencia.",
    tags: ["Actores profesionales", "Reels y TikTok", "Versiones orgánico + pauta", "Entrega en 5–10 días"],
    color: "teal",
  },
  {
    href: "/produccion-multimedia/studio",
    number: "02",
    title: "Producción Profesional",
    sub: "Fotografía y video de marca de alto nivel",
    desc: "Fotografía de producto, sesiones corporativas, videos publicitarios y de capacitación. Equipo técnico completo con iluminación profesional y postproducción incluida.",
    tags: ["Fotografía de producto", "Video corporativo", "Comerciales", "Videos de capacitación"],
    color: "magenta",
  },
  {
    href: "/produccion-multimedia/eventos",
    number: "03",
    title: "Eventos y Cobertura por Horas",
    sub: "Fotografía y filmación de eventos corporativos",
    desc: "Cobertura profesional de premiaciones, lanzamientos, convenciones y reuniones ejecutivas. Contratas el tiempo exacto que necesitas con entrega en 3–7 días hábiles.",
    tags: ["Fotografía de eventos", "Filmación", "Transmisión en vivo", "Paquetes por horas"],
    color: "green",
  },
];

const colorMap: Record<string, { badge: string; num: string; dot: string }> = {
  teal: { badge: "bg-teal/10 text-teal", num: "text-teal", dot: "bg-teal" },
  magenta: { badge: "bg-magenta/10 text-magenta", num: "text-magenta", dot: "bg-magenta" },
  green: { badge: "bg-green/10 text-green", num: "text-green", dot: "bg-green" },
};

const standards = [
  { title: "Equipo técnico propio", desc: "Cámara, iluminación y audio profesional — sin subcontratar." },
  { title: "Postproducción completa", desc: "Edición, coloración, motion graphics y retoque incluidos." },
  { title: "Entrega en 3–7 días hábiles", desc: "Desde recepción de materiales finales hasta archivos listos." },
  { title: "2 rondas de ajustes técnicos", desc: "Revisiones incluidas para garantizar que el resultado sea el esperado." },
];

export default function ProduccionMultimedia() {
  return (
    <main>
      <ServiceHero
        badge="Producción Multimedia · Quito, Ecuador"
        headline="Contenido visual profesional que"
        accent=" habla por tu marca."
        subtitle="Fotografía de producto, video UGC con actores, producción corporativa y cobertura de eventos. Todo bajo un equipo técnico completo con criterio de marca y postproducción incluida."
        stats={[
          { value: "3", label: "líneas de producción especializadas" },
          { value: "3–7d", label: "tiempo de entrega promedio" },
          { value: "100%", label: "equipo técnico propio" },
        ]}
        accentColor="magenta"
      />

      {/* 3 Lines */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-grotesk font-bold text-navy text-2xl md:text-3xl mb-3">
              Tres líneas de producción especializadas
            </h2>
            <p className="font-sans text-navy/55 text-base max-w-xl">
              Cada tipo de contenido tiene sus propias técnicas, actores y procesos. Elige la línea que necesita tu marca.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {lines.map((l) => {
              const c = colorMap[l.color];
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group bg-white rounded-block p-7 shadow-sm border border-navy/8 hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start"
                >
                  <span className={`font-grotesk font-black text-5xl ${c.num} opacity-20 group-hover:opacity-40 transition-opacity flex-shrink-0`}>
                    {l.number}
                  </span>
                  <div className="flex-1">
                    <span className="font-sans text-navy/40 text-xs block mb-1">{l.sub}</span>
                    <h3 className="font-grotesk font-bold text-navy text-xl mb-2">{l.title}</h3>
                    <p className="font-sans text-navy/60 text-sm leading-relaxed mb-4">{l.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {l.tags.map((tag) => (
                        <span key={tag} className={`${c.badge} text-xs font-sans font-medium px-3 py-1 rounded-full`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="hidden md:flex items-center text-navy/30 group-hover:text-teal transition-colors text-lg font-bold">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="bg-navy py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-grotesk font-bold text-white text-2xl md:text-3xl mb-10">
            Estándares de entrega que garantizamos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {standards.map((s, i) => (
              <div key={s.title} className="bg-white/4 border border-white/8 rounded-card p-5">
                <span className="font-grotesk font-black text-teal text-2xl opacity-30 block mb-3">0{i + 1}</span>
                <h3 className="font-grotesk font-bold text-white text-sm mb-1.5">{s.title}</h3>
                <p className="font-sans text-white/50 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="¿Listo para producir contenido que realmente representa tu marca?"
        subtitle="Cuéntanos tu proyecto y te cotizamos en menos de 24 horas hábiles."
        waMessage="Hola, quiero cotizar una producción multimedia con Crealtiva Digital."
      />
    </main>
  );
}
