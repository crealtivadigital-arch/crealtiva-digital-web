"use client";

import { Children, useEffect, useState } from "react";

const INTERVAL = 15000;

// Pestañas para las familias con varios planes (Bite, Tasty): muestra uno a la vez y pasa
// al siguiente cada 15 s (pausa con el mouse encima). Los enlaces "#plan" abren su pestaña.
export default function FamilyTabs({
  tabs,
  accent,
  children,
}: {
  tabs: { slug: string; label: string; price: string }[];
  accent: "teal" | "magenta";
  children: React.ReactNode;
}) {
  const panels = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % tabs.length), INTERVAL);
    return () => clearTimeout(t);
  }, [active, hovering, tabs.length]);

  // Enlaces a un plan de esta familia (quiz, comparador, ruta): abrir su pestaña y llevar la vista ahí
  useEffect(() => {
    const open = (slug: string) => {
      const i = tabs.findIndex((t) => t.slug === slug);
      if (i === -1) return false;
      setActive(i);
      requestAnimationFrame(() => document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" }));
      return true;
    };
    open(location.hash.slice(1));
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (a && open(a.getAttribute("href")!.slice(1))) {
        e.preventDefault();
        history.replaceState(null, "", a.getAttribute("href"));
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [tabs]);

  const on = accent === "teal" ? "bg-teal text-cream" : "bg-magenta text-cream";

  return (
    <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <div role="tablist" aria-label="Planes de esta familia" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t, i) => (
          <button
            key={t.slug}
            type="button"
            role="tab"
            id={`tab-${t.slug}`}
            aria-selected={i === active}
            aria-controls={`panel-${t.slug}`}
            onClick={() => setActive(i)}
            className={`relative shrink-0 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              i === active ? `${on} shadow-lg` : "bg-white text-navy/70 ring-1 ring-navy/10 hover:text-navy"
            }`}
          >
            {t.label} <span className={i === active ? "text-cream/80" : "text-navy/40"}>· {t.price}</span>
            {i === active && !hovering && (
              <span
                key={active}
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-white/70"
                style={{ animation: `story-progress ${INTERVAL}ms linear forwards` }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {panels.map((panel, i) => (
          <div
            key={tabs[i].slug}
            role="tabpanel"
            id={`panel-${tabs[i].slug}`}
            aria-labelledby={`tab-${tabs[i].slug}`}
            hidden={i !== active}
            className="animate-[quiz-in_0.35s_ease-out]"
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
