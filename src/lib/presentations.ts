import "server-only";
import { readDoc } from "./db";

// Presentaciones internas (solo equipo). Viven únicamente en la base de datos, nunca en el repositorio:
// el repo es público y este material no.

export const PRESENTATIONS_KEY = "presentations";

export interface Slide {
  eyebrow?: string;
  title: string;
  body: string; // texto simple: "- " viñetas, "1. " numeradas, "## " subtítulo, **negrita**
}

export interface Presentation {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  slides: Slide[];
}

export async function getPresentations(): Promise<Presentation[]> {
  return (await readDoc<{ presentations: Presentation[] }>(PRESENTATIONS_KEY))?.presentations ?? [];
}

export async function getPresentation(slug: string): Promise<Presentation | undefined> {
  return (await getPresentations()).find((p) => p.slug === slug);
}
