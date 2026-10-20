"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Img, Post } from "@/lib/content/types";
import { slugify } from "@/lib/sanitize";
import { thumb, uploadImage } from "../../uploadImage";
import { deletePost, savePost } from "../actions";

interface Props {
  post: Post | null;
  categories: string[];
  lines: { slug: string; name: string }[];
  canSave: boolean;
}

const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Guayaquil" }).format(new Date());

// Botones del editor: usan los comandos nativos del navegador sobre el área editable
const TOOLS: { label: string; title: string; run: () => void }[] = [
  { label: "Título", title: "Subtítulo grande (H2)", run: () => document.execCommand("formatBlock", false, "h2") },
  { label: "Subtítulo", title: "Subtítulo chico (H3)", run: () => document.execCommand("formatBlock", false, "h3") },
  { label: "Párrafo", title: "Texto normal", run: () => document.execCommand("formatBlock", false, "p") },
  { label: "B", title: "Negrita", run: () => document.execCommand("bold") },
  { label: "I", title: "Cursiva", run: () => document.execCommand("italic") },
  { label: "• Lista", title: "Lista con viñetas", run: () => document.execCommand("insertUnorderedList") },
  { label: "1. Lista", title: "Lista numerada", run: () => document.execCommand("insertOrderedList") },
  { label: "❝ Cita", title: "Cita destacada", run: () => document.execCommand("formatBlock", false, "blockquote") },
  {
    label: "Enlace",
    title: "Convertir el texto seleccionado en enlace",
    run: () => {
      const url = window.prompt("Dirección del enlace (https://… o /servicios/…)");
      if (url) document.execCommand("createLink", false, url);
    },
  },
  { label: "Quitar enlace", title: "Quitar enlace", run: () => document.execCommand("unlink") },
];

