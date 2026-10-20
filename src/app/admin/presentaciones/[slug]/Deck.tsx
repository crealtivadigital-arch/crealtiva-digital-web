"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Presentation } from "@/lib/presentations";
import SlideBody from "../SlideBody";

// Visor de diapositivas: flechas o espacio para avanzar, F para pantalla completa.
// El contenido llega como props desde el servidor (página protegida), no va en el código del navegador.
export default function Deck({ presentation: p }: { presentation: Presentation }) {
  const [i, setI] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const total = p.slides.length;
  const go = useCallback((n: number) => setI((x) => Math.min(total - 1, Math.max(0, x + n))), [total]);

  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else stage.current?.requestFullscreen();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) (e.preventDefault(), go(1));
      if (["ArrowLeft", "PageUp"].includes(e.key)) (e.preventDefault(), go(-1));
      if (e.key === "Home") setI(0);
      if (e.key === "End") setI(total - 1);
      if (e.key.toLowerCase() === "f") fullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  const slide = p.slides[i];
  if (!slide) return <p className="p-10 text-center text-navy/50">Esta presentación no tiene diapositivas.</p>;
  const cover = i === 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
        <Link href="/admin/presentaciones" className="font-semibold text-teal hover:underline">← Presentaciones</Link>
        <Link href={`/admin/presentaciones/${p.slug}/editar`} className="ml-auto font-semibold text-navy/60 hover:text-navy">Editar</Link>
        <button type="button" onClick={fullscreen} className="rounded-full bg-navy px-4 py-1.5 font-semibold text-cream">Pantalla completa (F)</button>
      </div>

      <div ref={stage} className="relative flex aspect-video w-full flex-col overflow-hidden rounded-card bg-navy text-cream [container-type:inline-size] [&:fullscreen]:rounded-none">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-magenta/20 blur-3xl" />

        <div className={`relative flex flex-1 flex-col overflow-y-auto px-[6%] py-[5%] ${cover ? "justify-center" : ""}`}>
          {slide.eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal md:text-sm">{slide.eyebrow}</p>}
          <h1 className={`mt-2 font-display leading-tight ${cover ? "max-w-[80%] text-[max(26px,5cqw)]" : "text-[max(18px,2.9cqw)]"}`}>{slide.title}</h1>
          {slide.body && (
            <div className={`mt-6 max-w-4xl text-cream/85 ${cover ? "" : "[&_strong]:text-teal"}`}>
              <SlideBody body={slide.body} large />
            </div>
          )}
        </div>

        <div className="relative flex items-center gap-3 px-[6%] pb-4 text-xs text-cream/50">
          <span>Crealtiva Digital · uso interno</span>
          <span className="ml-auto tabular-nums">
            {i + 1} / {total}
          </span>
        </div>
        <div className="relative h-1 bg-white/10">
          <div className="h-1 bg-magenta transition-all" style={{ width: `${((i + 1) / total) * 100}%` }} />
        </div>

        <button type="button" aria-label="Anterior" onClick={() => go(-1)} disabled={i === 0} className="absolute inset-y-0 left-0 w-[12%] cursor-w-resize disabled:cursor-default" />
        <button type="button" aria-label="Siguiente" onClick={() => go(1)} disabled={i === total - 1} className="absolute inset-y-0 right-0 w-[12%] cursor-e-resize disabled:cursor-default" />
      </div>

      <ol className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {p.slides.map((s, j) => (
          <li key={j}>
            <button
              type="button"
              onClick={() => setI(j)}
              className={`w-36 shrink-0 rounded-lg p-2 text-left text-[11px] leading-snug ${j === i ? "bg-navy text-cream" : "bg-white text-navy/70 hover:bg-white/70"}`}
            >
              <span className="block font-semibold tabular-nums opacity-60">{j + 1}</span>
              <span className="line-clamp-2">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </main>
  );
}
