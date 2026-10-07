// Convierte los catálogos de la carpeta madre (../*.json) al modelo de src/lib/content/types.ts
// y escribe src/content/services.json. Uso: node scripts/seed-from-catalogs.mjs
//
// Excluye a propósito todo dato interno: distribucionInterna, matrizDistribucionInterna, desglose
// de costos y precios de agencia. Solo publica lo que ve el cliente.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const docs = join(here, "..", "..");
const out = join(here, "..", "src", "content", "services.json");
const load = (f) => JSON.parse(readFileSync(join(docs, f), "utf8"));

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const usd = (amount, mode, note) => ({ amount, currency: "USD", mode, ...(note ? { note } : {}) });
const topics = (arr = []) => arr.map((c) => ({ title: c.tema ?? c.nombre, detail: c.detalle }));
const strings = (arr = []) => arr.map((c) => (typeof c === "string" ? c : c.detalle));
const pkg = (lineSlug, order, p) => ({
  slug: slugify(p.name),
  lineSlug,
  name: p.name,
  tagline: p.tagline,
  badge: p.badge,
  summary: p.summary,
  includes: p.includes ?? [],
  excludes: p.excludes ?? [],
  idealFor: p.idealFor ?? [],
  details: p.details ?? [],
  price: p.price,
  featured: p.featured ?? false,
  order,
});

const lines = [];
const packages = [];

// ── Marketing digital ─────────────────────────────────────────────────────
{
  const c = load("crealtiva-marketing-catalogo.json");
  const r = c.resumenProduccion;
  lines.push({
    slug: "marketing-digital",
    name: "Marketing Digital",
    tagline: "Tu departamento de marketing externo",
    summary: "Estrategia, producción de contenido, community management y reportes en una suscripción mensual.",
    intro:
      "Operamos como tu departamento de marketing externo: estrategia, jornada mensual de producción, publicación, comunidad y métricas. Sin armar un equipo interno.",
    highlights: [
      { value: r.videosMensuales, label: "Videos al mes" },
      { value: r.graficasEHistorias, label: "Gráficas e historias" },
      { value: r.creadoresContenido, label: "Creadores de contenido" },
      { value: "3 meses", label: "Periodo sugerido" },
    ],
    alwaysIncluded: [],
    process: c.proceso.map((p) => ({ title: p.nombre, detail: p.detalle })),
    extras: null,
    conditions: topics(c.condiciones),
    faqs: [],
    order: 1,
    visible: true,
  });
  c.planes.forEach((p, i) => {
    const prod = p.produccionMensual;
    const name = p.codigo
      .toLowerCase()
      .replace(/\b\w/g, (m) => m.toUpperCase());
    packages.push(
      pkg("marketing-digital", i + 1, {
        name,
        tagline: p.tagline,
        summary: p.promesa,
        includes: p.incluye,
        excludes: p.noIncluye,
        idealFor: p.idealPara,
        details: [
          { label: "Videos al mes", value: String(prod.videos) },
          { label: "Gráficas al mes", value: String(prod.graficas) },
          { label: "Historias al mes", value: String(prod.historias) },
          ...(prod.modelos ? [{ label: "Modelos / creadores", value: String(prod.modelos) }] : []),
        ],
        price: usd(p.precio.mensual, "mensual", p.precio.tarjeta ? `Con tarjeta: $${p.precio.tarjeta}` : undefined),
        featured: i === 1,
      })
    );
  });
}

