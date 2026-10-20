"use client";
import { useEffect } from "react";
import type { Price, PriceMode } from "@/lib/content/types";

// Campos reutilizables de los editores de líneas y paquetes

const input = "w-full rounded-lg border border-navy/10 bg-white px-3 py-2 text-sm outline-none focus:border-teal";

export function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
}

export function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-card bg-white p-5 shadow-sm">
      <h2 className="font-display text-lg">{title}</h2>
      {hint && <p className="mt-0.5 text-xs text-navy/50">{hint}</p>}
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function Text({ label, value, onChange, rows, max = 600, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; max?: number; placeholder?: string }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold">{label}</span>
      {rows ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} maxLength={max} placeholder={placeholder} className={`${input} mt-1`} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} maxLength={max} placeholder={placeholder} className={`${input} mt-1`} />
      )}
    </label>
  );
}

function RowTools({ i, count, onMove, onRemove }: { i: number; count: number; onMove: (to: number) => void; onRemove: () => void }) {
  return (
    <div className="flex shrink-0 flex-col items-center text-xs">
      <button type="button" aria-label="Subir" disabled={i === 0} onClick={() => onMove(i - 1)} className="rounded px-1.5 hover:bg-cream disabled:opacity-25">↑</button>
      <button type="button" aria-label="Bajar" disabled={i === count - 1} onClick={() => onMove(i + 1)} className="rounded px-1.5 hover:bg-cream disabled:opacity-25">↓</button>
      <button type="button" aria-label="Quitar" onClick={onRemove} className="rounded px-1.5 text-magenta hover:bg-magenta/10">✕</button>
    </div>
  );
}

export function StringList({ items, onChange, addLabel = "+ Agregar", placeholder }: { items: string[]; onChange: (v: string[]) => void; addLabel?: string; placeholder?: string }) {
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-2">
          <textarea value={it} rows={1} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} placeholder={placeholder} className={`${input} [field-sizing:content]`} />
          <RowTools i={i} count={items.length} onMove={(to) => onChange(move(items, i, to))} onRemove={() => onChange(items.filter((_, j) => j !== i))} />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ""])} className="text-sm font-semibold text-teal hover:underline">
        {addLabel}
      </button>
    </div>
  );
}

// Lista de objetos con dos textos (título/detalle, pregunta/respuesta, etiqueta/valor…)
export function PairList<T extends object>({
  items,
  onChange,
  fields,
  blank,
  addLabel = "+ Agregar",
  extra,
}: {
  items: T[];
  onChange: (v: T[]) => void;
  fields: { key: keyof T & string; label: string; rows?: number }[];
  blank: T;
  addLabel?: string;
  extra?: (item: T, set: (v: T) => void) => React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const set = (v: T) => onChange(items.map((x, j) => (j === i ? v : x)));
        return (
          <div key={i} className="flex gap-2 rounded-lg border border-navy/10 p-3">
            <div className="min-w-0 flex-1 space-y-2">
              {fields.map((f) =>
                f.rows ? (
                  <textarea key={f.key} value={String((it as Record<string, unknown>)[f.key] ?? "")} rows={f.rows} placeholder={f.label} onChange={(e) => set({ ...it, [f.key]: e.target.value })} className={`${input} [field-sizing:content]`} />
                ) : (
                  <input key={f.key} value={String((it as Record<string, unknown>)[f.key] ?? "")} placeholder={f.label} onChange={(e) => set({ ...it, [f.key]: e.target.value })} className={`${input} font-semibold`} />
                )
              )}
              {extra?.(it, set)}
            </div>
            <RowTools i={i} count={items.length} onMove={(to) => onChange(move(items, i, to))} onRemove={() => onChange(items.filter((_, j) => j !== i))} />
          </div>
        );
      })}
      <button type="button" onClick={() => onChange([...items, { ...blank }])} className="text-sm font-semibold text-teal hover:underline">
        {addLabel}
      </button>
    </div>
  );
}

const MODES: { id: PriceMode; label: string }[] = [
  { id: "fijo", label: "Precio fijo" },
  { id: "desde", label: "Desde" },
  { id: "mensual", label: "Mensual" },
  { id: "por-lote", label: "Por lote" },
  { id: "cotizar", label: "A cotizar" },
];

export function PriceInput({ value, onChange, compact }: { value: Price | undefined; onChange: (v: Price | undefined) => void; compact?: boolean }) {
  const price = value ?? { amount: null, currency: "USD" as const, mode: "fijo" as PriceMode };
  return (
    <div className={`flex flex-wrap items-center gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      <select
        value={value ? price.mode : ""}
        onChange={(e) => {
          const mode = e.target.value as PriceMode | "";
          if (!mode) return onChange(undefined);
          onChange({ ...price, mode, amount: mode === "cotizar" ? null : price.amount });
        }}
        className="rounded-lg border border-navy/10 bg-white px-2 py-1.5"
        aria-label="Tipo de precio"
      >
        {compact && <option value="">Sin precio</option>}
        {MODES.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
      {value && price.mode !== "cotizar" && (
        <label className="flex items-center gap-1">
          <span className="text-navy/50">US$</span>
          <input
            type="number"
            min={0}
            step="0.01"
            value={price.amount ?? ""}
            onChange={(e) => onChange({ ...price, amount: e.target.value === "" ? null : Number(e.target.value) })}
            className="w-28 rounded-lg border border-navy/10 bg-white px-2 py-1.5"
            aria-label="Monto"
          />
        </label>
      )}
      {value && !compact && (
        <input value={price.note ?? ""} onChange={(e) => onChange({ ...price, note: e.target.value || undefined })} placeholder="Nota (ej. con tarjeta +5 %)" className="min-w-0 flex-1 rounded-lg border border-navy/10 bg-white px-2 py-1.5" />
      )}
    </div>
  );
}

export function SaveBar({ dirty, busy, message, onSave, onDiscard, canSave }: { dirty: boolean; busy: boolean; message: { ok: boolean; text: string } | null; onSave: () => void; onDiscard: () => void; canSave: boolean }) {
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-navy/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <p className={`mr-auto text-sm ${message ? (message.ok ? "text-teal" : "text-magenta") : "text-navy/50"}`}>
          {message?.text ?? (dirty ? "Tienes cambios sin guardar." : "Sin cambios.")}
        </p>
        {dirty && (
          <button type="button" onClick={onDiscard} className="rounded-full px-4 py-2 text-sm font-semibold text-navy/60 hover:text-navy">
            Descartar
          </button>
        )}
        <button type="button" disabled={!dirty || busy || !canSave} onClick={onSave} className="rounded-full bg-magenta px-6 py-2.5 text-sm font-semibold text-cream hover:bg-magenta-light disabled:opacity-40">
          {busy ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </div>
  );
}
