import type { Metadata } from "next";
import Link from "next/link";
import HomeHero from "@/components/home/HomeHero";
import AboutSection from "@/components/home/AboutSection";
import KeyServices from "@/components/home/KeyServices";
import Differentiators from "@/components/home/Differentiators";
import HowWeStart from "@/components/home/HowWeStart";
import ProjectCard from "@/components/site/ProjectCard";
import PostCard from "@/components/site/PostCard";
import SectionTitle from "@/components/site/SectionTitle";
import CTABanner from "@/components/CTABanner";
import { getPosts, getProjects, getServiceLines } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Crealtiva Digital — Departamento de marketing externo en Quito, Ecuador" },
  description:
    "Estrategia, producción multimedia, pauta digital, diseño web y automatización en un solo equipo que opera como tu departamento de marketing. Diagnóstico gratuito.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [lines, projects, posts] = await Promise.all([
    getServiceLines(),
    getProjects({ featured: true }),
    getPosts({ limit: 3 }),
  ]);
  const lineNames = Object.fromEntries(lines.map((l) => [l.slug, l.name]));

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Crealtiva Digital",
    url: "https://crealtivadigital.com",
    email: "info@crealtivadigital.com",
    telephone: "+593959227420",
    address: { "@type": "PostalAddress", addressLocality: "Quito", addressCountry: "EC" },
    areaServed: "Ecuador",
    description: "Departamento de marketing externo: estrategia, producción, pauta, web y automatización.",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      <HomeHero />
      <AboutSection />
      <KeyServices lines={lines} />
      <Differentiators />
      <HowWeStart />

      {projects.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle
              eyebrow="Portafolio"
              title="Trabajos que hablan por nosotros"
              action={
                <Link href="/portafolio" className="text-sm font-semibold text-teal hover:text-navy">
                  Ver todo el portafolio →
                </Link>
              }
            />
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {projects.slice(0, 3).map((p) => (
                <ProjectCard key={p.slug} project={p} lineNames={lineNames} />
              ))}
            </div>
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="bg-cream py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle
              eyebrow="News"
              title="Ideas claras para hacer crecer tu marca"
              action={
                <Link href="/news" className="text-sm font-semibold text-teal hover:text-navy">
                  Ver todos los artículos →
                </Link>
              }
            />
            <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </main>
  );
}
