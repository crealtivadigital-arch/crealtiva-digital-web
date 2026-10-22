import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Medicion from "@/components/site/Medicion";
import { GA4_ID } from "@/lib/constants";

// Sitio público: menú y pie. El panel /admin tiene su propio layout.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Medicion />
      {/* gtag.js en el HTML: sin gtag("config") no envía nada; Medicion lo activa solo en el dominio real */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
    </>
  );
}
