import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { hasDatabase } from "@/lib/db";
import { getPresentation } from "@/lib/presentations";
import AdminHeader from "../../../AdminHeader";
import PresentationEditor from "./PresentationEditor";

export const metadata: Metadata = { title: "Editar presentación" };

export default async function EditPresentationPage({ params }: { params: Promise<{ slug: string }> }) {
  const email = await requireAdmin();
  const { slug } = await params;
  const p = slug === "nueva" ? null : await getPresentation(slug);
  if (slug !== "nueva" && !p) notFound();
  return (
    <>
      <AdminHeader email={email} title="Presentaciones" />
      <PresentationEditor presentation={p ?? null} canSave={hasDatabase} />
    </>
  );
}
