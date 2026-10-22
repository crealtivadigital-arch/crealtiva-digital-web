export const WA = "593959227420";
export const EMAIL = "info@crealtivadigital.com";

export const wa = (msg: string) =>
  `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(msg)}`;

export const WA_DIAGNOSTICO = wa("Hola, quiero agendar mi diagnóstico gratuito con Crealtiva Digital.");
export const WA_COTIZAR = wa("Hola, quiero cotizar un servicio con Crealtiva Digital.");
export const WA_ASESORIA = wa("Hola, quiero solicitar una asesoría para trabajar la estrategia digital de mi empresa.");

// Registro para el staff de modelos (formulario externo; el enlace ya lleva el código de acceso)
export const MODELOS_REGISTRO = "https://marketing.disperflow.com/modelos-registro/e45c5dd0ab7e47dda5afddef8ea8ac5a";

// Datos del responsable para las páginas legales (LOPDP). Los campos en null aún no los ha
// confirmado el cliente: se muestran marcados como "por completar" hasta que se llenen.
export const LEGAL = {
  nombreComercial: "Crealtiva Digital",
  razonSocial: null as string | null,
  ruc: null as string | null,
  domicilio: null as string | null,
  ciudad: "Quito, Ecuador",
  email: EMAIL,
  actualizado: "16 de octubre de 2026",
};

// ID de medición de Google Analytics 4 (es público: sale en el HTML de cada página)
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-HJVTSGR6JR";
