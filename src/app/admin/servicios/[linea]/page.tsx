import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { getServicesDoc } from "@/lib/content";
import { hasDatabase } from "@/lib/db";
import imageMeta from "@/content/images.json";
import AdminHeader from "../../AdminHeader";
import LineEditor from "./LineEditor";

export const metadata: Metadata = { title: "Editar línea" };

const meta = imageMeta as Record<string, { width: number; height: number }>;

export default async function AdminLinePage({ params }: { params: Promise<{ linea: string }> }) {
  const email = await requireAdmin();
  const { linea } = await params;
  const line = (await getServicesDoc()).lines.find((l) => l.slug === linea);
  if (!line) notFound();
  return (
    <>
      <AdminHeader email={email} title="Servicios" />
      <LineEditor line={line.cover ? { ...line, cover: { ...meta[line.cover.src], ...line.cover } } : line} canSave={hasDatabase} />
    </>
  );
}
