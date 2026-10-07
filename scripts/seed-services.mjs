// Genera src/content/services.json a partir del catálogo de productos de la carpeta madre
// (../catalogo-productos.md, exportado del sistema de productos). Uso: node scripts/seed-services.mjs
//
// Solo publica lo que ve el cliente: descripción, qué incluye, qué no incluye, PVP y complementos (upsells)
// con su PVP. Ignora a propósito todo lo interno: costos de producción, economía, márgenes, piso de venta,
// "costo de gestión"/"te queda" de los upsells, promociones y distribución interna.
//
// Las líneas que el catálogo no trae (Producción Multimedia, Optimización de Procesos) se definen aquí a mano.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const catalogPath = join(here, "..", "..", "catalogo-productos.md");
const out = join(here, "..", "src", "content", "services.json");
const WP = "https://crealtivadigital.com/wp-content/uploads/"; // temporal hasta migrar a Cloudinary

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const usd = (amount, mode, note) => ({ amount, currency: "USD", mode, ...(note ? { note } : {}) });
const money = (s) => Number(String(s).replace(/USD|\s/g, "").replace(/\./g, "").replace(",", "."));

// ── Limpieza de redacción del catálogo (texto interno → texto publicable) ──
const typos = [
  [/\bCarrusell\b|\bCarrucell\b|\bCARRUELL\b|\bCARRUSELL\b/gi, "carrusel"],
  [/\b(\d+) carrusel\b/gi, "$1 carruseles"],
  [/\((\d+) slices?\)|\((\d+) slice\)/gi, "($1$2 láminas)"],
  [/\bslices?\b/gi, "láminas"],
  [/\bwhstapp\b|\bWhatspp\b|\bWhatsapp\b/g, "WhatsApp"],
  [/\bTiktok\b|\btiktok\b/g, "TikTok"],
  [/\bLinkedin\b|\blinkedin\b/g, "LinkedIn"],
  [/\bIntagram\b/g, "Instagram"],
  [/\bADS\b|\bADs\b/g, "Ads"],
  [/\bgraficas\b/g, "gráficas"],
  [/\bGraficas\b/g, "Gráficas"],
  [/\bFotografias\b/g, "fotografías"],
  [/\bcolecciónes\b/g, "colecciones"],
  [/\bhotizontal\b/g, "horizontal"],
  [/\bpernas\b/g, "personas"],
  [/\bDufision\b/g, "Difusión"],
  [/\bdespues\b/g, "después"],
  [/\bde el\b/g, "del"],
  [/\bPromocion\b/g, "promoción"],
  [/\borganico\b/g, "orgánico"],
  [/\bGestion\b/g, "Gestión"],
  [/\bPagina\b/g, "página"],
  [/\bcatalogo\b/g, "catálogo"],
  [/\bcontinúe\b/g, "continua"],
  [/\ble mercado\b/g, "el mercado"],
  [/\bse su pagina\b/g, "de su página"],
  [/\bgastronómico y esquema\b/g, "gastronómica y esquema"],
  [/\ben de Quito\b/g, "en Quito"],
  [/\s+·\s*$/g, ""],
  [/\s{2,}/g, " "],
];
const fix = (s) => typos.reduce((t, [re, rep]) => t.replace(re, rep), s).trim();

