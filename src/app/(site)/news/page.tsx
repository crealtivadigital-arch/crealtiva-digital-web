import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import FilterGrid from "@/components/site/FilterGrid";
import PostCard from "@/components/site/PostCard";
import CTABanner from "@/components/CTABanner";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "News — Ideas de marketing, producción, pauta y web",
  description:
    "Artículos de Crealtiva Digital sobre estrategia de marketing, producción de contenido, pauta digital, diseño web y automatización para empresas en Ecuador.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;
  const categories = [...new Set(rest.map((p) => p.category))];

  return (
    <main>
      <PageHeader
        eyebrow="News"
        title="Ideas claras para hacer crecer tu marca"
        intro="Estrategia, producción, pauta, web y automatización explicadas sin humo, desde lo que hacemos todos los días con nuestros clientes."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "News" }]}
      />

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {!lead ? (
            <p className="text-navy/50">Pronto publicaremos nuestros primeros artículos.</p>
          ) : (
            <>
              <PostCard post={lead} featured />
              {rest.length > 0 && (
                <div className="mt-14">
                  <FilterGrid
                    options={categories.map((c) => ({ value: c, label: c }))}
                    gridClassName="columns-1 gap-6 md:columns-2 lg:columns-3"
                    emptyText="Aún no hay artículos en esta categoría."
                    items={rest.map((p) => ({ key: p.slug, tags: [p.category], node: <PostCard post={p} /> }))}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTABanner
        headline="¿Prefieres que lo hagamos por ti?"
        subtitle="Agenda un diagnóstico sin costo y te mostramos cómo aplicar estas ideas a tu marca."
      />
    </main>
  );
}
