import Image from "next/image";
import Link from "next/link";
import { getServiceLines } from "@/lib/content";
import { EMAIL, WA } from "@/lib/constants";

const explore = [
  { label: "Servicios", href: "/servicios" },
  { label: "Portafolio", href: "/portafolio" },
  { label: "News", href: "/news" },
  { label: "Contáctanos", href: "/contactanos" },
];

const legal = [
  { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Política de cookies", href: "/politica-de-cookies" },
];

const heading = "mb-5 text-xs font-semibold uppercase tracking-widest text-cream/60";
const link = "text-sm text-cream/50 transition-colors hover:text-teal";

export default async function Footer() {
  const lines = await getServiceLines();

  return (
    <footer className="border-t border-white/5 bg-navy pb-8 pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/brand/logo-vertical.png"
              alt="Crealtiva Digital — Agencia de marketing"
              width={407}
              height={313}
              className="mb-5 h-24 w-auto"
            />
            <p className="max-w-xs text-sm leading-relaxed text-cream/40">
              Tu departamento de marketing externo en Quito, Ecuador: estrategia, producción, pauta y métricas.
            </p>
          </div>

          <div>
            <h2 className={heading}>Servicios</h2>
            <ul className="flex flex-col gap-3">
              {lines.map((l) => (
                <li key={l.slug}>
                  <Link href={`/servicios/${l.slug}`} className={link}>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>Explora</h2>
            <ul className="flex flex-col gap-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>Contacto</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`https://api.whatsapp.com/send?phone=${WA}`} target="_blank" rel="noopener noreferrer" className={link}>
                  WhatsApp +593 95 922 7420
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={link}>
                  {EMAIL}
                </a>
              </li>
              <li className="text-sm text-cream/50">Quito, Ecuador</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-cream/30 md:flex-row">
          <span>© {new Date().getFullYear()} Crealtiva Digital. Todos los derechos reservados.</span>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-teal">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
