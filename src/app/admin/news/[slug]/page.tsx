import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { getAllPosts, getServiceLines } from "@/lib/content";
import { hasDatabase } from "@/lib/db";
import imageMeta from "@/content/images.json";
import AdminHeader from "../../AdminHeader";
import PostEditor from "./PostEditor";

export const metadata: Metadata = { title: "Editar artículo" };

const meta = imageMeta as Record<string, { width: number; height: number }>;

export default async function AdminPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const email = await requireAdmin();
  const { slug } = await params;
  const [posts, lines] = await Promise.all([getAllPosts(), getServiceLines()]);
  const post = slug === "nuevo" ? null : posts.find((p) => p.slug === slug);
  if (slug !== "nuevo" && !post) notFound();

  const categories = [...new Set(posts.map((p) => p.category))].sort();
  return (
    <>
      <AdminHeader email={email} title="News" />
      <PostEditor
        post={post ? { ...post, cover: { ...meta[post.cover.src], ...post.cover } } : null}
        categories={categories}
        lines={lines.map((l) => ({ slug: l.slug, name: l.name }))}
        canSave={hasDatabase}
      />
    </>
  );
}