// ── Producción multimedia (de PRODUCTOS Y SERVICIOS.md; solo PVP cliente final) ──
{
  lines.push({
    slug: "produccion-multimedia",
    name: "Producción Multimedia",
    tagline: "Video profesional para tu marca",
    summary: "Videos institucionales, corporativos y de contenido grabados en 4K con dirección y postproducción profesional.",
    intro:
      "Producimos en locación en Quito y Valles: video institucional, contenido para redes y material para pauta, con grabación 4K, audio profesional y postproducción con criterio de retención.",
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
        {
          name: "Proyectos de alta complejidad",
          detail:
            "Videos institucionales de más de 3 minutos, documentales corporativos, comerciales de TV, eventos masivos o rodajes de más de un día.",
          price: usd(null, "cotizar"),
        },
        {
          name: "Cobertura de eventos corporativos",
          detail: "Premiaciones, conferencias y lanzamientos. Cotización según alcance y horas de producción.",
          price: usd(null, "cotizar"),
        },
        {
          name: "Edición de video individual",
          detail: "Reel de hasta 1 minuto con tus clips: corte de ritmo, color, subtítulos y exportación optimizada.",
          price: usd(75, "fijo", "Por pieza terminada"),
        },
      ],
    },
    conditions: [],
    faqs: [],
    order: 2,
    visible: true,
  });
  const mm = [
    {
      name: "Identidad Institucional",
      tagline: "Presentación corporativa",
      summary:
        "Para renovar la imagen en tu web, Instagram o cartas de presentación B2B. Se enfoca en la esencia del negocio, su infraestructura o procesos clave.",
      videos: 2,
      set: "1 hora en locación",
      price: 95,
    },
    {
      name: "Contenido Starter",
      tagline: "Arranque con contenido constante",
      summary: "Para marcas que arrancan el mes con pauta activa o un flujo constante de contenido orgánico en redes.",
      videos: 6,
      set: "2 horas de producción intensiva",
      price: 160,
      featured: true,
    },
    {
      name: "Full Content Mensual",
      tagline: "Parrilla completa del mes",
      summary: "Cubre la parrilla de contenido de todo un mes (2 a 3 publicaciones semanales) o varios embudos de venta en Meta Ads.",
      videos: 10,
      set: "2 h 30 min a 3 horas de rodaje",
      price: 200,
    },
  ];
  mm.forEach((p, i) =>
    packages.push(
      pkg("produccion-multimedia", i + 1, {
        ...p,
        includes: [
          `${p.videos} videos profesionales (Reels / TikToks de hasta 1 min)`,
          `Tiempo de set: ${p.set}`,
          "Movilización en Quito y Valles + equipos profesionales",
          "Edición, color, sonido y subtítulos",
        ],
        details: [
          { label: "Videos", value: String(p.videos) },
          { label: "Tiempo de set", value: p.set },
          { label: "Valor por video", value: `$${(p.price / p.videos).toFixed(2)}` },
        ],
        price: usd(p.price, "fijo"),
      })
    )
  );
}

// ── Video UGC ─────────────────────────────────────────────────────────────
{
  const c = load("crealtiva-video-ugc-catalogo.json");
  const r = c.resumenProduccion;
  lines.push({
    slug: "video-ugc",
    name: "Video con Modelos UGC",
    tagline: "Contenido con rostro humano",
    summary: "Videos verticales con actores y creadores de contenido que generan confianza y venden en redes.",
    intro:
      "Producimos videos con actores reales en formato vertical, con guion, grabación 4K y edición dinámica. Incluyen derechos de imagen para uso digital.",
    highlights: [
      { value: r.videosPorPaquete, label: "Videos por paquete" },
      { value: "4K UHD", label: "Calidad de grabación" },
      { value: r.formato.replace(" vertical optimizado", ""), label: "Formato vertical" },
      { value: "3–5 meses", label: "Derechos de imagen" },
    ],
    alwaysIncluded: [],
    process: [],
    extras: null,
    conditions: topics(c.condiciones),
    faqs: [],
    order: 3,
    visible: true,
  });
  c.paquetes.forEach((p, i) =>
    packages.push(
      pkg("video-ugc", i + 1, {
        name: p.codigo,
        tagline: p.tagline,
        summary: p.promesa,
        includes: p.entregables,
        excludes: p.noIncluye,
        details: [{ label: "Videos", value: String(p.videos) }],
        price: usd(p.precio.pvp, p.precio.modalidad === "por lote" ? "por-lote" : "mensual"),
        featured: i === 1,
      })
    )
  );
}

