"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { getServicesDoc, SERVICES_KEY } from "@/lib/content";
import type { Detail, Extra, Faq, Img, Package, Price, PriceMode, ServiceLine, Stage, Topic } from "@/lib/content/types";
import { deleteDoc, writeDoc } from "@/lib/db";

type Result = { ok: true } | { ok: false; error: string };

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const MODES: PriceMode[] = ["desde", "fijo", "mensual", "por-lote", "cotizar"];
const STAGES: Stage[] = ["arranque", "crecimiento", "consolidacion"];

const str = (v: unknown, max = 600) => String(v ?? "").trim().slice(0, max);
const opt = (v: unknown, max = 200) => str(v, max) || undefined;
const strings = (v: unknown, max = 400) => (Array.isArray(v) ? v.map((x) => str(x, max)).filter(Boolean) : []);
const topics = (v: unknown): Topic[] =>
  (Array.isArray(v) ? v : []).map((t) => ({ title: str(t?.title, 160), detail: str(t?.detail, 1200) })).filter((t) => t.title || t.detail);
const details = (v: unknown): Detail[] =>
  (Array.isArray(v) ? v : []).map((d) => ({ label: str(d?.label, 120), value: str(d?.value, 400) })).filter((d) => d.label || d.value);
const faqs = (v: unknown): Faq[] => (Array.isArray(v) ? v : []).map((f) => ({ q: str(f?.q, 300), a: str(f?.a, 2000) })).filter((f) => f.q && f.a);

function price(v: unknown): Price | undefined {
  const p = v as Partial<Price> | undefined;
  if (!p || !MODES.includes(p.mode as PriceMode)) return undefined;
  const amount = p.mode === "cotizar" || p.amount === null || p.amount === undefined || !Number.isFinite(Number(p.amount)) ? null : Math.max(0, Number(p.amount));
  return { amount, currency: "USD", mode: p.mode as PriceMode, ...(opt(p.note) ? { note: opt(p.note) } : {}) };
}

const extras = (v: unknown): Extra[] =>
  (Array.isArray(v) ? v : [])
    .map((x) => {
      const pr = price(x?.price);
      return { name: str(x?.name, 160), detail: str(x?.detail, 1200), ...(pr ? { price: pr } : {}) };
    })
    .filter((x) => x.name);

function image(v: unknown): Img | undefined {
  const i = v as Partial<Img> | undefined;
  if (!i?.src) return undefined;
  const src = str(i.src, 500);
  if (!src.startsWith(`https://res.cloudinary.com/${CLOUD}/`)) throw new Error("La imagen debe estar en Cloudinary.");
  return { src, alt: str(i.alt, 200), ...(i.width && i.height ? { width: Number(i.width), height: Number(i.height) } : {}) };
}

// Todo el sitio muestra precios y nombres de servicios (menú, inicio, fichas): se refresca entero
async function persist(doc: { lines: ServiceLine[]; packages: Package[] }) {
  await writeDoc(SERVICES_KEY, doc);
  revalidatePath("/", "layout");
}

export async function saveLine(slug: string, input: Partial<ServiceLine>): Promise<Result> {
  await requireAdmin();
  try {
    const doc = await getServicesDoc();
    const current = doc.lines.find((l) => l.slug === slug);
    if (!current) return { ok: false, error: "Esa línea no existe." };
    const name = str(input.name, 120);
    if (!name) return { ok: false, error: "Falta el nombre." };

    const line: ServiceLine = {
      ...current,
      name,
      tagline: str(input.tagline, 200),
      summary: str(input.summary, 400),
      intro: str(input.intro, 2000),
      keyPoints: strings(input.keyPoints, 300),
      cover: image(input.cover),
      highlights: details(input.highlights),
      alwaysIncluded: topics(input.alwaysIncluded),
      process: topics(input.process),
      extras: input.extras ? { title: str(input.extras.title, 160), items: extras(input.extras.items) } : null,
      conditions: topics(input.conditions),
      faqs: faqs(input.faqs),
      order: Number.isFinite(Number(input.order)) ? Number(input.order) : current.order,
      visible: Boolean(input.visible),
    };
    await persist({ ...doc, lines: doc.lines.map((l) => (l.slug === slug ? line : l)) });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo guardar." };
  }
}

export async function savePackage(lineSlug: string, slug: string, input: Partial<Package>): Promise<Result> {
  await requireAdmin();
  try {
    const doc = await getServicesDoc();
    const current = doc.packages.find((p) => p.lineSlug === lineSlug && p.slug === slug);
    if (!current) return { ok: false, error: "Ese paquete no existe." };
    const name = str(input.name, 120);
    if (!name) return { ok: false, error: "Falta el nombre." };
    const pr = price(input.price);
    if (!pr) return { ok: false, error: "Falta el precio." };

    // Las soluciones de "No incluye" se conservan tal cual: solo se edita el texto
    const excludes = (Array.isArray(input.excludes) ? input.excludes : [])
      .map((e) => ({ ...(e.solution ? { solution: e.solution } : {}), text: str(e?.text, 300) }))
      .filter((e) => e.text);

    const pkg: Package = {
      ...current,
      name,
      tagline: opt(input.tagline),
      badge: opt(input.badge, 40),
      summary: str(input.summary, 600),
      solves: str(input.solves, 300),
      stage: STAGES.includes(input.stage as Stage) ? (input.stage as Stage) : current.stage,
      includes: strings(input.includes),
      excludes,
      idealFor: strings(input.idealFor, 300),
      details: details(input.details),
      addons: extras(input.addons),
      price: pr,
      featured: Boolean(input.featured),
      order: Number.isFinite(Number(input.order)) ? Number(input.order) : current.order,
      ...(input.hidden ? { hidden: true } : {}),
    };
    if (!input.hidden) delete pkg.hidden;
    await persist({ ...doc, packages: doc.packages.map((p) => (p === current ? pkg : p)) });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo guardar." };
  }
}

// Vuelve al catálogo del repositorio (services.json, generado desde catalogo-productos.md)
export async function resetServices(): Promise<Result> {
  await requireAdmin();
  try {
    await deleteDoc(SERVICES_KEY);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo restablecer." };
  }
}
