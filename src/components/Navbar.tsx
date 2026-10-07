"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WA_DIAGNOSTICO } from "@/lib/constants";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Portafolio", href: "/portafolio" },
  { label: "News", href: "/news" },
  { label: "Contáctanos", href: "/contactanos" },
];

const CTA_LABEL = "Agenda tu diagnóstico";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `px-3 py-2 rounded-lg transition-colors hover:text-teal hover:bg-white/5 ${
      isActive(href) ? "text-teal" : "text-white/70"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-grotesk font-bold text-white text-base tracking-tight flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-xs font-black text-white">C</span>
          Crealtiva Digital
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-sans">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={WA_DIAGNOSTICO}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 bg-magenta text-white font-grotesk font-semibold text-sm px-5 py-2 rounded-full hover:bg-magenta-light transition-colors"
        >
          {CTA_LABEL}
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
          aria-expanded={mobileOpen}
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy border-t border-white/5 px-6 py-4 flex flex-col gap-1 text-sm font-sans">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={linkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WA_DIAGNOSTICO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex justify-center bg-magenta text-white font-grotesk font-semibold px-5 py-2.5 rounded-full hover:bg-magenta-light transition-colors"
          >
            {CTA_LABEL}
          </a>
        </div>
      )}
    </header>
  );
}