// ── Fotografía de producto ────────────────────────────────────────────────
{
  const c = load("crealtiva-fotografia-catalogo.json");
  lines.push({
    slug: "fotografia-de-producto",
    name: "Fotografía de Producto",
    tagline: "Fotografía que convierte producto",
    summary: "Sesiones para e-commerce, gastronomía, moda y marcas premium, con brief visual y edición incluida.",
    intro:
      "Cada sesión parte de un brief visual aprobado: iluminación, fondos y dirección de arte según el canal donde se venderá tu producto. Entrega editada en 3 a 7 días hábiles.",
    highlights: [
      { value: "+300", label: "Sesiones realizadas" },
      { value: "3–7 días", label: "Entrega editada" },
      { value: "100%", label: "Fotos editadas" },
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
      items: c.proyectosEspeciales.items.map((x) => ({ name: x.nombre, detail: x.detalle, price: usd(null, "cotizar") })),
    },
    conditions: [],
    faqs: [],
    order: 4,
    visible: true,
  });
  let order = 0;
  for (const cat of c.categorias)
    for (const p of cat.paquetes)
      packages.push(
        pkg("fotografia-de-producto", ++order, {
          name: p.nombreComercial ?? p.nombre,
          tagline: p.nombreComercial ? p.nombre : undefined,
          badge: cat.nombre,
          summary: p.promesa,
          includes: p.incluye,
          details: [
            ...(p.capacidad ? [{ label: "Capacidad", value: p.capacidad }] : []),
            ...(p.tiempos?.length ? [{ label: "Tiempos", value: p.tiempos.join(" · ") }] : []),
          ],
          price:
            p.precio.tipo === "porUnidad"
              ? usd(p.precio.valorMin, "desde", `$${p.precio.valorMin}–$${p.precio.valorMax} por unidad según complejidad`)
              : usd(p.precio.valor, p.precio.tipo === "desde" ? "desde" : "fijo", p.precio.nota),
        })
      );
}

// ── Trafficker digital ────────────────────────────────────────────────────
{
  const c = load("crealtiva-trafficker-catalogo.json");
  lines.push({
    slug: "trafficker-digital",
    name: "Trafficker Digital",
    tagline: "Pauta con fee fijo",
    summary: "Campañas en Meta, Google y TikTok Ads con tarifa de gestión fija. Tus cuentas siempre son tuyas.",
    intro:
      "Gestionamos tu pauta en Meta, Google y TikTok con una tarifa de gestión fija, sin porcentaje sobre tu inversión. El presupuesto de anuncios lo pagas directo a la plataforma.",
    highlights: c.plataformas.map((p) => ({ value: p.rangoGestion.replace(/ USD$/, ""), label: p.nombre })),
    alwaysIncluded: c.incluyeSiempre.map((x) => ({ title: x, detail: "" })),
    process: [],
    extras: null,
    conditions: [
      ...strings(c.condiciones).map((d) => ({ title: "Presupuesto de anuncios", detail: d })),
      ...c.noIncluye.map((d) => ({ title: "No incluido", detail: d })),
    ],
    faqs: [],
    order: 5,
    visible: true,
  });
  c.paquetes.forEach((p, i) =>
    packages.push(
      pkg("trafficker-digital", i + 1, {
        name: p.nombre.startsWith(p.plataforma.split(" ")[0]) ? p.nombre : `${p.plataforma.replace(" Ads", "")} ${p.nombre}`,
        badge: p.plataforma,
        tagline: p.vigencia,
        summary: p.promesa,
        includes: p.incluye,
        details: [
          { label: "Vigencia", value: p.vigencia },
          { label: "Inversión sugerida en anuncios", value: p.inversionSugerida },
        ],
        price: usd(p.precioGestion.valor, p.precioGestion.periodo === "mensual" ? "mensual" : "fijo", "Tarifa de gestión"),
      })
    )
  );
}

// ── Diseño web ────────────────────────────────────────────────────────────
{
  const c = load("crealtiva-web-catalogo.json");
  lines.push({
    slug: "diseno-web",
    name: "Diseño y Desarrollo Web",
    tagline: "Webs que convierten visitas en clientes",
    summary: "Landing pages y webs corporativas de pago único, con SEO técnico y conexión directa a tu CRM.",
    intro:
      "Productos web de pago único con una base técnica que incluye todo desarrollo: SEO técnico, capa de datos para medición y envío inmediato de leads a tu CRM.",
    highlights: [
      { value: "Pago único", label: "Sin mensualidades obligatorias" },
      { value: "100%", label: "Responsivo" },
      { value: "SEO técnico", label: "Incluido" },
    ],
    alwaysIncluded: c.infraestructuraBase.items.map((x) => ({ title: x.nombre, detail: x.detalle })),
    process: [],
    extras: {
      title: "Módulos adicionales",
      items: c.addons.map((a) => ({ name: a.nombre, detail: a.descripcion, price: usd(a.pvp, "fijo") })),
    },
    conditions: topics(c.condiciones),
    faqs: [],
    order: 6,
    visible: true,
  });
  c.productos.forEach((p, i) =>
    packages.push(
      pkg("diseno-web", i + 1, {
        name: p.nombre,
        badge: p.tipo,
        summary: p.enfoque,
        includes: [...(p.incluye ?? [])],
        details: [
          { label: "Tipo", value: p.tipo },
          ...(p.estructura?.length ? [{ label: "Estructura", value: p.estructura.join(" · ") }] : []),
          ...(p.vigencia ? [{ label: "Vigencia", value: p.vigencia }] : []),
        ],
        price: usd(p.pvp, "fijo", "Pago único"),
        featured: i === 2,
      })
    )
  );
}

