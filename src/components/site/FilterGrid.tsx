"use client";
import { useState } from "react";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterItem {
  key: string;
  tags: string[];
  node: React.ReactNode;
}

interface FilterGridProps {
  options: FilterOption[];
  items: FilterItem[];
  allLabel?: string;
  gridClassName?: string;
  emptyText?: string;
}

// Filtro por chips sobre tarjetas renderizadas en el servidor: la página sigue siendo estática
// y todo el contenido queda en el HTML para Google; el filtro solo oculta tarjetas.
export default function FilterGrid({
  options,
  items,
  allLabel = "Todos",
  gridClassName = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  emptyText = "No hay elementos en esta categoría todavía.",
}: FilterGridProps) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? items.filter((i) => i.tags.includes(active)) : items;

  const chip = (selected: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      selected ? "bg-teal text-white" : "bg-white text-navy/70 hover:bg-teal/10 hover:text-teal"
    }`;

  return (
    <div>
      <div role="group" aria-label="Filtrar" className="mb-10 flex flex-wrap gap-2">
        <button type="button" className={chip(active === null)} aria-pressed={active === null} onClick={() => setActive(null)}>
          {allLabel}
        </button>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={chip(active === o.value)}
            aria-pressed={active === o.value}
            onClick={() => setActive(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className={gridClassName}>
          {visible.map((i) => (
            <div key={i.key} className="contents">
              {i.node}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-navy/50">{emptyText}</p>
      )}
    </div>
  );
}
