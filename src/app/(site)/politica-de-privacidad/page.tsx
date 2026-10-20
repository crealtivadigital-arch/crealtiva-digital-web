import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc, { Responsable, type LegalSection } from "@/components/site/LegalDoc";
import { LEGAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo Crealtiva Digital trata tus datos personales conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP) y cómo ejercer tus derechos.",
  alternates: { canonical: "/politica-de-privacidad" },
};

const mail = <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>;

const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable del tratamiento",
    body: (
      <>
        <p>
          El responsable del tratamiento de los datos personales recogidos a través de este sitio web es:
        </p>
        <Responsable />
        <p>
          Esta política se rige por la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP) y su
          reglamento.
        </p>
      </>
    ),
  },
  {
    id: "datos",
    title: "Qué datos tratamos",
    body: (
      <>
        <p>
          Este sitio no tiene formularios ni cuentas de usuario. Solo tratamos los datos que tú decides enviarnos
          cuando nos contactas:
        </p>
        <ul>
          <li>
            <strong>Por WhatsApp:</strong> tu número de teléfono, el nombre de tu perfil y el contenido de los
            mensajes.
          </li>
          <li>
            <strong>Por correo electrónico:</strong> tu dirección de correo, tu nombre y la información que
            incluyas en el mensaje.
          </li>
          <li>
            <strong>Datos de tu empresa</strong> que compartas para preparar un diagnóstico o una cotización (nombre
            comercial, sector, redes sociales, objetivos).
          </li>
        </ul>
        <p>
          Además, al navegar el sitio, el proveedor de alojamiento registra de forma automática datos técnicos
          (dirección IP, tipo de navegador, páginas solicitadas y fecha y hora) con fines de seguridad y
          funcionamiento.
        </p>
        <p>No solicitamos datos sensibles ni datos de niñas, niños o adolescentes.</p>
      </>
    ),
  },
  {
    id: "finalidad",
    title: "Para qué los usamos y con qué base legal",
    body: (
      <ul>
        <li>
          <strong>Responder tus consultas, agendar el diagnóstico y enviarte cotizaciones.</strong> Base legal: tu
          consentimiento al escribirnos y la ejecución de medidas precontractuales que tú solicitas.
        </li>
        <li>
          <strong>Prestarte el servicio contratado</strong> y gestionar la facturación. Base legal: la ejecución del
          contrato y el cumplimiento de obligaciones legales y tributarias.
        </li>
        <li>
          <strong>Mantener el sitio seguro y funcionando.</strong> Base legal: nuestro interés legítimo en proteger
          el sitio.
        </li>
      </ul>
    ),
  },
  {
    id: "conservacion",
    title: "Cuánto tiempo los conservamos",
    body: (
      <ul>
        <li>
          <strong>Consultas que no se convierten en contrato:</strong> hasta 12 meses desde el último contacto,
          salvo que nos pidas eliminarlos antes.
        </li>
        <li>
          <strong>Clientes:</strong> mientras dure la relación comercial y, después, durante los plazos que exige la
          normativa tributaria y contable del Ecuador.
        </li>
        <li>
          <strong>Registros técnicos del sitio:</strong> durante el tiempo que los conserva el proveedor de
          alojamiento.
        </li>
      </ul>
    ),
  },
  {
    id: "destinatarios",
    title: "Con quién los compartimos",
    body: (
      <>
        <p>No vendemos ni cedemos tus datos personales. Solo intervienen los proveedores que necesitamos para operar:</p>
        <ul>
          <li>
            <strong>Meta Platforms (WhatsApp)</strong>, si nos contactas por ese canal.
          </li>
          <li>
            <strong>Nuestro proveedor de correo electrónico</strong>, si nos escribes por email.
          </li>
          <li>
            <strong>Vercel Inc.</strong>, que aloja este sitio web.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores procesan datos fuera del Ecuador, principalmente en Estados Unidos. Elegimos
          proveedores que aplican garantías de seguridad y protección de datos reconocidas. Al contactarnos por
          estos canales aceptas esta transferencia internacional, que es necesaria para atender tu solicitud.
        </p>
        <p>
          También podemos entregar datos a autoridades competentes cuando una ley o una orden judicial lo exija.
        </p>
      </>
    ),
  },
  {
    id: "derechos",
    title: "Tus derechos",
    body: (
      <>
        <p>De acuerdo con la LOPDP, puedes ejercer en cualquier momento tus derechos de:</p>
        <ul>
          <li>
            <strong>Información</strong> sobre el tratamiento de tus datos.
          </li>
          <li>
            <strong>Acceso</strong> a los datos que tenemos sobre ti.
          </li>
          <li>
            <strong>Rectificación y actualización</strong> de datos inexactos o incompletos.
          </li>
          <li>
            <strong>Eliminación</strong> de tus datos.
          </li>
          <li>
            <strong>Oposición</strong> al tratamiento.
          </li>
          <li>
            <strong>Portabilidad</strong> de tus datos.
          </li>
          <li>
            <strong>Suspensión</strong> del tratamiento.
          </li>
          <li>
            <strong>No ser objeto de decisiones</strong> basadas únicamente en tratamientos automatizados.
          </li>
          <li>
            <strong>Revocar tu consentimiento</strong> cuando el tratamiento se base en él.
          </li>
        </ul>
        <p>
          Para ejercerlos, escríbenos a {mail} indicando tu nombre, el derecho que quieres ejercer y un medio para
          verificar tu identidad. Responderemos dentro del plazo de 15 días que establece la ley.
        </p>
        <p>
          Si consideras que no atendimos correctamente tu solicitud, puedes presentar un reclamo ante la
          Superintendencia de Protección de Datos Personales.
        </p>
      </>
    ),
  },
  {
    id: "seguridad",
    title: "Seguridad",
    body: (
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra pérdida, acceso no
        autorizado o alteración: acceso restringido al equipo que atiende tu solicitud, conexiones cifradas (HTTPS) y
        proveedores con estándares de seguridad reconocidos. Si ocurriera una vulneración que afecte tus datos, te
        lo notificaremos y lo informaremos a la autoridad conforme a la ley.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        Actualmente este sitio no usa cookies de analítica, publicidad ni seguimiento. Encuentras el detalle en
        nuestra <Link href="/politica-de-cookies">Política de cookies</Link>.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios en esta política",
    body: (
      <p>
        Podemos actualizar esta política cuando cambien nuestros servicios, nuestros proveedores o la normativa. La
        versión vigente es siempre la publicada en esta página, con su fecha de última actualización. Si el cambio es
        relevante, lo comunicaremos a los clientes por los canales habituales.
      </p>
    ),
  },
];

export default function PoliticaDePrivacidad() {
  return (
    <LegalDoc
      title="Política de privacidad"
      intro="Qué datos personales tratamos cuando nos contactas, para qué los usamos y cómo puedes ejercer tus derechos."
      sections={sections}
    />
  );
}
