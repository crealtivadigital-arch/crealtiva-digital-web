import "server-only";
import servicesData from "@/content/services.json";
import portfolioData from "@/content/portfolio.json";
import postsData from "@/content/posts.json";
import type { Package, Post, Project, ServiceLine } from "./types";

// Único punto de lectura del contenido. Las páginas no importan los JSON directamente:
// cuando el panel de admin guarde en la base de datos, solo cambia este archivo.

const lines = (servicesData.lines as ServiceLine[]).filter((l) => l.visible).sort((a, b) => a.order - b.order);
const packages = (servicesData.packages as Package[]).sort((a, b) => a.order - b.order);
const projects = (portfolioData.projects as Project[]).sort((a, b) => a.order - b.order);
const posts = (postsData.posts as Post[]).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export async function getServiceLines(): Promise<ServiceLine[]> {
  return lines;
}

export async function getServiceLine(slug: string): Promise<ServiceLine | undefined> {
  return lines.find((l) => l.slug === slug);
}

export async function getPackages(lineSlug?: string): Promise<Package[]> {
  const visible = new Set(lines.map((l) => l.slug));
  return packages.filter((p) => visible.has(p.lineSlug) && (!lineSlug || p.lineSlug === lineSlug));
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

export async function getPosts(opts: { lineSlug?: string; limit?: number } = {}): Promise<Post[]> {
  const list = posts.filter((p) => !opts.lineSlug || p.lineSlug === opts.lineSlug);
  return opts.limit ? list.slice(0, opts.limit) : list;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return posts.find((p) => p.slug === slug);
}

export { formatDate, formatPrice } from "./format";
