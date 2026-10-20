import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { beforeGa4, COMPARISONS, CONTACT_EVENTS, loadStats, PERIODS, resolvePeriod, startsBeforeGa4, type Stats } from "@/lib/estadisticas";
import { googleEnv, missingGoogleEnv, type Ga4Row } from "@/lib/google";
import AdminHeader from "../AdminHeader";
import { Bars, Card, CHANNELS, CONTACT_NAMES, DayChart, Delta, duration, Empty, Failed, Help, Kpi, nf, pct, PLACES, Table, usd } from "./bloques";

export const metadata: Metadata = { title: "Estadísticas" };

const TABS = [
  { id: "resumen", label: "Resumen" },
  { id: "canales", label: "De dónde llegan" },
  { id: "paginas", label: "Páginas" },
  { id: "contacto", label: "Contactos" },
  { id: "google", label: "Búsquedas en Google" },
  { id: "anuncios", label: "Anuncios" },
] as const;
type Tab = (typeof TABS)[number]["id"];

type Params = { periodo?: string; desde?: string; hasta?: string; comparar?: string; pestana?: string };

const sum = (rows: Ga4Row[], i = 0) => rows.reduce((a, r) => a + r.values[i], 0);
const gaDate = (d: string) => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
const shortPath = (url: string) => {
  try {
    const u = new URL(url);
    return ["crealtivadigital.com", "www.crealtivadigital.com"].includes(u.hostname) && u.protocol === "https:" ? u.pathname : url;
  } catch {
    return url;
  }
};

