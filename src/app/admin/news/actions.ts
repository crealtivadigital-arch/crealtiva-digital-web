"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { getAllPosts, POSTS_KEY } from "@/lib/content";
import type { Post } from "@/lib/content/types";
import { writeDoc } from "@/lib/db";
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
    if (!input.cover?.src?.startsWith(`https://res.cloudinary.com/${CLOUD}/`)) return { ok: false, error: "Falta la imagen de portada." };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.publishedAt)) return { ok: false, error: "Fecha de publicación inválida." };
    const bodyHtml = sanitizeArticle(String(input.bodyHtml ?? ""));
    if (!bodyHtml) return { ok: false, error: "El artículo está vacío." };

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
    };

    const rest = all.filter((p) => p.slug !== input.originalSlug);
    await writeDoc(POSTS_KEY, { posts: [post, ...rest] });
    refresh();
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
    return { ok: true, slug };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo borrar." };
  }
}
