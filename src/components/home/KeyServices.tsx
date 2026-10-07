import Link from "next/link";
import NaturalImage from "@/components/site/NaturalImage";
import SectionTitle from "@/components/site/SectionTitle";
import type { ServiceLine } from "@/lib/content/types";

// Mampostería: cada foto en su proporción original, con el texto debajo.
export default function KeyServices({ lines }: { lines: ServiceLine[] }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Servicios clave"
          title={`${lines.length} servicios conectados en un solo ecosistema`}
          intro="Cada servicio funciona solo, pero rinde más junto a los demás: la estrategia define el contenido, la producción alimenta la pauta y la web convierte."
          action={
            <Link href="/servicios" className="text-sm font-semibold text-teal hover:text-navy">
              Ver todos los servicios →
            </Link>
          }
        />

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
          {lines.map((l) => (
            <Link
              key={l.slug}
              href={`/servicios/${l.slug}`}
              className="group mb-5 block break-inside-avoid overflow-hidden rounded-block bg-navy"
            >
              {l.cover && (
                <NaturalImage
                  img={l.cover}
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                  maxHeight={380}
                  className="mx-auto"
                  imgClassName="transition-opacity duration-300 group-hover:opacity-85"
                />
              )}
              <div className="p-5">
                <p className="text-xs font-semibold text-teal">{l.tagline}</p>
                <h3 className="mt-1 text-xl font-bold leading-tight text-cream">{l.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{l.summary}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-cream transition-transform group-hover:translate-x-1">
                  Conocer más →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
