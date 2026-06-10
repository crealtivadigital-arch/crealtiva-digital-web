import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Department from "@/components/Department";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Crealtiva Digital — Agencia de Marketing Digital en Quito, Ecuador",
  description:
    "Somos tu departamento de marketing externo en Quito: redes sociales, pauta digital, producción multimedia, diseño web y automatización de procesos para empresas que quieren crecer.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Department />
      <Process />
      <Testimonials />
      <CTASection />
    </main>
  );
}
