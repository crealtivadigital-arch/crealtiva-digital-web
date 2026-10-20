import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin";
import { getAllPortfolioCategories } from "@/lib/content";
import { hasDatabase } from "@/lib/db";
import imageMeta from "@/content/images.json";
import AdminHeader from "../AdminHeader";
import PortfolioEditor from "./PortfolioEditor";

export const metadata: Metadata = { title: "Portafolio" };

const meta = imageMeta as Record<string, { width: number; height: number }>;

export default async function AdminPortfolioPage() {
  const email = await requireAdmin();
  // Se completan las medidas de las fotos del repo para que viajen con cada foto al guardar
  const categories = (await getAllPortfolioCategories()).map((c) => ({
    ...c,
    photos: c.photos.map((p) => ({ ...meta[p.src], ...p })),
  }));
  return (
    <>
      <AdminHeader email={email} title="Portafolio" />
      <PortfolioEditor categories={categories} canSave={hasDatabase} />
    </>
  );
}