export default function PostEditor({ post, categories, lines, canSave }: Props) {
  const router = useRouter();
  const body = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [lineSlug, setLineSlug] = useState(post?.lineSlug ?? "");
  const [publishedAt, setPublishedAt] = useState(post?.publishedAt ?? today());
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [draft, setDraft] = useState(post ? Boolean(post.draft) : true);
  const [cover, setCover] = useState<Img | null>(post?.cover ?? null);
  const [uploading, setUploading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, start] = useTransition();

  useEffect(() => {
    if (body.current) body.current.innerHTML = post?.bodyHtml ?? "<p></p>";
  }, [post]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const touch = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setDirty(true);
    setMessage(null);
  };

  async function onCover(file: File) {
    setUploading(true);
    setMessage(null);
    try {
      setCover(await uploadImage(file, "news", "", title || "Crealtiva Digital"));
      setDirty(true);
    } catch (e) {
      setMessage({ ok: false, text: e instanceof Error ? e.message : "No se pudo subir." });
    } finally {
      setUploading(false);
    }
  }

  const save = () =>
    start(async () => {
      const res = await savePost({
        originalSlug: post?.slug ?? null,
        slug: slug || slugify(title),
        title,
        excerpt,
        category,
        lineSlug,
        cover,
        publishedAt,
        bodyHtml: body.current?.innerHTML ?? "",
        featured,
        draft,
      });
      if (!res.ok) return setMessage({ ok: false, text: res.error });
      setDirty(false);
      setMessage({ ok: true, text: draft ? "Borrador guardado (no se ve en el sitio)." : "Publicado. Ya se ve en /news." });
      if (res.slug !== post?.slug) router.replace(`/admin/news/${res.slug}`);
      else router.refresh();
    });

  const remove = () => {
    if (!post || !window.confirm(`¿Borrar «${post.title}»? No se puede deshacer.`)) return;
    start(async () => {
      const res = await deletePost(post.slug);
      if (!res.ok) return setMessage({ ok: false, text: res.error });
      setDirty(false);
      router.replace("/admin/news");
    });
  };

  const input = "w-full rounded-lg border border-navy/10 bg-white px-3 py-2 text-sm outline-none focus:border-teal";

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6">
      <Link href="/admin/news" className="text-sm font-semibold text-teal hover:underline">← Todos los artículos</Link>
      {!canSave && <p className="mt-4 rounded-card bg-magenta/10 p-4 text-sm text-magenta">La base de datos todavía no está conectada: “Guardar” no funcionará.</p>}

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => {
              touch(setTitle)(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            placeholder="Título del artículo"
            className="w-full rounded-lg border border-navy/10 bg-white px-4 py-3 font-display text-2xl outline-none focus:border-teal"
          />
          <textarea value={excerpt} onChange={(e) => touch(setExcerpt)(e.target.value)} maxLength={300} rows={2} placeholder="Resumen: 1–2 frases que salen en la tarjeta y en Google" className={input} />

          <div className="rounded-card bg-white shadow-sm">
            <div className="sticky top-0 z-10 flex flex-wrap gap-1 rounded-t-card border-b border-navy/10 bg-white p-2">
              {TOOLS.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  title={t.title}
                  // mousedown + preventDefault: el botón no le quita la selección al texto
                  onMouseDown={(e) => {
                    e.preventDefault();
                    t.run();
                    setDirty(true);
                  }}
                  className="rounded px-2.5 py-1 text-xs font-semibold text-navy/70 hover:bg-cream hover:text-navy"
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div
              ref={body}
              contentEditable
              suppressContentEditableWarning
              onInput={() => {
                setDirty(true);
                setMessage(null);
              }}
              // Al pegar desde Word o una web se pega solo el texto: el formato se da con los botones
              onPaste={(e) => {
                e.preventDefault();
                document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
              }}
              className="article-body min-h-[420px] px-6 py-5 outline-none"
            />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-card bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold">Portada</p>
            {cover ? (
              <div className="mt-2 flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(cover.src, 600)} alt={cover.alt} className="max-h-full max-w-full object-contain" />
              </div>
            ) : (
              <p className="mt-2 rounded-lg border border-dashed border-navy/20 p-6 text-center text-xs text-navy/50">Sin portada</p>
            )}
            <label className={`mt-2 block cursor-pointer rounded-full bg-teal px-4 py-2 text-center text-sm font-semibold text-cream hover:bg-teal-dark ${uploading ? "pointer-events-none opacity-60" : ""}`}>
              {uploading ? "Subiendo…" : cover ? "Cambiar portada" : "Subir portada"}
              <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && onCover(e.target.files[0])} />
            </label>
            {cover && (
              <input value={cover.alt} onChange={(e) => touch(setCover)({ ...cover, alt: e.target.value })} placeholder="Descripción de la imagen" className={`${input} mt-2 text-xs`} />
            )}
          </div>

          <div className="space-y-3 rounded-card bg-white p-4 shadow-sm">
            <label className="block text-sm">
              <span className="font-semibold">Dirección</span>
              <div className="mt-1 flex items-center rounded-lg border border-navy/10 text-xs">
                <span className="pl-3 text-navy/40">/news/</span>
                <input
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    touch(setSlug)(slugify(e.target.value));
                  }}
                  className="min-w-0 flex-1 rounded-r-lg px-1 py-2 outline-none"
                />
              </div>
              {post && slug !== post.slug && <span className="mt-1 block text-xs text-amber-700">Cambiar la dirección rompe los enlaces ya compartidos.</span>}
            </label>
            <label className="block text-sm">
              <span className="font-semibold">Categoría</span>
              <input list="categorias" value={category} onChange={(e) => touch(setCategory)(e.target.value)} className={`${input} mt-1`} />
              <datalist id="categorias">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
            <label className="block text-sm">
              <span className="font-semibold">Servicio relacionado</span>
              <select value={lineSlug} onChange={(e) => touch(setLineSlug)(e.target.value)} className={`${input} mt-1`}>
                <option value="">Ninguno</option>
                {lines.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {l.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-semibold">Fecha de publicación</span>
              <input type="date" value={publishedAt} onChange={(e) => touch(setPublishedAt)(e.target.value)} className={`${input} mt-1`} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={featured} onChange={(e) => touch(setFeatured)(e.target.checked)} /> Destacado
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={draft} onChange={(e) => touch(setDraft)(e.target.checked)} /> Borrador (no se ve en el sitio)
            </label>
          </div>

          {post && (
            <div className="flex items-center justify-between text-sm">
              {!post.draft && (
                <a href={`/news/${post.slug}`} target="_blank" className="font-semibold text-teal hover:underline">
                  Ver en el sitio ↗
                </a>
              )}
              <button type="button" onClick={remove} disabled={busy} className="ml-auto font-semibold text-magenta hover:underline">
                Borrar artículo
              </button>
            </div>
          )}
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-navy/10 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <p className={`mr-auto text-sm ${message ? (message.ok ? "text-teal" : "text-magenta") : "text-navy/50"}`}>
            {message?.text ?? (dirty ? "Tienes cambios sin guardar." : "Sin cambios.")}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={busy || uploading || !canSave}
            className="rounded-full bg-magenta px-6 py-2.5 text-sm font-semibold text-cream hover:bg-magenta-light disabled:opacity-40"
          >
            {busy ? "Guardando…" : draft ? "Guardar borrador" : "Publicar"}
          </button>
        </div>
      </div>
    </main>
  );
}
