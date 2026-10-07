import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /admin (panel y presentaciones internas) nunca se indexa.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: "https://crealtivadigital.com/sitemap.xml",
  };
}
