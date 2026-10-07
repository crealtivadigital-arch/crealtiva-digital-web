import Link from "next/link";
import { formatPrice } from "@/lib/content/format";
import type { Exclusion } from "@/lib/content/types";

// "No incluye", y al lado cómo conseguirlo: complemento del mismo paquete, otro paquete o una línea.
export default function ExclusionList({ items, dark = false }: { items: Exclusion[]; dark?: boolean }) {
  const text = dark ? "text-cream/70" : "text-navy/70";
  return (
    <ul className="space-y-3">
      {items.map((e) => (
        <li key={e.text} className="text-sm leading-relaxed">
          <span className={`flex gap-2 ${text}`}>
            <span aria-hidden className="text-navy/30">—</span>
            {e.text}
          </span>
          {e.solution && (
            <span className="ml-5 mt-1.5 block">
              <Solution solution={e.solution} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

function Solution({ solution }: { solution: NonNullable<Exclusion["solution"]> }) {
  const chip = "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors";
  if (solution.type === "addon") {
    return (
      <span className={`${chip} bg-teal/[0.12] text-teal`}>
        Agrégalo como complemento: {solution.name} · +{formatPrice(solution.price).main}
      </span>
    );
  }
  if (solution.type === "package") {
    const p = formatPrice(solution.price);
    return (
      <Link
        href={`/servicios/${solution.lineSlug}/${solution.slug}`}
        className={`${chip} bg-magenta/[0.12] text-magenta hover:bg-magenta hover:text-cream`}
      >
        Incluido en {solution.name} · {p.prefix ? `${p.prefix.toLowerCase()} ` : ""}
        {p.main}
        {p.suffix ? ` ${p.suffix}` : ""} →
      </Link>
    );
  }
  return (
    <Link href={`/servicios/${solution.lineSlug}`} className={`${chip} bg-magenta/[0.12] text-magenta hover:bg-magenta hover:text-cream`}>
      Contrátalo en {solution.name}
      {solution.fromPrice !== null && ` · desde $${solution.fromPrice}`} →
    </Link>
  );
}
