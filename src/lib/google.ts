import "server-only";
import { createSign } from "node:crypto";

// Lectura de GA4 y Search Console con una cuenta de servicio de solo lectura.
// Sin librerías de Google: un JWT RS256 y dos endpoints HTTP.

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPES = "https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly";

export const googleEnv = {
  email: process.env.GOOGLE_CUENTA_EMAIL,
  key: process.env.GOOGLE_CUENTA_CLAVE?.replace(/\\n/g, "\n"),
  property: process.env.GA4_PROPIEDAD?.replace(/^properties\//, ""),
  site: process.env.GSC_SITIO,
  ga4Start: process.env.GA4_INICIO, // AAAA-MM-DD: GA4 no tiene datos anteriores
};

export function missingGoogleEnv(): string[] {
  const names: [string, unknown][] = [
    ["GOOGLE_CUENTA_EMAIL", googleEnv.email],
    ["GOOGLE_CUENTA_CLAVE", googleEnv.key],
    ["GA4_PROPIEDAD", googleEnv.property],
    ["GSC_SITIO", googleEnv.site],
  ];
  return names.filter(([, v]) => !v).map(([n]) => n);
}

const b64url = (b: Buffer) => b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function requestToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const body = b64url(Buffer.from(JSON.stringify({ iss: googleEnv.email, scope: SCOPES, aud: TOKEN_URL, iat: now, exp: now + 3600 })));
  const sig = b64url(createSign("RSA-SHA256").update(`${head}.${body}`).end().sign(googleEnv.key!));
  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${body}.${sig}` }),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`Google no dio el permiso (${r.status}). Revisa la clave de la cuenta de servicio y que las APIs estén activas.`);
  return (await r.json()).access_token;
}

// Se guarda también la promesa en vuelo: la pantalla lanza ~25 consultas a la vez y solo una debe pedir el token
let cached: { token: string; expires: number } | null = null;
let inFlight: Promise<string> | null = null;

function token(): Promise<string> {
  if (cached && Date.now() < cached.expires - 60_000) return Promise.resolve(cached.token);
  inFlight ??= requestToken()
    .then((t) => {
      cached = { token: t, expires: Date.now() + 3600_000 };
      return t;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

async function post<T>(url: string, body: unknown, source: string): Promise<T> {
  const r = await fetch(url, {
    method: "POST",
    headers: { authorization: `Bearer ${await token()}`, "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (r.ok) return r.json();
  if (r.status === 403) throw new Error(`La cuenta de servicio no tiene acceso en ${source}. Agrega su correo como usuario.`);
  const detail = await r.json().catch(() => null);
  throw new Error(`${source} respondió ${r.status}${detail?.error?.message ? `: ${detail.error.message}` : ""}`);
}

// ---------- GA4 ----------

export interface Range {
  from: string; // AAAA-MM-DD
  to: string;
}

export interface Ga4Request {
  dimensions?: string[];
  metrics: string[];
  filter?: { field: string; values: string[] };
  orderBy?: { metric?: string; dimension?: string; desc?: boolean };
  limit?: number;
}

export interface Ga4Row {
  dims: string[];
  values: number[];
}

export async function ga4(range: Range, q: Ga4Request): Promise<Ga4Row[]> {
  const body: Record<string, unknown> = {
    dateRanges: [{ startDate: range.from, endDate: range.to }],
    dimensions: q.dimensions?.map((name) => ({ name })),
    metrics: q.metrics.map((name) => ({ name })),
    limit: q.limit ?? 100,
  };
  if (q.filter) {
    body.dimensionFilter = {
      filter:
        q.filter.values.length === 1
          ? { fieldName: q.filter.field, stringFilter: { matchType: "EXACT", value: q.filter.values[0] } }
          : { fieldName: q.filter.field, inListFilter: { values: q.filter.values } },
    };
  }
  if (q.orderBy) {
    body.orderBys = [
      q.orderBy.metric
        ? { metric: { metricName: q.orderBy.metric }, desc: q.orderBy.desc ?? true }
        : { dimension: { dimensionName: q.orderBy.dimension }, desc: q.orderBy.desc ?? false },
    ];
  }
  type Res = { rows?: { dimensionValues?: { value: string }[]; metricValues: { value: string }[] }[]; totals?: Res["rows"] };
  const res = await post<Res>(`https://analyticsdata.googleapis.com/v1beta/properties/${googleEnv.property}:runReport`, body, "Google Analytics");
  const rows = res.rows?.length || q.dimensions?.length ? res.rows ?? [] : res.totals ?? [];
  return rows.map((r) => ({ dims: r.dimensionValues?.map((d) => d.value) ?? [], values: r.metricValues.map((m) => Number(m.value)) }));
}

// ---------- Search Console ----------

export interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export async function gsc(range: Range, dimensions: string[] = [], rowLimit = 100): Promise<GscRow[]> {
  const res = await post<{ rows?: GscRow[] }>(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(googleEnv.site!)}/searchAnalytics/query`,
    { startDate: range.from, endDate: range.to, dimensions, rowLimit, type: "web" },
    "Search Console"
  );
  return (res.rows ?? []).map((r) => ({ ...r, keys: r.keys ?? [] }));
}
