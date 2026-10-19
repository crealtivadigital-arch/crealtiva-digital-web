"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NaturalImage from "@/components/site/NaturalImage";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";
import imageMeta from "@/content/images.json";
import { wa } from "@/lib/constants";
import type { PortfolioCategory } from "@/lib/content/types";

const meta = imageMeta as Record<string, { width: number; height: number }>;
const MAX_VIDEOS = 3;

// Las frases se intercalan en el mosaico como piezas del diseño, no como párrafo
const PHRASE_SLOTS = [1, 5, 9];
const PHRASE_STYLES = [
  "bg-navy text-cream [&_span]:text-teal",
  "bg-magenta text-cream [&_span]:text-navy",
  "bg-teal text-cream [&_span]:text-navy",
];

function youtubeId(v: string) {
  return v.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1] ?? v;
}

type Viewing = { kind: "photo"; index: number } | { kind: "video"; id: string; title: string } | null;

interface PortfolioExplorerProps {
  categories: PortfolioCategory[];
  lineNames: Record<string, string>;
}

export default function PortfolioExplorer({ categories, lineNames }: PortfolioExplorerProps) {
  const [active, setActive] = useState(categories[0]?.slug);
  const [viewing, setViewing] = useState<Viewing>(null);
  const top = useRef<HTMLElement>(null);
  const cat = categories.find((c) => c.slug === active) ?? categories[0];

  // El rubro vive en el hash (#gastronomia) para poder compartir el enlace directo
  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.slice(1);
      if (categories.some((c) => c.slug === slug)) setActive(slug);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [categories]);

  const choose = (slug: string) => {
    setActive(slug);
    history.replaceState(null, "", `#${slug}`);
    // Si ya bajó por la galería, volver al inicio del rubro nuevo
    const nav = top.current;
    if (nav && nav.getBoundingClientRect().top <= 64) {
      window.scrollTo({ top: window.scrollY + nav.nextElementSibling!.getBoundingClientRect().top - nav.offsetHeight - 64, behavior: "smooth" });
    }
  };

  const step = useCallback(
    (d: number) =>
      setViewing((v) => (v?.kind === "photo" ? { kind: "photo", index: (v.index + d + cat.photos.length) % cat.photos.length } : v)),
    [cat.photos.length]
  );

  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewing(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [viewing, step]);

  if (!cat) return null;

  const tiles: React.ReactNode[] = [];
  cat.photos.forEach((p, i) => {
    const phrase = PHRASE_SLOTS.indexOf(i);
    if (phrase >= 0 && cat.phrases[phrase]) {
      tiles.push(
        <div
          key={`f${phrase}`}
          className={`mb-3 break-inside-avoid rounded-card p-6 sm:mb-5 md:p-8 ${PHRASE_STYLES[phrase % PHRASE_STYLES.length]}`}
        >
          <span aria-hidden className="block font-display text-4xl leading-none">“</span>
          <p className="mt-1 font-display text-xl leading-snug md:text-2xl">{cat.phrases[phrase]}</p>
        </div>
      );
    }
    tiles.push(
      <button
        key={p.src}
        type="button"
        onClick={() => setViewing({ kind: "photo", index: i })}
        className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-card sm:mb-5"
        aria-label={`Ampliar: ${p.alt}`}
      >
        <NaturalImage
          img={p}
          sizes="(min-width: 768px) 33vw, 50vw"
          className="mx-auto"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </button>
    );
  });

  const videos = cat.videos.slice(0, MAX_VIDEOS);
  const photo = viewing?.kind === "photo" ? cat.photos[viewing.index] : null;

  return (
    <>
      <nav ref={top} aria-label="Rubros" className="sticky top-16 z-40 border-b border-navy/5 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-6 py-2.5 [scrollbar-width:none] md:flex-wrap">
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={c.slug === cat.slug}
              onClick={() => choose(c.slug)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                c.slug === cat.slug ? "bg-teal text-cream" : "bg-white text-navy/70 hover:bg-teal/10 hover:text-teal"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      <section className="bg-cream py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 font-display text-3xl text-navy md:text-5xl">{cat.name}</h2>
          <div key={cat.slug} className="columns-2 gap-3 sm:gap-5 md:columns-3">
            {tiles}
          </div>

          {videos.length > 0 && (
            <div className="mt-14">
              <h3 className="mb-6 font-display text-2xl text-navy">En movimiento</h3>
              <div className="grid gap-5 sm:grid-cols-3">
                {videos.map((v) => {
                  const id = youtubeId(v.youtube);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setViewing({ kind: "video", id, title: v.title })}
                      className="group relative aspect-video overflow-hidden rounded-card bg-navy"
                      aria-label={`Ver video: ${v.title}`}
                    >
                      <Image
                        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                      />
                      <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-magenta text-cream shadow-lg">
                        <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-3 text-left text-sm font-semibold text-cream">
                        {v.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-navy py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl leading-tight text-cream md:text-4xl">{cat.cta.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-cream/70">{cat.cta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={wa(cat.cta.wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-magenta px-6 py-3 font-grotesk font-semibold text-cream transition-colors hover:bg-magenta-light"
            >
              <WhatsAppIcon /> Conversemos por WhatsApp
            </a>
            {lineNames[cat.cta.line] && (
              <Link
                href={`/servicios/${cat.cta.line}`}
                className="inline-flex items-center rounded-full border border-cream/20 px-6 py-3 font-grotesk font-semibold text-cream transition-colors hover:border-teal hover:text-teal"
              >
                Ver {lineNames[cat.cta.line]} →
              </Link>
            )}
          </div>
        </div>
      </section>

      {viewing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photo ? photo.alt : viewing.kind === "video" ? viewing.title : ""}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/95 p-4"
          onClick={() => setViewing(null)}
        >
          <button
            type="button"
            onClick={() => setViewing(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cream hover:bg-white/20"
          >
            Cerrar ✕
          </button>

          {photo && (
            <>
              <div onClick={(e) => e.stopPropagation()} className="flex max-h-[85vh] max-w-[92vw] items-center justify-center">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={meta[photo.src].width}
                  height={meta[photo.src].height}
                  sizes="92vw"
                  className="h-auto max-h-[85vh] w-auto max-w-full rounded-card object-contain"
                />
              </div>
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
              <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-cream/60">
                {viewing.kind === "photo" && viewing.index + 1} / {cat.photos.length}
              </p>
            </>
          )}

          {viewing.kind === "video" && (
            <div onClick={(e) => e.stopPropagation()} className="aspect-video w-full max-w-5xl overflow-hidden rounded-card bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${viewing.id}?autoplay=1&rel=0`}
                title={viewing.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
