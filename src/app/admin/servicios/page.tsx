import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { formatPrice, getServicesDoc, SERVICES_KEY } from "@/lib/content";
import { docUpdatedAt, hasDatabase } from "@/lib/db";
import AdminHeader from "../AdminHeader";
import ResetButton from "./ResetButton";

export const metadata: Metadata = { title: "Servicios" };

export default async function AdminServicesPage() {
  const email = await requireAdmin();
  const [{ lines, packages }, updated] = await Promise.all([getServicesDoc(), docUpdatedAt(SERVICES_KEY).catch(() => null)]);
  return (
    <>
      <AdminHeader email={email} title="Servicios" />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl">Servicios y paquetes</h1>
        <p className="mt-1 text-sm text-navy/60">
          {updated
            ? `Editado desde el panel (último cambio: ${new Date(updated).toLocaleString("es-EC", { timeZone: "America/Guayaquil" })}).`
            : "Hoy se muestra el catálogo del repositorio. El primer cambio que guardes pasa a mandar sobre él."}
        </p>
        {!hasDatabase && <p className="mt-5 rounded-card bg-magenta/10 p-4 text-sm text-magenta">La base de datos todavía no está conectada: los cambios no se guardarán.</p>}

        <div className="mt-6 space-y-5">
          {lines.map((l) => {
            const own = packages.filter((p) => p.lineSlug === l.slug);
            return (
              <section key={l.slug} className={`rounded-card bg-white p-5 shadow-sm ${l.visible ? "" : "opacity-60"}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-xl">{l.name}</h2>
                  {!l.visible && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">Oculta</span>}
                  <Link href={`/admin/servicios/${l.slug}`} className="ml-auto rounded-full border border-navy/15 px-3 py-1.5 text-sm font-semibold hover:border-teal hover:text-teal">
                    Editar línea
                  </Link>
                </div>
                <ul className="mt-3 divide-y divide-navy/5">
                  {own.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/admin/servicios/${l.slug}/${p.slug}`} className="flex items-center gap-3 py-2 text-sm hover:text-teal">
                        <span className={`min-w-0 flex-1 truncate ${p.hidden ? "text-navy/40 line-through" : ""}`}>{p.name}</span>
                        {p.featured && <span className="text-xs font-semibold text-teal">Destacado</span>}
                        <span className="shrink-0 font-semibold tabular-nums">
                          {(({ prefix, main, suffix }) => [prefix, main, suffix].filter(Boolean).join(" "))(formatPrice(p.price))}
                        </span>
                        <span aria-hidden className="text-navy/30">›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {updated && <ResetButton />}
      </main>
    </>
  );
}
