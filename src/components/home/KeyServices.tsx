import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/site/SectionTitle";
import type { ServiceLine } from "@/lib/content/types";

export default function KeyServices({ lines }: { lines: ServiceLine[] }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Servicios clave"
          title="Siete pilares conectados en un solo ecosistema"
          intro="Cada servicio funciona solo, pero rinde más junto a los demás: la estrategia define el contenido, la producción alimenta la pauta y la web convierte."
          action={
            <Link href="/servicios" className="text-sm font-semibold text-teal hover:text-navy">
              Ver todos los servicios →
            </Link>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {lines.map((l, i) => (
            <Link
              key={l.slug}
              href={`/servicios/${l.slug}`}
              className={`group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-block bg-navy p-6 ${
                // 7 tarjetas en 4 columnas: la primera ocupa 2×2 y las dos últimas 2 columnas,
                // así la grilla cierra sin huecos.
                i === 0 ? "sm:col-span-2 lg:row-span-2 lg:min-h-[620px]" : i >= 5 ? "lg:col-span-2" : ""
              }`}
            >
              {l.cover && (
                <Image
                  src={l.cover.src}
                  alt={l.cover.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 280px, 50vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/5" />
              <div className="relative">
                <p className="text-xs font-semibold text-teal">{l.tagline}</p>
                <h3 className={`mt-1 font-bold leading-tight text-white ${i === 0 ? "text-3xl" : "text-xl"}`}>{l.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed text-white/70 ${i === 0 ? "max-w-md" : "line-clamp-2"}`}>{l.summary}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-white transition-transform group-hover:translate-x-1">
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
