import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/site/PageHeader";
import PostCard from "@/components/site/PostCard";
import CTABanner from "@/components/CTABanner";
import { getPosts } from "@/lib/content";
import { slugify } from "@/lib/sanitize";

type Props = { params: Promise<{ tag: string }> };

// Las etiquetas nuevas del panel se generan al primer pedido, sin volver a desplegar
export const dynamicParams = true;

async function postsWithTag(tag: string) {
  const posts = (await getPosts()).filter((p) => p.tags?.some((t) => slugify(t) === tag));
  // El nombre visible sale del artículo más reciente que la usa
  const name = posts[0]?.tags?.find((t) => slugify(t) === tag);
  return { posts, name };
}

export async function generateStaticParams() {
  const tags = new Set((await getPosts()).flatMap((p) => (p.tags ?? []).map(slugify)));
  return [...tags].map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const { name } = await postsWithTag(tag);
  if (!name) return {};
  return {
    title: `${name} — News`,
    description: `Artículos de Crealtiva Digital sobre ${name}.`,
    alternates: { canonical: `/news/etiqueta/${tag}` },
  };
}

export default async function EtiquetaPage({ params }: Props) {
  const { tag } = await params;
  const { posts, name } = await postsWithTag(tag);
  if (!name) notFound();

  return (
    <main>
      <PageHeader
        eyebrow="Etiqueta"
        title={`#${name}`}
        intro={`${posts.length} ${posts.length === 1 ? "artículo" : "artículos"} sobre ${name}.`}
        crumbs={[{ label: "Inicio", href: "/" }, { label: "News", href: "/news" }, { label: name }]}
      />
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl columns-1 gap-6 px-6 md:columns-2 lg:columns-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
      <CTABanner
        headline="¿Prefieres que lo hagamos por ti?"
        subtitle="Agenda un diagnóstico sin costo y te mostramos cómo aplicar estas ideas a tu marca."
      />
    </main>
  );
}
