"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { lineHref } from "@/lib/content/links";

// Slider: la presencia digital como una ciudad. La web es la matriz y cada red una sucursal
// en un barrio distinto. La ilustración es una sola escena que se transforma en cada lámina;
// el texto se desplaza en horizontal. Avanza solo cada 5 s. El primer cambio ocurre siempre,
// para que quien llega vea cómo funciona; desde ahí, el mouse encima lo pausa.

const INTERVAL = 5000;

type IconName = "user" | "globe" | "network" | "chat" | "sparkle" | "calendar" | "megaphone" | "heart" | "rocket";

const slides: {
  kicker: string;
  title: string;
  body: string;
  icon: IconName;
  info?: { label: string; href: string };
}[] = [
  {
    kicker: "Tú y tu negocio",
    title: "Tú te encargas de tu negocio",
    body: "Tus productos o servicios, tus cuentas, tu equipo. Marketing no son solo redes: es una estrategia de posicionamiento digital, y por eso es clave que entiendas cómo funciona un crecimiento digital real. Tú sigue con tu negocio; nosotros nos encargamos de construir tu presencia.",
    icon: "user",
  },
  {
    kicker: "La matriz",
    title: "Tu web es como tu tienda principal",
    body: "Es como tu casa en la gran ciudad digital que es internet: ahí viven tu marca, tu catálogo y tu forma de atender. Pero abrir un solo local y esperar que todos lleguen es cubrir un solo punto del mapa.",
    icon: "globe",
    info: { label: "Sitios web", href: lineHref("diseno-web") },
  },
  {
    kicker: "Las sucursales",
    title: "Las redes son como sucursales en distintos centros comerciales",
    body: "Facebook, Instagram, TikTok, LinkedIn, Google Business, YouTube… e incluso aliados, plataformas de reservas y otras webs. Cada una es como una sucursal que abre tu marca a un público diferente, con vitrinas pensadas para él.",
    icon: "network",
    info: { label: "Gestión de redes", href: lineHref("marketing-digital") },
  },
  {
    kicker: "Cada barrio, su idioma",
    title: "Cada sucursal le habla a su público",
    body: "Instagram es como el centro comercial: un público más comercial. LinkedIn, como la zona de oficinas y empresas. TikTok, como el barrio artístico de alto flujo. Cada canal se comunica de forma única con la comunidad que va construyendo.",
    icon: "chat",
    info: { label: "Contenido UGC", href: lineHref("video-ugc") },
  },
  {
    kicker: "Calidad",
    title: "La calidad hace que tu marca se perciba por lo que vale",
    body: "El diseño, la foto y el video deben representar la calidad real de tu negocio en cada vitrina. No sirve una matriz hermosa y una sucursal descuidada: el público juzga tu marca por lo que ve.",
    icon: "sparkle",
    info: { label: "Producción multimedia", href: lineHref("produccion-multimedia") },
  },
  {
    kicker: "Constancia",
    title: "Como una tienda sin atención: acumula polvo",
    body: "No hay fórmula mágica. Si abres todas las sucursales en un mes y luego no publicas ni gestionas nada, solo acumulan polvo: el público pierde el interés y el foco de quién eres. Crecer es un trabajo continuo.",
    icon: "calendar",
    info: { label: "Marketing mensual", href: lineHref("marketing-digital") },
  },
  {
    kicker: "Pauta digital",
    title: "La publicidad es como la gran apertura",
    body: "Google Ads, Meta Ads y TikTok Ads activan e impulsan cada sucursal: atraen gente en la apertura, con ofertas especiales y acciones de valor, hasta que la tienda se establece.",
    icon: "megaphone",
    info: { label: "Pauta digital", href: lineHref("trafficker-digital") },
  },
  {
    kicker: "Contenido e interacción",
    title: "La conversación construye confianza",
    body: "Cuando tu público comenta, comparte, responde y deja reseñas, y se suman colaboraciones e influencers que cuentan su experiencia, tu marca gana credibilidad, confianza y renombre.",
    icon: "heart",
    info: { label: "Modelos e influencers", href: lineHref("modelos-e-influencers") },
  },
  {
    kicker: "Resultado",
    title: "La ciudad digital te reconoce",
    body: "Toda esta construcción le dice a internet que tu tienda es seria e importante y que todos deberían conocerla. Así se forma una red amplia que hace despegar tu marca.",
    icon: "rocket",
  },
];

