"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Extra, ServiceLine } from "@/lib/content/types";
import { thumb, uploadImage } from "../../uploadImage";
import { saveLine } from "../actions";
import { PairList, PriceInput, SaveBar, Section, StringList, Text } from "../fields";

export default function LineEditor({ line, canSave }: { line: ServiceLine; canSave: boolean }) {
  const router = useRouter();
  const [saved, setSaved] = useState(line);
  const [d, setD] = useState(line);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [busy, start] = useTransition();
  const dirty = JSON.stringify(d) !== JSON.stringify(saved);

  const set = <K extends keyof ServiceLine>(key: K) => (value: ServiceLine[K]) => {
    setD((x) => ({ ...x, [key]: value }));
    setMessage(null);
  };

  async function onCover(file: File) {
    setUploading(true);
    try {
      set("cover")(await uploadImage(file, "servicios", d.slug, d.cover?.alt || d.name));
    } catch (e) {
      setMessage({ ok: false, text: e instanceof Error ? e.message : "No se pudo subir." });
    } finally {
      setUploading(false);
    }
  }

  const save = () =>
    start(async () => {
      const res = await saveLine(line.slug, d);
      if (!res.ok) return setMessage({ ok: false, text: res.error });
      setSaved(d);
      setMessage({ ok: true, text: "Guardado. Ya se ve en el sitio." });
      router.refresh();
    });

  return (
    <main className="mx-auto max-w-4xl space-y-5 px-4 pb-28 pt-6 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/admin/servicios" className="text-sm font-semibold text-teal hover:underline">← Servicios</Link>
        {saved.visible && (
          <a href={`/servicios/${line.slug}`} target="_blank" className="ml-auto text-sm font-semibold text-teal hover:underline">Ver en el sitio ↗</a>
        )}
      </div>
      <h1 className="font-display text-3xl">{d.name || "Sin nombre"}</h1>
      {!canSave && <p className="rounded-card bg-magenta/10 p-4 text-sm text-magenta">La base de datos todavía no está conectada: “Guardar” no funcionará.</p>}

      <Section title="Lo básico">
        <Text label="Nombre" value={d.name} onChange={set("name")} max={120} />
        <Text label="Frase corta" value={d.tagline} onChange={set("tagline")} max={200} />
        <Text label="Resumen (tarjetas y Google)" value={d.summary} onChange={set("summary")} rows={2} max={400} />
        <Text label="Introducción de la página" value={d.intro} onChange={set("intro")} rows={4} max={2000} />
        <div className="flex flex-wrap gap-5 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={d.visible} onChange={(e) => set("visible")(e.target.checked)} /> Visible en el sitio
          </label>
          <label className="flex items-center gap-2">
            Orden <input type="number" value={d.order} onChange={(e) => set("order")(Number(e.target.value))} className="w-20 rounded-lg border border-navy/10 px-2 py-1" />
          </label>
        </div>
      </Section>

      <Section title="Foto de portada" hint="Se muestra en su proporción original, sin recortes.">
        {d.cover && (
          <div className="flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(d.cover.src, 400)} alt={d.cover.alt} className="max-h-48 rounded-lg bg-cream object-contain" />
            <div className="flex-1">
              <Text label="Descripción de la foto" value={d.cover.alt} onChange={(alt) => set("cover")({ ...d.cover!, alt })} max={200} />
            </div>
          </div>
        )}
        <label className={`inline-block cursor-pointer rounded-full bg-teal px-4 py-2 text-sm font-semibold text-cream hover:bg-teal-dark ${uploading ? "pointer-events-none opacity-60" : ""}`}>
          {uploading ? "Subiendo…" : d.cover ? "Cambiar foto" : "Subir foto"}
          <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && onCover(e.target.files[0])} />
        </label>
      </Section>

      <Section title="Lo clave" hint="3–4 frases cortas.">
        <StringList items={d.keyPoints} onChange={set("keyPoints")} />
      </Section>

      <Section title="Cifras destacadas" hint="Ej.: «4K» / «Calidad de grabación».">
        <PairList items={d.highlights} onChange={set("highlights")} fields={[{ key: "value", label: "Cifra" }, { key: "label", label: "Qué significa" }]} blank={{ label: "", value: "" }} />
      </Section>

      <Section title="Siempre incluido" hint="Lo que trae todo paquete de esta línea.">
        <PairList items={d.alwaysIncluded} onChange={set("alwaysIncluded")} fields={[{ key: "title", label: "Título" }, { key: "detail", label: "Detalle", rows: 2 }]} blank={{ title: "", detail: "" }} />
      </Section>

      <Section title="Proceso">
        <PairList items={d.process} onChange={set("process")} fields={[{ key: "title", label: "Paso" }, { key: "detail", label: "Detalle", rows: 2 }]} blank={{ title: "", detail: "" }} />
      </Section>

      <Section title="Complementos / proyectos especiales">
        {d.extras ? (
          <>
            <Text label="Título del bloque" value={d.extras.title} onChange={(title) => set("extras")({ ...d.extras!, title })} />
            <PairList<Extra>
              items={d.extras.items}
              onChange={(items) => set("extras")({ ...d.extras!, items })}
              fields={[{ key: "name", label: "Nombre" }, { key: "detail", label: "Detalle", rows: 2 }]}
              blank={{ name: "", detail: "" }}
              extra={(it, setIt) => <PriceInput compact value={it.price} onChange={(price) => setIt({ ...it, price })} />}
            />
            <button type="button" onClick={() => set("extras")(null)} className="text-xs font-semibold text-magenta hover:underline">Quitar bloque</button>
          </>
        ) : (
          <button type="button" onClick={() => set("extras")({ title: "Complementos", items: [] })} className="text-sm font-semibold text-teal hover:underline">+ Agregar bloque</button>
        )}
      </Section>

      <Section title="Condiciones">
        <PairList items={d.conditions} onChange={set("conditions")} fields={[{ key: "title", label: "Condición" }, { key: "detail", label: "Detalle", rows: 2 }]} blank={{ title: "", detail: "" }} />
      </Section>

      <Section title="Preguntas frecuentes">
        <PairList items={d.faqs} onChange={set("faqs")} fields={[{ key: "q", label: "Pregunta" }, { key: "a", label: "Respuesta", rows: 3 }]} blank={{ q: "", a: "" }} />
      </Section>

      <SaveBar dirty={dirty} busy={busy || uploading} message={message} onSave={save} onDiscard={() => setD(saved)} canSave={canSave} />
    </main>
  );
}
