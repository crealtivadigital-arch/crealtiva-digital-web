import FamilyTabs from "@/components/marketing/FamilyTabs";
import ProductSheet from "@/components/site/ProductSheet";
import { formatPrice } from "@/lib/content/format";
import { families, type FamilyId } from "@/content/marketing";
import type { Package } from "@/lib/content/types";

// Paquetes de marketing agrupados por familia, cada una con su fondo, y lo que suma
// frente a la familia anterior para que la diferencia entre planes se vea de un vistazo.
const styles: Record<FamilyId, { band: string; name: string; tagline: string; text: string; addsBox: string; check: string }> = {
  bite: {
    band: "bg-teal-light",
    name: "text-teal",
    tagline: "text-navy/50",
    text: "text-navy/65",
    addsBox: "bg-white ring-1 ring-teal/20",
    check: "text-teal",
  },
  tasty: {
    band: "bg-[#fdeef5]",
    name: "text-magenta",
    tagline: "text-navy/50",
    text: "text-navy/65",
    addsBox: "bg-white ring-1 ring-magenta/20",
    check: "text-magenta",
  },
  elemental: {
    band: "bg-navy",
    name: "text-cream",
    tagline: "text-teal",
    text: "text-cream/65",
    addsBox: "bg-white/[0.06] ring-1 ring-white/10",
    check: "text-teal",
  },
  "full-house": {
    band: "bg-gradient-to-br from-teal-dark via-navy to-magenta",
    name: "text-cream",
    tagline: "text-cream/80",
    text: "text-cream/75",
    addsBox: "bg-white/10 ring-1 ring-white/20",
    check: "text-cream",
  },
};

export default function PackageFamilies({ packages, lineName }: { packages: Package[]; lineName: string }) {
  return (
    <>
      {families.map((f) => {
        const s = styles[f.id];
        const list = f.slugs.map((slug) => packages.find((p) => p.slug === slug)).filter((p): p is Package => !!p);
        if (!list.length) return null;
        const dark = f.id === "elemental" || f.id === "full-house";
        return (
          <section key={f.id} id={`familia-${f.id}`} className={`scroll-mt-20 py-16 md:py-20 ${s.band}`}>
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-widest ${s.tagline}`}>
                    Familia · {list.length} {list.length === 1 ? "plan" : "planes"}
                  </p>
                  <h3 className={`mt-2 font-display text-4xl md:text-5xl ${s.name}`}>{f.name}</h3>
                  <p className={`mt-1 font-semibold ${dark ? "text-cream" : "text-navy"}`}>{f.tagline}</p>
                  <p className={`mt-3 max-w-md leading-relaxed ${s.text}`}>{f.description}</p>
                </div>
                {f.adds && (
                  <div className={`rounded-card p-5 ${s.addsBox}`}>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-cream/60" : "text-navy/50"}`}>
                      Sube de nivel desde {f.adds.from}: suma
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {f.adds.items.map((x) => (
                        <li key={x} className={`flex gap-2 text-sm ${dark ? "text-cream/85" : "text-navy/80"}`}>
                          <span aria-hidden className={`font-bold ${s.check}`}>
                            +
                          </span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-10">
                {list.length > 1 ? (
                  <FamilyTabs
                    accent={f.id === "tasty" ? "magenta" : "teal"}
                    tabs={list.map((p) => {
                      const pr = formatPrice(p.price);
                      return { slug: p.slug, label: p.name.replace("Crealtiva ", ""), price: [pr.main, pr.suffix].filter(Boolean).join(" ") };
                    })}
                  >
                    {list.map((p) => (
                      <ProductSheet key={p.slug} pkg={p} lineName={lineName} />
                    ))}
                  </FamilyTabs>
                ) : (
                  list.map((p) => <ProductSheet key={p.slug} pkg={p} lineName={lineName} />)
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
