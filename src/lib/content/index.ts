import "server-only";
import { cache } from "react";
import servicesData from "@/content/services.json";
import portfolioData from "@/content/portfolio.json";
import postsData from "@/content/posts.json";
import portfolioCategoriesData from "@/content/portfolio-categories.json";
import { readDoc } from "@/lib/db";
import type { Package, PortfolioCategory, Post, Project, ServiceLine } from "./types";

// Único punto de lectura del contenido. Las páginas no importan los JSON directamente:
// cuando el panel de admin guarde en la base de datos, solo cambia este archivo.

const projects = (portfolioData.projects as Project[]).sort((a, b) => a.order - b.order);

export const SERVICES_KEY = "services";

export interface ServicesDoc {
  lines: ServiceLine[];
  packages: Package[];
}

// Catálogo completo, ocultos incluidos (para el panel). Lo guardado en el panel manda sobre services.json.
// cache(): una sola lectura de la base por pedido aunque la página llame a varias funciones.
export const getServicesDoc = cache(async (): Promise<ServicesDoc> => {
  const saved = await readDoc<ServicesDoc>(SERVICES_KEY).catch((e) => {
    console.error("No se pudo leer el catálogo de la base de datos:", e);
    return null;
  });
  const doc = saved ?? (servicesData as unknown as ServicesDoc);
  const packages = [...doc.packages].sort((a, b) => a.order - b.order);

  // Las soluciones de "No incluye" llevan copia del nombre y precio de otro paquete o línea:
  // se recalculan aquí para que un cambio de precio en el panel se vea en todas partes.
  const byKey = new Map(packages.map((p) => [`${p.lineSlug}/${p.slug}`, p]));
  const fromPrice = (line: string) => {
    const amounts = packages.filter((p) => p.lineSlug === line && !p.hidden && p.price.amount !== null).map((p) => p.price.amount!);
    return amounts.length ? Math.min(...amounts) : null;
  };
  const synced = packages.map((p) => ({
    ...p,
    excludes: p.excludes.map((e) => {
      const sol = e.solution;
      if (sol?.type === "package") {
        const target = byKey.get(`${sol.lineSlug}/${sol.slug}`);
        return target ? { ...e, solution: { ...sol, name: target.name, price: target.price } } : e;
      }
      if (sol?.type === "line") return { ...e, solution: { ...sol, fromPrice: fromPrice(sol.lineSlug) ?? sol.fromPrice } };
      return e;
    }),
  }));

  return { lines: [...doc.lines].sort((a, b) => a.order - b.order), packages: synced };
});

export async function getServiceLines(): Promise<ServiceLine[]> {
  return (await getServicesDoc()).lines.filter((l) => l.visible);
}

export async function getServiceLine(slug: string): Promise<ServiceLine | undefined> {
  return (await getServiceLines()).find((l) => l.slug === slug);
}

export async function getPackages(lineSlug?: string): Promise<Package[]> {
  const visible = new Set((await getServiceLines()).map((l) => l.slug));
  return (await getServicesDoc()).packages.filter(
    (p) => !p.hidden && visible.has(p.lineSlug) && (!lineSlug || p.lineSlug === lineSlug)
  );
}

export async function getPackage(lineSlug: string, slug: string): Promise<Package | undefined> {
  return (await getPackages(lineSlug)).find((p) => p.slug === slug);
}

export async function getProjects(opts: { lineSlug?: string; featured?: boolean } = {}): Promise<Project[]> {
  return projects.filter(
    (p) => (!opts.lineSlug || p.lineSlugs.includes(opts.lineSlug)) && (!opts.featured || p.featured)
  );
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}

// Lo guardado desde el panel manda; si no hay base de datos o aún no se guardó, el JSON del repo.
export const PORTFOLIO_KEY = "portfolio-categories";

export async function getAllPortfolioCategories(): Promise<PortfolioCategory[]> {
  const saved = await readDoc<{ categories: PortfolioCategory[] }>(PORTFOLIO_KEY).catch((e) => {
    console.error("No se pudo leer el portafolio de la base de datos:", e);
    return null;
  });
  return (saved ?? portfolioCategoriesData).categories as PortfolioCategory[];
}

// Solo rubros con fotos: los que aún no tienen material aparecen solos al cargarlo.
export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  return (await getAllPortfolioCategories()).filter((c) => c.photos.length > 0);
}

export const POSTS_KEY = "posts";

// Todos, borradores incluidos (para el panel), del más nuevo al más viejo
export async function getAllPosts(): Promise<Post[]> {
  const saved = await readDoc<{ posts: Post[] }>(POSTS_KEY).catch((e) => {
    console.error("No se pudieron leer los artículos de la base de datos:", e);
    return null;
  });
  return [...((saved ?? postsData).posts as Post[])].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPosts(opts: { lineSlug?: string; limit?: number } = {}): Promise<Post[]> {
  const list = (await getAllPosts()).filter((p) => !p.draft && (!opts.lineSlug || p.lineSlug === opts.lineSlug));
  return opts.limit ? list.slice(0, opts.limit) : list;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export { formatDate, formatPrice } from "./format";
