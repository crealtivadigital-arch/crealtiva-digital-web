import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import { LEGAL } from "@/lib/constants";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface LegalDocProps {
  title: string;
  intro: string;
  sections: LegalSection[];
}

const others = [
  { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Política de cookies", href: "/politica-de-cookies" },
];

// Plantilla común de las páginas legales: cabecera, índice lateral y texto en columna de lectura.
export default function LegalDoc({ title, intro, sections }: LegalDocProps) {
  return (
    <main>
      <PageHeader
        eyebrow="Legal"
        title={title}
        intro={intro}
        crumbs={[{ label: "Inicio", href: "/" }, { label: title }]}
      >
        <p className="text-sm text-cream/40">Última actualización: {LEGAL.actualizado}</p>
      </PageHeader>

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-teal">Contenido</p>
            <ol className="space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-navy/60 transition-colors hover:text-teal">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>

            <p className="mb-3 mt-10 text-xs font-semibold uppercase tracking-widest text-teal">Otras políticas</p>
            <ul className="space-y-2 text-sm">
              {others
                .filter((o) => o.label !== title)
                .map((o) => (
                  <li key={o.href}>
                    <Link href={o.href} className="text-navy/60 transition-colors hover:text-magenta">
                      {o.label} →
                    </Link>
                  </li>
                ))}
            </ul>
          </aside>

          <article className="max-w-3xl rounded-block bg-white p-7 shadow-sm md:p-12">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 [&+&]:mt-10">
                <h2 className="mb-4 font-display text-2xl text-navy">
                  <span className="text-teal">{i + 1}.</span> {s.title}
                </h2>
                <div className="space-y-4 text-[0.9375rem] leading-relaxed text-navy/75 [&_a]:font-semibold [&_a]:text-teal hover:[&_a]:underline [&_li]:pl-1 [&_strong]:text-navy [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {s.body}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}

// Valor legal aún no confirmado: se muestra resaltado para que no pase desapercibido.
export function LegalValue({ value, label }: { value: string | null; label: string }) {
  if (value) return <>{value}</>;
  return (
    <span className="rounded bg-magenta/10 px-1.5 py-0.5 text-sm font-semibold text-magenta">
      [{label} por completar]
    </span>
  );
}

export function Responsable() {
  return (
    <ul>
      <li>
        <strong>Nombre comercial:</strong> {LEGAL.nombreComercial}
      </li>
      <li>
        <strong>Razón social:</strong> <LegalValue value={LEGAL.razonSocial} label="Razón social" />
      </li>
      <li>
        <strong>RUC:</strong> <LegalValue value={LEGAL.ruc} label="RUC" />
      </li>
      <li>
        <strong>Domicilio:</strong> <LegalValue value={LEGAL.domicilio} label="Domicilio" />, {LEGAL.ciudad}
      </li>
      <li>
        <strong>Correo de contacto:</strong> <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
      </li>
    </ul>
  );
}
