import type { NextConfig } from "next";

// Redirecciones permanentes para no perder posicionamiento:
// - rutas de la versión anterior de este repo
// - URLs del sitio WordPress que hoy vive en crealtivadigital.com
const legacyRedirects: [string, string][] = [
  // Producción multimedia ahora es Crealtiva Movie Maker
  ["/servicios/produccion-multimedia", "/movie-maker"],
  // Versión anterior del repo
  ["/marketing-digital", "/servicios/marketing-digital"],
  ["/trafficker-digital", "/servicios/trafficker-digital"],
  ["/diseno-web", "/servicios/diseno-web"],
  ["/optimizacion-procesos", "/servicios/optimizacion-procesos"],
  ["/produccion-multimedia", "/movie-maker"],
  ["/produccion-multimedia/ugc", "/servicios/video-ugc"],
  ["/produccion-multimedia/studio", "/movie-maker"],
  ["/produccion-multimedia/eventos", "/movie-maker"],
  ["/contacto", "/contactanos"],
  // WordPress
  ["/marketing-digital-estrategico", "/servicios/marketing-digital"],
  ["/traffiker-digital", "/servicios/trafficker-digital"],
  ["/diseno-y-desarrollo-web", "/servicios/diseno-web"],
  ["/optimizacion-de-procesos-con-ai", "/servicios/optimizacion-procesos"],
  ["/produccion-multimedia-profesional", "/movie-maker"],
  ["/produccion-multimedia-4", "/movie-maker"],
  ["/fotografos-por-horas", "/movie-maker"],
  ["/creacion-de-contenido", "/servicios/video-ugc"],
  ["/fotografia-gastronomica", "/servicios/fotografia-de-producto"],
  ["/institucionales", "/portafolio"],
  ["/contctanos", "/contactanos"],
  ["/about", "/"],
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Temporal: imágenes del sitio WordPress actual. Deben migrarse a Cloudinary
        // antes de apuntar el dominio a esta web, o dejarán de cargar.
        protocol: "https",
        hostname: "crealtivadigital.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return legacyRedirects.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);
  },
};

export default nextConfig;
