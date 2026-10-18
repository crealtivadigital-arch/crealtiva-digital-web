import Link from "next/link";
import NaturalImage from "@/components/site/NaturalImage";
import { formatDate } from "@/lib/content/format";
import type { Post } from "@/lib/content/types";

interface PostCardProps {
  post: Post;
  featured?: boolean;
  compact?: boolean; // versión discreta para listados cortos (home): miniatura al lado del texto
}

// Tarjeta de News. La foto conserva su proporción original; el texto va debajo (o al lado, en la destacada).
export default function PostCard({ post, featured = false, compact = false }: PostCardProps) {
  const meta = (
    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
      <span className="rounded-full bg-magenta px-3 py-1 font-semibold text-cream">{post.category}</span>
      <span className="text-navy/50">
        {formatDate(post.publishedAt)} · {post.readingMinutes} min
      </span>
    </div>
  );

  if (compact) {
    return (
      <article className="group relative flex items-center gap-4 rounded-card bg-white/70 p-3 ring-1 ring-navy/5 transition hover:bg-white hover:shadow-md">
        <div className="w-24 shrink-0">
          <NaturalImage img={post.cover} sizes="96px" maxHeight={96} className="mx-auto rounded-lg" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-magenta">
            {post.category} <span className="font-normal normal-case tracking-normal text-navy/40">· {post.readingMinutes} min</span>
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-navy">
            <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-navy/55">{post.excerpt}</p>
        </div>
      </article>
    );
  }

  if (featured) {
    return (
      <article className="group relative grid items-center gap-8 overflow-hidden rounded-block bg-white p-5 ring-1 ring-navy/5 md:grid-cols-[1.2fr_1fr] md:p-6">
        <NaturalImage img={post.cover} sizes="(min-width: 768px) 600px, 100vw" priority maxHeight={480} className="mx-auto rounded-card" />
        <div className="md:pr-4">
          {meta}
          <h2 className="font-display text-3xl leading-tight text-navy md:text-4xl">
            <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          </h2>
          <p className="mt-4 font-light leading-relaxed text-navy/65">{post.excerpt}</p>
          <span className="mt-6 inline-block text-sm font-semibold text-magenta transition-transform group-hover:translate-x-1">
            Leer artículo →
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative mb-6 break-inside-avoid overflow-hidden rounded-card bg-white ring-1 ring-navy/5">
      <NaturalImage img={post.cover} sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" className="mx-auto" />
      <div className="p-5">
        {meta}
        <h3 className="text-lg font-bold leading-snug text-navy">
          <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-navy/60">{post.excerpt}</p>
      </div>
    </article>
  );
}
