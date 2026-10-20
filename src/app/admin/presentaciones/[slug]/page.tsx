import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { getPresentation } from "@/lib/presentations";
import AdminHeader from "../../AdminHeader";
import Deck from "./Deck";

export const metadata: Metadata = { title: "Presentación" };

export default async function PresentationPage({ params }: { params: Promise<{ slug: string }> }) {
  const email = await requireAdmin();
  const p = await getPresentation((await params).slug);
  if (!p) notFound();
  return (
    <>
      <AdminHeader email={email} title={p.title} />
      <Deck presentation={p} />
    </>
  );
}
