"use client";
import { useState } from "react";
import Link from "next/link";
import { WA_DIAGNOSTICO } from "@/lib/constants";

const navLinks = [
  { label: "Marketing Digital", href: "/marketing-digital" },
  { label: "Trafficker Digital", href: "/trafficker-digital" },
  {
    label: "Producción",
    href: "/produccion-multimedia",
    children: [
      { label: "UGC y Contenido con Actores", href: "/produccion-multimedia/ugc" },
      { label: "Producción Profesional", href: "/produccion-multimedia/studio" },
      { label: "Eventos y Cobertura por Horas", href: "/produccion-multimedia/eventos" },
    ],
  },
  { label: "Diseño Web", href: "/diseno-web" },
  { label: "Automatización AI", href: "/optimizacion-procesos" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);

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
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-white/70 hover:text-teal transition-colors rounded-lg hover:bg-white/5">
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
                  <div className="bg-navy border border-white/10 rounded-card shadow-xl py-2 min-w-[220px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-white/60 hover:text-teal hover:bg-white/5 transition-colors text-sm"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-white/70 hover:text-teal transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <a
          href={WA_DIAGNOSTICO}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 bg-teal text-white font-grotesk font-semibold text-sm px-5 py-2 rounded-full hover:bg-teal-dark transition-colors"
        >
          Diagnóstico Gratis
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
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
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  className="w-full text-left flex items-center justify-between px-2 py-2.5 text-white/70 hover:text-teal transition-colors"
                  onClick={() => setProdOpen(!prodOpen)}
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${prodOpen ? "rotate-180" : ""}`}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {prodOpen && (
                  <div className="pl-4 flex flex-col gap-1 border-l border-white/10 ml-2 mb-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-2 text-white/55 hover:text-teal transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2.5 text-white/70 hover:text-teal transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href={WA_DIAGNOSTICO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex justify-center bg-teal text-white font-grotesk font-semibold px-5 py-2.5 rounded-full hover:bg-teal-dark transition-colors"
          >
            Diagnóstico Gratis
          </a>
        </div>
      )}
    </header>
  );
}
