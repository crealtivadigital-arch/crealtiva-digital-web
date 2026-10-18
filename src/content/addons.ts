import type { Extra } from "@/lib/content/types";

// Explicación ampliada de los complementos opcionales (se muestra al pasar el mouse o tocar).
// Base: el detalle del catálogo, más las aclaraciones de Crealtiva. Si un complemento no está
// aquí, se muestra solo el detalle del catálogo.
export type AddonInfo = { icon: "repost" | "design" | "ads" | "community"; what: string; points: string[] };

export function addonInfo(addon: Extra): AddonInfo | undefined {
  const n = addon.name.toLowerCase();
  if (n.includes("reposteo a tiktok")) {
    return {
      icon: "repost",
      what: "Los videos creados para tu plan de Instagram también se publican en TikTok.",
      points: [
        "Se republican principalmente los videos, con descripción y hashtags adaptados a TikTok",
        "Es un reposteo: TikTok no tiene su propio plan de contenido independiente",
        "Ideal para estar presente en TikTok sin abrir una estrategia aparte",
      ],
    };
  }
  if (n.includes("reposteo a instagram")) {
    return {
      icon: "repost",
      what: "Los videos creados para tu plan principal también se publican en Instagram.",
      points: [
        "Se republican principalmente los videos, con descripción y hashtags adaptados a Instagram",
        "Es un reposteo: Instagram no tiene su propio plan de contenido independiente",
        "Ideal para estar presente en Instagram sin abrir una estrategia aparte",
      ],
    };
  }
  if (n.includes("diseño gráfico libre")) {
    return {
      icon: "design",
      what: "Hasta 10 gráficas adicionales al mes, según lo que necesites.",
      points: ["Carruseles, piezas estáticas o historias", "Para promociones, fechas especiales o lanzamientos del mes", "Pensadas para tus canales digitales"],
    };
  }
  if (n.includes("campaña de ads")) {
    const platform = n.includes("tiktok") ? "TikTok Ads" : "Meta Ads";
    return {
      icon: "ads",
      what: `Configuramos y gestionamos una campaña en ${platform} con el contenido del mes.`,
      points: [
        "Calibración, segmentación y optimización de la campaña",
        "La campaña dura aproximadamente 3 semanas",
        "El presupuesto que pagas a la plataforma no está incluido",
      ],
    };
  }
  if (n.includes("community dedicated")) {
    return {
      icon: "community",
      what: "Un community manager más cerca de tu marca, dentro y fuera de las redes.",
      points: [
        "3 visitas al mes a tu negocio, con tomas orgánicas de video y foto",
        "Respuesta a comentarios",
        "Relaciones públicas digitales: etiquetas, menciones, contactos y acompañamiento en eventos",
        "Búsqueda de colaboraciones y oportunidades",
      ],
    };
  }
  return undefined;
}
