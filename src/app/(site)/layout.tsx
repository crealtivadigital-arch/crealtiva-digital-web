import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sitio público: menú y pie. El panel /admin tiene su propio layout.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
