// Datos de la página de Marketing Digital: familias de paquetes, tabla comparativa y quiz.
// Todo sale de lo que incluye cada paquete en el catálogo (services.json); si el catálogo
// cambia, revisar esta tabla.

export type FamilyId = "bite" | "tasty" | "elemental" | "full-house";

export const families: {
  id: FamilyId;
  name: string;
  tagline: string;
  description: string;
  // Lo que suma frente a la familia anterior ("detalles heredados")
  adds?: { from: string; items: string[] };
  slugs: string[];
}[] = [
  {
    id: "bite",
    name: "Bite",
    tagline: "El despegue · una red",
    description: "Para arrancar o regularizar tu presencia en una sola red, con dirección estratégica, plan mensual y producción.",
    slugs: ["crealtiva-bite-meta", "crealtiva-bite-linkedin", "crealtiva-bite-tiktok"],
  },
  {
    id: "tasty",
    name: "Tasty",
    tagline: "La optimización · posicionamiento",
    description: "Para que tu marca deje de solo publicar y se posicione como la opción preferida de su público.",
    adds: {
      from: "Bite",
      items: ["Estrategia de Social SEO", "Creador de contenido (modelo) para la producción", "Calibración técnica completa de perfiles y WhatsApp Business", "Más videos, gráficas e historias al mes"],
    },
    slugs: ["crealtiva-tasty-popular", "crealtiva-tasty-business"],
  },
  {
    id: "elemental",
    name: "Elemental",
    tagline: "El crecimiento · multiplataforma",
    description: "Estrategia independiente por canal en Meta, TikTok y LinkedIn, con pauta gestionada para crecer en serio.",
    adds: {
      from: "Tasty",
      items: ["Estrategia por canal en Meta, TikTok y LinkedIn", "1 campaña de Meta Ads gestionada", "Google Business Profile y Google Maps", "1 visita de contenido extra al mes"],
    },
    slugs: ["crealtiva-elemental"],
  },
  {
    id: "full-house",
    name: "Full House",
    tagline: "Todo un departamento de marketing",
    description: "El sistema completo: multiplataforma, pauta y herramientas comerciales para vender y dar seguimiento.",
    adds: {
      from: "Elemental",
      items: ["Todo lo de Elemental", "2 campañas en Meta Ads o Google Ads", "2 visitas de contenido al mes", "Sistema de CRM y chatbot de ventas integrados"],
    },
    slugs: ["crealtiva-full-house"],
  },
];

export const familyOf = (slug: string) => families.find((f) => f.slugs.includes(slug))!;

/* ------------------------------------------------------------------ Comparador */

// Valor por fila: texto, true (incluido) o false (no incluido)
type Cell = string | boolean;

