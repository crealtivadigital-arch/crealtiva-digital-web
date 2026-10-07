import Image from "next/image";
import Link from "next/link";
import { WA_DIAGNOSTICO } from "@/lib/constants";

const proof = ["Equipo de 5 especialistas", "Sin contratos forzosos", "Tus cuentas siempre a tu nombre"];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-28 md:pt-32">
      {/* Órbita punteada del isotipo, inclinada 22° */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-40 top-24 h-[520px] w-[820px] rotate-[-22deg] text-teal/20"
        viewBox="0 0 820 520"
        fill="none"
      >
        <ellipse cx="410" cy="260" rx="400" ry="190" stroke="currentColor" strokeWidth="2" strokeDasharray="16 20" />
      </svg>

      <div className="relative mx-auto grid max-w-6xl items-end gap-12 px-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="pb-16 md:pb-24">
          <span className="inline-block rounded-full bg-teal/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-teal">
            Departamento de marketing externo · Quito, Ecuador
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] text-white md:text-6xl">
            ¿Tu marca proyecta el éxito que tu empresa <span className="text-teal">ya alcanzó?</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            Integramos estrategia, producción, pauta y web en un solo equipo que opera como tu propio
            departamento de marketing: con orden, criterio y resultados medibles.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={WA_DIAGNOSTICO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-magenta px-7 py-3.5 font-semibold text-white transition-colors hover:bg-magenta-light"
            >
              Agenda tu diagnóstico gratuito
            </a>
            <Link
              href="/servicios"
              className="inline-flex rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white/85 transition-colors hover:border-teal hover:text-teal"
            >
              Ver servicios →
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
            {proof.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[1500/940] w-full overflow-hidden rounded-t-block bg-black">
          <Image
            src="https://crealtivadigital.com/wp-content/uploads/2026/03/equipo-crealtiva-digital.png"
            alt="Equipo de Crealtiva Digital: estrategia, producción, diseño, pauta y contenido"
            fill
            priority
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
