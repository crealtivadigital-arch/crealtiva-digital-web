import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { formatDate, getAllPosts } from "@/lib/content";
import { hasDatabase } from "@/lib/db";
import AdminHeader from "../AdminHeader";
import { thumb } from "../uploadImage";

export const metadata: Metadata = { title: "News" };

export default async function AdminNewsPage() {
  const email = await requireAdmin();
  const posts = await getAllPosts();
  return (
    <>
      <AdminHeader email={email} title="News" />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl">News</h1>
            <p className="mt-1 text-sm text-navy/60">{posts.length} artículos · los borradores no se ven en el sitio.</p>
          </div>
          <Link href="/admin/news/nuevo" className="rounded-full bg-magenta px-5 py-2.5 text-sm font-semibold text-cream hover:bg-magenta-light">
            + Nuevo artículo
          </Link>
        </div>

        {!hasDatabase && (
          <p className="mt-5 rounded-card bg-magenta/10 p-4 text-sm text-magenta">La base de datos todavía no está conectada: los cambios no se guardarán.</p>
        )}

        <ul className="mt-6 space-y-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/admin/news/${p.slug}`} className="flex items-center gap-4 rounded-card bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(p.cover.src, 160)} alt="" className="h-16 w-24 shrink-0 rounded-lg bg-cream object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{p.title}</p>
                  <p className="text-xs text-navy/50">
                    {formatDate(p.publishedAt)} · {p.category} · {p.readingMinutes} min
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5 text-xs font-semibold">
                  {p.featured && <span className="rounded-full bg-teal/10 px-2 py-1 text-teal">Destacado</span>}
                  {p.draft ? <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-800">Borrador</span> : <span className="rounded-full bg-[#137333]/10 px-2 py-1 text-[#137333]">Publicado</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
