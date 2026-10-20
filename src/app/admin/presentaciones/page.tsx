import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { hasDatabase } from "@/lib/db";
import { getPresentations } from "@/lib/presentations";
import AdminHeader from "../AdminHeader";

export const metadata: Metadata = { title: "Presentaciones" };

export default async function PresentationsPage() {
  const email = await requireAdmin();
  const list = await getPresentations().catch(() => []);
  return (
    <>
      <AdminHeader email={email} title="Presentaciones" />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl">Presentaciones internas</h1>
            <p className="mt-1 text-sm text-navy/60">Solo para el equipo: viven en la base de datos, detrás del login, y no se publican en el sitio.</p>
          </div>
          <Link href="/admin/presentaciones/nueva/editar" className="rounded-full bg-magenta px-5 py-2.5 text-sm font-semibold text-cream hover:bg-magenta-light">
            + Nueva presentación
          </Link>
        </div>
        {!hasDatabase && <p className="mt-5 rounded-card bg-magenta/10 p-4 text-sm text-magenta">La base de datos todavía no está conectada.</p>}

        {list.length === 0 ? (
          <p className="mt-8 rounded-card border border-dashed border-navy/20 p-10 text-center text-navy/50">Todavía no hay presentaciones.</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {list.map((p) => (
              <li key={p.slug} className="rounded-card bg-navy p-6 text-cream">
                <p className="text-xs font-semibold uppercase tracking-widest text-teal">{p.slides.length} diapositivas</p>
                <h2 className="mt-2 font-display text-2xl">{p.title}</h2>
                {p.description && <p className="mt-2 text-sm text-cream/60">{p.description}</p>}
                <div className="mt-5 flex gap-3 text-sm font-semibold">
                  <Link href={`/admin/presentaciones/${p.slug}`} className="rounded-full bg-magenta px-4 py-2 hover:bg-magenta-light">Presentar</Link>
                  <Link href={`/admin/presentaciones/${p.slug}/editar`} className="rounded-full border border-cream/20 px-4 py-2 hover:border-teal hover:text-teal">Editar</Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