export const compareRows: { label: string; values: Record<string, Cell> }[] = [
  {
    label: "Redes gestionadas",
    values: {
      "crealtiva-bite-linkedin": "LinkedIn",
      "crealtiva-bite-meta": "Facebook + Instagram",
      "crealtiva-bite-tiktok": "TikTok",
      "crealtiva-tasty-popular": "Facebook + Instagram (+ reposteo en TikTok)",
      "crealtiva-tasty-business": "Facebook + Instagram + LinkedIn",
      "crealtiva-elemental": "Meta, TikTok, LinkedIn, Google Business y WhatsApp Business",
      "crealtiva-full-house": "Meta, TikTok, LinkedIn, Google Business y WhatsApp Business",
    },
  },
  {
    label: "Estrategia",
    values: {
      "crealtiva-bite-linkedin": "Dirección estratégica y plan mensual",
      "crealtiva-bite-meta": "Dirección estratégica y plan mensual",
      "crealtiva-bite-tiktok": "Dirección estratégica y plan mensual",
      "crealtiva-tasty-popular": "Social SEO y planificación mensual",
      "crealtiva-tasty-business": "Social SEO y planificación mensual",
      "crealtiva-elemental": "Social SEO y planificación por canal",
      "crealtiva-full-house": "Social SEO y planificación por canal",
    },
  },
  {
    label: "Videos al mes",
    values: {
      "crealtiva-bite-linkedin": "4",
      "crealtiva-bite-meta": "4",
      "crealtiva-bite-tiktok": "8",
      "crealtiva-tasty-popular": "8",
      "crealtiva-tasty-business": "8",
      "crealtiva-elemental": "13",
      "crealtiva-full-house": "13",
    },
  },
  {
    label: "Gráficas y carruseles",
    values: {
      "crealtiva-bite-linkedin": "4 carruseles",
      "crealtiva-bite-meta": "6 gráficas · 2 carruseles",
      "crealtiva-bite-tiktok": false,
      "crealtiva-tasty-popular": "12 gráficas",
      "crealtiva-tasty-business": "4 carruseles",
      "crealtiva-elemental": "24 gráficas",
      "crealtiva-full-house": "24 gráficas",
    },
  },
  {
    label: "Historias al mes",
    values: {
      "crealtiva-bite-linkedin": false,
      "crealtiva-bite-meta": "8",
      "crealtiva-bite-tiktok": "8",
      "crealtiva-tasty-popular": "12",
      "crealtiva-tasty-business": "12",
      "crealtiva-elemental": "24",
      "crealtiva-full-house": "24",
    },
  },
  {
    label: "Optimización de perfiles",
    values: {
      "crealtiva-bite-linkedin": "Auditoría y optimización",
      "crealtiva-bite-meta": "Auditoría y optimización",
      "crealtiva-bite-tiktok": "Auditoría y optimización",
      "crealtiva-tasty-popular": "Calibración técnica completa",
      "crealtiva-tasty-business": "Calibración técnica completa",
      "crealtiva-elemental": "Calibración completa + Google Business y Maps",
      "crealtiva-full-house": "Calibración completa + Google Business y Maps",
    },
  },
  {
    label: "Creador de contenido (modelo)",
    values: {
      "crealtiva-bite-linkedin": false,
      "crealtiva-bite-meta": false,
      "crealtiva-bite-tiktok": false,
      "crealtiva-tasty-popular": true,
      "crealtiva-tasty-business": true,
      "crealtiva-elemental": false,
      "crealtiva-full-house": false,
    },
  },
  {
    label: "Producción",
    values: {
      "crealtiva-bite-linkedin": "1 producción al mes",
      "crealtiva-bite-meta": "1 producción al mes",
      "crealtiva-bite-tiktok": "1 producción al mes",
      "crealtiva-tasty-popular": "1 producción al mes",
      "crealtiva-tasty-business": "1 producción al mes",
      "crealtiva-elemental": "1 producción + 1 visita de contenido",
      "crealtiva-full-house": "1 producción + 2 visitas de contenido",
    },
  },
  {
    label: "Pauta gestionada",
    values: {
      "crealtiva-bite-linkedin": "Opcional (+$90 por campaña)",
      "crealtiva-bite-meta": "Opcional (+$90 por campaña)",
      "crealtiva-bite-tiktok": "Opcional (+$90 por campaña)",
      "crealtiva-tasty-popular": "Opcional (+$90 por campaña)",
      "crealtiva-tasty-business": "Opcional (+$90 por campaña)",
      "crealtiva-elemental": "1 campaña en Meta Ads",
      "crealtiva-full-house": "2 campañas en Meta Ads o Google Ads",
    },
  },
  {
    label: "CRM y chatbot de ventas",
    values: {
      "crealtiva-bite-linkedin": false,
      "crealtiva-bite-meta": false,
      "crealtiva-bite-tiktok": false,
      "crealtiva-tasty-popular": false,
      "crealtiva-tasty-business": false,
      "crealtiva-elemental": false,
      "crealtiva-full-house": true,
    },
  },
];

/* ------------------------------------------------------------------------ Quiz */

export type Answers = {
  stage?: "emprendimiento" | "crecimiento" | "consolidada";
  kind?: "digital" | "fisico" | "ambos";
  offer?: "servicios" | "productos" | "ambos";
  web?: "si" | "no";
  networks?: ("meta" | "tiktok" | "linkedin" | "google" | "whatsapp")[];
  pace?: "3m" | "6m" | "paso";
  history?: "agencia" | "propia" | "no";
};

