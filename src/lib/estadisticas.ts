import "server-only";
import { ga4, googleEnv, gsc, type Ga4Row, type GscRow, type Range } from "./google";

// Periodos y consultas de /admin/estadisticas. Todo en hora de Ecuador: el servidor corre en UTC
// y sin esto "este mes" el día 1 enseña el mes siguiente vacío durante horas.

const ZONE = "America/Guayaquil";
export const CONTACT_EVENTS = ["whatsapp_click", "email_click", "phone_click"];
const READ_EVENTS = ["lectura_25", "lectura_50", "lectura_75", "lectura_100"];

const iso = (d: Date) => d.toISOString().slice(0, 10);
const parse = (s: string) => new Date(`${s}T00:00:00Z`);
const addDays = (s: string, n: number) => iso(new Date(parse(s).getTime() + n * 86400_000));
const days = (r: Range) => Math.round((parse(r.to).getTime() - parse(r.from).getTime()) / 86400_000) + 1;
const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: ZONE }).format(new Date());
// Un año atrás sin inventar fechas (29 de febrero → 28)
const yearBack = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return iso(new Date(Date.UTC(y - 1, m - 1, Math.min(d, new Date(Date.UTC(y - 1, m, 0)).getUTCDate()))));
};
const monthEnd = (ym: string) => iso(new Date(Date.UTC(Number(ym.slice(0, 4)), Number(ym.slice(5, 7)), 0)));

export const PERIODS = [
  { id: "mes", label: "Este mes" },
  { id: "mes-pasado", label: "Mes pasado" },
  { id: "7", label: "7 días" },
  { id: "28", label: "28 días" },
  { id: "90", label: "90 días" },
  { id: "ano", label: "Este año" },
] as const;

export const COMPARISONS = [
  { id: "anterior", label: "Periodo anterior" },
  { id: "ano-anterior", label: "Mismo periodo del año pasado" },
] as const;

export interface Period {
  id: string;
  label: string;
  range: Range;
  compare: Range;
  compareId: string;
}

export function resolvePeriod(params: { periodo?: string; desde?: string; hasta?: string; comparar?: string }): Period {
  const t = today();
  const isDate = (s?: string) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
  let id = params.periodo ?? "mes";
  let range: Range;

  if (isDate(params.desde) && isDate(params.hasta) && params.desde! <= params.hasta!) {
    id = "fechas";
    range = { from: params.desde!, to: params.hasta! > t ? t : params.hasta! };
  } else if (/^\d{4}-\d{2}$/.test(id)) {
    const end = monthEnd(id);
    range = { from: `${id}-01`, to: end > t ? t : end };
  } else if (id === "mes-pasado") {
    const first = addDays(`${t.slice(0, 7)}-01`, -1).slice(0, 7);
    range = { from: `${first}-01`, to: monthEnd(first) };
  } else if (["7", "28", "90"].includes(id)) {
    range = { from: addDays(t, -Number(id) + 1), to: t };
  } else if (id === "ano") {
    range = { from: `${t.slice(0, 4)}-01-01`, to: t };
  } else {
    id = "mes";
    range = { from: `${t.slice(0, 7)}-01`, to: t };
  }

  const compareId = params.comparar === "ano-anterior" ? "ano-anterior" : "anterior";
  const compare =
    compareId === "ano-anterior"
      ? { from: yearBack(range.from), to: yearBack(range.to) }
      : { from: addDays(range.from, -days(range)), to: addDays(range.from, -1) }; // mismos días, justo antes

  const label = PERIODS.find((p) => p.id === id)?.label ?? `${range.from} → ${range.to}`;
  return { id, label, range, compare, compareId };
}

// GA4 no tiene datos antes de la instalación: esos tramos se muestran como "—", nunca como 0
export const beforeGa4 = (r: Range) => !!googleEnv.ga4Start && r.to < googleEnv.ga4Start;
export const startsBeforeGa4 = (r: Range) => !!googleEnv.ga4Start && r.from < googleEnv.ga4Start;

export type Result<T> = { ok: true; data: T } | { ok: false; error: string };

async function settle<T>(p: Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, data: await p };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Error desconocido" };
  }
}

const TOTAL_METRICS = ["activeUsers", "newUsers", "sessions", "screenPageViews", "userEngagementDuration"];

