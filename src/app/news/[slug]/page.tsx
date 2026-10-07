import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/site/PageHeader";
import PostCard from "@/components/site/PostCard";
import SectionTitle from "@/components/site/SectionTitle";
import { formatDate, getPost, getPosts, getServiceLine } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.publishedAt, images: [post.cover.src] },
  };
}

export default async function ArticuloPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const [line, all] = await Promise.all([post.lineSlug ? getServiceLine(post.lineSlug) : undefined, getPosts()]);
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover.src,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Crealtiva Digital" },
    publisher: { "@type": "Organization", name: "Crealtiva Digital", url: "https://crealtivadigital.com" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        eyebrow={post.category}
        title={post.title}
        intro={post.excerpt}
        crumbs={[{ label: "Inicio", href: "/" }, { label: "News", href: "/news" }, { label: post.category }]}
      >
        <p className="text-sm text-cream/50">
          {formatDate(post.publishedAt)} · {post.readingMinutes} min de lectura
        </p>
      </PageHeader>

      <article className="bg-cream pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative -mt-6 aspect-[16/9] overflow-hidden rounded-block">
            <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="(min-width: 896px) 848px, 100vw" className="object-cover" />
          </div>

          <div
            className="article-body mx-auto mt-12 max-w-2xl"
            // Contenido escrito por el equipo desde el panel de admin (fuente de confianza).
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />

          {line && (
            <aside className="mx-auto mt-14 max-w-2xl rounded-block bg-navy p-8 text-cream">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal">Servicio relacionado</p>
              <h2 className="mt-3 font-display text-2xl">{line.name}</h2>
              <p className="mt-2 text-cream/60">{line.summary}</p>
              <Link
                href={`/servicios/${line.slug}`}
                className="mt-6 inline-flex rounded-full bg-magenta px-6 py-3 text-sm font-semibold transition-colors hover:bg-magenta-light"
              >
                Ver paquetes de {line.name.toLowerCase()} →
              </Link>
            </aside>
          )}
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle eyebrow="News" title="Sigue leyendo" />
            <div className="grid gap-6 md:grid-cols-3">
              {more.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
