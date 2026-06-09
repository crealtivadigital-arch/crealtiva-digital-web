import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Crealtiva Digital — Departamento de Marketing Externo",
  description:
    "Agencia de marketing digital en Quito, Ecuador. Gestión de redes sociales, producción audiovisual, diseño web y pauta digital para empresarios del mercado medio-premium.",
  keywords: [
    "marketing digital",
    "agencia marketing Quito",
    "redes sociales Ecuador",
    "diseño web",
    "Meta Ads",
    "Google Ads",
    "TikTok Ads",
    "fotografía para negocios",
  ],
  openGraph: {
    title: "Crealtiva Digital",
    description: "Tu departamento de marketing externo en Quito, Ecuador.",
    url: "https://crealtivadigital.com",
    siteName: "Crealtiva Digital",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