// ── Optimización de procesos (sin catálogo: niveles de la web actual) ──────
{
  lines.push({
    slug: "optimizacion-procesos",
    name: "Optimización de Procesos con IA",
    tagline: "Primero auditamos, después automatizamos",
    summary: "Automatizaciones, agentes con IA y ecosistemas que liberan a tu equipo de tareas repetitivas.",
    intro:
      "Auditamos tus procesos y automatizamos lo que tiene impacto: CRM, bots de WhatsApp, agendamiento, reportes y flujos de venta. Cada proyecto se cotiza según su alcance.",
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
    faqs: [],
    order: 7,
    visible: true,
  });
  const levels = [
    {
      name: "Automatizaciones",
      tagline: "Alta eficiencia inmediata",
      summary: "Flujos que resuelven tareas repetitivas sin intervención humana. La entrada más accesible a la eficiencia operativa.",
      includes: [
        "Clasificación automática de correos y leads",
        "Reportes centralizados desde múltiples fuentes",
        "Notificaciones automáticas por WhatsApp o email",
        "Sincronización entre herramientas (CRM, hojas de cálculo, apps)",
        "Chatbots de atención básica 24/7",
      ],
      tools: "n8n · Make · Zapier",
    },
    {
      name: "Agentes con IA",
      tagline: "Razonamiento autónomo",
      summary: "Agentes que cubren funciones especializadas, toman decisiones y ejecutan tareas complejas de forma autónoma.",
      includes: [
        "Asistente de atención al cliente inteligente",
        "Control y gestión de inventarios",
        "Facturación y seguimiento de pagos",
        "Análisis de datos y generación de informes",
        "Seguimiento y nutrición de prospectos",
      ],
      tools: "Modelos de IA + n8n",
      featured: true,
    },
    {
      name: "Ecosistemas",
      tagline: "Departamentos completos con IA",
      summary: "Varios agentes coordinados para gestionar ventas, atención, operaciones y logística de forma autónoma.",
      includes: [
        "Diseño del ecosistema por departamento",
        "Agentes coordinados entre sí",
        "Integración con tus sistemas actuales",
        "Panel de seguimiento y métricas",
      ],
      tools: "Arquitectura a medida",
    },
  ];
  levels.forEach((p, i) =>
    packages.push(
      pkg("optimizacion-procesos", i + 1, {
        ...p,
        badge: `Nivel 0${i + 1}`,
        details: [{ label: "Herramientas", value: p.tools }],
        price: usd(null, "cotizar"),
      })
    )
  );
}

