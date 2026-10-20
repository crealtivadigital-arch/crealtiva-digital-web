// Limpia el HTML del editor de artículos: solo quedan las etiquetas de texto que pinta .article-body.
// Todo lo demás (scripts, estilos, atributos on*, iframes) se descarta antes de guardar.

const BLOCK_WITH_CONTENT = /<(script|style|iframe|object|embed|noscript|template)[\s\S]*?<\/\1\s*>/gi;
const ALLOWED = new Set(["p", "h2", "h3", "ul", "ol", "li", "strong", "em", "a", "blockquote", "br"]);
const RENAME: Record<string, string> = { b: "strong", i: "em", h1: "h2", h4: "h3", div: "p" };

function safeHref(raw: string): string | null {
  const href = raw.trim().replace(/&amp;/g, "&");
  if (/^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("/") || href.startsWith("#")) return href.replace(/"/g, "%22");
  return null;
}

export function sanitizeArticle(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(BLOCK_WITH_CONTENT, "")
    .replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (tag, rawName: string, attrs: string) => {
      const name = RENAME[rawName.toLowerCase()] ?? rawName.toLowerCase();
      if (!ALLOWED.has(name)) return "";
      const closing = tag.startsWith("</");
      if (closing) return name === "br" ? "" : `</${name}>`;
      if (name !== "a") return `<${name}>`;
      const href = attrs.match(/href\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const url = href ? safeHref(href[2] ?? href[3] ?? href[4] ?? "") : null;
      if (!url) return "<a>";
      const external = /^https?:/i.test(url) && !/^https?:\/\/(www\.)?crealtivadigital\.com/i.test(url);
      return external ? `<a href="${url}" target="_blank" rel="noopener noreferrer">` : `<a href="${url}">`;
    })
    .replace(/<p>\s*(<br>)?\s*<\/p>/g, "")
    .trim();
}

export function readingMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
