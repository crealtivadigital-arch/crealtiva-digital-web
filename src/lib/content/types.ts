// Modelo de contenido del sitio. Hoy se llena desde src/content/*.json;
// cuando exista el panel de admin, las mismas formas vendrán de la base de datos.

export interface Img {
  src: string;
  alt: string;
}

export type PriceMode = "desde" | "fijo" | "mensual" | "por-lote" | "cotizar";

export interface Price {
  amount: number | null; // null = cotización personalizada
  currency: "USD";
  mode: PriceMode;
  note?: string;
}

export interface Detail {
  label: string;
  value: string;
}

export interface Topic {
  title: string;
  detail: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Extra {
  name: string;
  detail: string;
  price?: Price;
}

export interface ServiceLine {
  slug: string;
  name: string;
  tagline: string;
  summary: string; // 1–2 frases para tarjetas y meta description
  intro: string; // párrafo de cabecera de la página de la línea
  keyPoints: string[]; // lo clave de la línea, 3–4 frases cortas
  cover?: Img;
  highlights: Detail[]; // cifras clave (ej. "4K" / "Calidad de grabación")
  alwaysIncluded: Topic[]; // lo que trae todo paquete de la línea
  process: Topic[];
  extras: { title: string; items: Extra[] } | null; // add-ons o proyectos especiales
  conditions: Topic[];
  faqs: Faq[];
  order: number;
  visible: boolean;
}

export type Stage = "arranque" | "crecimiento" | "consolidacion";

// Cómo conseguir algo que el paquete no incluye: un complemento del mismo paquete,
// otro paquete concreto o una línea de servicio completa.
export type ExclusionSolution =
  | { type: "addon"; name: string; price: Price }
  | { type: "package"; lineSlug: string; slug: string; name: string; price: Price }
  | { type: "line"; lineSlug: string; name: string; fromPrice: number | null };

export interface Exclusion {
  text: string;
  solution?: ExclusionSolution;
}

export interface Package {
  slug: string;
  lineSlug: string;
  name: string;
  tagline?: string;
  badge?: string;
  summary: string;
  solves: string; // qué problema resuelve, en una frase
  stage: Stage; // fase de crecimiento a la que apunta
  includes: string[];
  excludes: Exclusion[];
  idealFor: string[];
  details: Detail[]; // capacidad, vigencia, tiempos, inversión sugerida...
  addons: Extra[]; // complementos opcionales con su PVP (nunca costos internos)
  price: Price;
  featured: boolean;
  order: number;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  lineSlugs: string[];
  packageSlug?: string;
  summary: string;
  challenge?: string;
  solution?: string;
  cover: Img;
  gallery: Img[];
  url?: string;
  featured: boolean;
  order: number;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  lineSlug?: string;
  cover: Img;
  publishedAt: string; // ISO date
  readingMinutes: number;
  bodyHtml: string; // contenido enriquecido (lo producirá el editor del panel)
  featured: boolean;
}
