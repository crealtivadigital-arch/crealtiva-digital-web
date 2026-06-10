"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-grotesk font-bold text-white text-lg tracking-tight flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-xs font-black">C</span>
          Crealtiva Digital
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-sans text-white/70">
          <a href="#servicios" className="hover:text-teal transition-colors">Servicios</a>
          <a href="#proceso" className="hover:text-teal transition-colors">Proceso</a>
          <a href="#resultados" className="hover:text-teal transition-colors">Resultados</a>
          <a href="#contacto" className="hover:text-teal transition-colors">Contacto</a>
        </nav>

        <a
          href="https://api.whatsapp.com/send?phone=593959227420&text=Hola%2C%20me%20interesa%20un%20diagn%C3%B3stico%20gratuito%20con%20Crealtiva%20Digital"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-teal text-white font-grotesk font-semibold text-sm px-5 py-2 rounded-full hover:bg-teal-dark transition-colors"
        >
          Diagnóstico Gratis
        </a>

        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy border-t border-white/5 px-6 py-4 flex flex-col gap-4 text-sm font-sans text-white/70">
          <a href="#servicios" onClick={() => setOpen(false)} className="hover:text-teal">Servicios</a>
          <a href="#proceso" onClick={() => setOpen(false)} className="hover:text-teal">Proceso</a>
          <a href="#resultados" onClick={() => setOpen(false)} className="hover:text-teal">Resultados</a>
          <a href="#contacto" onClick={() => setOpen(false)} className="hover:text-teal">Contacto</a>
          <a
            href="https://api.whatsapp.com/send?phone=593959227420&text=Hola%2C%20me%20interesa%20un%20diagn%C3%B3stico%20gratuito"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center bg-teal text-white font-grotesk font-semibold px-5 py-2 rounded-full hover:bg-teal-dark transition-colors"
          >
            Diagnóstico Gratis
          </a>
        </div>
      )}
    </header>
  );
}
