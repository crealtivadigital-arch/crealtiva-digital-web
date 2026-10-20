import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { getServicesDoc } from "@/lib/content";
import { hasDatabase } from "@/lib/db";
import AdminHeader from "../../../AdminHeader";
import PackageEditor from "./PackageEditor";

export const metadata: Metadata = { title: "Editar paquete" };

export default async function AdminPackagePage({ params }: { params: Promise<{ linea: string; paquete: string }> }) {
  const email = await requireAdmin();
  const { linea, paquete } = await params;
  const doc = await getServicesDoc();
  const line = doc.lines.find((l) => l.slug === linea);
  const pkg = doc.packages.find((p) => p.lineSlug === linea && p.slug === paquete);
  if (!line || !pkg) notFound();
  return (
    <>
      <AdminHeader email={email} title="Servicios" />
      <PackageEditor pkg={pkg} lineName={line.name} lineVisible={line.visible} canSave={hasDatabase} />
    </>
  );
}
