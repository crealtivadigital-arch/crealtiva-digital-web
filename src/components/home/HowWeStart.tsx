import DigitalCityStory from "@/components/home/DigitalCityStory";
import SectionTitle from "@/components/site/SectionTitle";
import { WA_ASESORIA } from "@/lib/constants";
import Link from "next/link";

export default function HowWeStart() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-28">
      {/* Luces de marca de fondo */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-magenta/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle
          dark
          eyebrow="Cómo empezamos"
          title="¿Cómo funciona el marketing y el crecimiento digital?"
          intro="Nuestro objetivo es que crezca tu imagen digital completa. Redes y web son piezas de una visión más grande: una presencia digital robusta."
        />

        <DigitalCityStory />

        {/* Propuesta de valor */}
        <div className="mt-10 grid items-center gap-8 rounded-[2.5rem] bg-gradient-to-br from-teal-dark to-teal p-8 md:mt-14 md:p-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="font-display text-2xl leading-tight text-cream md:text-4xl">
              No te quedes con la idea de que el marketing son solo redes
            </h3>
            <p className="mt-4 text-lg font-light leading-relaxed text-cream/85">
              Es una estrategia de posicionamiento digital. Solicita una asesoría y trabajemos tu estrategia en función
              de la realidad actual de tu empresa: tú sigues con tu negocio, nosotros construimos tu presencia.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <a
              href={WA_ASESORIA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-full bg-magenta px-8 py-4 font-semibold text-cream shadow-lg transition-colors hover:bg-magenta-light"
            >
              Solicita tu asesoría
            </a>
            <Link
              href="/contactanos"
              className="inline-flex justify-center rounded-full border border-cream/40 px-8 py-4 font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              Otros canales de contacto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