export const questions: {
  id: keyof Answers;
  title: string;
  hint?: string;
  multi?: boolean;
  options: { value: string; label: string; emoji: string }[];
}[] = [
  {
    id: "stage",
    title: "¿En qué etapa está tu negocio?",
    options: [
      { value: "emprendimiento", label: "Emprendimiento", emoji: "🌱" },
      { value: "crecimiento", label: "Empresa en crecimiento", emoji: "📈" },
      { value: "consolidada", label: "Empresa consolidada", emoji: "🏢" },
    ],
  },
  {
    id: "kind",
    title: "¿Cómo es tu negocio?",
    options: [
      { value: "digital", label: "Negocio digital", emoji: "💻" },
      { value: "fisico", label: "Físico, con tienda o local", emoji: "🏪" },
      { value: "ambos", label: "Ambos", emoji: "🔁" },
    ],
  },
  {
    id: "offer",
    title: "¿Qué vendes?",
    options: [
      { value: "servicios", label: "Servicios", emoji: "🤝" },
      { value: "productos", label: "Productos", emoji: "📦" },
      { value: "ambos", label: "Ambos", emoji: "✨" },
    ],
  },
  {
    id: "web",
    title: "¿Tienes página web?",
    options: [
      { value: "si", label: "Sí, ya tengo", emoji: "✅" },
      { value: "no", label: "Todavía no", emoji: "🚧" },
    ],
  },
  {
    id: "networks",
    title: "¿Qué canales son clave para tu negocio?",
    hint: "Puedes marcar más de uno.",
    multi: true,
    options: [
      { value: "meta", label: "Facebook e Instagram", emoji: "📸" },
      { value: "tiktok", label: "TikTok", emoji: "🎵" },
      { value: "linkedin", label: "LinkedIn", emoji: "💼" },
      { value: "google", label: "Google Business y Maps", emoji: "📍" },
      { value: "whatsapp", label: "WhatsApp Business", emoji: "💬" },
    ],
  },
  {
    id: "pace",
    title: "¿Con qué fuerza quieres establecer tu marca?",
    options: [
      { value: "3m", label: "Resultados en 3 meses", emoji: "🚀" },
      { value: "6m", label: "Resultados en 6 meses", emoji: "🎯" },
      { value: "paso", label: "Consolidar paso a paso", emoji: "🧱" },
    ],
  },
  {
    id: "history",
    title: "En los últimos meses, ¿quién ha gestionado tus redes?",
    options: [
      { value: "agencia", label: "Una agencia de marketing", emoji: "🏷️" },
      { value: "propia", label: "Yo o mi equipo", emoji: "🙋" },
      { value: "no", label: "Nadie, aún no las gestionamos", emoji: "⏸️" },
    ],
  },
];

export type Recommendation = { slug: string; alternative?: string; reasons: string[]; tips: { text: string; href: string; label: string }[] };

// Nivel 0 Bite (arranque, una red) · 1 Tasty (posicionamiento) · 2 Elemental (multiplataforma
// con pauta) · 3 Full House (departamento completo con herramientas comerciales).
export function recommend(a: Answers): Recommendation {
  const nets = a.networks ?? [];
  const social = nets.filter((n) => n === "meta" || n === "tiktok" || n === "linkedin").length;
  const reasons: string[] = [];
  let level: number;

  if (a.stage === "consolidada") {
    level = a.pace === "3m" ? 3 : 2;
    reasons.push("Tu empresa ya está consolidada: necesita presencia en varios canales y pauta activa.");
  } else if (a.stage === "crecimiento") {
    level = social >= 3 || (a.pace === "3m" && social >= 2) ? 2 : 1;
    reasons.push("Tu empresa está creciendo: ya no basta con publicar, toca posicionarse.");
  } else {
    level = a.pace === "3m" && social >= 2 ? 1 : 0;
    reasons.push("Estás arrancando: lo primero es una presencia ordenada y constante.");
  }

  // Sin gestión previa, mejor un paso a la vez (salvo empresas consolidadas)
  if (a.history === "no" && level === 2 && a.stage !== "consolidada") {
    level = 1;
    reasons.push("Como aún no gestionas tus redes, conviene construir la base antes de abrir todos los canales.");
  }

  if (a.pace === "3m" && level >= 2) reasons.push("Quieres resultados en 3 meses: la pauta gestionada acelera el alcance.");
  if (a.pace === "paso") reasons.push("Prefieres consolidar paso a paso: el plan puede escalar cuando lo necesites.");

  let slug: string;
  let alternative: string | undefined;
  if (level === 0) {
    const first = nets.includes("meta") ? "meta" : nets.includes("tiktok") ? "tiktok" : nets.includes("linkedin") ? "linkedin" : "meta";
    slug = `crealtiva-bite-${first}`;
    alternative = "crealtiva-tasty-popular";
    reasons.push(`Bite se enfoca en una sola red (${{ meta: "Facebook e Instagram", tiktok: "TikTok", linkedin: "LinkedIn" }[first]}) para empezar con constancia.`);
    if (social > 1) reasons.push("Marcaste más de una red: puedes sumar el reposteo a otra red como complemento.");
  } else if (level === 1) {
    const b2b = nets.includes("linkedin") || a.offer === "servicios";
    slug = b2b && nets.includes("linkedin") ? "crealtiva-tasty-business" : "crealtiva-tasty-popular";
    alternative = "crealtiva-elemental";
    reasons.push(
      slug === "crealtiva-tasty-business"
        ? "LinkedIn es clave para ti: Tasty Business suma tu presencia frente a empresas y profesionales."
        : "Tasty Popular posiciona tu marca en Facebook e Instagram con Social SEO y un creador de contenido.",
    );
  } else if (level === 2) {
    slug = "crealtiva-elemental";
    alternative = a.stage === "consolidada" ? "crealtiva-full-house" : "crealtiva-tasty-popular";
    reasons.push("Elemental trabaja cada canal con su propia estrategia e incluye una campaña de Meta Ads.");
  } else {
    slug = "crealtiva-full-house";
    alternative = "crealtiva-elemental";
    reasons.push("Full House es todo un departamento de marketing: dos campañas, CRM y chatbot de ventas.");
  }

  if ((nets.includes("google") || a.kind === "fisico" || a.kind === "ambos") && level < 2) {
    reasons.push("Para un negocio con local, Google Business y Maps importan: vienen incluidos desde Elemental.");
  }
  if (a.history === "agencia") reasons.push("Si vienes de una agencia, auditamos lo hecho para no empezar de cero.");

  const tips = [];
  if (a.web === "no") {
    tips.push({ text: "Tu web es la matriz de tu presencia digital: te conviene sumarla.", href: "/servicios/diseno-web", label: "Ver sitios web" });
  }
  if (a.offer !== "servicios") {
    tips.push({ text: "Si vendes productos, la fotografía profesional eleva tus vitrinas.", href: "/servicios/fotografia-de-producto", label: "Ver fotografía" });
  }

  return { slug, alternative, reasons, tips };
}

