"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { resetServices } from "./actions";

export default function ResetButton() {
  const router = useRouter();
  const [busy, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="mt-10 rounded-card border border-dashed border-magenta/40 p-5 text-sm">
      <p className="font-semibold">Volver al catálogo del repositorio</p>
      <p className="mt-1 text-navy/60">Borra todos los cambios hechos aquí y vuelve a mostrar el catálogo generado desde catalogo-productos.md.</p>
      <button
        type="button"
        disabled={busy}
        onClick={() => {
          if (!window.confirm("¿Borrar TODOS los cambios de servicios hechos desde el panel?")) return;
          start(async () => {
            const res = await resetServices();
            if (res.ok) router.refresh();
            else setError(res.error);
          });
        }}
        className="mt-3 rounded-full border border-magenta px-4 py-2 font-semibold text-magenta hover:bg-magenta hover:text-cream disabled:opacity-50"
      >
        {busy ? "Restableciendo…" : "Restablecer catálogo"}
      </button>
      {error && <p className="mt-2 text-magenta">{error}</p>}
    </div>
  );
}
