import "server-only";
import { neon } from "@neondatabase/serverless";

// Base de datos del panel (Neon, conectada desde Vercel). Guarda documentos JSON por clave:
// cada clave reemplaza al archivo de src/content/ del mismo nombre. Sin DATABASE_URL
// el sitio sigue leyendo los JSON del repo.

const url = process.env.DATABASE_URL;
const sql = url ? neon(url) : null;

export const hasDatabase = Boolean(sql);

let ready: Promise<unknown> | null = null;
function ensureTable() {
  ready ??= sql!`
    create table if not exists content (
      key text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )`;
  return ready;
}

export async function readDoc<T>(key: string): Promise<T | null> {
  if (!sql) return null;
  await ensureTable();
  const rows = await sql`select data from content where key = ${key}`;
  return rows.length ? (rows[0].data as T) : null;
}

export async function writeDoc(key: string, data: unknown): Promise<void> {
  if (!sql) throw new Error("La base de datos no está conectada (falta DATABASE_URL).");
  await ensureTable();
  await sql`
    insert into content (key, data, updated_at) values (${key}, ${JSON.stringify(data)}::jsonb, now())
    on conflict (key) do update set data = excluded.data, updated_at = now()`;
}

export async function deleteDoc(key: string): Promise<void> {
  if (!sql) throw new Error("La base de datos no está conectada (falta DATABASE_URL).");
  await ensureTable();
  await sql`delete from content where key = ${key}`;
}

export async function docUpdatedAt(key: string): Promise<string | null> {
  if (!sql) return null;
  await ensureTable();
  const rows = await sql`select updated_at from content where key = ${key}`;
  return rows.length ? new Date(rows[0].updated_at).toISOString() : null;
}
