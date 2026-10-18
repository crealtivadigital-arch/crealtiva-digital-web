"use client";

import { useEffect, useState } from "react";

const INTERVAL = 6000;

export type KeySlide = { kicker: string; title: string; body: string; chips?: string[]; mix?: { label: string; n: number }[] };

const icons = [
  // Estrategia: calendario
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4M8 15l2.5 2.5L16 13" />
  </>,
  // Contenido: cámara
  <>
    <rect x="3" y="7" width="13" height="10" rx="2" />
    <path d="M16 10.5 21 8v8l-5-2.5" />
  </>,
  // Gestión: gráfica
  <path d="M4 19h16M6 15l4-4 3 3 5-6M14 8h4v4" />,
];

const tiles = ["from-teal to-teal-dark", "from-magenta to-magenta-light", "from-navy to-teal-dark", "from-teal-dark to-magenta"];

// Ilustraciones de las láminas: calendario (plan mensual) y teléfono (redes sociales)
function CalendarArt() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full drop-shadow-lg" aria-hidden>
      <rect x="6" y="12" width="68" height="62" rx="12" fill="#ffffff" />
      <path d="M6 24a12 12 0 0112-12h44a12 12 0 0112 12v6H6z" fill="#EA1B7E" />
      <rect x="20" y="5" width="6" height="14" rx="3" fill="#1A1A2E" />
      <rect x="54" y="5" width="6" height="14" rx="3" fill="#1A1A2E" />
      {[0, 1, 2, 3].map((c) =>
        [0, 1, 2].map((r) => (
          <rect
            key={`${c}-${r}`}
            x={14 + c * 14}
            y={38 + r * 11}
            width="10"
            height="7"
            rx="2"
            fill={(c + r) % 3 === 0 ? "#159AA2" : (c + r) % 3 === 1 ? "#e8f7f8" : "#fbd3e6"}
          />
        )),
      )}
      <circle cx="64" cy="64" r="11" fill="#159AA2" stroke="#ffffff" strokeWidth="3" />
      <path d="M59 64l3.5 3.5L69 61" stroke="#ffffff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneArt() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full drop-shadow-lg" aria-hidden>
      <rect x="20" y="4" width="40" height="72" rx="9" fill="#ffffff" />
      <rect x="24" y="12" width="32" height="54" rx="4" fill="#e8f7f8" />
      <rect x="35" y="7" width="10" height="2.5" rx="1.25" fill="#1A1A2E" opacity="0.4" />
      <rect x="27" y="15" width="26" height="18" rx="3" fill="#159AA2" />
      <circle cx="33" cy="21" r="3" fill="#ffffff" opacity="0.8" />
      <path d="M27 31l7-6 5 4 6-5 8 7v2H27z" fill="#0d7880" />
      <rect x="27" y="36" width="20" height="3" rx="1.5" fill="#1A1A2E" opacity="0.35" />
      <rect x="27" y="42" width="26" height="12" rx="3" fill="#fbd3e6" />
      <rect x="27" y="57" width="14" height="3" rx="1.5" fill="#1A1A2E" opacity="0.25" />
      <path d="M66 22c-3-2.2-5-4-5-6a2.6 2.6 0 015-1 2.6 2.6 0 015 1c0 2-2 3.8-5 6z" fill="#EA1B7E" transform="translate(-2 0) scale(1.15)" />
      <rect x="4" y="44" width="20" height="13" rx="6.5" fill="#EA1B7E" />
      <path d="M9 56l-2 5 6-4z" fill="#EA1B7E" />
      <circle cx="10" cy="50.5" r="1.4" fill="#fff" />
      <circle cx="14" cy="50.5" r="1.4" fill="#fff" />
      <circle cx="18" cy="50.5" r="1.4" fill="#fff" />
    </svg>
  );
}

const art = [CalendarArt, null, PhoneArt];

// Las 3 claves del plan (estrategia, contenido, gestión) en un slider horizontal que avanza solo.
export default function KeySlider({ slides }: { slides: KeySlide[] }) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % slides.length), INTERVAL);
    return () => clearTimeout(t);
  }, [active, hovering, slides.length]);

  return (
    <div
      className="overflow-hidden rounded-block bg-navy text-cream shadow-[0_24px_48px_-20px_rgba(26,26,46,0.5)]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-roledescription="carrusel"
    >
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" style={{ transform: `translateX(-${active * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={s.kicker} className="w-full shrink-0 p-6" inert={i !== active} aria-roledescription="lámina" aria-label={`${i + 1} de ${slides.length}`}>
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${i % 2 ? "from-magenta to-magenta-light" : "from-teal to-teal-dark"} shadow-lg`}>
                  <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {icons[i % icons.length]}
                  </svg>
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                  {String(i + 1).padStart(2, "0")} · {s.kicker}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl leading-tight md:text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.body}</p>
              {s.mix && s.mix.length > 0 && (
                <ul className="mt-5 grid grid-cols-2 gap-2.5">
                  {s.mix.map((m, j) => (
                    <li key={m.label} className={`rounded-card bg-gradient-to-br ${tiles[j % tiles.length]} p-3 text-center ring-1 ring-white/10`}>
                      <span className="block font-display text-2xl">{m.n}</span>
                      <span className="text-xs font-semibold text-cream/85">{m.label} al mes</span>
                    </li>
                  ))}
                </ul>
              )}
              {art[i] && (
                <div className="mx-auto mt-6 h-28 w-28 -rotate-3 transition-transform duration-500 hover:rotate-3">
                  {(() => {
                    const Art = art[i]!;
                    return <Art />;
                  })()}
                </div>
              )}
              {s.chips && s.chips.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.chips.map((c) => (
                    <li key={c} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-white/10 px-6 py-4">
        {slides.map((s, i) => (
          <button
            key={s.kicker}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver ${s.kicker}`}
            aria-current={i === active}
            className={`relative h-1.5 flex-1 overflow-hidden rounded-full ${i < active ? "bg-teal" : "bg-white/15"}`}
          >
            {i === active && (
              <span
                key={`${active}-${hovering}`}
                className="absolute inset-0 origin-left bg-gradient-to-r from-teal to-magenta"
                style={{ animation: hovering ? "none" : `story-progress ${INTERVAL}ms linear forwards`, transform: hovering ? "scaleX(1)" : undefined }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
