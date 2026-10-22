"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Img } from "@/lib/content/types";
import NaturalImage, { imageDims } from "./NaturalImage";

// Galería al final de un artículo: mosaico sin recortes y visor con flechas y teclado
export default function PostGallery({ photos }: { photos: Img[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const photo = open === null ? null : photos[open];
  const dims = photo ? imageDims(photo) : undefined;

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3">
        {photos.map((p, i) => (
          <button key={p.src} type="button" onClick={() => setOpen(i)} className="mb-3 block w-full break-inside-avoid" aria-label={`Ver foto: ${p.alt}`}>
            <NaturalImage img={p} sizes="(min-width: 768px) 280px, 50vw" className="mx-auto rounded-card transition-opacity hover:opacity-90" />
          </button>
        ))}
      </div>

      {photo && dims && (
        <div role="dialog" aria-modal="true" aria-label={photo.alt} className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/95 p-4" onClick={() => setOpen(null)}>
          <button type="button" onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cream hover:bg-white/20">
            Cerrar ✕
          </button>
          <div onClick={(e) => e.stopPropagation()} className="flex max-h-[85vh] max-w-[92vw] items-center justify-center">
            <Image src={photo.src} alt={photo.alt} width={dims.width} height={dims.height} sizes="92vw" className="h-auto max-h-[85vh] w-auto max-w-full rounded-card object-contain" />
          </div>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Foto anterior"
                onClick={(e) => (e.stopPropagation(), step(-1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl text-cream hover:bg-white/20"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Foto siguiente"
                onClick={(e) => (e.stopPropagation(), step(1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl text-cream hover:bg-white/20"
              >
                ›
              </button>
            </>
          )}
          <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-cream/60">
            {open! + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
