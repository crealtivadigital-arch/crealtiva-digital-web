"use server";
import { requireAdmin } from "@/lib/admin";
import { writeDoc } from "@/lib/db";
import { getPresentations, PRESENTATIONS_KEY, type Presentation, type Slide } from "@/lib/presentations";
import { slugify } from "@/lib/sanitize";

type Result = { ok: true; slug: string } | { ok: false; error: string };

const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function savePresentation(input: { originalSlug: string | null; title: string; description: string; slides: Slide[] }): Promise<Result> {
  await requireAdmin();
  try {
    const title = str(input.title, 160);
    if (!title) return { ok: false, error: "Falta el título." };
    const all = await getPresentations();
    const slug = input.originalSlug ?? slugify(title);
    if (!input.originalSlug && all.some((p) => p.slug === slug)) return { ok: false, error: "Ya existe una presentación con ese título." };

    const slides = (Array.isArray(input.slides) ? input.slides : [])
      .map((s) => ({ ...(str(s.eyebrow, 80) ? { eyebrow: str(s.eyebrow, 80) } : {}), title: str(s.title, 200), body: str(s.body, 6000) }))
      .filter((s) => s.title || s.body);
    const p: Presentation = { slug, title, description: str(input.description, 300), updatedAt: new Date().toISOString(), slides };
    await writeDoc(PRESENTATIONS_KEY, { presentations: [p, ...all.filter((x) => x.slug !== slug)] });
    return { ok: true, slug };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo guardar." };
  }
}

export async function deletePresentation(slug: string): Promise<Result> {
  await requireAdmin();
  try {
    const all = await getPresentations();
    await writeDoc(PRESENTATIONS_KEY, { presentations: all.filter((p) => p.slug !== slug) });
    return { ok: true, slug };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo borrar." };
  }
}
