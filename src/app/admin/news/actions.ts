"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { getAllPosts, POSTS_KEY } from "@/lib/content";
import type { Img, Post, PostLink } from "@/lib/content/types";
import { writeDoc } from "@/lib/db";
import { notifySearchEngines } from "@/lib/indexnow";
import { tagHref } from "@/lib/content/links";
import { readingMinutes, sanitizeArticle, slugify } from "@/lib/sanitize";

type Result = { ok: true; slug: string } | { ok: false; error: string };

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const text = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export interface PostInput {
  originalSlug: string | null; // null = artículo nuevo
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  lineSlug: string;
  cover: Post["cover"] | null;
  publishedAt: string;
  bodyHtml: string;
  featured: boolean;
  draft: boolean;
  tags: string[];
  gallery: Img[];
  links: PostLink[];
  seoTitle: string;
  seoDescription: string;
}

const fromCloud = (img: Img | null | undefined): img is Img => Boolean(img?.src?.startsWith(`https://res.cloudinary.com/${CLOUD}/`));

function cleanTags(tags: unknown): string[] {
  const list = Array.isArray(tags) ? tags.map((t) => text(t, 40)).filter(Boolean) : [];
  // Sin repetidas (ignorando mayúsculas y tildes): cada etiqueta tiene una sola página
  return list.filter((t, i) => list.findIndex((o) => slugify(o) === slugify(t)) === i).slice(0, 12);
}

function cleanLinks(links: unknown): PostLink[] {
  if (!Array.isArray(links)) return [];
  return links
    .map((l) => ({ label: text(l?.label, 60), href: text(l?.href, 500) }))
    .filter((l) => l.label && (/^(https?:|mailto:|tel:)/i.test(l.href) || l.href.startsWith("/")))
    .slice(0, 6);
}

// Inicio, News, fichas de servicio y sitemap muestran artículos: se refresca todo el sitio
function refresh() {
  revalidatePath("/", "layout");
}

export async function savePost(input: PostInput): Promise<Result> {
  await requireAdmin();
  try {
    const title = text(input.title, 160);
    const slug = slugify(input.slug || title);
    if (!title) return { ok: false, error: "Falta el título." };
    if (!slug) return { ok: false, error: "Falta la dirección (slug)." };
    if (!fromCloud(input.cover)) return { ok: false, error: "Falta la imagen de portada." };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.publishedAt)) return { ok: false, error: "Fecha de publicación inválida." };
    const bodyHtml = sanitizeArticle(String(input.bodyHtml ?? ""));
    if (!bodyHtml) return { ok: false, error: "El artículo está vacío." };

    const tags = cleanTags(input.tags);
    const links = cleanLinks(input.links);
    const gallery = (Array.isArray(input.gallery) ? input.gallery : []).filter(fromCloud).slice(0, 40).map((g) => ({
      src: g.src,
      alt: text(g.alt, 200) || title,
      ...(g.width && g.height ? { width: Number(g.width), height: Number(g.height) } : {}),
    }));

    const all = await getAllPosts();
    if (slug !== input.originalSlug && all.some((p) => p.slug === slug)) return { ok: false, error: "Ya existe un artículo con esa dirección." };

    const post: Post = {
      slug,
      title,
      excerpt: text(input.excerpt, 300),
      category: text(input.category, 40) || "General",
      ...(input.lineSlug ? { lineSlug: text(input.lineSlug, 60) } : {}),
      cover: {
        src: input.cover.src,
        alt: text(input.cover.alt, 200) || title,
        ...(input.cover.width && input.cover.height ? { width: Number(input.cover.width), height: Number(input.cover.height) } : {}),
      },
      publishedAt: input.publishedAt,
      readingMinutes: readingMinutes(bodyHtml),
      bodyHtml,
      featured: Boolean(input.featured),
      ...(input.draft ? { draft: true } : {}),
      ...(tags.length ? { tags } : {}),
      ...(gallery.length ? { gallery } : {}),
      ...(links.length ? { links } : {}),
      ...(text(input.seoTitle, 70) ? { seoTitle: text(input.seoTitle, 70) } : {}),
      ...(text(input.seoDescription, 170) ? { seoDescription: text(input.seoDescription, 170) } : {}),
    };

    const rest = all.filter((p) => p.slug !== input.originalSlug);
    await writeDoc(POSTS_KEY, { posts: [post, ...rest] });
    refresh();
    // También la dirección vieja y las etiquetas que tenía: los buscadores ven que cambiaron o ya no existen.
    // Un borrador nuevo no se avisa (nunca estuvo publicado).
    const before = all.find((p) => p.slug === input.originalSlug);
    if (!post.draft || (before && !before.draft)) {
      notifySearchEngines([
        "/news",
        `/news/${slug}`,
        ...(before ? [`/news/${before.slug}`] : []),
        ...[...(post.tags ?? []), ...(before?.tags ?? [])].map(tagHref),
      ]);
    }
    return { ok: true, slug };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo guardar." };
  }
}

export async function deletePost(slug: string): Promise<Result> {
  await requireAdmin();
  try {
    const all = await getAllPosts();
    await writeDoc(POSTS_KEY, { posts: all.filter((p) => p.slug !== slug) });
    refresh();
    const gone = all.find((p) => p.slug === slug);
    if (gone && !gone.draft) notifySearchEngines(["/news", `/news/${slug}`, ...(gone.tags ?? []).map(tagHref)]);
    return { ok: true, slug };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo borrar." };
  }
}
