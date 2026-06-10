import { WA_DIAGNOSTICO } from "@/lib/constants";

interface Stat {
  value: string;
  label: string;
}

interface ServiceHeroProps {
  badge: string;
  headline: string;
  accent?: string;
  subtitle: string;
  stats?: Stat[];
  ctaText?: string;
  ctaHref?: string;
  accentColor?: "teal" | "magenta" | "green";
}

const accentClasses: Record<string, string> = {
  teal: "text-teal",
  magenta: "text-magenta",
  green: "text-green",
};

const statClasses: Record<string, string> = {
  teal: "text-teal",
  magenta: "text-magenta",
  green: "text-green",
};

export default function ServiceHero({
  badge,
  headline,
  accent,
  subtitle,
  stats = [],
  ctaText = "Diagnóstico Gratuito",
  ctaHref,
  accentColor = "teal",
}: ServiceHeroProps) {
  const ac = accentClasses[accentColor];
  const sc = statClasses[accentColor];
  const href = ctaHref ?? WA_DIAGNOSTICO;

  const parts = accent ? headline.split(accent) : [headline];

  return (
    <section className="bg-navy pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <span
          className={`inline-block bg-white/8 text-white/70 text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide`}
        >
          {badge}
        </span>

        <h1 className="font-grotesk font-bold text-white text-4xl md:text-5xl leading-[1.1] mb-6 max-w-3xl">
          {parts[0]}
          {accent && <span className={ac}>{accent}</span>}
          {parts[1]}
        </h1>

        <p className="font-sans text-white/55 text-lg leading-relaxed max-w-2xl mb-8">
          {subtitle}
        </p>

        {stats.length > 0 && (
          <div className="flex flex-wrap gap-8 mb-8">
            {stats.map((s) => (
              <div key={s.label}>
                <span className={`font-grotesk font-black text-2xl ${sc} block`}>{s.value}</span>
                <span className="font-sans text-white/40 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-teal text-white font-grotesk font-bold px-7 py-3.5 rounded-full hover:bg-teal-dark transition-colors"
        >
          {ctaText} →
        </a>
      </div>
    </section>
  );
}
