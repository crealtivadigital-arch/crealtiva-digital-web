"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import type { Img, PortfolioCategory, PortfolioVideo } from "@/lib/content/types";
import { saveRubro, signUpload } from "./actions";

interface Draft {
  phrases: string[];
  photos: Img[];
  videos: PortfolioVideo[];
}

const toDraft = (c: PortfolioCategory): Draft => ({
  phrases: [0, 1, 2].map((i) => c.phrases[i] ?? ""),
  photos: c.photos,
  videos: c.videos,
});

// Miniatura liviana para el panel: Cloudinary la reduce sin recortar
const thumb = (src: string) => src.replace("/image/upload/", "/image/upload/c_limit,w_400,q_auto,f_auto/");

function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
}

export default function PortfolioEditor({ categories, canSave }: { categories: PortfolioCategory[]; canSave: boolean }) {
  const [saved, setSaved] = useState(() => Object.fromEntries(categories.map((c) => [c.slug, toDraft(c)])));
  const [active, setActive] = useState(categories[0]?.slug);
  const [draft, setDraft] = useState<Draft>(saved[active]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, startSaving] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);

  const cat = categories.find((c) => c.slug === active)!;
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved[active]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const choose = (slug: string) => {
    if (dirty && !window.confirm("Hay cambios sin guardar en este rubro. ¿Descartarlos?")) return;
    setActive(slug);
    setDraft(saved[slug]);
    setMessage(null);
  };

  const setPhotos = (photos: Img[]) => setDraft((d) => ({ ...d, photos }));
  const setVideos = (videos: PortfolioVideo[]) => setDraft((d) => ({ ...d, videos }));

  async function upload(files: FileList) {
    setMessage(null);
    const added: Img[] = [];
    try {
      const list = Array.from(files);
      for (const [i, file] of list.entries()) {
        setUploading(`Subiendo ${i + 1} de ${list.length}…`);
        const ticket = await signUpload(cat.slug);
        const body = new FormData();
        body.append("file", file);
        body.append("api_key", ticket.apiKey);
        body.append("timestamp", String(ticket.timestamp));
        body.append("folder", ticket.folder);
        body.append("signature", ticket.signature);
        const res = await fetch(ticket.url, { method: "POST", body });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error?.message ?? "Cloudinary rechazó la foto.");
        added.push({ src: data.secure_url, alt: `${cat.name} — Crealtiva Digital`, width: data.width, height: data.height });
      }
    } catch (e) {
      setMessage({ ok: false, text: e instanceof Error ? e.message : "No se pudo subir." });
    } finally {
      if (added.length) setDraft((d) => ({ ...d, photos: [...d.photos, ...added] }));
      setUploading(null);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  const save = () =>
    startSaving(async () => {
      const res = await saveRubro({ slug: cat.slug, ...draft });
      if (res.ok) {
        setSaved((s) => ({ ...s, [cat.slug]: draft }));
        setMessage({ ok: true, text: "Guardado. Ya se ve en /portafolio." });
      } else {
        setMessage({ ok: false, text: res.error });
      }
    });

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6">
      <nav className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => choose(c.slug)}
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${
              c.slug === active ? "bg-teal text-cream" : "bg-white text-navy/70 hover:text-teal"
            }`}
          >
            {c.name} <span className="opacity-60">({saved[c.slug].photos.length})</span>
          </button>
        ))}
      </nav>

      {!canSave && (
        <p className="mt-5 rounded-card bg-magenta/10 p-4 text-sm text-magenta">
          La base de datos todavía no está conectada: puedes probar, pero “Guardar” no funcionará.
        </p>
      )}

      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl">{cat.name}</h1>
            <p className="mt-1 text-sm text-navy/60">
              {draft.photos.length} fotos · el orden de aquí es el orden en el sitio. Se muestran sin recortar.
            </p>
          </div>
          <label className={`cursor-pointer rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-cream hover:bg-teal-dark ${uploading ? "pointer-events-none opacity-60" : ""}`}>
            {uploading ?? "+ Subir fotos"}
            <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files?.length && upload(e.target.files)} />
          </label>
        </div>

        {draft.photos.length === 0 ? (
          <p className="mt-6 rounded-card border border-dashed border-navy/20 p-10 text-center text-navy/50">
            Este rubro no tiene fotos: no aparece en el sitio hasta que subas al menos una.
          </p>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {draft.photos.map((p, i) => (
              <li key={p.src} className="flex flex-col rounded-card bg-white p-2 shadow-sm">
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-cream">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb(p.src)} alt={p.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
                <input
                  value={p.alt}
                  onChange={(e) => setPhotos(draft.photos.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))}
                  aria-label="Descripción de la foto"
                  placeholder="Descripción (para Google y accesibilidad)"
                  className="mt-2 w-full rounded border border-navy/10 px-2 py-1 text-xs"
                />
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <span className="mr-auto pl-1 text-xs font-semibold text-navy/40">#{i + 1}</span>
                  <button type="button" aria-label="Mover antes" disabled={i === 0} onClick={() => setPhotos(move(draft.photos, i, i - 1))} className="rounded px-2 py-1 hover:bg-cream disabled:opacity-25">←</button>
                  <button type="button" aria-label="Mover después" disabled={i === draft.photos.length - 1} onClick={() => setPhotos(move(draft.photos, i, i + 1))} className="rounded px-2 py-1 hover:bg-cream disabled:opacity-25">→</button>
                  <button type="button" aria-label="Quitar foto" onClick={() => setPhotos(draft.photos.filter((_, j) => j !== i))} className="rounded px-2 py-1 text-magenta hover:bg-magenta/10">✕</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl">Frases del mosaico</h2>
          <p className="mt-1 text-sm text-navy/60">Aparecen intercaladas entre las fotos. Deja vacía la que no quieras.</p>
          <div className="mt-4 space-y-2">
            {draft.phrases.map((f, i) => (
              <input
                key={i}
                value={f}
                maxLength={160}
                onChange={(e) => setDraft((d) => ({ ...d, phrases: d.phrases.map((x, j) => (j === i ? e.target.value : x)) }))}
                placeholder={`Frase ${i + 1}`}
                className="w-full rounded-lg border border-navy/10 bg-white px-3 py-2 text-sm"
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl">Videos de YouTube</h2>
          <p className="mt-1 text-sm text-navy/60">Pega el enlace del video. En el sitio se muestran los 3 primeros.</p>
          <div className="mt-4 space-y-2">
            {draft.videos.map((v, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={v.youtube}
                  onChange={(e) => setVideos(draft.videos.map((x, j) => (j === i ? { ...x, youtube: e.target.value } : x)))}
                  placeholder="https://youtu.be/…"
                  className="min-w-0 flex-1 rounded-lg border border-navy/10 bg-white px-3 py-2 text-sm"
                />
                <input
                  value={v.title}
                  onChange={(e) => setVideos(draft.videos.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
                  placeholder="Título"
                  className="min-w-0 flex-1 rounded-lg border border-navy/10 bg-white px-3 py-2 text-sm"
                />
                <button type="button" aria-label="Quitar video" onClick={() => setVideos(draft.videos.filter((_, j) => j !== i))} className="rounded px-2 text-magenta hover:bg-magenta/10">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => setVideos([...draft.videos, { youtube: "", title: "" }])} className="text-sm font-semibold text-teal hover:underline">
              + Agregar video
            </button>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 border-t border-navy/10 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <p className={`mr-auto text-sm ${message ? (message.ok ? "text-teal" : "text-magenta") : "text-navy/50"}`}>
            {message?.text ?? (dirty ? "Tienes cambios sin guardar." : "Sin cambios.")}
          </p>
          {dirty && (
            <button type="button" onClick={() => setDraft(saved[active])} className="rounded-full px-4 py-2 text-sm font-semibold text-navy/60 hover:text-navy">
              Descartar
            </button>
          )}
          <button
            type="button"
            disabled={!dirty || saving || !!uploading || !canSave}
            onClick={save}
            className="rounded-full bg-magenta px-6 py-2.5 text-sm font-semibold text-cream hover:bg-magenta-light disabled:opacity-40"
          >
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>
    </main>
  );
}
