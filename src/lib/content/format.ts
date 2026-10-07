import type { Price } from "./types";

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
