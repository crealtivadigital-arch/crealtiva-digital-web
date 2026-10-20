"use server";
import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { getAllPortfolioCategories, PORTFOLIO_KEY } from "@/lib/content";
import type { Img, PortfolioVideo } from "@/lib/content/types";
import { writeDoc } from "@/lib/db";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_FOLDER = "Crealtiva-digital/sitio/portafolio";

export interface UploadTicket {
  url: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
}

// El navegador sube la foto directo a Cloudinary con esta firma (el secreto nunca sale del servidor)
export async function signUpload(rubro: string): Promise<UploadTicket> {
  await requireAdmin();
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!CLOUD || !apiKey || !secret) throw new Error("Faltan las claves de Cloudinary en el servidor.");
  const folder = `${UPLOAD_FOLDER}/${rubro.replace(/[^a-z0-9-]/g, "")}`;
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest("hex");
  return { url: `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, apiKey, timestamp, folder, signature };
}

export interface RubroInput {
  slug: string;
  phrases: string[];
  photos: Img[];
  videos: PortfolioVideo[];
}

const text = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function saveRubro(input: RubroInput): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  try {
    const all = await getAllPortfolioCategories();
    const cat = all.find((c) => c.slug === input.slug);
    if (!cat) return { ok: false, error: "Ese rubro no existe." };

    const photos: Img[] = [];
    for (const p of input.photos) {
      const src = text(p.src, 500);
      if (!src.startsWith(`https://res.cloudinary.com/${CLOUD}/`)) return { ok: false, error: `Foto fuera de Cloudinary: ${src}` };
      const width = Number(p.width) || undefined;
      const height = Number(p.height) || undefined;
      photos.push({ src, alt: text(p.alt, 200) || `${cat.name} — Crealtiva Digital`, ...(width && height ? { width, height } : {}) });
    }
    const videos = input.videos
      .map((v) => ({ youtube: text(v.youtube, 200), title: text(v.title, 120) }))
      .filter((v) => v.youtube);
    const phrases = input.phrases.map((f) => text(f, 160)).filter(Boolean);

    const updated = all.map((c) => (c.slug === cat.slug ? { ...c, photos, videos, phrases } : c));
    await writeDoc(PORTFOLIO_KEY, { categories: updated });
    revalidatePath("/portafolio");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "No se pudo guardar." };
  }
}
