"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Presentation, Slide } from "@/lib/presentations";
import { move, SaveBar } from "../../../servicios/fields";
import SlideBody from "../../SlideBody";
import { deletePresentation, savePresentation } from "../../actions";

const blank: Slide = { title: "", body: "" };

export default function PresentationEditor({ presentation, canSave }: { presentation: Presentation | null; canSave: boolean }) {
  const router = useRouter();
  const initial = { title: presentation?.title ?? "", description: presentation?.description ?? "", slides: presentation?.slides ?? [{ ...blank }] };
  const [saved, setSaved] = useState(initial);
  const [d, setD] = useState(initial);
  const [current, setCurrent] = useState(0);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, start] = useTransition();
  const dirty = JSON.stringify(d) !== JSON.stringify(saved);
  const slide = d.slides[current];

  const setSlide = (patch: Partial<Slide>) => {
    setD((x) => ({ ...x, slides: x.slides.map((s, j) => (j === current ? { ...s, ...patch } : s)) }));
    setMessage(null);
  };
  const setSlides = (slides: Slide[], focus: number) => {
    setD((x) => ({ ...x, slides }));
    setCurrent(Math.max(0, Math.min(focus, slides.length - 1)));
  };

  const save = () =>
    start(async () => {
      const res = await savePresentation({ originalSlug: presentation?.slug ?? null, ...d });
      if (!res.ok) return setMessage({ ok: false, text: res.error });
      setSaved(d);
      setMessage({ ok: true, text: "Guardado." });
      if (!presentation) router.replace(`/admin/presentaciones/${res.slug}/editar`);
    });

  const remove = () => {
    if (!presentation || !window.confirm(`¿Borrar «${presentation.title}»? No se puede deshacer.`)) return;
    start(async () => {
      const res = await deletePresentation(presentation.slug);
      if (!res.ok) return setMessage({ ok: false, text: res.error });
      setSaved(d);
      router.replace("/admin/presentaciones");
    });
  };

  const input = "w-full rounded-lg border border-navy/10 bg-white px-3 py-2 text-sm outline-none focus:border-teal";

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link href="/admin/presentaciones" className="font-semibold text-teal hover:underline">← Presentaciones</Link>
        {presentation && !dirty && (
          <Link href={`/admin/presentaciones/${presentation.slug}`} className="ml-auto font-semibold text-teal hover:underline">Presentar →</Link>
        )}
      </div>
      {!canSave && <p className="mt-4 rounded-card bg-magenta/10 p-4 text-sm text-magenta">La base de datos todavía no está conectada.</p>}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} placeholder="Título de la presentación" className={`${input} font-display text-xl`} />
        <input value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} placeholder="Para qué sirve (una frase)" className={input} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[220px_1fr]">
        <ol className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {d.slides.map((s, j) => (
            <li key={j} className="shrink-0">
              <button type="button" onClick={() => setCurrent(j)} className={`w-44 rounded-lg p-2 text-left text-xs lg:w-full ${j === current ? "bg-navy text-cream" : "bg-white text-navy/70"}`}>
                <span className="font-semibold tabular-nums opacity-60">{j + 1}</span> <span className="line-clamp-2">{s.title || "Sin título"}</span>
              </button>
            </li>
          ))}
          <li className="shrink-0">
            <button type="button" onClick={() => setSlides([...d.slides.slice(0, current + 1), { ...blank }, ...d.slides.slice(current + 1)], current + 1)} className="w-full rounded-lg border border-dashed border-navy/20 p-2 text-xs font-semibold text-teal">
              + Diapositiva
            </button>
          </li>
        </ol>

        {slide && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <button type="button" disabled={current === 0} onClick={() => setSlides(move(d.slides, current, current - 1), current - 1)} className="rounded-full bg-white px-3 py-1.5 disabled:opacity-30">↑ Antes</button>
              <button type="button" disabled={current === d.slides.length - 1} onClick={() => setSlides(move(d.slides, current, current + 1), current + 1)} className="rounded-full bg-white px-3 py-1.5 disabled:opacity-30">↓ Después</button>
              <button type="button" onClick={() => setSlides([...d.slides.slice(0, current + 1), { ...slide }, ...d.slides.slice(current + 1)], current + 1)} className="rounded-full bg-white px-3 py-1.5">Duplicar</button>
              <button type="button" disabled={d.slides.length === 1} onClick={() => setSlides(d.slides.filter((_, j) => j !== current), current - 1)} className="rounded-full bg-white px-3 py-1.5 text-magenta disabled:opacity-30">Quitar</button>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-2">
                <input value={slide.eyebrow ?? ""} onChange={(e) => setSlide({ eyebrow: e.target.value || undefined })} placeholder="Antetítulo (opcional)" className={input} />
                <input value={slide.title} onChange={(e) => setSlide({ title: e.target.value })} placeholder="Título" className={`${input} font-semibold`} />
                <textarea value={slide.body} onChange={(e) => setSlide({ body: e.target.value })} rows={14} placeholder={"Texto. Usa:\n- viñetas\n1. listas numeradas\n## subtítulos\n**negrita**"} className={`${input} font-mono text-xs`} />
                <p className="text-xs text-navy/45">«- » viñeta · «1. » numerada · «## » subtítulo · **negrita** · línea vacía separa párrafos.</p>
              </div>
              <div className="rounded-card bg-navy p-6 text-cream">
                {slide.eyebrow && <p className="text-[11px] font-semibold uppercase tracking-widest text-teal">{slide.eyebrow}</p>}
                <p className="mt-1 font-display text-2xl">{slide.title || "Sin título"}</p>
                <div className="mt-4 text-cream/85">
                  <SlideBody body={slide.body} />
                </div>
              </div>
            </div>
            {presentation && (
              <button type="button" onClick={remove} className="text-sm font-semibold text-magenta hover:underline">Borrar presentación</button>
            )}
          </div>
        )}
      </div>

      <SaveBar dirty={dirty} busy={busy} message={message} onSave={save} onDiscard={() => (setD(saved), setCurrent(0))} canSave={canSave} />
    </main>
  );
}
