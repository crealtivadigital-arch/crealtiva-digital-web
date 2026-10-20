"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { STAGES, STAGE_ORDER } from "@/lib/content/format";
import type { Exclusion, Extra, Package } from "@/lib/content/types";
import { savePackage } from "../../actions";
import { PairList, PriceInput, SaveBar, Section, StringList, Text } from "../../fields";

function solutionText(e: Exclusion) {
  const s = e.solution;
  if (!s) return null;
  if (s.type === "addon") return `Complemento: ${s.name}`;
  if (s.type === "package") return `Paquete: ${s.name}`;
  return `Línea: ${s.name}`;
}

export default function PackageEditor({ pkg, lineName, lineVisible, canSave }: { pkg: Package; lineName: string; lineVisible: boolean; canSave: boolean }) {
  const router = useRouter();
  const [saved, setSaved] = useState(pkg);
  const [d, setD] = useState(pkg);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, start] = useTransition();
  const dirty = JSON.stringify(d) !== JSON.stringify(saved);

  const set = <K extends keyof Package>(key: K) => (value: Package[K]) => {
    setD((x) => ({ ...x, [key]: value }));
    setMessage(null);
  };

  const save = () =>
    start(async () => {
      const res = await savePackage(pkg.lineSlug, pkg.slug, d);
      if (!res.ok) return setMessage({ ok: false, text: res.error });
      setSaved(d);
      setMessage({ ok: true, text: "Guardado. Ya se ve en el sitio." });
      router.refresh();
    });

  return (
    <main className="mx-auto max-w-4xl space-y-5 px-4 pb-28 pt-6 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/admin/servicios" className="text-sm font-semibold text-teal hover:underline">← Servicios</Link>
        <span className="text-sm text-navy/40">/ {lineName}</span>
        {lineVisible && !saved.hidden && (
          <a href={`/servicios/${pkg.lineSlug}/${pkg.slug}`} target="_blank" className="ml-auto text-sm font-semibold text-teal hover:underline">Ver en el sitio ↗</a>
        )}
      </div>
      <h1 className="font-display text-3xl">{d.name || "Sin nombre"}</h1>
      {!canSave && <p className="rounded-card bg-magenta/10 p-4 text-sm text-magenta">La base de datos todavía no está conectada: “Guardar” no funcionará.</p>}
      <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
        Precios de venta al público solamente. Nunca escribas aquí costos internos, márgenes ni pisos de venta: todo lo de esta pantalla se publica.
      </p>

      <Section title="Lo básico">
        <Text label="Nombre" value={d.name} onChange={set("name")} max={120} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Text label="Frase corta" value={d.tagline ?? ""} onChange={(v) => set("tagline")(v || undefined)} max={200} />
          <Text label="Etiqueta (ej. Más elegido)" value={d.badge ?? ""} onChange={(v) => set("badge")(v || undefined)} max={40} />
        </div>
        <Text label="Resumen" value={d.summary} onChange={set("summary")} rows={3} max={600} />
        <Text label="Qué problema resuelve (una frase)" value={d.solves} onChange={set("solves")} rows={2} max={300} />
        <label className="block text-sm">
          <span className="font-semibold">Fase de crecimiento</span>
          <select value={d.stage} onChange={(e) => set("stage")(e.target.value as Package["stage"])} className="mt-1 w-full rounded-lg border border-navy/10 bg-white px-3 py-2 text-sm">
            {STAGE_ORDER.map((s) => (
              <option key={s} value={s}>
                {STAGES[s].label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-5 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={d.featured} onChange={(e) => set("featured")(e.target.checked)} /> Destacado
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={Boolean(d.hidden)} onChange={(e) => set("hidden")(e.target.checked || undefined)} /> Oculto (no se ve en el sitio)
          </label>
          <label className="flex items-center gap-2">
            Orden <input type="number" value={d.order} onChange={(e) => set("order")(Number(e.target.value))} className="w-20 rounded-lg border border-navy/10 px-2 py-1" />
          </label>
        </div>
      </Section>

      <Section title="Precio">
        <PriceInput value={d.price} onChange={(p) => p && set("price")(p)} />
      </Section>

      <Section title="Incluye">
        <StringList items={d.includes} onChange={set("includes")} />
      </Section>

      <Section title="No incluye" hint="La solución que se ofrece (complemento, otro paquete u otra línea) viene del catálogo y no se edita aquí.">
        <div className="space-y-2">
          {d.excludes.map((e, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1">
                <input
                  value={e.text}
                  onChange={(ev) => set("excludes")(d.excludes.map((x, j) => (j === i ? { ...x, text: ev.target.value } : x)))}
                  className="w-full rounded-lg border border-navy/10 bg-white px-3 py-2 text-sm"
                />
                {solutionText(e) && <p className="mt-0.5 text-xs text-navy/45">→ {solutionText(e)}</p>}
              </div>
              <button type="button" aria-label="Quitar" onClick={() => set("excludes")(d.excludes.filter((_, j) => j !== i))} className="rounded px-2 py-2 text-xs text-magenta hover:bg-magenta/10">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => set("excludes")([...d.excludes, { text: "" }])} className="text-sm font-semibold text-teal hover:underline">+ Agregar</button>
        </div>
      </Section>

      <Section title="Ideal para">
        <StringList items={d.idealFor} onChange={set("idealFor")} />
      </Section>

      <Section title="Detalles" hint="Capacidad, vigencia, tiempos de entrega, inversión sugerida…">
        <PairList items={d.details} onChange={set("details")} fields={[{ key: "label", label: "Dato" }, { key: "value", label: "Valor", rows: 1 }]} blank={{ label: "", value: "" }} />
      </Section>

      <Section title="Complementos opcionales" hint="Con su precio de venta al público.">
        <PairList<Extra>
          items={d.addons}
          onChange={set("addons")}
          fields={[{ key: "name", label: "Nombre" }, { key: "detail", label: "Detalle", rows: 2 }]}
          blank={{ name: "", detail: "" }}
          extra={(it, setIt) => <PriceInput compact value={it.price} onChange={(price) => setIt({ ...it, price })} />}
        />
      </Section>

      <SaveBar dirty={dirty} busy={busy} message={message} onSave={save} onDiscard={() => setD(saved)} canSave={canSave} />
    </main>
  );
}
