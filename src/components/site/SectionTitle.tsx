interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  dark?: boolean;
  action?: React.ReactNode;
}

export default function SectionTitle({ eyebrow, title, intro, dark = false, action }: SectionTitleProps) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal">{eyebrow}</p>}
        <h2 className={`font-display text-3xl leading-tight md:text-4xl ${dark ? "text-cream" : "text-navy"}`}>{title}</h2>
        {intro && <p className={`mt-4 font-light leading-relaxed ${dark ? "text-cream/60" : "text-navy/60"}`}>{intro}</p>}
      </div>
      {action}
    </div>
  );
}