export default async function EstadisticasPage({ searchParams }: { searchParams: Promise<Params> }) {
  const email = await requireAdmin();
  const params = await searchParams;
  const tab: Tab = TABS.some((t) => t.id === params.pestana) ? (params.pestana as Tab) : "resumen";
  const period = resolvePeriod(params);
  const missing = missingGoogleEnv();

  const link = (change: Partial<Params>) => {
    const next = { ...params, ...change };
    if (change.periodo) delete next.desde, delete next.hasta;
    const q = new URLSearchParams(Object.entries(next).filter(([, v]) => v) as [string, string][]);
    return `/admin/estadisticas?${q}`;
  };

  return (
    <>
      <AdminHeader email={email} title="Estadísticas" />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          {PERIODS.map((p) => (
            <Link key={p.id} href={link({ periodo: p.id })} className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${period.id === p.id ? "bg-navy text-cream" : "bg-white text-navy/70 hover:text-teal"}`}>
              {p.label}
            </Link>
          ))}
          <form action="/admin/estadisticas" className="flex flex-wrap items-center gap-1.5 text-[13px]">
            <input type="hidden" name="pestana" value={tab} />
            <input type="hidden" name="comparar" value={period.compareId} />
            <input type="date" name="desde" defaultValue={period.range.from} className="rounded-full border border-navy/10 bg-white px-3 py-1" aria-label="Desde" />
            <input type="date" name="hasta" defaultValue={period.range.to} className="rounded-full border border-navy/10 bg-white px-3 py-1" aria-label="Hasta" />
            <button className="rounded-full bg-white px-3 py-1.5 font-semibold text-teal">Ver</button>
          </form>
        </div>
        <p className="mt-3 text-sm text-navy/55">
          {period.range.from} → {period.range.to} · comparado con {period.compare.from} → {period.compare.to} ·{" "}
          {COMPARISONS.map((c) => (
            <Link key={c.id} href={link({ comparar: c.id })} className={`mr-2 ${period.compareId === c.id ? "font-semibold text-navy" : "text-teal hover:underline"}`}>
              {c.label}
            </Link>
          ))}
        </p>

        <nav className="mt-5 flex gap-1 overflow-x-auto border-b border-navy/10 [scrollbar-width:none]">
          {TABS.map((t) => (
            <Link key={t.id} href={link({ pestana: t.id })} className={`shrink-0 border-b-2 px-3 py-2 text-sm font-semibold ${tab === t.id ? "border-magenta text-navy" : "border-transparent text-navy/50 hover:text-navy"}`}>
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          {missing.length > 0 ? <Setup missing={missing} /> : <Content tab={tab} stats={await loadStats(period)} period={period} />}
        </div>
      </main>
    </>
  );
}

function Setup({ missing }: { missing: string[] }) {
  return (
    <Card title="Falta conectar Google" intro="Sin estas variables no se muestran cifras (no se inventa un informe).">
      <ul className="list-inside list-disc text-sm">
        {missing.map((m) => (
          <li key={m}>
            <code>{m}</code>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-navy/55">Se cargan en Vercel → Settings → Environment Variables y luego hay que volver a desplegar.</p>
    </Card>
  );
}

function Content({ tab, stats: s, period }: { tab: Tab; stats: Stats; period: ReturnType<typeof resolvePeriod> }) {
  const noPrev = beforeGa4(period.compare);
  const warn = startsBeforeGa4(period.range) && (
    <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
      Google Analytics empezó a medir el {googleEnv.ga4Start}: antes de esa fecha no hay datos de visitas (Search Console sí tiene historial).
    </p>
  );
  return (
    <div className="space-y-6">
      {warn}
      {tab === "resumen" && <Resumen s={s} noPrev={noPrev} />}
      {tab === "canales" && <Canales s={s} />}
      {tab === "paginas" && <Paginas s={s} />}
      {tab === "contacto" && <Contacto s={s} noPrev={noPrev} />}
      {tab === "google" && <Google s={s} />}
      {tab === "anuncios" && <Anuncios s={s} />}
    </div>
  );
}

function contactCount(r: Stats["contacts"]) {
  return r.ok ? sum(r.data.filter((x) => CONTACT_EVENTS.includes(x.dims[0]))) : 0;
}

function Resumen({ s, noPrev }: { s: Stats; noPrev: boolean }) {
  const t = s.totals.ok ? s.totals.data[0]?.values ?? [0, 0, 0, 0, 0] : null;
  const p = !noPrev && s.totalsPrev.ok ? s.totalsPrev.data[0]?.values ?? [0, 0, 0, 0, 0] : null;
  const contacts = contactCount(s.contacts);
  const contactsPrev = !noPrev && s.contactsPrev.ok ? contactCount(s.contactsPrev) : null;
  const g = s.gscTotals.ok ? s.gscTotals.data[0] : null;
  const gp = s.gscTotalsPrev.ok ? s.gscTotalsPrev.data[0] ?? null : null;

  return (
    <>
      {!s.totals.ok ? (
        <Failed error={s.totals.error} />
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Kpi label="Personas" value={nf.format(t![0])} delta={<Delta now={t![0]} before={p?.[0] ?? null} />} hint={`${nf.format(t![1])} nuevas`} />
          <Kpi label="Visitas" value={nf.format(t![2])} delta={<Delta now={t![2]} before={p?.[2] ?? null} />} />
          <Kpi label="Páginas vistas" value={nf.format(t![3])} delta={<Delta now={t![3]} before={p?.[3] ?? null} />} hint={t![2] ? `${(t![3] / t![2]).toFixed(1).replace(".", ",")} por visita` : undefined} />
          <Kpi label="Contactos" value={nf.format(contacts)} delta={<Delta now={contacts} before={contactsPrev} />} hint="WhatsApp, correo y teléfono" />
        </div>
      )}

      <Card title="Personas por día">
        {s.daily.ok ? s.daily.data.length ? <DayChart points={s.daily.data.map((r) => ({ date: gaDate(r.dims[0]), value: r.values[0] }))} /> : <Empty /> : <Failed error={s.daily.error} />}
      </Card>

      <Card title="Google (búsqueda orgánica)" intro="Search Console va con 2–3 días de retraso.">
        {!s.gscTotals.ok ? (
          <Failed error={s.gscTotals.error} />
        ) : !g ? (
          <Empty />
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Kpi label="Clics" value={nf.format(g.clicks)} delta={<Delta now={g.clicks} before={gp?.clicks ?? null} />} />
            <Kpi label="Impresiones" value={nf.format(g.impressions)} delta={<Delta now={g.impressions} before={gp?.impressions ?? null} />} />
            <Kpi label="CTR" value={pct(g.ctr)} />
            <Kpi label="Posición media" value={g.position.toFixed(1).replace(".", ",")} delta={<Delta now={Math.round(g.position)} before={gp ? Math.round(gp.position) : null} inverse />} />
          </div>
        )}
      </Card>
    </>
  );
}

function Canales({ s }: { s: Stats }) {
  if (!s.channels.ok) return <Failed error={s.channels.error} />;
  const wa = new Map(s.channelContacts.ok ? s.channelContacts.data.map((r) => [r.dims[0], r.values[0]]) : []);
  const rows = [...s.channels.data].sort((a, b) => b.values[0] - a.values[0]);
  const free = rows.filter((r) => !CHANNELS[r.dims[0]]?.paid);
  const paid = rows.filter((r) => CHANNELS[r.dims[0]]?.paid);
  const total = (list: Ga4Row[]) => ({ visits: sum(list), wa: list.reduce((a, r) => a + (wa.get(r.dims[0]) ?? 0), 0) });
  const f = total(free);
  const pd = total(paid);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Kpi label="Gratis" value={`${nf.format(f.visits)} visitas`} hint={`${nf.format(f.wa)} WhatsApp`} />
        <Kpi label="Pagado" value={`${nf.format(pd.visits)} visitas`} hint={`${nf.format(pd.wa)} WhatsApp`} />
      </div>
      <Card title="Canales" intro="Verde = gratis · violeta = pagado.">
        {rows.length ? (
          <Bars
            rows={rows.map((r) => {
              const c = CHANNELS[r.dims[0]];
              const w = wa.get(r.dims[0]) ?? 0;
              return {
                label: c?.name ?? r.dims[0],
                value: r.values[0],
                display: `${nf.format(r.values[0])} visitas · ${nf.format(w)} WhatsApp`,
                color: c?.paid ? "#7c5cd6" : "#137333",
                note: c?.text,
              };
            })}
          />
        ) : (
          <Empty />
        )}
        {!s.channelContacts.ok && <div className="mt-3"><Failed error={s.channelContacts.error} /></div>}
      </Card>
      <Card title="Fuente exacta" intro="Quién manda la visita (origen / medio).">
        {s.sources.ok ? s.sources.data.length ? <Bars rows={s.sources.data.map((r) => ({ label: r.dims[0], value: r.values[0] }))} /> : <Empty /> : <Failed error={s.sources.error} />}
      </Card>
    </>
  );
}

function Paginas({ s }: { s: Stats }) {
  if (!s.pages.ok) return <Failed error={s.pages.error} />;
  const ev = new Map<string, number>();
  if (s.pageEvents.ok) for (const r of s.pageEvents.data) ev.set(`${r.dims[0]}|${r.dims[1]}`, r.values[0]);
  const read = (path: string, views: number, step: number) => (views ? `${Math.min(100, Math.round(((ev.get(`${path}|lectura_${step}`) ?? 0) / views) * 100))} %` : "—");

  return (
    <Card title="Páginas más vistas" intro="Permanencia = tiempo activo por vista. «Leída hasta 50 / 100 %» = parte de las vistas que bajó hasta ahí.">
      {s.pages.data.length ? (
        <Table
          head={["Página", "Vistas", "Personas", "Permanencia", "Leída 50 %", "Leída 100 %", "WhatsApp"]}
          align={["l", "r", "r", "r", "r", "r", "r"]}
          rows={s.pages.data.map((r) => {
            const [views, users, engaged] = r.values;
            return [
              <a key="p" href={r.dims[0]} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">{r.dims[0]}</a>,
              nf.format(views),
              nf.format(users),
              views ? duration(engaged / views) : "—",
              read(r.dims[0], views, 50),
              read(r.dims[0], views, 100),
              nf.format(ev.get(`${r.dims[0]}|whatsapp_click`) ?? 0),
            ];
          })}
        />
      ) : (
        <Empty />
      )}
      {!s.pageEvents.ok && <div className="mt-3"><Failed error={s.pageEvents.error} /></div>}
    </Card>
  );
}

function Contacto({ s, noPrev }: { s: Stats; noPrev: boolean }) {
  const now = new Map(s.contacts.ok ? s.contacts.data.map((r) => [r.dims[0], r.values[0]]) : []);
  const prev = new Map(!noPrev && s.contactsPrev.ok ? s.contactsPrev.data.map((r) => [r.dims[0], r.values[0]]) : []);
  const sec = s.seconds.ok ? s.seconds.data[0]?.values : null;
  const custom = "Necesita la definición personalizada en GA4 (Administrar → Definiciones personalizadas).";

  return (
    <>
      {!s.contacts.ok ? (
        <Failed error={s.contacts.error} />
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CONTACT_EVENTS.map((e) => (
            <Kpi key={e} label={CONTACT_NAMES[e]} value={nf.format(now.get(e) ?? 0)} delta={<Delta now={now.get(e) ?? 0} before={noPrev || !s.contactsPrev.ok ? null : prev.get(e) ?? 0} />} />
          ))}
          <Kpi label="Tiempo hasta WhatsApp" value={sec && sec[1] ? duration(sec[0] / sec[1]) : "—"} hint="Desde que entra al sitio" />
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="WhatsApp por servicio" intro="Desde qué página o servicio escriben.">
          {s.byService.ok ? s.byService.data.length ? <Bars rows={s.byService.data.map((r) => ({ label: r.dims[0], value: r.values[0] }))} /> : <Empty /> : <Failed error={`${s.byService.error}. ${custom}`} />}
        </Card>
        <Card title="WhatsApp por ubicación" intro="En qué parte de la página estaba el botón.">
          {s.byPlace.ok ? s.byPlace.data.length ? <Bars rows={s.byPlace.data.map((r) => ({ label: PLACES[r.dims[0]] ?? r.dims[0], value: r.values[0] }))} /> : <Empty /> : <Failed error={`${s.byPlace.error}. ${custom}`} />}
        </Card>
      </div>
      <Card title="Preguntas frecuentes más abiertas" intro="Lo que la gente quiere saber antes de escribir.">
        {s.faqs.ok ? (
          s.faqs.data.length ? (
            <Table head={["Pregunta", "Página", "Veces"]} align={["l", "l", "r"]} rows={s.faqs.data.map((r) => [r.dims[0], r.dims[1], nf.format(r.values[0])])} />
          ) : (
            <Empty />
          )
        ) : (
          <Failed error={`${s.faqs.error}. ${custom}`} />
        )}
      </Card>
      <Help q="¿Por qué los WhatsApp de aquí no cuadran con los chats que llegan?">
        Aquí se cuenta el clic en el botón. Algunas personas pulsan y no escriben, y otras escriben guardando el número sin pasar por la web.
      </Help>
    </>
  );
}

function Google({ s }: { s: Stats }) {
  const daily = s.gscDaily.ok ? [...s.gscDaily.data].sort((a, b) => a.keys[0].localeCompare(b.keys[0])) : [];
  // Google recorta por clics; se reordena por impresiones para ver lo que aparece y aún no recibe clics
  const queries = s.gscQueries.ok ? [...s.gscQueries.data].sort((a, b) => b.impressions - a.impressions) : [];
  const ladder = (p: number) => (p <= 3 ? "1–3" : p <= 10 ? "4–10" : "Página 2+");

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Clics por día">{s.gscDaily.ok ? daily.length ? <DayChart points={daily.map((r) => ({ date: r.keys[0], value: r.clicks }))} color="#1a73e8" /> : <Empty /> : <Failed error={s.gscDaily.error} />}</Card>
        <Card title="Impresiones por día">{s.gscDaily.ok ? daily.length ? <DayChart points={daily.map((r) => ({ date: r.keys[0], value: r.impressions }))} color="#137333" /> : <Empty /> : <Failed error={s.gscDaily.error} />}</Card>
      </div>
      <Card title="Búsquedas" intro="Ordenadas por impresiones. «Se ve y no se pincha» = muchas impresiones y CTR bajo: oportunidad de mejorar título y descripción.">
        {s.gscQueries.ok ? (
          queries.length ? (
            <Table
              head={["Búsqueda", "Clics", "Impresiones", "CTR", "Posición", ""]}
              align={["l", "r", "r", "r", "r", "l"]}
              rows={queries.slice(0, 100).map((q) => [
                q.keys[0],
                nf.format(q.clicks),
                nf.format(q.impressions),
                pct(q.ctr),
                `${q.position.toFixed(1).replace(".", ",")} (${ladder(q.position)})`,
                q.impressions >= 50 && q.ctr < 0.01 ? <span key="o" className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">Se ve y no se pincha</span> : null,
              ])}
            />
          ) : (
            <Empty />
          )
        ) : (
          <Failed error={s.gscQueries.error} />
        )}
      </Card>
      <Card title="Páginas en Google">
        {s.gscPages.ok ? (
          s.gscPages.data.length ? (
            <Table head={["Página", "Clics", "Impresiones", "CTR", "Posición"]} align={["l", "r", "r", "r", "r"]} rows={s.gscPages.data.map((p) => [shortPath(p.keys[0]), nf.format(p.clicks), nf.format(p.impressions), pct(p.ctr), p.position.toFixed(1).replace(".", ",")])} />
          ) : (
            <Empty />
          )
        ) : (
          <Failed error={s.gscPages.error} />
        )}
      </Card>
    </>
  );
}

function Anuncios({ s }: { s: Stats }) {
  if (!s.adsKeywords.ok) return <Failed error={s.adsKeywords.error} />;
  const rows = s.adsKeywords.data.filter((r) => !(r.dims[0] === "(not set)" && r.dims[1] === "(not set)"));
  const byKeyword = new Map<string, { sessions: number; queries: string[] }>();
  for (const r of rows) {
    const k = byKeyword.get(r.dims[0]) ?? { sessions: 0, queries: [] };
    k.sessions += r.values[0];
    if (r.dims[1] !== "(not set)" && k.queries.length < 3) k.queries.push(r.dims[1]);
    byKeyword.set(r.dims[0], k);
  }
  const wa = new Map(s.adsKeywordContacts.ok ? s.adsKeywordContacts.data.map((r) => [r.dims[0], r.values[0]]) : []);
  const cost = new Map(s.adsCost.ok ? s.adsCost.data.map((r) => [r.dims[0], { clicks: r.values[0], cost: r.values[1] }]) : []);
  const list = [...byKeyword.entries()].sort((a, b) => b[1].sessions - a[1].sessions);

  return (
    <>
      <Card title="Palabras clave de Google Ads" intro="Llegan por la vinculación GA4 ↔ Google Ads.">
        {list.length ? (
          <Table
            head={s.adsCost.ok ? ["Palabra clave", "Lo que buscaron", "Clics en anuncio", "Coste", "Visitas", "WhatsApp"] : ["Palabra clave", "Lo que buscaron", "Visitas", "WhatsApp"]}
            align={s.adsCost.ok ? ["l", "l", "r", "r", "r", "r"] : ["l", "l", "r", "r"]}
            rows={list.map(([k, v]) => {
              const c = cost.get(k);
              const base = [k, <span key="q" className="text-xs text-navy/55">{v.queries.join(" · ") || "—"}</span>];
              const tail = [nf.format(v.sessions), nf.format(wa.get(k) ?? 0)];
              return s.adsCost.ok ? [...base, c ? nf.format(c.clicks) : "—", c ? usd(c.cost) : "—", ...tail] : [...base, ...tail];
            })}
          />
        ) : (
          <Empty>Sin visitas desde anuncios en este periodo (o falta vincular GA4 con Google Ads).</Empty>
        )}
        {!s.adsCost.ok && <p className="mt-3 text-xs text-navy/45">El coste no está disponible: {s.adsCost.error}</p>}
      </Card>
      <Help q="¿Por qué los clics de Ads no cuadran con las visitas?">
        Un clic en el anuncio no siempre termina en visita medida: hay quien cierra antes de que cargue la página o tiene bloqueadores. Una diferencia del 10–25 % es normal.
      </Help>
      <Help q="¿Por qué las conversiones de Google Ads no cuadran con los WhatsApp de aquí?">
        Google Ads atribuye la conversión al día del clic en el anuncio y puede contar conversiones de varios días después; aquí se cuentan por el día del contacto.
      </Help>
    </>
  );
}
