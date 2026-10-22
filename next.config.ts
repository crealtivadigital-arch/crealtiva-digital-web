import type { NextConfig } from "next";

// Redirecciones permanentes para no perder posicionamiento:
// - rutas de la versión anterior de este repo
// - URLs del sitio WordPress que hoy vive en crealtivadigital.com
const legacyRedirects: [string, string][] = [
  // Producción multimedia: los paquetes de video para redes tienen su línea; Movie Maker, la gran escala
  ["/servicios/produccion-multimedia", "/servicios/videos-para-redes-sociales"],
  // Video UGC y Modelos e Influencers se unieron en una sola línea
  ["/servicios/video-ugc", "/servicios/modelos-contenido-organico"],
  ["/servicios/modelos-e-influencers", "/servicios/modelos-contenido-organico"],
  // Versión anterior del repo
  ["/marketing-digital", "/servicios/marketing-digital"],
  ["/trafficker-digital", "/servicios/trafficker-digital"],
  ["/diseno-web", "/servicios/diseno-web"],
  ["/optimizacion-procesos", "/servicios/optimizacion-procesos"],
  ["/produccion-multimedia", "/movie-maker"],
  ["/produccion-multimedia/ugc", "/servicios/modelos-contenido-organico"],
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
  ["/creacion-de-contenido", "/servicios/modelos-contenido-organico"],
  ["/fotografia-gastronomica", "/servicios/fotografia-de-producto"],
  ["/institucionales", "/portafolio"],
  ["/contctanos", "/contactanos"],
  ["/about", "/"],
  ["/feed", "/news"],
];

// Secciones enteras de WordPress (sitemap viejo: entradas por fecha, proyectos de demo, categorías, autor)
const legacyPatterns: [string, string][] = [
  ["/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*", "/news"],
  ["/project/:slug*", "/portafolio"],
  ["/category/:slug*", "/news"],
  ["/tag/:slug*", "/news"],
  ["/author/:slug*", "/"],
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        // Miniaturas de los videos de YouTube del portafolio
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async redirects() {
    return [
      ...legacyRedirects.flatMap(([source, destination]) => [
        { source, destination, permanent: true },
        { source: `${source}/`, destination, permanent: true },
      ]),
      ...legacyPatterns.map(([source, destination]) => ({ source, destination, permanent: true })),
      // Fichas de paquete de las líneas unidas: mismo paquete, nueva línea
      ...[
        ["video-ugc", "modelos-contenido-organico"],
        ["modelos-e-influencers", "modelos-contenido-organico"],
        ["produccion-multimedia", "videos-para-redes-sociales"],
      ].map(([old, line]) => ({
        source: `/servicios/${old}/:paquete`,
        destination: `/servicios/${line}/:paquete`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
