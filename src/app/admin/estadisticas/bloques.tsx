// Piezas de presentación de /admin/estadisticas. Sin JavaScript: barras con div de ancho en %.

export const nf = new Intl.NumberFormat("es-EC");
export const pct = (v: number, digits = 1) => `${(v * 100).toFixed(digits).replace(".", ",")} %`;
export const usd = (v: number) => new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" }).format(v);

export function duration(seconds: number) {
  if (!Number.isFinite(seconds)) return "—";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m ? `${m} min ${s} s` : `${s} s`;
}

// Canales de GA4 en palabras del cliente; gratis (verde) o pagado (violeta)
export const CHANNELS: Record<string, { name: string; text: string; paid: boolean }> = {
  "Organic Search": { name: "Google y buscadores", text: "Te encontraron buscando, sin anuncio.", paid: false },
  Direct: { name: "Directo", text: "Escribieron la dirección o venían de un enlace guardado.", paid: false },
  "Organic Social": { name: "Redes sociales", text: "Llegaron desde publicaciones de Instagram, Facebook, TikTok…", paid: false },
  Referral: { name: "Otros sitios", text: "Un enlace en otra página web.", paid: false },
  "Paid Search": { name: "Anuncios de Google", text: "Hicieron clic en un anuncio de búsqueda.", paid: true },
  "Paid Social": { name: "Anuncios en redes", text: "Hicieron clic en un anuncio de Meta, TikTok…", paid: true },
  "Cross-network": { name: "Campañas automáticas de Google", text: "Performance Max y similares.", paid: true },
  Display: { name: "Banners de Google", text: "Anuncios gráficos en otros sitios.", paid: true },
  "Paid Video": { name: "Anuncios en video", text: "YouTube y similares.", paid: true },
  "Paid Other": { name: "Otra publicidad", text: "Tráfico pagado sin clasificar.", paid: true },
  Email: { name: "Correo", text: "Desde un enlace en un correo.", paid: false },
  "Organic Video": { name: "Videos", text: "Desde YouTube u otra plataforma, sin anuncio.", paid: false },
  Unassigned: { name: "Sin clasificar", text: "GA4 no pudo saber de dónde vinieron.", paid: false },
};

export const PLACES: Record<string, string> = { menu: "Menú", pie: "Pie de página", pagina: "Cuerpo de la página" };
export const CONTACT_NAMES: Record<string, string> = { whatsapp_click: "WhatsApp", email_click: "Correo", phone_click: "Teléfono" };

// Variación honesta: con números chicos, la diferencia en crudo y no un porcentaje engañoso
export function Delta({ now, before, inverse = false }: { now: number; before: number | null; inverse?: boolean }) {
  if (before === null) return null;
  const diff = now - before;
  if (diff === 0) return <span className="text-xs text-navy/40">= igual</span>;
  const good = inverse ? diff < 0 : diff > 0;
  const text = before < 20 ? `${nf.format(Math.abs(diff))} ${diff > 0 ? "más" : "menos"}` : `${Math.abs((diff / before) * 100).toFixed(0)} %`;
  return (
    <span className={`text-xs font-semibold ${good ? "text-[#137333]" : "text-magenta"}`}>
      {diff > 0 ? "▲" : "▼"} {text}
    </span>
  );
}

export function Kpi({ label, value, delta, hint }: { label: string; value: string; delta?: React.ReactNode; hint?: string }) {
  return (
    <div className="rounded-card bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-navy/50">{label}</p>
      <p className="mt-1 font-display text-3xl">{value}</p>
      <div className="mt-1 min-h-4">{delta}</div>
      {hint && <p className="mt-1 text-xs text-navy/40">{hint}</p>}
    </div>
  );
}

export function Card({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-card bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-display text-xl">{title}</h2>
      {intro && <p className="mt-1 text-sm text-navy/55">{intro}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Failed({ error }: { error: string }) {
  return <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">No se pudo cargar este bloque: {error}</p>;
}

export function Empty({ children = "Todavía no hay datos en este periodo." }: { children?: React.ReactNode }) {
  return <p className="text-sm text-navy/40">{children}</p>;
}

export function Bars({ rows }: { rows: { label: React.ReactNode; value: number; display?: string; color?: string; note?: string }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-2.5">
      {rows.map((r, i) => (
        <li key={i}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate">{r.label}</span>
            <span className="shrink-0 font-semibold tabular-nums">{r.display ?? nf.format(r.value)}</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-cream">
            <div className="h-2 rounded-full" style={{ width: `${(r.value / max) * 100}%`, background: r.color ?? "#159AA2" }} />
          </div>
          {r.note && <p className="mt-0.5 text-xs text-navy/40">{r.note}</p>}
        </li>
      ))}
    </ul>
  );
}

// Columnas por día; cada barra con su cifra al pasar el mouse (title)
export function DayChart({ points, color = "#159AA2" }: { points: { date: string; value: number }[]; color?: string }) {
  const max = Math.max(1, ...points.map((p) => p.value));
  return (
    <div>
      <div className="flex h-40 items-end gap-[2px]">
        {points.map((p) => (
          <div
            key={p.date}
            title={`${p.date}: ${nf.format(p.value)}`}
            className="flex-1 rounded-t-sm"
            style={{ height: `${Math.max(2, (p.value / max) * 100)}%`, background: color }}
          />
        ))}
      </div>
      {points.length > 0 && (
        <div className="mt-1 flex justify-between text-[11px] text-navy/40">
          <span>{points[0].date}</span>
          <span>{points[points.length - 1].date}</span>
        </div>
      )}
    </div>
  );
}

export function Table({ head, rows, align }: { head: string[]; rows: React.ReactNode[][]; align?: ("l" | "r")[] }) {
  return (
    <div className="-mx-5 overflow-x-auto sm:mx-0">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="border-b border-navy/10 text-left text-xs uppercase tracking-wider text-navy/45">
            {head.map((h, i) => (
              <th key={h} className={`px-5 py-2 font-semibold sm:px-2 ${align?.[i] === "r" ? "text-right" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-navy/5 last:border-0">
              {r.map((c, j) => (
                <td key={j} className={`px-5 py-2 sm:px-2 ${align?.[j] === "r" ? "text-right tabular-nums" : ""}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Help({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="rounded-lg bg-cream px-4 py-3 text-sm">
      <summary className="cursor-pointer font-semibold">{q}</summary>
      <div className="mt-2 text-navy/65">{children}</div>
    </details>
  );
}
