import type { NextConfig } from "next";

// Redirecciones permanentes para no perder posicionamiento:
// - rutas de la versión anterior de este repo
// - URLs del sitio WordPress que hoy vive en crealtivadigital.com
const legacyRedirects: [string, string][] = [
  // Versión anterior del repo
  ["/marketing-digital", "/servicios/marketing-digital"],
  ["/trafficker-digital", "/servicios/trafficker-digital"],
  ["/diseno-web", "/servicios/diseno-web"],
  ["/optimizacion-procesos", "/servicios/optimizacion-procesos"],
  ["/produccion-multimedia", "/servicios/produccion-multimedia"],
  ["/produccion-multimedia/ugc", "/servicios/video-ugc"],
  ["/produccion-multimedia/studio", "/servicios/produccion-multimedia"],
  ["/produccion-multimedia/eventos", "/servicios/produccion-multimedia"],
  ["/contacto", "/contactanos"],
  // WordPress
  ["/marketing-digital-estrategico", "/servicios/marketing-digital"],
  ["/traffiker-digital", "/servicios/trafficker-digital"],
  ["/diseno-y-desarrollo-web", "/servicios/diseno-web"],
  ["/optimizacion-de-procesos-con-ai", "/servicios/optimizacion-procesos"],
  ["/produccion-multimedia-profesional", "/servicios/produccion-multimedia"],
  ["/produccion-multimedia-4", "/servicios/produccion-multimedia"],
  ["/fotografos-por-horas", "/servicios/produccion-multimedia"],
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