export default function DigitalCityStory() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // La pausa por mouse/foco solo aplica después del primer cambio de lámina.
  const paused = hovering && advanced;

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % slides.length);
      setAdvanced(true);
    }, INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, reduced]);

  const go = (i: number) => {
    setActive((i + slides.length) % slides.length);
    setAdvanced(true);
  };

  return (
    <div
      className="overflow-hidden rounded-[2.5rem] bg-white/[0.04] ring-1 ring-white/10 lg:grid lg:grid-cols-2"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      aria-roledescription="carrusel"
    >
      {/* Ilustración */}
      <div className="relative m-3 min-w-0 rounded-[2rem] bg-white p-4 md:p-6">
        <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-magenta/10 px-3 py-1 text-[11px] font-semibold text-magenta">
          <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Ejemplo visual · una metáfora
        </span>
        <CityScene step={active} />
      </div>

      {/* Texto */}
      <div className="flex min-w-0 flex-col p-6 pt-4 md:p-10 lg:pl-6">
        <p className="font-display text-sm text-cream/40">
          <span className="text-magenta">{String(active + 1).padStart(2, "0")}</span> / {String(slides.length).padStart(2, "0")}
        </p>

        <div className="mt-6 overflow-hidden" aria-live={paused ? "polite" : "off"}>
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div
                key={s.kicker}
                className="w-full shrink-0 pr-2"
                inert={i !== active}
                aria-roledescription="lámina"
                aria-label={`${i + 1} de ${slides.length}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-cream ${
                      i % 2 ? "bg-magenta" : "bg-teal"
                    }`}
                  >
                    <Icon name={s.icon} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-teal">{s.kicker}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl leading-tight text-cream md:text-[2rem]">{s.title}</h3>
                <p className="mt-4 text-base font-light leading-relaxed text-cream/70 md:text-lg">{s.body}</p>
                {s.info && (
                  <Link
                    href={s.info.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-teal/40 px-4 py-1.5 text-sm font-semibold text-teal transition-colors hover:border-teal hover:bg-teal hover:text-cream"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 11v6M12 7.5v.5" strokeLinecap="round" />
                    </svg>
                    {s.info.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Controles */}
        <div className="mt-auto pt-8">
          <div className="h-0.5 overflow-hidden rounded-full bg-white/10">
            <div
              key={`${active}-${paused}`}
              className="h-full origin-left bg-gradient-to-r from-teal to-magenta"
              style={{
                animation: reduced ? "none" : `story-progress ${INTERVAL}ms linear forwards`,
                animationPlayState: paused ? "paused" : "running",
                transform: reduced ? "scaleX(0)" : undefined,
              }}
            />
          </div>
          <div className="mt-5 flex items-center gap-4">
            <ArrowButton dir="prev" onClick={() => go(active - 1)} />
            <ArrowButton dir="next" onClick={() => go(active + 1)} />
            <div className="ml-auto flex flex-wrap justify-end gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.kicker}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir a la lámina ${i + 1}: ${s.kicker}`}
                  aria-current={i === active}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === active ? "w-6 bg-magenta" : "w-2 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Lámina anterior" : "Lámina siguiente"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-cream transition-colors hover:border-teal hover:bg-teal"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
      </>
    ),
    network: (
      <>
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="5" r="2" />
        <circle cx="20" cy="5" r="2" />
        <circle cx="4" cy="19" r="2" />
        <circle cx="20" cy="19" r="2" />
        <path d="M6 6.5l3.8 3.5M18 6.5l-3.8 3.5M6 17.5l3.8-3.5M18 17.5l-3.8-3.5" />
      </>
    ),
    chat: (
      <>
        <path d="M4 5h16v10H9l-5 4z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
    sparkle: <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4M8 15l2.5 2.5L16 13" />
      </>
    ),
    megaphone: (
      <>
        <path d="M3 10v4h4l8 5V5L7 10z" />
        <path d="M19 9a4 4 0 010 6" />
      </>
    ),
    heart: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
    rocket: (
      <>
        <path d="M12 3c3 2 5 5.5 5 10l-2 3H9l-2-3c0-4.5 2-8 5-10z" />
        <circle cx="12" cy="10" r="1.8" />
        <path d="M9 19l-1 2M15 19l1 2M12 19v3" />
      </>
    ),
  };
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

/* ---------------------------------------------------------------- Ilustración */

// Escenas (índice de lámina): 0 tu negocio · 1 matriz · 2 sucursales · 3 barrios · 4 calidad
// 5 polvo · 6 pauta · 7 interacción · 8 despegue
const S = { owner: 0, hq: 1, branches: 2, districts: 3, quality: 4, dust: 5, ads: 6, talk: 7, lift: 8 };

const TEAL = "#159AA2";
const MAGENTA = "#EA1B7E";
const NAVY = "#1A1A2E";

type Branch = { id: string; name: string; x: number; y: number; district?: string };

// Sucursales en anillo alrededor de la matriz (centro 200,210; radio 140)
const branches: Branch[] = [
  { id: "ig", name: "Instagram", x: 200, y: 70, district: "Centro comercial" },
  { id: "fb", name: "Facebook", x: 321, y: 140 },
  { id: "in", name: "LinkedIn", x: 321, y: 280, district: "Zona de oficinas" },
  { id: "g", name: "Google Business", x: 200, y: 350 },
  { id: "yt", name: "YouTube", x: 79, y: 280 },
  { id: "tt", name: "TikTok", x: 79, y: 140, district: "Barrio artístico" },
];

const partners = [
  { x: 40, y: 44 },
  { x: 362, y: 44 },
  { x: 365, y: 395 },
];

const ease = "all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)";

function CityScene({ step }: { step: number }) {
  const lift = step === S.lift;
  const talk = step >= S.talk;
  return (
    <svg
      viewBox="0 0 400 430"
      className="mx-auto h-auto w-full max-w-[480px]"
      role="img"
      aria-label="Ejemplo visual: tu presencia digital como una ciudad"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.18" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Mapa de la ciudad: cuadrícula tenue */}
      <g opacity="0.5">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="0" x2="400" y1={i * 50 + 15} y2={i * 50 + 15} stroke={NAVY} strokeOpacity="0.05" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} y1="0" y2="430" x1={i * 50} x2={i * 50} stroke={NAVY} strokeOpacity="0.05" />
        ))}
      </g>

      {/* Reflectores de la pauta */}
      <g style={{ transition: ease, opacity: step === S.ads ? 1 : 0 }}>
        <path d="M60 430 L170 170 L230 190 Z" fill={MAGENTA} opacity="0.1" />
        <path d="M340 430 L230 170 L170 190 Z" fill={TEAL} opacity="0.12" />
      </g>

      <g
        style={{
          transition: ease,
          transform: lift ? "translateY(-14px) scale(1.03)" : "none",
          transformOrigin: "200px 210px",
        }}
      >
        <circle cx="200" cy="210" r="175" fill="url(#glow)" style={{ transition: ease, opacity: step >= S.hq ? 1 : 0 }} />

        {/* Aliados y otras webs */}
        <g style={{ transition: ease, opacity: step >= S.branches ? 1 : 0 }}>
          {partners.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="7" fill="white" stroke={TEAL} strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx={p.x} cy={p.y} r="2.5" fill={TEAL} />
            </g>
          ))}
          <text x="40" y="66" textAnchor="middle" fontSize="9" fill={NAVY} fillOpacity="0.5">
            Aliados
          </text>
          <text x="362" y="66" textAnchor="middle" fontSize="9" fill={NAVY} fillOpacity="0.5">
            Otras webs
          </text>
        </g>

        {/* Conexiones matriz → sucursales */}
        {branches.map((b) => (
          <line
            key={`l-${b.id}`}
            x1="200"
            y1="210"
            x2={b.x}
            y2={b.y}
            stroke={step >= S.quality ? TEAL : NAVY}
            strokeOpacity={step >= S.branches ? (step === S.dust && b.id === "yt" ? 0.08 : 0.35) : 0}
            strokeWidth="1.5"
            strokeDasharray={step >= S.quality ? "0" : "4 5"}
            style={{ transition: ease }}
          />
        ))}

        {/* Gente llegando con la pauta */}
        {step === S.ads &&
          branches.map((b, i) => (
            <circle key={`p-${b.id}`} r="3.5" fill={i % 2 ? TEAL : MAGENTA}>
              <animateMotion
                dur={`${1.8 + i * 0.25}s`}
                repeatCount="indefinite"
                path={`M${200 + (b.x - 200) * 1.9} ${210 + (b.y - 210) * 1.9} L${b.x} ${b.y + 4}`}
              />
            </circle>
          ))}

        {/* Sucursales */}
        {branches.map((b, i) => (
          <BranchStore key={b.id} b={b} index={i} step={step} />
        ))}

        {/* Matriz: local solitario → tienda principal */}
        <Headquarters step={step} />

        {/* Tú y tu negocio */}
        <Owner visible={step === S.owner} />

        {/* Interacción: comentarios, corazones y reseñas */}
        <g style={{ transition: ease, opacity: talk ? 1 : 0 }}>
          <Bubble x={236} y={30} text="¡Me encantó!" color={MAGENTA} />
          <Bubble x={286} y={318} text="Recomendado" color={TEAL} />
          <Bubble x={14} y={190} text="Compartido" color={MAGENTA} />
          <Bubble x={250} y={200} text="¿Precio?" color={TEAL} />
          {[
            [128, 92],
            [350, 112],
            [118, 312],
          ].map(([x, y], i) => (
            <path
              key={i}
              d={`M${x} ${y + 6} c-6 -4 -9 -7 -9 -10 a4.5 4.5 0 0 1 9 -1.5 a4.5 4.5 0 0 1 9 1.5 c0 3 -3 6 -9 10z`}
              fill={MAGENTA}
            />
          ))}
        </g>

        {/* Reconocimiento: estrellas y reseñas */}
        <g style={{ transition: ease, opacity: lift ? 1 : 0 }}>
          <text x="200" y="414" textAnchor="middle" fontSize="13" fill="#F5B400" letterSpacing="2">
            ★★★★★
          </text>
          {[
            [150, 40],
            [290, 236],
            [150, 380],
            [372, 200],
          ].map(([x, y], i) => (
            <path
              key={i}
              d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z`}
              fill={i % 2 ? TEAL : MAGENTA}
            />
          ))}
        </g>
      </g>

      {/* Flecha de despegue */}
      <g style={{ transition: ease, opacity: lift ? 1 : 0, transform: lift ? "none" : "translateY(20px)" }}>
        <path d="M200 30 L200 4 M190 14 L200 4 L210 14" stroke={MAGENTA} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Owner({ visible }: { visible: boolean }) {
  const items = [
    { x: 292, y: 150, label: "Productos" },
    { x: 108, y: 150, label: "Cuentas" },
    { x: 292, y: 290, label: "Clientes" },
    { x: 108, y: 290, label: "Equipo" },
  ];
  return (
    <g style={{ transition: ease, opacity: visible ? 1 : 0 }}>
      {/* Persona junto a su local */}
      <circle cx="250" cy="200" r="8" fill={MAGENTA} />
      <path d="M236 238 c0 -14 6 -24 14 -24 s14 10 14 24 z" fill={MAGENTA} />
      {items.map((it, i) => (
        <g key={it.label}>
          <line x1="200" y1="214" x2={it.x} y2={it.y} stroke={NAVY} strokeOpacity="0.15" strokeDasharray="3 4" />
          <circle cx={it.x} cy={it.y} r="20" fill="white" stroke={i % 2 ? MAGENTA : TEAL} strokeWidth="1.5" />
          <circle cx={it.x} cy={it.y} r="6" fill={i % 2 ? MAGENTA : TEAL} fillOpacity="0.85" />
          <text x={it.x} y={it.y + 34} textAnchor="middle" fontSize="10" fontWeight="600" fill={NAVY} fillOpacity="0.7">
            {it.label}
          </text>
        </g>
      ))}
    </g>
  );
}

function Headquarters({ step }: { step: number }) {
  const big = step >= S.hq;
  return (
    <g>
      {/* Local solitario: tu negocio */}
      <g style={{ transition: ease, opacity: big ? 0 : 1 }}>
        <rect x="178" y="196" width="44" height="34" rx="5" fill="white" stroke={NAVY} strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M174 198 L200 180 L226 198 Z" fill={NAVY} fillOpacity="0.15" stroke={NAVY} strokeOpacity="0.5" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="194" y="212" width="12" height="18" rx="2" fill={NAVY} fillOpacity="0.2" />
        <text x="200" y="248" textAnchor="middle" fontSize="10" fontWeight="600" fill={NAVY} fillOpacity="0.7">
          Tu negocio
        </text>
      </g>

      {/* Matriz */}
      <g
        style={{
          transition: ease,
          opacity: big ? 1 : 0,
          transform: big ? "scale(1)" : "scale(0.4)",
          transformOrigin: "200px 215px",
        }}
      >
        <rect x="158" y="168" width="84" height="84" rx="12" fill={NAVY} />
        <path d="M152 176 L200 146 L248 176 Z" fill={TEAL} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={170 + i * 22} y="186" width="16" height="14" rx="3" fill={TEAL} fillOpacity={0.35 + i * 0.2} />
        ))}
        <rect x="188" y="222" width="24" height="30" rx="4" fill={MAGENTA} />
        <text x="200" y="214" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" letterSpacing="1">
          WEB
        </text>
        <text x="200" y="270" textAnchor="middle" fontSize="10" fontWeight="600" fill={NAVY} fillOpacity="0.7">
          Tu matriz
        </text>
      </g>
    </g>
  );
}

function BranchStore({ b, index, step }: { b: Branch; index: number; step: number }) {
  const visible = step >= S.branches;
  const highlighted = step === S.districts && !!b.district;
  const dimmed = step === S.districts && !b.district;
  const branded = step >= S.quality || highlighted;
  const dusty = step === S.dust && b.id === "yt";
  const accent = index % 2 ? MAGENTA : TEAL;

  return (
    <g
      style={{
        transition: ease,
        transitionDelay: visible ? `${index * 80}ms` : "0ms",
        opacity: !visible ? 0 : dimmed ? 0.35 : dusty ? 0.55 : 1,
        transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.6)",
        transformOrigin: `${b.x}px ${b.y}px`,
      }}
    >
      {highlighted && <circle cx={b.x} cy={b.y} r="38" fill={accent} fillOpacity="0.12" />}
      <rect
        x={b.x - 24}
        y={b.y - 14}
        width="48"
        height="32"
        rx="6"
        fill="white"
        stroke={dusty ? "#9a9aa6" : branded ? accent : NAVY}
        strokeOpacity={branded || dusty ? 1 : 0.4}
        strokeWidth="1.5"
        style={{ transition: ease }}
      />
      {/* Toldo */}
      <path
        d={`M${b.x - 27} ${b.y - 12} L${b.x + 27} ${b.y - 12} L${b.x + 23} ${b.y - 22} L${b.x - 23} ${b.y - 22} Z`}
        fill={dusty ? "#b8b8c2" : branded ? accent : NAVY}
        fillOpacity={branded || dusty ? 1 : 0.15}
        style={{ transition: ease }}
      />
      <rect x={b.x - 6} y={b.y + 2} width="12" height="16" rx="2" fill={dusty ? "#c9c9d1" : NAVY} fillOpacity={branded ? 0.85 : 0.2} />
      <text x={b.x} y={b.y + 33} textAnchor="middle" fontSize="10" fontWeight="600" fill={NAVY} fillOpacity="0.75">
        {b.name}
      </text>
      {b.district && (
        <text
          x={b.x}
          y={b.y + 45}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill={accent}
          style={{ transition: ease, opacity: highlighted ? 1 : 0 }}
        >
          {b.district}
        </text>
      )}
      {/* Polvo y telaraña */}
      <g style={{ transition: ease, opacity: dusty ? 1 : 0 }}>
        <path
          d={`M${b.x + 24} ${b.y - 14} q-10 4 -12 14 M${b.x + 24} ${b.y - 14} q-4 8 -14 8 M${b.x + 24} ${b.y - 14} l-14 14`}
          stroke="#9a9aa6"
          strokeWidth="0.8"
          fill="none"
        />
        {[
          [-30, -28],
          [-14, -32],
          [6, -30],
          [30, -24],
          [-34, 6],
        ].map(([dx, dy], i) => (
          <circle key={i} cx={b.x + dx} cy={b.y + dy} r={1.5 + (i % 2)} fill="#b8b8c2" />
        ))}
      </g>
    </g>
  );
}

function Bubble({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  const w = text.length * 5.6 + 16;
  return (
    <g>
      <rect x={x} y={y} width={w} height="20" rx="10" fill={color} />
      <path d={`M${x + 12} ${y + 19} l-4 7 l10 -7 Z`} fill={color} />
      <text x={x + w / 2} y={y + 14} textAnchor="middle" fontSize="10" fontWeight="600" fill="white">
        {text}
      </text>
    </g>
  );
}
