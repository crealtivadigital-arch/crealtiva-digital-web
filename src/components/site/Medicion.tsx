"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Medición del sitio público: GA4 + Google Ads sobre un solo gtag.js.
// Solo se activa en el dominio real: las pruebas en vercel.app o en local no ensucian los datos.
// El panel (/admin/estadisticas) lee estos eventos. Contrato:
//   - enlaces de WhatsApp, mailto: y tel: se miden solos
//   - cualquier elemento con data-evento="…" también (data-servicio / data-ubicacion opcionales)
//   - lectura_25/50/75/100 por página y faq_abierta (data-pregunta)
// ?interno=1 excluye este navegador (equipo); ?interno=0 lo deshace.

const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const ADS = process.env.NEXT_PUBLIC_GADS_ID;
const ADS_WA_LABEL = process.env.NEXT_PUBLIC_GADS_WA_LABEL;
const HOSTS = ["crealtivadigital.com", "www.crealtivadigital.com"];
// EEE, Reino Unido y Suiza: consentimiento denegado por defecto (Consent Mode v2)
const CONSENT_DENIED = "AT BE BG HR CY CZ DK EE FI FR DE GR HU IS IE IT LV LI LT LU MT NL NO PL PT RO SK SI ES SE GB CH".split(" ");
const READ_STEPS = [25, 50, 75, 100];

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let started = false;
let readSent = new Set<number>();

function isInternal() {
  try {
    const flag = new URLSearchParams(location.search).get("interno");
    if (flag === "1") localStorage.setItem("cd_interno", "1");
    if (flag === "0") localStorage.removeItem("cd_interno");
    return localStorage.getItem("cd_interno") === "1";
  } catch {
    return false;
  }
}

function secondsOnSite() {
  try {
    const start = Number(sessionStorage.getItem("cd_inicio")) || Date.now();
    sessionStorage.setItem("cd_inicio", String(start));
    return Math.round((Date.now() - start) / 1000);
  } catch {
    return undefined;
  }
}

function start() {
  if (started) return true;
  if (!GA4 || !HOSTS.includes(location.hostname) || isInternal()) return false;
  started = true;
  window.dataLayer = window.dataLayer || [];
  // gtag necesita recibir el objeto `arguments`, no un array
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  const gtag = window.gtag;
  const consent = { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" };
  gtag("consent", "default", { ...Object.fromEntries(Object.keys(consent).map((k) => [k, "denied"])), region: CONSENT_DENIED });
  gtag("consent", "default", consent);
  gtag("js", new Date());
  if (ADS) gtag("config", ADS);
  gtag("config", GA4);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ADS ?? GA4}`;
  document.head.appendChild(s);
  secondsOnSite();
  return true;
}

// Qué servicio se está mirando: data-servicio o, si no, la ruta (/servicios/linea/paquete → linea/paquete)
function serviceOf(el: Element) {
  const own = el.closest<HTMLElement>("[data-servicio]")?.dataset.servicio;
  if (own) return own;
  const path = location.pathname.replace(/\/$/, "");
  return path.startsWith("/servicios/") ? path.slice("/servicios/".length) : path || "/";
}

function placeOf(el: Element) {
  const own = el.closest<HTMLElement>("[data-ubicacion]")?.dataset.ubicacion;
  if (own) return own;
  if (el.closest("footer")) return "pie";
  if (el.closest("header, nav")) return "menu";
  return el.closest("section")?.id || "pagina";
}

function eventFor(el: HTMLElement): string | null {
  if (el.dataset.evento) return el.dataset.evento;
  const href = el.getAttribute("href") ?? "";
  if (/wa\.me|whatsapp\.com/.test(href)) return "whatsapp_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.startsWith("tel:")) return "phone_click";
  return null;
}

function onClick(e: MouseEvent) {
  const el = (e.target as Element).closest<HTMLElement>("[data-evento], a[href]");
  if (!el || !window.gtag) return;
  const name = eventFor(el);
  if (!name) return;

  const params: Record<string, unknown> = { send_to: GA4, servicio: serviceOf(el), ubicacion: placeOf(el), segundos: secondsOnSite() };
  if (name === "faq_abierta") params.pregunta = (el.dataset.pregunta ?? el.textContent ?? "").trim().slice(0, 100);
  window.gtag("event", name, params);

  // Solo el clic de WhatsApp cuenta como conversión de Google Ads
  if (name !== "whatsapp_click" || !ADS || !ADS_WA_LABEL) return;
  const a = el as HTMLAnchorElement;
  const sameTab = a.target !== "_blank" && !e.metaKey && !e.ctrlKey;
  if (!sameTab) {
    window.gtag("event", "conversion", { send_to: `${ADS}/${ADS_WA_LABEL}` });
    return;
  }
  // En la misma pestaña: primero se envía la conversión, con 900 ms de plazo por si un bloqueador la frena
  e.preventDefault();
  let gone = false;
  const go = () => {
    if (!gone) (gone = true), (location.href = a.href);
  };
  window.gtag("event", "conversion", { send_to: `${ADS}/${ADS_WA_LABEL}`, event_callback: go });
  setTimeout(go, 900);
}

function onScroll() {
  if (!window.gtag) return;
  const doc = document.documentElement;
  const seen = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;
  for (const step of READ_STEPS) {
    if (!readSent.has(step) && seen >= (step === 100 ? 98 : step)) {
      readSent.add(step);
      window.gtag("event", `lectura_${step}`, { send_to: GA4 });
    }
  }
}

export default function Medicion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!start()) return;
    document.addEventListener("click", onClick, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // La lectura se cuenta una vez por vista de página
  useEffect(() => {
    readSent = new Set();
  }, [pathname]);

  return null;
}
