"use server";
import { createHash } from "node:crypto";
import { requireAdmin } from "@/lib/admin";

// Firma para que el navegador suba la imagen directo a Cloudinary (el secreto nunca sale del servidor)

const ROOT = "Crealtiva-digital/sitio";
const SECTIONS = ["portafolio", "news", "servicios"] as const;

export interface UploadTicket {
  url: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
}

export async function signUpload(section: (typeof SECTIONS)[number], sub = ""): Promise<UploadTicket> {
  await requireAdmin();
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !apiKey || !secret) throw new Error("Faltan las claves de Cloudinary en el servidor.");
  if (!SECTIONS.includes(section)) throw new Error("Carpeta no permitida.");
  const clean = sub.replace(/[^a-z0-9-]/g, "");
  const folder = [ROOT, section, clean].filter(Boolean).join("/");
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest("hex");
  return { url: `https://api.cloudinary.com/v1_1/${cloud}/image/upload`, apiKey, timestamp, folder, signature };
}
