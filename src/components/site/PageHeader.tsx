import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}

// Cabecera navy de las páginas internas. El H1 usa Sansation (font-display), según el manual de marca.
export default function PageHeader({ eyebrow, title, intro, crumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-16 md:pb-20">
      {/* Órbita punteada del isotipo como recurso gráfico, inclinada 22° */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-10 h-[420px] w-[620px] rotate-[-22deg] text-teal/25"
        viewBox="0 0 620 420"
        fill="none"
      >
        <ellipse cx="310" cy="210" rx="300" ry="150" stroke="currentColor" strokeWidth="2" strokeDasharray="14 18" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Ruta de navegación" className="mb-6 text-xs text-white/40">
            <ol className="flex flex-wrap items-center gap-1.5">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden>/</span>}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-teal">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/60">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="mb-5 inline-block rounded-full bg-teal/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-teal">
            {eyebrow}
          </span>
        )}

        <h1 className="max-w-3xl font-display text-4xl leading-[1.08] text-white md:text-6xl">{title}</h1>

        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{intro}</p>}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
