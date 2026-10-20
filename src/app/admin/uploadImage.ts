import type { Img } from "@/lib/content/types";
import { signUpload } from "./upload";

// Lado del navegador: pide la firma y sube el archivo a Cloudinary. Devuelve la foto con sus medidas reales.
export async function uploadImage(file: File, section: Parameters<typeof signUpload>[0], sub: string, alt: string): Promise<Img> {
  const ticket = await signUpload(section, sub);
  const body = new FormData();
  body.append("file", file);
  body.append("api_key", ticket.apiKey);
  body.append("timestamp", String(ticket.timestamp));
  body.append("folder", ticket.folder);
  body.append("signature", ticket.signature);
  const res = await fetch(ticket.url, { method: "POST", body });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message ?? "Cloudinary rechazó la imagen.");
  return { src: data.secure_url, alt, width: data.width, height: data.height };
}

// Miniatura liviana para el panel: Cloudinary la reduce sin recortar
export const thumb = (src: string, w = 400) => src.replace("/image/upload/", `/image/upload/c_limit,w_${w},q_auto,f_auto/`);