// ── Parser del catálogo ───────────────────────────────────────────────────
function parseCatalog(md) {
  const products = [];
  let category = null;
  let p = null;
  let section = null;
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    let m;
    if ((m = line.match(/^## (.+?) \(\d+\)$/))) {
      category = m[1];
      p = null;
      continue;
    }
    if ((m = line.match(/^### (.+)$/)) && category) {
      p = { category, name: m[1].trim(), recurrence: "", desc: [], includes: [], excludes: [], pvp: null, card: null, upsells: [], notes: [] };
      products.push(p);
      section = "fields";
      continue;
    }
    if (!p) continue;
    if (line === "**Descripción y enfoque**") section = "desc";
    else if (line === "**Qué incluye**") section = "includes";
    else if (line === "**Qué no incluye**") section = "excludes";
    else if (line === "#### Precios") section = "prices";
    else if (line === "#### Upsells") section = "upsells";
    else if (line === "#### Datos anteriores") section = "notes";
    else if (/^#### /.test(line)) section = "skip"; // costos, economía (interno), promociones
    else if (line === "---") section = null;
    else if (section === "fields" && (m = line.match(/^\| Recurrencia \| (.+) \|$/))) p.recurrence = m[1];
    else if (section === "desc" && line.trim()) p.desc.push(line.trim());
    else if ((section === "includes" || section === "excludes") && line.startsWith("- ")) p[section].push(line.slice(2));
    else if (section === "prices" && (m = line.match(/^\| Precio base \(PVP\) \| (.+) \|$/))) p.pvp = money(m[1]);
    else if (section === "prices" && (m = line.match(/^\| Precio con tarjeta.*\| (.+) \|$/))) p.card = money(m[1]);
    else if (section === "upsells" && line.startsWith("| ") && !/^\| (Upsell|---)/.test(line)) {
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.length >= 4) p.upsells.push({ name: cells[0], detail: cells[1], pvp: money(cells[3]) });
    } else if (section === "notes" && line.trim()) p.notes.push(line.trim());
  }
  return products;
}

// Ítems de "qué incluye": quita guiones sobrantes y separadores, y une "1 Producción/mes:" con su detalle.
function cleanItems(items) {
  const outItems = [];
  for (let i = 0; i < items.length; i++) {
    let t = items[i].replace(/^[-\s]+/, "").trim();
    if (!t || /^-+$/.test(t) || /^Cantidad de Contenido General Mensual$/i.test(t)) continue;
    if (/Producción\/mes:\s*(\+.*)?$/i.test(t)) {
      // "1 Producción/mes: + 1 visita" seguido de "13 videos ·", "24 gráficas ·"...
      const parts = [];
      while (i + 1 < items.length && !/:\s*/.test(items[i + 1].replace(/^[-\s]+/, "")) && !/^-+$/.test(items[i + 1].replace(/^[-\s]+/, "").trim() || "-")) {
        parts.push(items[++i].replace(/^[-\s]+/, "").replace(/\s*·\s*$/, "").trim());
      }
      const extra = (t.match(/\+\s*(.+)$/) || [])[1];
      t = `1 producción al mes${extra ? ` (+ ${extra.trim()})` : ""}${parts.length ? `: ${parts.join(" · ")}` : ""}`;
    }
    outItems.push(fix(t.replace(/:$/, "")));
  }
  return outItems.filter(Boolean);
}

const notesText = (p) => p.notes.join(" ").replace(/\s+/g, " ");
const noteField = (p, key) => (notesText(p).match(new RegExp(`${key}:\\s*([^·]+?)(?:\\s·|\\s-\\s|$)`)) || [])[1]?.trim();

// Nombre comercial limpio y descripción → tagline + resumen
const names = {
  "CREALTIVA TASTY POPULAR": "Crealtiva Tasty Popular",
  "Crealtiva Bite Tiktok": "Crealtiva Bite TikTok",
  "Crealtiva Bite Linkedin": "Crealtiva Bite LinkedIn",
  "CREALTIVA TASTY BUSINESS": "Crealtiva Tasty Business",
  "CREALTIVA ELEMENTAL": "Crealtiva Elemental",
  "CREALTIVA Full House": "Crealtiva Full House",
  "1 Loading Page De Conversión": "Landing Page de Conversión",
  "Sitio Web - Portafolio Comercial Digital Completa": "Portafolio Comercial Digital",
  "Sitio Web - Web Corporativa Started": "Web Corporativa Started",
  "Sitio Web - Web Institucional Express": "Web Institucional Express",
  "Meta ADS": "Meta Ads Starter",
  "Google Campaña de Búsqueda en Palabras Clave": "Google Ads Búsqueda",
  "Google Campaña - Multimedia & Video": "Google Ads Multimedia y Video",
  "Trend Authority by tiktok": "TikTok Trend Authority",
  "Meta ADS Pro Crecimiento": "Meta Ads Pro Crecimiento",
  "Videos - Brand Growth": "Brand Growth",
  "E-commerce - catalogo completo": "E-commerce Catálogo Completo",
  "Fashion Fotografia": "Fotografía de Moda",
  "Fotografía Gastronómico": "Fotografía Gastronómica",
  "Modelo para Fotografia": "Modelo para Fotografía",
  "Modelo Para Videos Redes sociales": "Modelo para Videos de Redes Sociales",
  "Contenido para campañas Publicitarias": "Contenido para Campañas Publicitarias",
};

function describe(p) {
  const first = fix(p.desc.join(" ").replace(/\s+/g, " "));
  // "Meta Ads · Campaña..." → quitar el prefijo de plataforma (ya va como etiqueta)
  const body = first.replace(/^(Meta|Google|TikTok) Ads · /, "");
  const dash = body.split(" — ");
  if (dash.length > 1 && dash[0].length <= 60) {
    const rest = dash.slice(1).join(" — ").replace(/^—\s*/, "").trim();
    return { tagline: dash[0].replace(/[—\s]+$/, "").trim(), summary: rest };
  }
  return { tagline: undefined, summary: body };
}

const categoryToLine = {
  "Marketing digital": "marketing-digital",
  "Páginas web": "diseno-web",
  "Traffiker / Ads": "trafficker-digital",
  "Producción · Video UGC": "video-ugc",
  "Producción · Fotografía": "fotografia-de-producto",
  "Modelos e Influencers": "modelos-e-influencers",
};

// Paquete destacado ("Más elegido") por línea
const featured = new Set(["Crealtiva Tasty Popular", "Web Corporativa Started", "Despunte con Meta", "Brand Growth", "E-commerce Catálogo Completo", "Modelo para Videos de Redes Sociales"]);

function toPackage(p, order) {
  const lineSlug = categoryToLine[p.category];
  const name = fix(names[p.name] ?? p.name);
  const { tagline, summary } = describe(p);
  const notes = notesText(p);
  const details = [];
  let badge;
  let mode = p.recurrence === "Mensual" ? "mensual" : "fijo";

  const vig = noteField(p, "Vigencia");
  const inv = noteField(p, "Inversión sugerida");
  if (lineSlug === "trafficker-digital") {
    badge = p.desc.join(" ").match(/^(Meta|Google|TikTok) Ads/)?.[0] ?? (/TikTok/.test(name) ? "TikTok Ads" : undefined);
    if (vig) details.push({ label: "Vigencia", value: fix(vig) });
    if (inv) details.push({ label: "Inversión sugerida en anuncios", value: fix(inv.replace(/\)$/, ")")) });
  }
  if (lineSlug === "fotografia-de-producto") {
    const cat = noteField(p, "Categoría");
    if (cat) badge = cat;
    if (/Precio desde/.test(notes)) mode = "desde";
  }
  if (lineSlug === "diseno-web") {
    const take = (re, label) => {
      const hit = p.includes.find((i) => re.test(i));
      if (hit) details.push({ label, value: fix(hit.replace(re, "").replace(/^[:\s]+/, "").replace(/\.$/, "")) });
    };
    take(/^Tiempo de entrega:?/i, "Tiempo de entrega");
    take(/^Estructura web:?/i, "Estructura");
    if (/Sistemas Institucionales/.test(name)) mode = "desde";
  }
  if (lineSlug === "marketing-digital" || lineSlug === "modelos-e-influencers") {
    // Los planes de marketing son mensuales aunque algún producto no lo marque
    if (lineSlug === "marketing-digital") mode = "mensual";
  }

  const ideal = notes.match(/Ideal para:\s*(.+?)(?:\s-\s|$)/)?.[1];
  const idealFor = ideal ? ideal.split(",").map((s) => fix(s)).filter(Boolean) : [];

  // Exclusiones: quita notas que son en realidad la inversión sugerida (ya va en detalles)
  const excludes = cleanItems(p.excludes).map((e) => e.replace(/\s*\(Inversión sugerida:.*$/, "").replace(/^No incluye:?\s*/i, "").replace(/^./, (c) => c.toUpperCase()));

  return {
    slug: slugify(name),
    lineSlug,
    name,
    tagline: tagline ? fix(tagline) : undefined,
    badge,
    summary,
    includes: cleanItems(p.includes).filter((i) => !(lineSlug === "diseno-web" && /^(Tiempo de entrega|Estructura web)/i.test(i))),
    excludes,
    idealFor,
    details,
    addons: p.upsells.map((u) => ({ name: fix(u.name.replace(/^CAMPAÑAS ADS/, "Campañas Ads")), detail: fix(u.detail), price: usd(u.pvp, "fijo") })),
    price: usd(p.pvp, mode, p.card && mode === "mensual" ? `Con tarjeta (+5%): $${p.card.toLocaleString("es-EC")}` : undefined),
    featured: featured.has(name),
    order,
  };
}

// ── Correcciones editoriales ──────────────────────────────────────────────
// Donde la redacción del catálogo interno no sirve tal cual para el cliente, se reescribe aquí
// SIN cambiar precios ni alcance. Si el catálogo cambia, revisar que estos textos sigan siendo ciertos.
const elementalIncludes = [
  "Estrategia de Social SEO y planificación mensual por canal",
  "Meta (Facebook + Instagram): 4 videos, 6 gráficas, 2 carruseles y 12 historias",
  "TikTok: 12 videos y 12 historias",
  "LinkedIn: 4 videos, 2 carruseles y 6 gráficas",
  "Calibración de WhatsApp Business (información y catálogo de productos)",
  "Calibración de Google Business Profile y Google Maps",
  "Community manager en Meta, TikTok, LinkedIn, Google Business y WhatsApp Business",
];
const overrides = {
  "Crealtiva Elemental": {
    tagline: "El crecimiento",
    summary: "Alto impacto y crecimiento multiplataforma: estrategia independiente para Meta, TikTok y LinkedIn, con una campaña activa de Meta Ads gestionada.",
    includes: [...elementalIncludes, "Gestión y monitoreo de 1 campaña segmentada en Meta Ads", "1 producción al mes + 1 visita de contenido", "Volumen mensual: 13 videos, 24 gráficas y 24 historias"],
    excludes: ["Presupuesto de pauta publicitaria", "Atención de los mensajes de clientes en WhatsApp", "Los mensajes de las plataformas se redirigen a tu WhatsApp o canal de ventas"],
  },
  "Crealtiva Full House": {
    tagline: "Todo un departamento de marketing",
    summary: "Todo un departamento de marketing para tu empresa: estrategia multiplataforma, dos campañas gestionadas, CRM y chatbot de ventas integrados.",
    includes: [...elementalIncludes, "Gestión y monitoreo de 2 campañas segmentadas en Meta Ads o Google Ads", "1 producción al mes + 2 visitas de contenido", "Volumen mensual: 13 videos, 24 gráficas y 24 historias", "Sistema de CRM para tu equipo comercial", "Chatbot integrado de gestión de ventas"],
    excludes: ["Presupuesto de pauta publicitaria", "Atención de los mensajes de clientes en WhatsApp", "Los mensajes de las plataformas se redirigen a tu WhatsApp o canal de ventas"],
  },
  "Crealtiva Tasty Popular": {
    includes: ["Estrategia de Social SEO y planificación mensual", "Community manager en Facebook e Instagram + reposteo en TikTok", "Calibración técnica completa para máximo alcance orgánico", "Calibración de Facebook, Instagram, LinkedIn y WhatsApp Business", "Creador de contenido (modelo) para la producción del mes", "1 producción al mes: 8 videos, 12 gráficas y 12 historias"],
  },
  "Crealtiva Tasty Business": {
    summary: "Posiciona tu marca como la opción preferida mediante Social SEO estratégico, con presencia en Facebook, Instagram y LinkedIn y un creador de contenido para la producción mensual.",
    includes: ["Estrategia de Social SEO y planificación mensual", "Community manager en Facebook e Instagram + gestión de LinkedIn", "Calibración técnica completa para máximo alcance orgánico", "Calibración de Facebook, Instagram, LinkedIn y WhatsApp Business", "1 producción al mes: 8 videos, 4 carruseles (3 láminas) y 12 historias"],
  },
  "Crealtiva Bite TikTok": {
    tagline: "El despegue en TikTok",
    summary: "Empieza la gestión de TikTok con una dirección continua que refuerza tu posición en el mercado.",
  },
  "Landing Page de Conversión": {
    tagline: "Una página, un objetivo",
    summary: "Página única con un objetivo y cierre de venta específico para un producto o servicio. Pensada como punto de llegada de tus campañas de Meta, Google o TikTok Ads.",
    includes: ["Dominio provisional para la campaña (vigencia de 1 a 3 meses)", "Alojada en nuestro hosting y servidores", "Sin valor de mantenimiento anual", "Diseño optimizado para teléfonos", "Conexión con tu sistema de anuncios: Google Ads, Meta Ads o TikTok Ads", "Verificación de eventos y respuesta de píxeles"],
    excludes: ["Gestión de las campañas de anuncios", "Presupuesto de pauta", "Calibración de la información y enlaces de tus perfiles en redes sociales"],
  },
  "Fotografía de Productos": {
    tagline: "Identidad visual premium",
    summary: "Fotografía de detalle con control estricto de reflejos e iluminación dirigida para destacar acabados metálicos, cuero o cristal. Para marcas que venden lujo, exclusividad y estatus.",
    capacity: "Hasta 15 productos",
  },
  "E-commerce Catálogo Completo": {
    tagline: "Volumen y consistencia digital",
    summary: "Iluminación fija e invariable para que la foto del producto 1 y la del 50 sean técnicamente idénticas. Consistencia total para tu tienda online.",
    capacity: "Hasta 50 productos",
  },
  "Fotografía de Moda": {
    tagline: "Textiles con caída y color fiel",
    summary: "Fotografía de estudio con luz suave para evitar sombras duras en textiles. Retoque enfocado en la caída de las prendas y la fidelidad del color.",
    capacity: "Hasta 8 outfits",
  },
  "Fotografía Gastronómica": {
    tagline: "Lanzamientos y campañas",
    summary: "Iluminación lateral o contraluz para resaltar brillos, texturas, vapor y humedad: los detalles que activan el apetito.",
    capacity: "Hasta 8 platos",
  },
  "Corporate Retainer": {
    tagline: "Video institucional",
    summary: "Video institucional con dirección de guion y estructura de escenas, entregado en versión horizontal y vertical.",
  },
  "Video Reels Start": {
    summary: "Genera confianza visual inmediata con un actor real. Ideal para marcas que desean contenido de video continuo.",
  },
  "Contenido Influencer Made": {
    tagline: "Colaboración con influencer",
    summary: "El influencer crea contenido a su estilo que tu marca puede usar en etiquetas colaborativas, menciones en historias y campañas de Ads de 30 días. El presupuesto se ajusta al perfil elegido.",
  },
  "Modelo para Fotografía": { summary: "Modelo para sesiones fotográficas de producto. Ideal para tiendas de ropa y marcas de experiencia." },
  "Modelo para Videos de Redes Sociales": { summary: "Modelo para filmación de videos orgánicos para redes sociales. Ideal para tiendas de ropa y marcas de experiencia." },
  "Contenido para Campañas Publicitarias": { summary: "Modelo para filmación y fotografía de campañas publicitarias, con derechos de uso en anuncios incluidos." },
  "Sistemas Institucionales a Medida": { tagline: "Plataformas transaccionales" },
};

function applyOverrides(pkg) {
  const o = overrides[pkg.name];
  if (!o) return pkg;
  const { capacity, ...rest } = o;
  if (capacity) pkg.details = [{ label: "Capacidad", value: capacity }, ...pkg.details];
  return { ...pkg, ...rest };
}

// Web: "Etiqueta: detalle" → solo el detalle con mayúscula inicial, y montos legibles
const balanceParens = (t) => ((t.match(/\(/g) || []).length > (t.match(/\)/g) || []).length ? `${t})` : t);
const tidyWebItem = (t) =>
  balanceParens(
    t
      .replace(/^Mantenimiento y garantía:\s*\$0\.00 USD durante el primer año \(a partir del segundo año: \$(\d+)\.00 USD\/año\)\.?/i, "Mantenimiento y garantía incluidos el primer año (desde el segundo año: $$$1 al año)")
      .replace(/^Límite de páginas:.*$/i, "Páginas adicionales: la cantidad se define al inicio del proyecto; ampliarla después se cotiza aparte")
      .replace(/\.$/, "")
  );

// ── Construcción ──────────────────────────────────────────────────────────
const products = parseCatalog(readFileSync(catalogPath, "utf8"));
const packages = [];
const counters = {};
for (const p of products) {
  const line = categoryToLine[p.category];
  if (!line) throw new Error(`Categoría sin línea asignada: ${p.category}`);
  counters[line] = (counters[line] ?? 0) + 1;
  let pkg = toPackage(p, counters[line]);
  if (line === "diseno-web")
    pkg = {
      ...pkg,
      // El precio "desde" ya se muestra en el panel; el texto interno de cotización de referencia contradice el PVP
      includes: pkg.includes.filter((i) => !/^Cotización inicial de referencia/i.test(i)).map(tidyWebItem),
      excludes: pkg.excludes.map(tidyWebItem),
    };
  if (line === "trafficker-digital")
    // Vigencia e inversión sugerida ya van en el panel de detalles
    pkg = { ...pkg, includes: pkg.includes.filter((i) => !/^(Vigencia|Inversión sugerida):/i.test(i)) };
  pkg = applyOverrides(pkg);
  // Mayúscula inicial en todas las listas
  for (const k of ["includes", "excludes", "idealFor"]) pkg[k] = pkg[k].map((s) => s.replace(/^./, (c) => c.toUpperCase()));
  packages.push(pkg);
}

// Líneas fuera del catálogo: paquetes a mano (fuente: PRODUCTOS Y SERVICIOS.md y web anterior)
const manual = (lineSlug, list) =>
  list.forEach((p, i) =>
    packages.push({ slug: slugify(p.name), lineSlug, excludes: [], idealFor: [], addons: [], featured: false, order: i + 1, ...p })
  );

manual("produccion-multimedia", [
  { name: "Identidad Institucional", tagline: "Presentación corporativa", summary: "Para renovar la imagen en tu web, Instagram o cartas de presentación B2B. Se enfoca en la esencia del negocio, su infraestructura o procesos clave.", videos: 2, set: "1 hora en locación", price: usd(95, "fijo") },
  { name: "Contenido Starter", tagline: "Arranque con contenido constante", summary: "Para marcas que arrancan el mes con pauta activa o un flujo constante de contenido orgánico en redes.", videos: 6, set: "2 horas de producción intensiva", price: usd(160, "fijo"), featured: true },
  { name: "Full Content Mensual", tagline: "Parrilla completa del mes", summary: "Cubre la parrilla de contenido de todo un mes (2 a 3 publicaciones semanales) o varios embudos de venta en Meta Ads.", videos: 10, set: "2 h 30 min a 3 horas de rodaje", price: usd(200, "fijo") },
].map(({ videos, set, ...p }) => ({
  ...p,
  includes: [`${videos} videos profesionales (Reels / TikToks de hasta 1 min)`, `Tiempo de set: ${set}`, "Movilización en Quito y Valles + equipos profesionales", "Edición, color, sonido y subtítulos"],
  details: [{ label: "Videos", value: String(videos) }, { label: "Tiempo de set", value: set }, { label: "Valor por video", value: `$${(p.price.amount / videos).toFixed(2)}` }],
})));

manual("optimizacion-procesos", [
  { name: "Automatizaciones", badge: "Nivel 01", tagline: "Alta eficiencia inmediata", summary: "Flujos que resuelven tareas repetitivas sin intervención humana. La entrada más accesible a la eficiencia operativa.", includes: ["Clasificación automática de correos y leads", "Reportes centralizados desde múltiples fuentes", "Notificaciones automáticas por WhatsApp o email", "Sincronización entre herramientas (CRM, hojas de cálculo, apps)", "Chatbots de atención básica 24/7"], details: [{ label: "Herramientas", value: "n8n · Make · Zapier" }], price: usd(null, "cotizar") },
  { name: "Agentes con IA", badge: "Nivel 02", tagline: "Razonamiento autónomo", summary: "Agentes que cubren funciones especializadas, toman decisiones y ejecutan tareas complejas de forma autónoma.", includes: ["Asistente de atención al cliente inteligente", "Control y gestión de inventarios", "Facturación y seguimiento de pagos", "Análisis de datos y generación de informes", "Seguimiento y nutrición de prospectos"], details: [{ label: "Herramientas", value: "Modelos de IA + n8n" }], price: usd(null, "cotizar"), featured: true },
  { name: "Ecosistemas", badge: "Nivel 03", tagline: "Departamentos completos con IA", summary: "Varios agentes coordinados para gestionar ventas, atención, operaciones y logística de forma autónoma.", includes: ["Diseño del ecosistema por departamento", "Agentes coordinados entre sí", "Integración con tus sistemas actuales", "Panel de seguimiento y métricas"], details: [{ label: "Herramientas", value: "Arquitectura a medida" }], price: usd(null, "cotizar") },
]);

// Desde: precio mínimo de una línea (o de los paquetes que cumplan un filtro)
const minPrice = (line, filter = () => true) => {
  const prices = packages.filter((p) => p.lineSlug === line && filter(p) && p.price.amount !== null).map((p) => p.price.amount);
  return prices.length ? `Desde $${Math.min(...prices)}` : "A cotizar";
};

const faq = (pairs) => pairs.map(([q, a]) => ({ q, a }));

const lines = [
  {
    slug: "marketing-digital",
    name: "Marketing Digital",
    tagline: "Tu departamento de marketing externo",
    summary: "Estrategia, producción de contenido, community management y reportes en una suscripción mensual.",
    intro: "Operamos como tu departamento de marketing externo: estrategia, producción mensual de contenido, publicación, comunidad y métricas en Meta, TikTok y LinkedIn. Sin armar un equipo interno.",
    keyPoints: ["Estrategia y plan de contenido mensual", "Producción mensual de videos, gráficas e historias", "Community manager en Meta, TikTok o LinkedIn", "Calibración y optimización de tus perfiles"],
    cover: [`2026/02/portada-nico-y-alexis.webp`, "Estrategas de Crealtiva Digital planificando contenido"],
    highlights: [
      { value: minPrice("marketing-digital"), label: "Plan mensual" },
      { value: "4–13", label: "Videos al mes" },
      { value: "Meta · TikTok · LinkedIn", label: "Canales" },
      { value: "3 meses", label: "Periodo sugerido" },
    ],
    alwaysIncluded: [],
    process: [
      { title: "Diagnóstico", detail: "Auditamos tu presencia actual y definimos el plan ideal." },
      { title: "Estrategia", detail: "Diseñamos el calendario y los ejes de contenido del mes." },
      { title: "Producción", detail: "Grabación y producción de todo el contenido del mes." },
      { title: "Gestión", detail: "Publicación, comunidad y reportes de métricas mensuales." },
    ],
    extras: null,
    conditions: [
      { title: "Propiedad intelectual", detail: "El cliente recibe los formatos finales (.mp4, .jpg). Los archivos crudos y editables son propiedad de Crealtiva Digital." },
      { title: "Periodo de maduración", detail: "Se sugiere un mínimo de 3 meses para que los algoritmos y la estrategia entreguen métricas relevantes." },
      { title: "Inversión en anuncios", detail: "El presupuesto de pauta no está incluido: se paga directamente a Meta, TikTok o Google." },
      { title: "Pago con tarjeta", detail: "Los pagos con tarjeta tienen un recargo del 5% sobre el precio base." },
    ],
    faqs: faq([
      ["¿Cuánto tiempo tarda en verse resultados?", "Los primeros cambios visibles (consistencia y engagement inicial) se notan entre las semanas 3 y 4. Para evaluar conversiones y crecimiento sostenido sugerimos un periodo mínimo de 3 meses."],
      ["¿Necesito firmar un contrato de permanencia?", "No hay permanencia forzosa: trabajamos con compromisos mensuales renovables. Aun así, recomendamos 3 meses para que la estrategia entregue métricas relevantes."],
      ["¿El presupuesto de pauta está incluido?", "No. El presupuesto de anuncios se paga directamente a la plataforma desde tu tarjeta. Los planes Elemental y Full House incluyen la gestión de campañas, no la inversión."],
      ["¿Qué plan me conviene si solo quiero una red social?", "Los planes Bite están pensados para un solo canal: Bite Meta (Facebook e Instagram), Bite TikTok o Bite LinkedIn."],
      ["¿Puedo cambiar de plan durante el servicio?", "Sí. Puedes escalar o ajustar tu plan según las necesidades de tu negocio en cada etapa."],
    ]),
    order: 1,
  },
  {
    slug: "produccion-multimedia",
    name: "Producción Multimedia",
    tagline: "Video profesional para tu marca",
    summary: "Videos institucionales, corporativos y de contenido grabados en 4K con dirección y postproducción profesional.",
    intro: "Producimos en locación en Quito y Valles: video institucional, contenido para redes y material para pauta, con grabación 4K, audio profesional y postproducción con criterio de retención.",
    keyPoints: ["Grabación nativa en 4K con ópticas profesionales", "Audio profesional y postproducción completa", "Videos institucionales, corporativos y para redes", "Movilización en Quito y Valles incluida"],
    cover: ["2026/04/fotografa-scaled.webp", "Fotógrafa de Crealtiva con cámara profesional"],
    highlights: [
      { value: "4K UHD", label: "Grabación nativa" },
      { value: "9:16 · 16:9", label: "Según plataforma" },
      { value: "Quito y Valles", label: "Movilización incluida" },
    ],
    alwaysIncluded: [
      { title: "Captura de alta fidelidad", detail: "Grabación nativa en 4K UHD con ópticas profesionales para color, iluminación y detalle." },
      { title: "Audio profesional", detail: "Sonido ambiente o voz en off con micrófonos de solapa o de estudio según el tipo de video." },
      { title: "Postproducción Crealtiva", detail: "Edición rítmica, corrección de color, diseño sonoro básico y subtítulos dinámicos." },
    ],
    process: [],
    extras: {
      title: "Proyectos especiales y edición independiente",
      items: [
        { name: "Proyectos de alta complejidad", detail: "Videos institucionales de más de 3 minutos, documentales corporativos, comerciales de TV, eventos masivos o rodajes de más de un día.", price: usd(null, "cotizar") },
        { name: "Cobertura de eventos corporativos", detail: "Premiaciones, conferencias y lanzamientos. Cotización según alcance y horas de producción.", price: usd(null, "cotizar") },
        { name: "Edición de video individual", detail: "Reel de hasta 1 minuto con tus clips: corte de ritmo, color, subtítulos y exportación optimizada.", price: usd(75, "fijo", "Por pieza terminada") },
      ],
    },
    conditions: [],
    faqs: faq([
      ["¿Trabajan en mis instalaciones?", "Sí. Producimos en locación en Quito y Valles, con movilización y equipos profesionales incluidos en los paquetes."],
      ["¿Pueden producir fuera de Quito?", "Sí, trabajamos en todo Ecuador. Los costos de desplazamiento se cotizan según la ubicación y la duración del rodaje."],
      ["¿Pueden hacer video con locución o presentador?", "Sí. Podemos incluir voz en off, presentador en cámara, subtítulos o una combinación. Lo definimos en el brief antes de producir."],
      ["¿Qué pasa con proyectos más grandes?", "Videos institucionales de más de 3 minutos, documentales, comerciales de TV, eventos masivos o rodajes de más de un día se cotizan de forma independiente."],
    ]),
    order: 2,
  },
  {
    slug: "video-ugc",
    name: "Video con Modelos UGC",
    tagline: "Contenido con rostro humano",
    summary: "Videos verticales con actores y creadores de contenido que generan confianza y venden en redes.",
    intro: "Producimos videos con actores reales en formato vertical, con guion, grabación profesional y edición dinámica con subtítulos. Incluyen derechos de imagen para uso digital.",
    keyPoints: ["Actores reales con derechos de imagen incluidos", "Guiones pensados para enganchar en segundos", "Formato vertical 9:16 listo para Reels y TikTok", "Edición dinámica con subtítulos y efectos de sonido"],
    cover: ["2026/04/creacion-d-econtenido-scaled.webp", "Creadora de contenido grabando un video UGC en un restaurante"],
    highlights: [
      { value: minPrice("video-ugc"), label: "Por lote de videos" },
      { value: "4–6", label: "Videos por paquete" },
      { value: "9:16", label: "Formato vertical" },
      { value: "3 meses", label: "Derechos de imagen" },
    ],
    alwaysIncluded: [],
    process: [],
    extras: null,
    conditions: [
      { title: "Derechos de imagen", detail: "Uso digital del contenido con el actor incluido por 3 meses. Las renovaciones se cotizan aparte." },
      { title: "Propiedad intelectual", detail: "El cliente recibe los formatos finales (.mp4). Los archivos crudos y proyectos editables son propiedad de Crealtiva Digital." },
      { title: "Exclusividad de nicho", detail: "No incluida en los paquetes estándar: el mismo actor puede trabajar con otras marcas." },
      { title: "Restricción de IA", detail: "Prohibido usar el contenido o la imagen del actor para entrenar modelos de IA o crear clones digitales." },
    ],
    faqs: faq([
      ["¿Qué es el UGC y por qué funciona?", "Son videos que imitan el estilo del contenido orgánico de los usuarios, pero producidos profesionalmente. Generan cercanía y confianza porque no parecen anuncios tradicionales."],
      ["¿Puedo usar los videos en pauta?", "Sí, dentro del periodo de uso de imagen incluido. Se entregan en formato vertical 9:16 listos para publicar o pautar."],
      ["¿Cuánto dura el derecho de uso de imagen?", "3 meses desde la entrega. Las renovaciones se cotizan aparte."],
      ["¿Dónde se realiza la producción?", "Producimos en Quito, en locaciones del cliente o en locaciones neutras según el concepto del video."],
    ]),
    order: 3,
  },
  {
    slug: "modelos-e-influencers",
    name: "Modelos e Influencers",
    tagline: "Rostros para tu marca",
    summary: "Modelos para fotografía y video, contenido para campañas y colaboraciones con influencers, con derechos de imagen claros.",
    intro: "Ponemos rostro a tu marca: modelos para sesiones de fotos y videos, contenido para campañas publicitarias e influencers que crean a su estilo. Cada servicio define por cuánto tiempo y dónde se puede usar la imagen.",
    keyPoints: ["2 horas de producción y 2 cambios de vestuario", "Derechos de difusión orgánica incluidos", "Extensión para pauta o uso de por vida opcional", "Prohibida la replicación de imagen con IA"],
    cover: ["2026/04/EMLIA-BOOK-16-scaled.webp", "Modelo de contenido de Crealtiva Digital"],
    highlights: [
      { value: minPrice("modelos-e-influencers"), label: "Por sesión" },
      { value: "2 h", label: "De producción" },
      { value: "2 cambios", label: "De vestuario" },
    ],
    alwaysIncluded: [],
    process: [],
    extras: null,
    conditions: [
      { title: "Derechos de difusión", detail: "El uso de la imagen se limita al periodo y al canal indicados en cada servicio. Su uso fuera de ese tiempo requiere una extensión." },
      { title: "Uso en pauta", detail: "Los servicios de contenido orgánico no incluyen uso en campañas de anuncios; puede agregarse como complemento." },
      { title: "Restricción de IA", detail: "Prohibida la replicación o modificación de la imagen del modelo con inteligencia artificial." },
    ],
    faqs: faq([
      ["¿Puedo usar las fotos o videos en anuncios?", "Solo si el servicio lo incluye (Contenido para Campañas Publicitarias) o si agregas el complemento de uso en campañas por 30 días."],
      ["¿Puedo usar la imagen de por vida?", "Sí, con el complemento de derechos de imagen extendidos. Aun así, no se permite replicar la imagen con IA."],
      ["¿Puedo elegir el modelo?", "Sí. Te proponemos perfiles según el estilo de tu marca y tu cliente ideal."],
    ]),
    order: 4,
  },
  {
    slug: "fotografia-de-producto",
    name: "Fotografía de Producto",
    tagline: "Fotografía que convierte producto",
    summary: "Sesiones para e-commerce, gastronomía, moda y marcas premium, con brief visual y edición incluida.",
    intro: "Cada sesión parte de un brief visual aprobado: iluminación, fondos y dirección de arte según el canal donde se venderá tu producto. Entrega editada en 3 a 7 días hábiles.",
    keyPoints: ["Brief visual aprobado antes de cada sesión", "Sesiones para premium, e-commerce, moda y gastronomía", "Edición incluida y entrega en 3 a 7 días hábiles", "Fondos limpios o ambientados según el canal de venta"],
    cover: ["2026/04/produccion-fotos.webp", "Set de fotografía de producto con iluminación de estudio"],
    highlights: [
      { value: minPrice("fotografia-de-producto"), label: "Por sesión" },
      { value: "+300", label: "Sesiones realizadas" },
      { value: "3–7 días", label: "Entrega editada" },
    ],
    alwaysIncluded: [],
    process: [
      { title: "Brief visual", detail: "Objetivo comercial, paleta de ambiente y referencias antes de tocar la cámara." },
      { title: "Moodboard y set", detail: "Props, iluminación y ambientación preparados con criterio." },
      { title: "Sesión dirigida", detail: "Captura técnica con eficiencia de jornada." },
      { title: "Entrega editada", detail: "Selección curada y retoque en 3 a 7 días hábiles." },
    ],
    extras: {
      title: "Proyectos especiales",
      items: [
        { name: "Cobertura de eventos", detail: "Premiaciones, conferencias, lanzamientos corporativos. Cotización según alcance del evento y horas de producción.", price: usd(null, "cotizar") },
        { name: "Arquitectura y real estate", detail: "Fotografía de espacios comerciales, oficinas y propiedades, con ángulos amplios y corrección de líneas.", price: usd(null, "cotizar") },
        { name: "Branding corporativo", detail: "Sesiones de equipo humano, headshots corporativos y fotografía de instalaciones para web y materiales B2B.", price: usd(null, "cotizar") },
      ],
    },
    conditions: [],
    faqs: faq([
      ["¿Trabajan en estudio o se desplazan a mi empresa?", "Ambas opciones: podemos trabajar en un espacio del cliente, en estudio o en locación, según el producto y el estilo definido en el brief."],
      ["¿Cuánto tarda la entrega?", "Entregamos la selección editada en 3 a 7 días hábiles después de la sesión."],
      ["¿Los precios son finales?", "Son precios desde y pueden variar según la complejidad del producto y el alcance final de la sesión."],
    ]),
    order: 5,
  },
  {
    slug: "trafficker-digital",
    name: "Trafficker Digital",
    tagline: "Pauta con tarifa de gestión fija",
    summary: "Campañas en Meta, Google y TikTok Ads con tarifa de gestión fija y creativos incluidos. Tus cuentas siempre son tuyas.",
    intro: "Creamos y gestionamos tus campañas en Meta, Google y TikTok con una tarifa de gestión fija, sin porcentaje sobre tu inversión. El presupuesto de anuncios lo pagas directo a la plataforma.",
    keyPoints: ["Meta, Google y TikTok Ads", "Tarifa de gestión fija, sin porcentaje sobre tu inversión", "Creativos y copys incluidos en cada campaña", "Calibración de píxeles y reporte de resultados"],
    cover: ["2026/02/NICO-PORTADA-scaled.webp", "Especialista de pauta digital revisando campañas"],
    highlights: [
      { value: minPrice("trafficker-digital", (p) => p.badge === "Meta Ads"), label: "Meta Ads" },
      { value: minPrice("trafficker-digital", (p) => p.badge === "Google Ads"), label: "Google Ads" },
      { value: minPrice("trafficker-digital", (p) => p.badge === "TikTok Ads"), label: "TikTok Ads" },
    ],
    alwaysIncluded: [
      { title: "Producción de creativos", detail: "Videos y gráficas según el paquete." },
      { title: "Configuración técnica", detail: "Audiencias, presupuesto y calibración de píxeles." },
      { title: "Gestión activa", detail: "Monitoreo y optimización de las campañas." },
      { title: "Reporte de resultados", detail: "Con aprendizajes y recomendaciones." },
    ],
    process: [],
    extras: null,
    conditions: [
      { title: "Presupuesto de anuncios", detail: "No está incluido: se paga directamente desde la tarjeta del cliente a Meta, Google o TikTok. Cada paquete indica la inversión sugerida." },
      { title: "Cuentas publicitarias", detail: "Las cuentas y los datos de las campañas siempre están a nombre del cliente." },
    ],
    faqs: faq([
      ["¿El presupuesto de pauta está incluido en el servicio?", "No. El presupuesto se paga directamente a Meta, Google o TikTok desde tu tarjeta. Crealtiva cobra únicamente la tarifa de gestión de las campañas."],
      ["¿Cuánto presupuesto necesito para empezar?", "Cada paquete indica una inversión sugerida en anuncios; la ajustamos contigo en el diagnóstico."],
      ["¿Puedo contratar solo un canal?", "Sí. Puedes contratar campañas de Meta, Google o TikTok por separado, o combinarlas según tu presupuesto y objetivos."],
      ["¿Cómo miden el retorno de las campañas?", "Configuramos píxeles y eventos de conversión para rastrear leads, ventas y formularios, y calcular el costo real por resultado."],
      ["¿Cuánto tiempo toma ver resultados?", "Las campañas necesitan al menos 2 a 3 semanas para que el algoritmo aprenda y optimice."],
    ]),
    order: 6,
  },
  {
    slug: "diseno-web",
    name: "Diseño y Desarrollo Web",
    tagline: "Webs que convierten visitas en clientes",
    summary: "Landing pages, webs institucionales y corporativas de pago único, con dominio, correos y garantía técnica el primer año.",
    intro: "Desde una landing para campañas hasta sistemas a medida: webs de pago único con dominio propio, correos corporativos, formulario y WhatsApp integrados, y garantía técnica durante el primer año.",
    keyPoints: ["Pago único, sin mensualidades", "Dominio propio y correos corporativos", "Garantía técnica el primer año", "Panel autogestionable para blog o portafolio"],
    cover: ["2026/06/ECOMMERCE.jpg", "Tienda online en laptop y celular"],
    highlights: [
      { value: minPrice("diseno-web"), label: "Pago único" },
      { value: "1er año", label: "Garantía técnica incluida" },
      { value: "1–6 semanas", label: "Tiempo de entrega" },
    ],
    alwaysIncluded: [],
    process: [],
    extras: null,
    conditions: [
      { title: "Mantenimiento", detail: "El primer año está incluido. A partir del segundo año aplica un valor anual según el producto." },
      { title: "Páginas adicionales", detail: "La cantidad de páginas se define al inicio del proyecto; ampliarla después se cotiza aparte." },
      { title: "Pagos en línea", detail: "Las webs estándar no incluyen carrito ni pasarela de pagos; para tiendas transaccionales está Sistemas Institucionales a Medida." },
    ],
    faqs: faq([
      ["¿Qué necesito tener listo antes de empezar?", "Tu logo en alta resolución (o manual de marca) y los textos principales del sitio. El plazo comienza cuando recibimos todos los materiales."],
      ["¿El dominio está incluido?", "Las webs Express, Started y Portafolio incluyen la configuración de tu dominio propio. La Landing Page usa un dominio provisional durante la campaña."],
      ["¿Qué pasa después del primer año?", "El mantenimiento y la garantía del primer año están incluidos. Desde el segundo año aplica un valor anual según el producto."],
      ["¿Puedo vender en línea con mi web?", "Para carrito y pagos en línea necesitas un sistema a medida; las webs estándar captan clientes por formulario y WhatsApp."],
    ]),
    order: 7,
  },
  {
    slug: "optimizacion-procesos",
    name: "Optimización de Procesos con IA",
    tagline: "Primero auditamos, después automatizamos",
    summary: "Automatizaciones, agentes con IA y ecosistemas que liberan a tu equipo de tareas repetitivas.",
    intro: "Auditamos tus procesos y automatizamos lo que tiene impacto: CRM, bots de WhatsApp, agendamiento, reportes y flujos de venta. Cada proyecto se cotiza según su alcance.",
    keyPoints: ["Primero auditamos, después automatizamos", "Automatizaciones con n8n, Make y Zapier", "Agentes con IA para atención y seguimiento", "Capacitación para que tu equipo sea autónomo"],
    cover: ["2026/06/portada-paginas-web.jpg", "Equipo trabajando con herramientas digitales"],
    highlights: [
      { value: "n8n · Make · Zapier", label: "Herramientas" },
      { value: "24/7", label: "Operación automática" },
    ],
    alwaysIncluded: [],
    process: [
      { title: "Auditoría", detail: "Mapeamos tus procesos y detectamos las tareas repetitivas con mayor impacto." },
      { title: "Diseño", detail: "Definimos el flujo, las herramientas y los indicadores de éxito." },
      { title: "Implementación", detail: "Construimos, probamos y conectamos con tus sistemas actuales." },
      { title: "Acompañamiento", detail: "Capacitamos a tu equipo y ajustamos según los resultados." },
    ],
    extras: null,
    conditions: [],
    faqs: faq([
      ["¿Qué tipo de empresa puede beneficiarse?", "Cualquier empresa con procesos repetitivos: responder las mismas preguntas, mover datos entre sistemas, generar reportes o dar seguimiento a clientes. No hace falta ser una empresa grande."],
      ["¿Cuánto tiempo toma implementar una automatización?", "Las automatizaciones simples se implementan en pocos días; los agentes con IA requieren de 1 a 3 semanas. Los ecosistemas completos tienen plazos según su alcance."],
      ["¿Necesito conocimientos técnicos?", "No. Las implementamos, las probamos y capacitamos a tu equipo para supervisarlas."],
      ["¿Trabajan con el software de mi empresa?", "Si tu software tiene API o webhooks, podemos integrarlo. Si no, evaluamos alternativas en el diagnóstico inicial."],
    ]),
    order: 8,
  },
].map(({ cover, ...l }) => ({ ...l, cover: { src: WP + cover[0], alt: cover[1] }, visible: true }));

// Orden dentro de cada línea: de menor a mayor precio (los "a cotizar" mantienen su orden, al final)
for (const slug of new Set(packages.map((p) => p.lineSlug))) {
  packages
    .filter((p) => p.lineSlug === slug)
    .sort((a, b) => (a.price.amount ?? Infinity) - (b.price.amount ?? Infinity) || a.order - b.order)
    .forEach((p, i) => (p.order = i + 1));
}

// ── Validaciones ──────────────────────────────────────────────────────────
const lineSlugs = new Set(lines.map((l) => l.slug));
const seen = new Set();
for (const p of packages) {
  const key = `${p.lineSlug}/${p.slug}`;
  if (!lineSlugs.has(p.lineSlug)) throw new Error(`Línea inexistente en ${key}`);
  if (seen.has(key)) throw new Error(`Slug duplicado: ${key}`);
  seen.add(key);
  const a = p.price.amount;
  if (!(a === null || (typeof a === "number" && Number.isFinite(a)))) throw new Error(`Precio inválido en ${key}`);
  const blob = JSON.stringify(p);
  // Ninguna cifra o término interno debe llegar al JSON público
  const leak = blob.match(/costo operativo|piso de venta|utilidad|te queda|proveedortecnico|distribución \/ márgenes|colchón|\bcac\b/i);
  if (leak) throw new Error(`Dato interno en ${key}: "${leak[0]}"`);
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify({ lines, packages }, null, 2) + "\n");
console.log(`${lines.length} líneas, ${packages.length} paquetes → ${out}`);
for (const l of lines) console.log(`  ${l.slug}: ${packages.filter((p) => p.lineSlug === l.slug).map((p) => `${p.name} ($${p.price.amount ?? "cotizar"})`).join(", ")}`);
