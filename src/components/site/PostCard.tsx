import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/content/format";
import type { Post } from "@/lib/content/types";

type Variant = "hero" | "tall" | "wide" | "standard";

interface PostCardProps {
  post: Post;
  variant?: Variant;
}

// Tarjeta del portal de noticias. La variante define el tamaño dentro de la grilla tipo bento.
// En móvil cada tarjeta lleva su altura mínima; desde md la altura la dan las filas de la grilla.
const frame: Record<Variant, string> = {
  hero: "min-h-[420px] md:col-span-2 md:row-span-2",
  tall: "min-h-[420px] md:row-span-2",
  wide: "min-h-[300px] md:col-span-2",
  standard: "min-h-[300px]",
};

const titleSize: Record<Variant, string> = {
  hero: "text-2xl md:text-4xl",
  tall: "text-xl md:text-2xl",
  wide: "text-xl md:text-2xl",
  standard: "text-lg",
};

export default function PostCard({ post, variant = "standard" }: PostCardProps) {
  return (
    <article className={`group relative flex overflow-hidden rounded-block bg-navy ${frame[variant]}`}>
      <Image
        src={post.cover.src}
        alt={post.cover.alt}
        fill
        sizes={variant === "hero" || variant === "wide" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/0" />

      <div className="relative mt-auto w-full p-6 md:p-7">
        <div className="mb-3 flex items-center gap-3 text-xs">
          <span className="rounded-full bg-magenta px-3 py-1 font-semibold text-cream">{post.category}</span>
          <span className="text-cream/60">
            {formatDate(post.publishedAt)} · {post.readingMinutes} min
          </span>
        </div>
        <h3 className={`font-bold leading-tight text-cream ${titleSize[variant]}`}>
          <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {variant !== "standard" && <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-cream/70">{post.excerpt}</p>}
      </div>
    </article>
  );
}