// ── FAQs (migradas de la versión anterior del sitio, ajustadas a los catálogos vigentes) ──
const faqs = {
  "marketing-digital": [
    ["¿Cuánto tiempo tarda en verse resultados?", "Los primeros cambios visibles (consistencia y engagement inicial) se notan entre las semanas 3 y 4. Para evaluar conversiones y crecimiento sostenido sugerimos un periodo mínimo de 3 meses."],
    ["¿Necesito firmar un contrato de permanencia?", "No hay permanencia forzosa: trabajamos con compromisos mensuales renovables. Aun así, recomendamos 3 meses para que las estrategias entreguen métricas estadísticamente relevantes."],
    ["¿El presupuesto de pauta está incluido?", "No. En los planes que incluyen pauta, el presupuesto neto de anuncios se paga directamente a Meta, TikTok o Google desde tu tarjeta. Crealtiva gestiona la estrategia, los anuncios y la optimización."],
    ["¿Qué necesito para empezar?", "Una sesión de diagnóstico inicial (gratuita), acceso a tus redes sociales, tu logo en alta resolución y, si lo tienes, tu manual de marca."],
    ["¿Puedo cambiar de plan durante el servicio?", "Sí. Puedes escalar o ajustar tu plan según las necesidades de tu negocio en cada etapa."],
  ],
  "trafficker-digital": [
    ["¿El presupuesto de pauta está incluido en el servicio?", "No. El presupuesto se paga directamente a Meta, Google o TikTok desde tu tarjeta. Crealtiva cobra únicamente la tarifa de gestión de las campañas."],
    ["¿Cuánto presupuesto necesito para empezar?", "Depende del canal y del objetivo. Cada paquete indica una inversión sugerida en anuncios; la ajustamos contigo en el diagnóstico."],
    ["¿Puedo contratar solo un canal?", "Sí. Puedes contratar la gestión de Meta Ads, Google Ads o TikTok Ads por separado, o combinarlos según tu presupuesto y objetivos."],
    ["¿Cómo miden el retorno de las campañas?", "Configuramos píxeles y eventos de conversión en tu sitio o landing page para rastrear leads, ventas y formularios, y calcular el costo real por resultado."],
    ["¿Cuánto tiempo toma ver resultados?", "Las campañas necesitan al menos 2 a 3 semanas para que el algoritmo aprenda y optimice. Los resultados más estables aparecen entre el segundo y el tercer mes."],
  ],
  "video-ugc": [
    ["¿Qué es el UGC y por qué funciona?", "Son videos que imitan el estilo del contenido orgánico de los usuarios, pero producidos profesionalmente. Generan cercanía y confianza porque no parecen anuncios tradicionales."],
    ["¿Puedo usar los videos para Meta Ads o TikTok Ads?", "Sí, dentro del periodo de uso de imagen incluido en tu paquete. Se entregan en formato vertical 9:16 listos para publicar o pautar."],
    ["¿Los actores trabajan exclusivamente con mi marca?", "La exclusividad de nicho está incluida solo en el Paquete 3 (Corporate Retainer): durante la vigencia no producimos el mismo tipo de contenido para un competidor directo."],
    ["¿Cuánto dura el derecho de uso de imagen?", "3 meses en los Paquetes 1 y 2, y 5 meses en el Paquete 3. Las renovaciones se cotizan aparte."],
    ["¿Dónde se realiza la producción?", "Producimos en Quito, en locaciones del cliente o en locaciones neutras según el concepto del video."],
  ],
  "produccion-multimedia": [
    ["¿Trabajan en mis instalaciones?", "Sí. Producimos en locación en Quito y Valles, con movilización y equipos profesionales incluidos en los paquetes."],
    ["¿Pueden producir fuera de Quito?", "Sí, trabajamos en todo Ecuador. Los costos de desplazamiento se cotizan según la ubicación y la duración del rodaje."],
    ["¿Pueden hacer video con locución o presentador?", "Sí. Podemos incluir voz en off, presentador en cámara, subtítulos o una combinación. Lo definimos en el brief antes de producir."],
    ["¿Qué pasa con proyectos más grandes?", "Videos institucionales de más de 3 minutos, documentales, comerciales de TV, eventos masivos o rodajes de más de un día se cotizan de forma independiente."],
  ],
  "fotografia-de-producto": [
    ["¿Trabajan en estudio o se desplazan a mi empresa?", "Ambas opciones: podemos trabajar en un espacio del cliente o en locación, según el tipo de producto y el estilo definido en el brief."],
    ["¿Cuánto tarda la entrega?", "Entregamos la selección editada en 3 a 7 días hábiles después de la sesión."],
    ["¿Los precios son finales?", "Son precios desde (PVP) y pueden variar según la complejidad del producto y el alcance final de la sesión."],
  ],
  "diseno-web": [
    ["¿Qué necesito tener listo antes de empezar?", "Tu logo en alta resolución (o manual de marca) y los textos principales del sitio. El plazo comienza cuando recibimos todos los materiales."],
    ["¿El dominio está incluido?", "No. El dominio lo pagas directamente y queda a tu nombre; es el único costo externo del proyecto."],
    ["¿Cuántas revisiones incluye el proyecto?", "Máximo 2 rondas de revisión por entregable. Los cambios de concepto después de aprobar el brief se cotizan aparte."],
    ["¿Aceptan pagos en cuotas?", "Sí. La estructura típica es 50% al inicio y 50% a la entrega."],
  ],
  "optimizacion-procesos": [
    ["¿Qué tipo de empresa puede beneficiarse?", "Cualquier empresa con procesos repetitivos: responder las mismas preguntas, mover datos entre sistemas, generar reportes o dar seguimiento a clientes. No hace falta ser una empresa grande."],
    ["¿Cuánto tiempo toma implementar una automatización?", "Las automatizaciones simples se implementan en pocos días; los agentes con IA requieren de 1 a 3 semanas. Los ecosistemas completos tienen plazos según su alcance."],
    ["¿Necesito conocimientos técnicos?", "No. Las implementamos, las probamos y capacitamos a tu equipo para supervisarlas."],
    ["¿Trabajan con el software de mi empresa?", "Si tu software tiene API o webhooks, podemos integrarlo. Si no, evaluamos alternativas en el diagnóstico inicial."],
  ],
};
for (const l of lines) l.faqs = (faqs[l.slug] ?? []).map(([q, a]) => ({ q, a }));

