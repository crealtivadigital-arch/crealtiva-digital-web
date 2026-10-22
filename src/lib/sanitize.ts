// Limpia el HTML del editor de artículos: solo quedan las etiquetas de texto que pinta .article-body,
// las fotos subidas a nuestro Cloudinary y los videos de YouTube (el iframe lo rearma este archivo).
// Todo lo demás (scripts, estilos, atributos on*, otros iframes) se descarta antes de guardar.

const BLOCK_WITH_CONTENT = /<(script|style|iframe|object|embed|noscript|template)[\s\S]*?<\/\1\s*>/gi;
const ALLOWED = new Set(["p", "h2", "h3", "ul", "ol", "li", "strong", "em", "a", "blockquote", "br", "figure", "figcaption", "img"]);
const RENAME: Record<string, string> = { b: "strong", i: "em", h1: "h2", h4: "h3", div: "p" };
const CLOUDINARY = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/`;
// Video ya insertado (con o sin su <figure>): se cambia por una marca y se rearma al final
const VIDEO = /(?:<figure[^>]*>\s*)?<iframe[^>]*?src="[^"]*youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})[^"]*"[^>]*>\s*(?:<\/iframe>)?\s*(?:<\/figure>)?/gi;

function safeHref(raw: string): string | null {
  const href = raw.trim().replace(/&amp;/g, "&");
  if (/^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("/") || href.startsWith("#")) return href.replace(/"/g, "%22");
  return null;
}

const attr = (attrs: string, name: string) => {
  const m = attrs.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[2] ?? m[3] ?? m[4] ?? "") : null;
};
const escapeAttr = (v: string) => v.replace(/&(?!amp;|quot;|lt;|gt;)/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Acepta el ID o cualquier URL de YouTube (watch, youtu.be, shorts, embed)
export function youtubeId(raw: string): string | null {
  const v = raw.trim();
  if (/^[\w-]{11}$/.test(v)) return v;
  const m = v.match(/(?:youtu\.be\/|[?&]v=|\/(?:embed|shorts|live)\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export const videoHtml = (id: string) =>
  `<figure class="article-video"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="Video de YouTube" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></figure>`;

export function sanitizeArticle(html: string): string {
  const videos: string[] = [];
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\u0000/g, "") // el carácter nulo queda reservado para las marcas de video
    .replace(VIDEO, (_m, id: string) => `\u0000${videos.push(id) - 1}\u0000`)
    .replace(BLOCK_WITH_CONTENT, "")
    .replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (tag, rawName: string, attrs: string) => {
      const name = RENAME[rawName.toLowerCase()] ?? rawName.toLowerCase();
      if (!ALLOWED.has(name)) return "";
      const closing = tag.startsWith("</");
      if (closing) return name === "br" || name === "img" ? "" : `</${name}>`;
      if (name === "img") {
        const src = attr(attrs, "src") ?? "";
        if (!src.startsWith(CLOUDINARY) || /["<>\s]/.test(src)) return "";
        const w = Number(attr(attrs, "width")), h = Number(attr(attrs, "height"));
        const size = w > 0 && h > 0 ? ` width="${Math.round(w)}" height="${Math.round(h)}"` : "";
        return `<img src="${src}" alt="${escapeAttr(attr(attrs, "alt") ?? "")}"${size} loading="lazy">`;
      }
      if (name !== "a") return `<${name}>`;
      const url = safeHref(attr(attrs, "href") ?? "");
      if (!url) return "<a>";
      const external = /^https?:/i.test(url) && !/^https?:\/\/(www\.)?crealtivadigital\.com/i.test(url);
      return external ? `<a href="${url}" target="_blank" rel="noopener noreferrer">` : `<a href="${url}">`;
    })
    .replace(/<p>\s*(<br>)?\s*<\/p>/g, "")
    .replace(/<figcaption>\s*(<br>)?\s*<\/figcaption>/g, "")
    .replace(/<figure>\s*<\/figure>/g, "")
    // Una marca de video dentro de un <p> rompería el HTML: se saca del párrafo
    .replace(/<p>\s*(\u0000\d+\u0000)\s*<\/p>/g, "$1")
    .replace(/\u0000(\d+)\u0000/g, (_m, i: string) => videoHtml(videos[Number(i)]))
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
