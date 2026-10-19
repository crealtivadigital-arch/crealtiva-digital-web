import NaturalImage from "@/components/site/NaturalImage";
import { MODELOS_REGISTRO } from "@/lib/constants";
import type { Img } from "@/lib/content/types";

const rubros = ["Servicios", "Productos", "Ropa y moda", "Gastronomía", "Y más"];

// Fotos de sesiones con modelos (portafolio "Contenido UGC con actores")
const shots: Img[] = [
  { src: "https://res.cloudinary.com/dhua4dpza/image/upload/v1792392805/emlia-book-16.webp", alt: "Modelo de contenido de Crealtiva Digital" },
  { src: "https://res.cloudinary.com/dhua4dpza/image/upload/v1792392800/dsc01842.webp", alt: "Sesión de contenido con modelo" },
  { src: "https://res.cloudinary.com/dhua4dpza/image/upload/v1792392806/creacion-d-econtenido.webp", alt: "Creadora de contenido grabando en un restaurante" },
  { src: "https://res.cloudinary.com/dhua4dpza/image/upload/v1792392802/dsc06495.webp", alt: "Sesión de contenido con modelo" },
  { src: "https://res.cloudinary.com/dhua4dpza/image/upload/v1792392801/dsc06297.webp", alt: "Sesión de contenido con modelo" },
  { src: "https://res.cloudinary.com/dhua4dpza/image/upload/v1792392808/gym.webp", alt: "Contenido con modelo para gimnasio" },
];

// Convocatoria al staff de modelos: va al final de la línea de Modelos y en Contáctanos.
export default function ModelCasting() {
  return (
    <section id="staff-modelos" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-magenta via-[#9c1660] to-navy py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cream">
            <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-teal" />
            Convocatoria abierta
          </span>
          <h2 className="mt-5 font-display text-3xl leading-tight text-cream md:text-5xl">¿Quieres ser parte de nuestro staff de modelos?</h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-cream/80">
            Sé el rostro que promociona a distintas marcas en sus redes y campañas.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Rubros">
            {rubros.map((r) => (
              <li key={r} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-cream ring-1 ring-white/20">
                {r}
              </li>
            ))}
          </ul>

          <ol className="mt-8 space-y-3">
            {["Ingresa al registro con el botón de abajo: el enlace ya incluye tu código de acceso.", "Llena tus datos para ser parte de nuestro staff de modelos."].map((t, i) => (
              <li key={t} className="flex gap-3 text-cream/85">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white font-display text-sm text-magenta">{i + 1}</span>
                <span className="pt-0.5">{t}</span>
              </li>
            ))}
          </ol>

          <a
            href={MODELOS_REGISTRO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-magenta shadow-xl transition-transform hover:-translate-y-0.5"
          >
            Llenar el registro de modelos
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>

        {/* Collage de modelos: cada foto en su proporción original */}
        <ul className="columns-2 gap-3 sm:columns-3">
          {shots.map((s, i) => (
            <li key={s.src} className={`mb-3 break-inside-avoid ${i % 2 ? "sm:mt-6" : ""}`}>
              <NaturalImage
                img={s}
                sizes="(min-width: 1024px) 200px, (min-width: 640px) 33vw, 50vw"
                className="rounded-card shadow-[0_18px_36px_-14px_rgba(0,0,0,0.55)] ring-2 ring-white/20"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
