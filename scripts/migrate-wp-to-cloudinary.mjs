// Migra las imágenes del sitio WordPress (crealtivadigital.com/wp-content) a Cloudinary.
// 1) Busca en src/ y scripts/ todas las URLs de WordPress.
// 2) Las que ya existen en Cloudinary (mismo nombre de archivo) se reutilizan; las demás se suben
//    tal cual (sin recortar ni redimensionar) a la carpeta Crealtiva-digital/sitio.
// 3) Reemplaza las URLs en el código y actualiza las medidas en src/content/images.json.
// Uso: node scripts/migrate-wp-to-cloudinary.mjs          (simulación: no sube ni cambia nada)
//      node scripts/migrate-wp-to-cloudinary.mjs --apply  (sube y reescribe)
// Lee NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET de .env.local.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APPLY = process.argv.includes("--apply");
const FOLDER = "Crealtiva-digital/sitio";
const WP = "https://crealtivadigital.com/wp-content/uploads/";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const env = Object.fromEntries(
  readFileSync(join(root, ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()]),
);
const cloud = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const key = env.CLOUDINARY_API_KEY;
const secret = env.CLOUDINARY_API_SECRET;
if (!cloud || !key || !secret) throw new Error("Faltan las variables de Cloudinary en .env.local");
const auth = "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|json|mjs)$/.test(f) ? [p] : [];
  });
}
const files = [...walk(join(root, "src")), ...walk(join(root, "scripts"))].filter((f) => !f.endsWith("migrate-wp-to-cloudinary.mjs"));

// URLs completas y rutas relativas que seed-services.mjs concatena con su prefijo WP
const fullRe = /https:\/\/crealtivadigital\.com\/wp-content\/uploads\/[^"'`\s)]+?\.(?:png|jpe?g|webp|avif)/gi;
const relRe = /["'`](20\d\d\/\d\d\/[^"'`\s]+?\.(?:png|jpe?g|webp|avif))["'`]/gi;
const urls = new Set();
for (const f of files) {
  const text = readFileSync(f, "utf8");
  for (const m of text.match(fullRe) ?? []) urls.add(m);
  for (const m of text.matchAll(relRe)) urls.add(WP + m[1]);
}

// Nombre normalizado para comparar con lo que ya hay en Cloudinary
const norm = (s) =>
  s.toLowerCase().replace(/\.[a-z0-9]+$/, "").replace(/-scaled$/, "").replace(/-\d+x\d+$/, "").replace(/[^a-z0-9]/g, "");

const existing = [];
let cursor;
for (let i = 0; i < 10; i++) {
  const u = new URL(`https://api.cloudinary.com/v1_1/${cloud}/resources/image/upload`);
  u.searchParams.set("max_results", "500");
  if (cursor) u.searchParams.set("next_cursor", cursor);
  const r = await fetch(u, { headers: { Authorization: auth } });
  if (!r.ok) throw new Error(`Cloudinary ${r.status}: ${await r.text()}`);
  const j = await r.json();
  existing.push(...j.resources);
  cursor = j.next_cursor;
  if (!cursor) break;
}
const byName = new Map();
for (const r of existing) {
  const base = r.public_id.split("/").pop();
  for (const k of [base, base.replace(/_[a-z0-9]{6}$/, ""), r.display_name ?? ""].filter(Boolean)) byName.set(norm(k), r);
}

// public_id legible: "NICO-PORTADA-scaled.webp" → "nico-portada"
const publicIdFor = (url) =>
  url.split("/").pop().replace(/\.[a-z0-9]+$/i, "").replace(/-scaled$/i, "").toLowerCase().replace(/[^a-z0-9-]+/g, "-");

async function upload(url) {
  const params = {
    asset_folder: FOLDER,
    overwrite: "false",
    public_id: publicIdFor(url),
    timestamp: String(Math.floor(Date.now() / 1000)),
  };
  const toSign = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&");
  const body = new FormData();
  for (const [k, v] of Object.entries(params)) body.set(k, v);
  body.set("file", url);
  body.set("api_key", key);
  body.set("signature", createHash("sha1").update(toSign + secret).digest("hex"));
  const r = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body });
  const j = await r.json();
  if (!r.ok) throw new Error(`Subida fallida ${url}: ${j.error?.message ?? r.status}`);
  return j;
}

const map = {}; // url WP → { url, width, height }
let reused = 0, uploaded = 0;
for (const url of [...urls].sort()) {
  const hit = byName.get(norm(url.split("/").pop()));
  if (hit) {
    map[url] = { url: hit.secure_url, width: hit.width, height: hit.height };
    reused++;
    console.log(`= ${url.slice(WP.length)}  →  ${hit.public_id}`);
    continue;
  }
  if (!APPLY) {
    console.log(`+ ${url.slice(WP.length)}  →  ${FOLDER}/${publicIdFor(url)}  (se subiría)`);
    continue;
  }
  const res = await upload(url);
  map[url] = { url: res.secure_url, width: res.width, height: res.height };
  uploaded++;
  console.log(`+ ${url.slice(WP.length)}  →  ${res.public_id}  ${res.width}×${res.height}`);
}

console.log(`\n${urls.size} imágenes WordPress · ${reused} ya en Cloudinary · ${APPLY ? uploaded + " subidas" : urls.size - reused + " por subir"}`);
if (!APPLY) process.exit(0);

// Reescribir código: URLs completas y rutas relativas de seed-services
let changed = 0;
for (const f of files) {
  const before = readFileSync(f, "utf8");
  let text = before;
  for (const [wp, c] of Object.entries(map)) {
    text = text.split(wp).join(c.url);
    text = text.split(`"${wp.slice(WP.length)}"`).join(`"${c.url}"`).split(`\`${wp.slice(WP.length)}\``).join(`"${c.url}"`);
  }
  if (text !== before) {
    writeFileSync(f, text);
    changed++;
    console.log(`✎ ${f.slice(root.length + 1)}`);
  }
}

// Medidas reales de cada foto en Cloudinary (las ya existentes pueden tener otro tamaño que en WordPress)
const metaPath = join(root, "src", "content", "images.json");
const meta = JSON.parse(readFileSync(metaPath, "utf8"));
for (const k of Object.keys(meta)) if (k.startsWith(WP)) delete meta[k];
for (const c of Object.values(map)) meta[c.url] = { width: c.width, height: c.height };
writeFileSync(metaPath, JSON.stringify(Object.fromEntries(Object.entries(meta).sort()), null, 2) + "\n");
console.log(`\n${changed} archivos actualizados · images.json con ${Object.keys(meta).length} imágenes`);
