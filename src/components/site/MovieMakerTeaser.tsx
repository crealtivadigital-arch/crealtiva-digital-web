import Link from "next/link";

const formats = ["Redes", "Filmación", "Podcast", "Documentales", "Films"];

// Reemplaza la sección de Producción Multimedia en /servicios: la línea vive en /movie-maker.
export default function MovieMakerTeaser({ id }: { id: string }) {
  return (
    <section id={id} className="scroll-mt-32 bg-black py-20 text-cream md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-block bg-navy">
          <div aria-hidden className="h-6 bg-black md:h-10" />
          <div className="grid gap-10 px-7 py-12 md:grid-cols-[1.2fr_1fr] md:items-end md:px-12 md:py-16">
            <div>
              <p className="text-cream/60">Producción audiovisual</p>
              <h2 className="mt-2 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.85] tracking-tight">
                Movie
                <br />
                Maker
              </h2>
            </div>
            <div>
              <ul className="flex flex-wrap gap-2">
                {formats.map((f) => (
                  <li key={f} className="rounded-full px-3 py-1 text-sm text-cream/70 ring-1 ring-cream/20">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 leading-relaxed text-cream/60">
                Video para redes, filmación institucional, podcast, documentales y films. Grabación 4K, audio
                profesional y postproducción en Quito y los Valles.
              </p>
              <Link
                href="/movie-maker"
                className="mt-8 inline-flex rounded-full bg-magenta px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-magenta-light"
              >
                Entrar a Movie Maker
              </Link>
            </div>
          </div>
          <div aria-hidden className="h-6 bg-black md:h-10" />
        </div>
      </div>
    </section>
  );
}
