import { lineHref } from "@/lib/content/links";
import type { MetadataRoute } from "next";
import { getPackages, getPosts, getProjects, getServiceLines } from "@/lib/content";

const BASE = "https://crealtivadigital.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [lines, packages, projects, posts] = await Promise.all([
    getServiceLines(),
    getPackages(),
    getProjects(),
    getPosts(),
  ]);

  return [
    ...["", "/servicios", "/portafolio", "/news", "/contactanos"].map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...["/terminos-y-condiciones", "/politica-de-privacidad", "/politica-de-cookies"].map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
    ...lines.map((l) => ({ url: `${BASE}${lineHref(l.slug)}`, priority: 0.8 })),
    ...packages.map((p) => ({ url: `${BASE}/servicios/${p.lineSlug}/${p.slug}`, priority: 0.6 })),
    ...projects.map((p) => ({ url: `${BASE}/portafolio/${p.slug}`, priority: 0.5 })),
    ...posts.map((p) => ({ url: `${BASE}/news/${p.slug}`, lastModified: p.publishedAt, priority: 0.6 })),
  ];
}
