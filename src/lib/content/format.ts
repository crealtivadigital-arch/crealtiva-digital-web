import type { Price, Stage } from "./types";

export function formatPrice(price: Price): { main: string; prefix?: string; suffix?: string } {
  if (price.amount === null) return { main: "A cotizar" };
  const main = `$${price.amount.toLocaleString("es-EC")}`;
  switch (price.mode) {
    case "desde":
      return { main, prefix: "Desde" };
    case "mensual":
      return { main, suffix: "/ mes" };
    case "por-lote":
      return { main, suffix: "/ lote" };
    default:
      return { main };
  }
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" });
}

export const STAGES: Record<Stage, { label: string; short: string; description: string; tone: string }> = {
  arranque: {
    label: "Fase de arranque",
    short: "Arranque",
    description: "Estás empezando o necesitas ordenar tu presencia digital.",
    tone: "bg-teal/[0.12] text-teal",
  },
  crecimiento: {
    label: "Fase de crecimiento",
    short: "Crecimiento",
    description: "Ya tienes presencia y quieres más alcance, clientes y ventas.",
    tone: "bg-magenta/[0.12] text-magenta",
  },
  consolidacion: {
    label: "Fase de consolidación",
    short: "Consolidación",
    description: "Quieres operar como marca líder, con un sistema completo y escalable.",
    tone: "bg-green/[0.14] text-green",
  },
};

export const STAGE_ORDER: Stage[] = ["arranque", "crecimiento", "consolidacion"];
