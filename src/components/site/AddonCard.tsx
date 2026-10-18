import { addonInfo, type AddonInfo } from "@/content/addons";
import { formatPrice } from "@/lib/content/format";
import type { Extra } from "@/lib/content/types";

const icons: Record<AddonInfo["icon"] | "plus", React.ReactNode> = {
  repost: <path d="M4 9V7a3 3 0 013-3h11l-3-3M20 15v2a3 3 0 01-3 3H6l3 3" />,
  design: (
    <>
      <path d="M12 3a9 9 0 100 18c1.1 0 1.5-.8 1.2-1.6-.4-1 .3-2.4 1.6-2.4H17a4 4 0 004-4c0-5-4-10-9-10z" />
      <circle cx="7.5" cy="11" r="1.2" fill="currentColor" />
      <circle cx="10" cy="7" r="1.2" fill="currentColor" />
      <circle cx="14.5" cy="7" r="1.2" fill="currentColor" />
    </>
  ),
  ads: (
    <>
      <path d="M3 10v4h4l8 5V5L7 10z" />
      <path d="M19 9a4 4 0 010 6" />
    </>
  ),
  community: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.5a3.5 3.5 0 010 7M21 20c0-2.6-1.6-4.8-4-5.6" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
};

// Complemento opcional: nombre y precio a la vista; al pasar el mouse (o tocar) se amplía
// y explica exactamente qué es.
export default function AddonCard({ addon, index }: { addon: Extra; index: number }) {
  const info = addonInfo(addon);
  const magenta = index % 2 === 1;
  const price = addon.price ? formatPrice(addon.price) : null;

  return (
    <div
      tabIndex={0}
      className={`group relative h-full cursor-default overflow-hidden rounded-card p-4 outline-none ring-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(26,26,46,0.35)] focus:shadow-[0_18px_36px_-16px_rgba(26,26,46,0.35)] ${
        magenta ? "bg-magenta/[0.06] ring-magenta/20 hover:ring-magenta/50 focus:ring-magenta/50" : "bg-teal/[0.07] ring-teal/20 hover:ring-teal/50 focus:ring-teal/50"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-cream shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${
            magenta ? "bg-gradient-to-br from-magenta to-magenta-light" : "bg-gradient-to-br from-teal to-teal-dark"
          }`}
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {icons[info?.icon ?? "plus"]}
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h5 className="text-sm font-bold leading-snug text-navy">{addon.name}</h5>
            {price && (
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold text-cream ${magenta ? "bg-magenta" : "bg-teal"}`}>
                +{price.main}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-navy/65">{info?.what ?? addon.detail}</p>
          {info && (
            <>
              <ul className="max-h-0 space-y-1 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-2.5 group-hover:max-h-60 group-hover:opacity-100 group-focus:mt-2.5 group-focus:max-h-60 group-focus:opacity-100">
                {info.points.map((p) => (
                  <li key={p} className="flex gap-1.5 text-xs leading-snug text-navy/80">
                    <span aria-hidden className={`font-bold ${magenta ? "text-magenta" : "text-teal"}`}>
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <span
                aria-hidden
                className={`mt-1.5 inline-block text-[0.6875rem] font-semibold group-hover:hidden group-focus:hidden ${
                  magenta ? "text-magenta" : "text-teal"
                }`}
              >
                Ver qué incluye +
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
