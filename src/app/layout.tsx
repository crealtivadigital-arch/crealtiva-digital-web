import type { Metadata } from "next";
import { Sansation, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Manual de marca: Sansation Bold solo para H1/H2; Montserrat es la voz de trabajo (cuerpo, UI, botones).
const sansation = Sansation({
  variable: "--font-sansation",
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Crealtiva Digital — Agencia de Marketing Digital en Quito",
    template: "%s | Crealtiva Digital",
  },
  description:
    "Agencia de marketing digital en Quito, Ecuador. Gestión de redes sociales, producción audiovisual, pauta digital, diseño web y automatización de procesos para empresas.",
  keywords: [
    "agencia marketing digital Quito",
    "marketing digital Ecuador",
    "gestión redes sociales Quito",
    "diseño web Ecuador",
    "producción audiovisual Quito",
    "Meta Ads Ecuador",
  ],
  metadataBase: new URL("https://crealtivadigital.com"),
  openGraph: {
    title: "Crealtiva Digital — Departamento de Marketing Externo",
    description: "Tu departamento de marketing externo en Quito, Ecuador.",
    url: "https://crealtivadigital.com",
    siteName: "Crealtiva Digital",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sansation.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
