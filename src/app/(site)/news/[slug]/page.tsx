import { lineHref, tagHref } from "@/lib/content/links";
import PostGallery from "@/components/site/PostGallery";
import type { Metadata } from "next";
import NaturalImage from "@/components/site/NaturalImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/site/PageHeader";
import PostCard from "@/components/site/PostCard";
import SectionTitle from "@/components/site/SectionTitle";
import { formatDate, getPost, getPosts, getServiceLine } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

// Los artículos nuevos del panel se generan al primer pedido, sin volver a desplegar
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    ...(post.tags?.length ? { keywords: post.tags } : {}),
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
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
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
          <NaturalImage img={post.cover} priority sizes="(min-width: 896px) 848px, 100vw" maxHeight={560} className="mx-auto -mt-6 rounded-block" />

          <div
            className="article-body mx-auto mt-12 max-w-2xl"
            // Contenido escrito por el equipo desde el panel de admin (fuente de confianza).
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />

          {post.gallery && post.gallery.length > 0 && (
            <div className="mx-auto mt-14 max-w-3xl">
              <PostGallery photos={post.gallery} />
            </div>
          )}

          {post.links && post.links.length > 0 && (
            <div className="mx-auto mt-12 flex max-w-2xl flex-wrap gap-3">
              {post.links.map((l) => {
                const external = /^https?:/i.test(l.href) && !/^https?:\/\/(www\.)?crealtivadigital\.com/i.test(l.href);
                return (
                  <a
                    key={l.href + l.label}
                    href={l.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center rounded-full bg-teal px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-teal-dark"
                  >
                    {l.label} {external ? "↗" : "→"}
                  </a>
                );
              })}
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center gap-2 border-t border-navy/10 pt-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-navy/40">Etiquetas</span>
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href={tagHref(t)}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-teal ring-1 ring-teal/20 transition-colors hover:bg-teal hover:text-cream"
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}

          {line && (
            <aside className="mx-auto mt-14 max-w-2xl rounded-block bg-navy p-8 text-cream">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal">Servicio relacionado</p>
              <h2 className="mt-3 font-display text-2xl">{line.name}</h2>
              <p className="mt-2 text-cream/60">{line.summary}</p>
              <Link
                href={lineHref(line.slug)}
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
            <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
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