// ── Lo clave de cada línea + portada (imágenes del sitio actual, temporal hasta Cloudinary) ──
const WP = "https://crealtivadigital.com/wp-content/uploads/";
const extra = {
  "marketing-digital": {
    cover: ["2026/02/portada-nico-y-alexis.webp", "Estratega de Crealtiva Digital planificando contenido"],
    keyPoints: [
      "Estrategia y calendario antes de publicar",
      "Jornada mensual de producción de videos y gráficas",
      "Community manager en Facebook e Instagram",
      "Reporte mensual de métricas que se traduce en decisiones",
    ],
  },
  "produccion-multimedia": {
    cover: ["2026/04/fotografa-scaled.webp", "Fotógrafa de Crealtiva con cámara profesional"],
    keyPoints: [
      "Grabación nativa en 4K con ópticas profesionales",
      "Audio profesional y postproducción completa",
      "Videos institucionales, corporativos y para redes",
      "Movilización en Quito y Valles incluida",
    ],
  },
  "video-ugc": {
    cover: ["2026/04/creacion-d-econtenido-scaled.webp", "Creadora de contenido grabando un video UGC en un restaurante"],
    keyPoints: [
      "Actores reales con derechos de imagen incluidos",
      "Guiones pensados para enganchar en segundos",
      "Formato vertical 9:16 listo para Reels y TikTok",
      "Exclusividad de nicho en el plan corporativo",
    ],
  },
  "fotografia-de-producto": {
    cover: ["2026/04/produccion-fotos.webp", "Set de fotografía de producto con iluminación de estudio"],
    keyPoints: [
      "Brief visual aprobado antes de cada sesión",
      "Paquetes para premium, e-commerce, moda y gastronomía",
      "Edición incluida y entrega en 3 a 7 días hábiles",
      "Fondos limpios o ambientados según el canal de venta",
    ],
  },
  "trafficker-digital": {
    cover: ["2026/02/NICO-PORTADA-scaled.webp", "Especialista de pauta digital revisando campañas"],
    keyPoints: [
      "Meta, Google y TikTok Ads",
      "Tarifa de gestión fija, sin porcentaje sobre tu inversión",
      "Tus cuentas publicitarias siempre a tu nombre",
      "Creativos, píxeles y reportes incluidos",
    ],
  },
  "diseno-web": {
    cover: ["2026/06/ECOMMERCE.jpg", "Tienda online en laptop y celular"],
    keyPoints: [
      "Landing pages y webs corporativas de pago único",
      "SEO técnico y velocidad optimizada",
      "Leads directo a tu CRM en tiempo real",
      "Módulos adicionales: usuarios, chatbot y cupones",
    ],
  },
  "optimizacion-procesos": {
    cover: ["2026/06/portada-paginas-web.jpg", "Equipo trabajando con herramientas digitales"],
    keyPoints: [
      "Primero auditamos, después automatizamos",
      "Automatizaciones con n8n, Make y Zapier",
      "Agentes con IA para atención y seguimiento",
      "Capacitación para que tu equipo sea autónomo",
    ],
  },
};
for (const l of lines) {
  const e = extra[l.slug];
  l.keyPoints = e.keyPoints;
  l.cover = { src: WP + e.cover[0], alt: e.cover[1] };
}

// Validaciones: slugs únicos por línea y precios bien formados
const seen = new Set();
for (const p of packages) {
  const key = `${p.lineSlug}/${p.slug}`;
  if (seen.has(key)) throw new Error(`Slug duplicado: ${key}`);
  seen.add(key);
  const a = p.price.amount;
  if (!(a === null || (typeof a === "number" && Number.isFinite(a)))) throw new Error(`Precio inválido en ${key}`);
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify({ lines, packages }, null, 2) + "\n");
console.log(`${lines.length} líneas, ${packages.length} paquetes → ${out}`);
for (const l of lines) console.log(`  ${l.slug}: ${packages.filter((p) => p.lineSlug === l.slug).map((p) => p.slug).join(", ")}`);
