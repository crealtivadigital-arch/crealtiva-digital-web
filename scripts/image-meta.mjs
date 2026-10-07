// Registra ancho y alto reales de cada imagen remota usada en el sitio → src/content/images.json.
// La web usa esas medidas para mostrar cada foto en su proporción original y nunca más grande que su tamaño real.
// Uso: node scripts/image-meta.mjs   (volver a correr al agregar imágenes nuevas)
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "src", "content", "images.json");
const urlRe = /https:\/\/(?:crealtivadigital\.com\/wp-content\/uploads|res\.cloudinary\.com)\/[^"'`\s)]+?\.(?:png|jpe?g|webp|avif)/gi;

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|json)$/.test(f) && f !== "images.json" ? [p] : [];
  });
}

const urls = new Set(walk(join(root, "src")).flatMap((f) => readFileSync(f, "utf8").match(urlRe) ?? []));
let previous = {};
try {
  previous = JSON.parse(readFileSync(outPath, "utf8"));
} catch {}

const meta = {};
for (const url of [...urls].sort()) {
  if (previous[url]) {
    meta[url] = previous[url];
    continue;
  }
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const { width, height } = await sharp(Buffer.from(await res.arrayBuffer())).metadata();
  meta[url] = { width, height };
  console.log(`${width}×${height}  ${url.split("/uploads/")[1] ?? url}`);
}

writeFileSync(outPath, JSON.stringify(meta, null, 2) + "\n");
console.log(`${Object.keys(meta).length} imágenes → ${outPath}`);
