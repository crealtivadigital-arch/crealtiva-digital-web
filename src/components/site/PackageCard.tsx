import Link from "next/link";
import { formatPrice } from "@/lib/content/format";
import type { Package } from "@/lib/content/types";

interface PackageCardProps {
  pkg: Package;
  lineName?: string;
}

export default function PackageCard({ pkg, lineName }: PackageCardProps) {
  const price = formatPrice(pkg.price);
  const href = `/servicios/${pkg.lineSlug}/${pkg.slug}`;

  return (
    <article
      className={`group relative flex h-full flex-col rounded-card bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-navy/5 ${
        pkg.featured ? "ring-2 ring-magenta" : "ring-1 ring-navy/5"
      }`}
    >
      {pkg.featured && (
        <span className="absolute -top-3 right-6 rounded-full bg-magenta px-3 py-1 text-[11px] font-semibold text-white">
          Más elegido
        </span>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {lineName && (
          <span className="rounded-full bg-teal/[0.12] px-3 py-1 text-[11px] font-semibold text-teal">{lineName}</span>
        )}
        {pkg.badge && pkg.badge !== lineName && (
          <span className="rounded-full bg-navy/5 px-3 py-1 text-[11px] font-semibold text-navy/60">{pkg.badge}</span>
        )}
      </div>

      <h3 className="text-xl font-bold leading-snug text-navy">
        <Link href={href} className="after:absolute after:inset-0">
          {pkg.name}
        </Link>
      </h3>
      {pkg.tagline && <p className="mt-1 text-sm font-medium text-teal">{pkg.tagline}</p>}
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-navy/60">{pkg.summary}</p>

      <div className="mt-auto flex items-end justify-between gap-4 border-t border-navy/5 pt-5">
        <div>
          {price.prefix && <span className="block text-[11px] font-semibold uppercase tracking-wide text-navy/40">{price.prefix}</span>}
          <span className="text-2xl font-bold text-navy">{price.main}</span>
          {price.suffix && <span className="ml-1 text-sm text-navy/50">{price.suffix}</span>}
        </div>
        <span className="text-sm font-semibold text-magenta transition-transform group-hover:translate-x-1" aria-hidden>
          Ver detalle →
        </span>
      </div>
    </article>
  );
}
