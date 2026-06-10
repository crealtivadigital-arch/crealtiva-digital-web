import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
