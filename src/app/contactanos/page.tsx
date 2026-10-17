import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import SectionTitle from "@/components/site/SectionTitle";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";
import FAQ from "@/components/FAQ";
import { getServiceLines } from "@/lib/content";
import { EMAIL, WA_DIAGNOSTICO, wa } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contáctanos — Agencia de Marketing Digital en Quito, Ecuador",
  description:
    "Escríbenos por WhatsApp o email y agenda un diagnóstico gratuito. Crealtiva Digital: marketing, producción multimedia, pauta, web y automatización en Quito, Ecuador.",
  keywords: [
    "contacto agencia marketing Quito",
    "diagnóstico gratuito marketing digital",
    "crealtiva digital contacto",
    "agencia marketing Ecuador contacto",
  ],
  alternates: { canonical: "/contactanos" },
};

// Solo datos ya publicados en el resto del sitio (Inicio y Términos); no agregar tiempos de respuesta
// ni horarios hasta que el cliente los confirme.
const faqs = [
  {
    q: "¿Qué pasa en el diagnóstico gratuito?",
    a: "Es una sesión de 45 minutos para entender tu marca, tus objetivos y tu situación digital actual. Con eso te enviamos una propuesta personalizada con servicios, alcance y tiempos, sin costo ni compromiso.",
  },
  {
    q: "No sé qué servicio necesito, ¿por dónde empiezo?",
    a: "Por el diagnóstico. No necesitas llegar con todo definido: cuéntanos en qué está tu negocio y te recomendamos la combinación de servicios adecuada.",
  },
  {
    q: "¿Los precios de la web son finales?",
    a: "Son referenciales y están en dólares. El precio final, el alcance y los plazos se confirman en la cotización que te enviamos para tu caso.",
  },
  {
    q: "¿La inversión en pauta está incluida?",
    a: "No. En los servicios de pauta, la inversión publicitaria la pagas directamente a Meta, Google, TikTok o LinkedIn; Crealtiva cobra la tarifa de gestión.",
  },
];

export default async function Contactanos() {
  const lines = await getServiceLines();

  return (
    <main>
      <PageHeader
        eyebrow="Contáctanos"
        title="Hablemos de tu negocio"
        intro="No necesitas saber exactamente qué necesitas. Cuéntanos en qué estás y te proponemos el camino."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Contáctanos" }]}
      />

      {/* Canales */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 lg:grid-cols-[1.4fr_1fr]">
          <a
            href={WA_DIAGNOSTICO}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between gap-10 overflow-hidden rounded-block bg-teal p-8 text-cream transition-colors hover:bg-teal-dark md:p-10"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
              <WhatsAppIcon size={28} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-cream/70">Canal principal</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Escríbenos por WhatsApp</h2>
              <p className="mt-3 max-w-md leading-relaxed text-cream/80">
                Agenda tu diagnóstico gratuito o haz tu consulta directamente con el equipo.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy transition-transform group-hover:translate-x-1">
                +593 959 227 420 →
              </span>
            </div>
          </a>

          <div className="grid gap-5">
            <a
              href={`mailto:${EMAIL}`}
              className="group flex flex-col gap-3 rounded-block bg-white p-8 ring-1 ring-navy/5 transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-magenta">Email</p>
              <h2 className="font-display text-2xl text-navy">Propuestas y proyectos</h2>
              <p className="text-sm leading-relaxed text-navy/60">
                Para solicitudes formales o proyectos con más detalle.
              </p>
              <span className="mt-auto break-all text-sm font-semibold text-magenta group-hover:underline">
                {EMAIL} →
              </span>
            </a>

            <div className="flex flex-col gap-3 rounded-block bg-navy p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal">Ubicación</p>
              <h2 className="font-display text-2xl text-cream">Quito, Ecuador</h2>
              <p className="text-sm leading-relaxed text-cream/60">
                Nuestras producciones multimedia en Quito y los Valles incluyen la movilización del equipo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicio de interés → WhatsApp con mensaje prellenado */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle
            eyebrow="¿Ya sabes qué buscas?"
            title="Elige el servicio y escríbenos directo"
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {lines.map((l) => (
              <li key={l.slug}>
                <a
                  href={wa(`Hola, quiero información sobre ${l.name} con Crealtiva Digital.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-2 rounded-card bg-cream p-5 ring-1 ring-navy/5 transition-all hover:bg-white hover:ring-teal/40"
                >
                  <span className="font-bold text-navy">{l.name}</span>
                  <span className="text-sm text-navy/55">{l.tagline}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-semibold text-teal">
                    <WhatsAppIcon size={13} /> Consultar →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-navy/55">
            ¿Prefieres revisar primero los paquetes?{" "}
            <Link href="/servicios" className="font-semibold text-teal hover:underline">
              Ver todos los servicios →
            </Link>
          </p>
        </div>
      </section>

      <FAQ items={faqs} bg="navy" title="Antes de escribirnos" />
    </main>
  );
}
