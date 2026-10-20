import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { hasDatabase } from "@/lib/db";
import AdminHeader from "./AdminHeader";

const SECTIONS = [
  { href: "/admin/estadisticas", name: "Estadísticas", text: "Visitas, contactos por WhatsApp, búsquedas en Google y anuncios.", ready: true },
  { href: "/admin/portafolio", name: "Portafolio", text: "Fotos y videos de cada rubro: subir, ordenar, quitar.", ready: true },
  { href: null, name: "Servicios y paquetes", text: "Textos, precios y condiciones de cada línea.", ready: false },
  { href: null, name: "News", text: "Crear y editar artículos.", ready: false },
  { href: null, name: "Presentaciones internas", text: "Material solo para el equipo.", ready: false },
];

export default async function AdminHome() {
  const email = await requireAdmin();
  return (
    <>
      <AdminHeader email={email} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl">Hola</h1>
        <p className="mt-2 text-navy/60">¿Qué quieres actualizar hoy?</p>

        {!hasDatabase && (
          <p className="mt-6 rounded-card bg-magenta/10 p-4 text-sm text-magenta">
            La base de datos todavía no está conectada: puedes mirar, pero los cambios no se guardarán.
          </p>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {SECTIONS.map((s) =>
            s.ready && s.href ? (
              <Link key={s.name} href={s.href} className="rounded-card bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <h2 className="font-display text-xl text-teal">{s.name} →</h2>
                <p className="mt-2 text-sm text-navy/60">{s.text}</p>
              </Link>
            ) : (
              <div key={s.name} className="rounded-card border border-dashed border-navy/15 p-6">
                <h2 className="font-display text-xl text-navy/40">{s.name}</h2>
                <p className="mt-2 text-sm text-navy/40">{s.text}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-navy/30">Próximamente</p>
              </div>
            )
          )}
        </div>
      </main>
    </>
  );
}
