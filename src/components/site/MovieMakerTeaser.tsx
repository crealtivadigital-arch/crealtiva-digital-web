import Link from "next/link";
import NaturalImage, { imageRatio } from "@/components/site/NaturalImage";
import type { Img } from "@/lib/content/types";

const formats = ["Filmación", "Documentales", "Podcast", "Films", "Rodajes especiales"];

// Muestra de producciones (se pueden cambiar cuando lleguen nuevas fotos)
const shots: Img[] = [
  { src: "https://res.cloudinary.com/dhua4dpza/image/upload/v1782262346/drone_1_ygy5io.jpg", alt: "Toma aérea con dron" },
  { src: "https://res.cloudinary.com/dhua4dpza/image/upload/v1782262346/drone_3_wnifu6.jpg", alt: "Toma aérea vertical con dron" },
  { src: "https://res.cloudinary.com/dhua4dpza/image/upload/v1782262385/contenido_institucional_2_dr90ki.jpg", alt: "Obra de infraestructura — contenido institucional" },
];

// Cierre de /servicios: las producciones de gran escala viven en /movie-maker.
export default function MovieMakerTeaser({ id }: { id: string }) {
  return (
    <section id={id} className="scroll-mt-32 bg-black py-20 text-cream md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-block bg-navy shadow-[0_40px_80px_-30px_rgba(234,27,126,0.45)]">
          <div aria-hidden className="h-6 bg-black md:h-10" />
          <div className="px-7 py-12 md:px-12 md:py-16">
            <p className="max-w-3xl font-display text-3xl leading-tight text-cream md:text-5xl">
              ¿Necesitas realizar una producción a <span className="text-magenta">gran escala</span>?
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-end">
              <h2 className="font-display leading-[0.85] tracking-tight">
                <span className="block text-[clamp(3rem,9vw,7rem)] text-teal">Crealtiva</span>
                <span className="mt-3 block text-[clamp(1.75rem,4.5vw,3.25rem)] text-cream">Movie Maker</span>
              </h2>
              <div>
                <ul className="flex flex-wrap gap-2">
                  {formats.map((f) => (
                    <li key={f} className="rounded-full px-3 py-1 text-sm text-cream/70 ring-1 ring-cream/20">
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 leading-relaxed text-cream/70">
                  Desde el guion, los actores y el rodaje hasta la postproducción: descúbrelo en Crealtiva Movie Maker.
                  Mucho más de nuestros proyectos, documentales, podcasts y rodajes especiales para todos tus proyectos.
                </p>
                <Link
                  href="/movie-maker"
                  className="mt-8 inline-flex rounded-full bg-magenta px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-magenta-light"
                >
                  Descubrir Movie Maker
                </Link>
              </div>
            </div>

            {/* Fotogramas: misma altura, cada foto en su proporción original (sin recorte) */}
            <ul className="mt-14 flex flex-col gap-4 md:flex-row">
              {shots.map((s) => (
                <li key={s.src} style={{ flex: `${imageRatio(s.src) ?? 1} 1 0%` }} className="min-w-0">
                  <Link href="/movie-maker" className="group block" aria-label={`Ver Movie Maker: ${s.alt}`}>
                    <NaturalImage
                      img={s}
                      sizes="(min-width: 768px) 420px, 100vw"
                      className="mx-auto rounded-card shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
                      imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden className="h-6 bg-black md:h-10" />
        </div>
      </div>
    </section>
  );
}