/* ------------------------------------------------------------- Ficha de plan */

// Titular de la ficha: qué resuelve el plan y en qué etapa de la estrategia de crecimiento encaja
export const pitches: Record<string, string> = {
  "crealtiva-bite-meta": "Ordena y activa tu presencia en Facebook e Instagram: el primer paso de tu estrategia de crecimiento.",
  "crealtiva-bite-linkedin": "Construye autoridad profesional en LinkedIn: el primer paso para captar clientes B2B.",
  "crealtiva-bite-tiktok": "Entra a TikTok con dirección y constancia: el primer paso para conectar con un público de alto flujo.",
  "crealtiva-tasty-popular": "Posiciona tu marca como la opción preferida en Facebook e Instagram: la etapa de crecimiento de tu estrategia.",
  "crealtiva-tasty-business": "Posiciónate frente a tu público y frente a empresas, en Meta y LinkedIn: la etapa de crecimiento de tu estrategia.",
  "crealtiva-elemental": "Crece en todas tus plataformas, con estrategia por canal y pauta activa: la etapa multiplataforma de tu estrategia.",
  "crealtiva-full-house": "Todo un departamento de marketing conectado a tus ventas: la etapa de consolidación de tu marca.",
};

// Contenido que se crea cada mes (según "Qué incluye" del catálogo)
export const contentMix: Record<string, { label: string; n: number }[]> = {
  "crealtiva-bite-meta": [{ label: "Videos", n: 4 }, { label: "Gráficas", n: 6 }, { label: "Carruseles", n: 2 }, { label: "Historias", n: 8 }],
  "crealtiva-bite-linkedin": [{ label: "Videos", n: 4 }, { label: "Carruseles", n: 4 }],
  "crealtiva-bite-tiktok": [{ label: "Videos", n: 8 }, { label: "Historias", n: 8 }],
  "crealtiva-tasty-popular": [{ label: "Videos", n: 8 }, { label: "Gráficas", n: 12 }, { label: "Historias", n: 12 }],
  "crealtiva-tasty-business": [{ label: "Videos", n: 8 }, { label: "Carruseles", n: 4 }, { label: "Historias", n: 12 }],
  "crealtiva-elemental": [{ label: "Videos", n: 13 }, { label: "Gráficas", n: 24 }, { label: "Historias", n: 24 }],
  "crealtiva-full-house": [{ label: "Videos", n: 13 }, { label: "Gráficas", n: 24 }, { label: "Historias", n: 24 }],
};

// Las 3 claves de cada plan para el slider de la ficha
export function keySlides(slug: string) {
  const row = (label: string) => compareRows.find((r) => r.label === label)?.values[slug];
  return [
    {
      kicker: "Estrategia",
      title: "Una estrategia de contenido para tu crecimiento",
      body: "Establecemos la estrategia de tu contenido con un calendario de publicaciones que responde al crecimiento de tu marca.",
      chips: [String(row("Estrategia") ?? "Plan mensual")],
    },
    {
      kicker: "Contenido",
      title: "El contenido que creamos cada mes",
      body: "Historias, gráficas, carruseles y videos de información o de venta, producidos para tus redes.",
      mix: contentMix[slug] ?? [],
    },
    {
      kicker: "Gestión",
      title: "Publicamos, gestionamos y medimos",
      body: "El community manager publica, interactúa con tu comunidad y te reporta cómo avanza la gestión de tus redes.",
      chips: [String(row("Redes gestionadas") ?? ""), String(row("Optimización de perfiles") ?? "")].filter(Boolean),
    },
  ];
}
