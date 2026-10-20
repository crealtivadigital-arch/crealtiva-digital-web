import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc, { type LegalSection } from "@/components/site/LegalDoc";
import { LEGAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Qué cookies y tecnologías similares usa el sitio de Crealtiva Digital. Actualmente no usamos cookies de analítica, publicidad ni seguimiento.",
  alternates: { canonical: "/politica-de-cookies" },
};

// Si se agrega analítica o píxeles (GA, Meta Pixel), actualizar esta página y añadir el banner de consentimiento.
const sections: LegalSection[] = [
  {
    id: "que-son",
    title: "Qué son las cookies",
    body: (
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar información sobre tu
        visita. Hay tecnologías parecidas, como el almacenamiento local del navegador, a las que también se aplica esta
        política.
      </p>
    ),
  },
  {
    id: "uso",
    title: "Qué cookies usa este sitio",
    body: (
      <>
        <p>
          <strong>Actualmente este sitio no usa cookies de analítica, publicidad, personalización ni seguimiento</strong>
          , ni propias ni de terceros. Tampoco incluye píxeles de redes sociales.
        </p>
        <p>
          El sitio solo podría usar elementos técnicos estrictamente necesarios para funcionar y mantenerse seguro. Esos
          elementos no te identifican ni requieren tu consentimiento.
        </p>
        <p>Por eso no te mostramos un aviso de cookies al entrar.</p>
      </>
    ),
  },
  {
    id: "terceros",
    title: "Servicios de terceros",
    body: (
      <p>
        Cuando haces clic en un enlace a WhatsApp, Instagram, Facebook u otra plataforma, sales de este sitio. Desde
        ese momento se aplican las políticas de cookies y privacidad de esa plataforma.
      </p>
    ),
  },
  {
    id: "gestion",
    title: "Cómo gestionar las cookies",
    body: (
      <p>
        Puedes ver, bloquear o eliminar las cookies desde la configuración de tu navegador (Chrome, Safari, Firefox,
        Edge u otro). Bloquear las cookies técnicas puede afectar el funcionamiento de algunos sitios.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios en esta política",
    body: (
      <>
        <p>
          Si en el futuro incorporamos herramientas de analítica o publicidad, actualizaremos esta política con el
          detalle de cada cookie y te pediremos tu consentimiento antes de activarlas.
        </p>
        <p>
          Si tienes dudas, escríbenos a <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> o revisa nuestra{" "}
          <Link href="/politica-de-privacidad">Política de privacidad</Link>.
        </p>
      </>
    ),
  },
];

export default function PoliticaDeCookies() {
  return (
    <LegalDoc
      title="Política de cookies"
      intro="Qué cookies usa este sitio y cómo puedes gestionarlas."
      sections={sections}
    />
  );
}