// Todas las consultas a la vez: si una fuente falla, el resto se sigue viendo
export async function loadStats(p: Period) {
  const { range: r, compare: c } = p;
  const contactFilter = { field: "eventName", values: CONTACT_EVENTS };
  const wa = { field: "eventName", values: ["whatsapp_click"] };

  const [
    totals, totalsPrev, daily, channels, channelContacts, sources, contacts, contactsPrev,
    pages, pageEvents, byService, byPlace, seconds, faqs,
    adsKeywords, adsKeywordContacts, adsCost,
    gscTotals, gscTotalsPrev, gscDaily, gscQueries, gscPages,
  ] = await Promise.all([
    settle(ga4(r, { metrics: TOTAL_METRICS })),
    settle(ga4(c, { metrics: TOTAL_METRICS })),
    settle(ga4(r, { dimensions: ["date"], metrics: ["activeUsers"], orderBy: { dimension: "date" }, limit: 400 })),
    settle(ga4(r, { dimensions: ["sessionDefaultChannelGroup"], metrics: ["sessions", "activeUsers"], limit: 20 })),
    // Separada: si el filtro de eventos va con las visitas, también las recorta
    settle(ga4(r, { dimensions: ["sessionDefaultChannelGroup"], metrics: ["eventCount"], filter: wa, limit: 20 })),
    settle(ga4(r, { dimensions: ["sessionSourceMedium"], metrics: ["sessions"], orderBy: { metric: "sessions" }, limit: 15 })),
    settle(ga4(r, { dimensions: ["eventName"], metrics: ["eventCount"], filter: contactFilter })),
    settle(ga4(c, { dimensions: ["eventName"], metrics: ["eventCount"], filter: contactFilter })),
    settle(ga4(r, { dimensions: ["pagePath"], metrics: ["screenPageViews", "activeUsers", "userEngagementDuration"], orderBy: { metric: "screenPageViews" }, limit: 100 })),
    settle(ga4(r, { dimensions: ["pagePath", "eventName"], metrics: ["eventCount"], filter: { field: "eventName", values: [...READ_EVENTS, "whatsapp_click"] }, limit: 2000 })),
    // Estas cuatro necesitan las definiciones personalizadas en GA4 (servicio, ubicacion, segundos, pregunta)
    settle(ga4(r, { dimensions: ["customEvent:servicio"], metrics: ["eventCount"], filter: wa, orderBy: { metric: "eventCount" }, limit: 30 })),
    settle(ga4(r, { dimensions: ["customEvent:ubicacion"], metrics: ["eventCount"], filter: wa, orderBy: { metric: "eventCount" }, limit: 30 })),
    settle(ga4(r, { metrics: ["customEvent:segundos", "eventCount"], filter: wa })),
    settle(ga4(r, { dimensions: ["customEvent:pregunta", "pagePath"], metrics: ["eventCount"], filter: { field: "eventName", values: ["faq_abierta"] }, orderBy: { metric: "eventCount" }, limit: 50 })),
    // Anuncios: llegan por la vinculación GA4 ↔ Google Ads
    settle(ga4(r, { dimensions: ["sessionGoogleAdsKeyword", "sessionGoogleAdsQuery"], metrics: ["sessions"], orderBy: { metric: "sessions" }, limit: 1000 })),
    settle(ga4(r, { dimensions: ["sessionGoogleAdsKeyword"], metrics: ["eventCount"], filter: wa, limit: 1000 })),
    // Puede fallar sola: GA4 solo cruza el coste con algunas dimensiones
    settle(ga4(r, { dimensions: ["sessionGoogleAdsKeyword"], metrics: ["advertiserAdClicks", "advertiserAdCost"], limit: 1000 })),
    settle(gsc(r)),
    settle(gsc(c)),
    settle(gsc(r, ["date"], 500)),
    settle(gsc(r, ["query"], 250)),
    settle(gsc(r, ["page"], 100)),
  ]);

  return {
    totals, totalsPrev, daily, channels, channelContacts, sources, contacts, contactsPrev,
    pages, pageEvents, byService, byPlace, seconds, faqs,
    adsKeywords, adsKeywordContacts, adsCost,
    gscTotals, gscTotalsPrev, gscDaily, gscQueries, gscPages,
  };
}

export type Stats = Awaited<ReturnType<typeof loadStats>>;
export type { Ga4Row, GscRow };
