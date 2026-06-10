export const WA = "593959227420";
export const EMAIL = "info@crealtivadigital.com";

export const wa = (msg: string) =>
  `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(msg)}`;

export const WA_DIAGNOSTICO = wa("Hola, quiero agendar mi diagnóstico gratuito con Crealtiva Digital.");
export const WA_COTIZAR = wa("Hola, quiero cotizar un servicio con Crealtiva Digital.");
