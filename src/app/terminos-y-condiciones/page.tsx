import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc, { Responsable, type LegalSection } from "@/components/site/LegalDoc";
import { LEGAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de uso del sitio web de Crealtiva Digital: alcance de la información y precios publicados, propiedad intelectual, responsabilidad y ley aplicable.",
  alternates: { canonical: "/terminos-y-condiciones" },
};

const sections: LegalSection[] = [
  {
    id: "titular",
    title: "Titular del sitio",
    body: (
      <>
        <p>Este sitio web pertenece y es operado por:</p>
        <Responsable />
        <p>
          Al navegar por el sitio aceptas estos términos. Si no estás de acuerdo con ellos, te pedimos no utilizarlo.
        </p>
      </>
    ),
  },
  {
    id: "objeto",
    title: "Objeto del sitio",
    body: (
      <p>
        El sitio presenta los servicios de {LEGAL.nombreComercial} (marketing digital, gestión de pauta, producción
        de contenido, diseño web y automatización), muestra trabajos realizados y publica artículos informativos.
        Su propósito es informativo y comercial. No se realizan compras ni pagos a través del sitio.
      </p>
    ),
  },
  {
    id: "precios",
    title: "Información, paquetes y precios",
    body: (
      <>
        <ul>
          <li>
            Los precios publicados están expresados en dólares de los Estados Unidos (USD) y son{" "}
            <strong>referenciales</strong>. No constituyen una oferta vinculante.
          </li>
          <li>
            El precio final, el alcance, los plazos, las formas de pago y los impuestos aplicables se definen en la
            cotización o propuesta formal que enviamos a cada cliente, y se confirman al aceptarla.
          </li>
          <li>
            Lo que incluye y no incluye cada paquete se detalla en su ficha. Cualquier entregable adicional se cotiza
            por separado.
          </li>
          <li>
            En los servicios de pauta, la inversión publicitaria se paga directamente a las plataformas (Meta,
            Google, TikTok, LinkedIn) y no forma parte de la tarifa de gestión, salvo que la propuesta indique lo
            contrario.
          </li>
          <li>
            Podemos actualizar servicios y precios en cualquier momento. Los cambios no afectan las propuestas que
            ya hayas aceptado.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "resultados",
    title: "Resultados",
    body: (
      <p>
        Trabajamos con metodologías probadas, pero los resultados de marketing y publicidad dependen de factores que
        no controlamos por completo: el mercado, la competencia, el presupuesto, el producto y las políticas de cada
        plataforma. Los casos y cifras que mostramos son ilustrativos y no garantizan resultados iguales para otro
        negocio.
      </p>
    ),
  },
  {
    id: "propiedad",
    title: "Propiedad intelectual",
    body: (
      <>
        <p>
          Los textos, la marca, el logotipo, el diseño del sitio, las fotografías, los videos y demás contenidos
          publicados pertenecen a {LEGAL.nombreComercial} o se usan con autorización de sus titulares, incluidos los
          clientes cuyos trabajos aparecen en el portafolio.
        </p>
        <p>
          No está permitido copiar, reproducir, distribuir ni modificar estos contenidos con fines comerciales sin
          autorización escrita. Puedes compartir enlaces a nuestras páginas y citar fragmentos breves de los
          artículos indicando la fuente.
        </p>
        <p>
          La titularidad de los entregables producidos para cada cliente se rige por lo acordado en su propuesta o
          contrato.
        </p>
      </>
    ),
  },
  {
    id: "uso",
    title: "Uso adecuado del sitio",
    body: (
      <p>
        Te comprometes a no utilizar el sitio para fines ilícitos, a no intentar acceder sin autorización a sus
        sistemas y a no realizar acciones que puedan dañarlo, sobrecargarlo o afectar a otros usuarios.
      </p>
    ),
  },
  {
    id: "enlaces",
    title: "Enlaces a terceros",
    body: (
      <p>
        El sitio contiene enlaces a servicios de terceros, como WhatsApp y redes sociales. No controlamos esos
        servicios ni respondemos por su contenido o sus políticas; te recomendamos revisar sus propios términos y
        políticas de privacidad.
      </p>
    ),
  },
  {
    id: "responsabilidad",
    title: "Limitación de responsabilidad",
    body: (
      <p>
        Procuramos que la información del sitio sea correcta y esté actualizada, pero puede contener errores u
        omisiones. No respondemos por decisiones tomadas únicamente con base en el contenido informativo del sitio, ni
        por interrupciones o fallas técnicas ajenas a nuestro control.
      </p>
    ),
  },
  {
    id: "datos",
    title: "Datos personales",
    body: (
      <p>
        El tratamiento de los datos que nos compartes se explica en nuestra{" "}
        <Link href="/politica-de-privacidad">Política de privacidad</Link>.
      </p>
    ),
  },
  {
    id: "ley",
    title: "Ley aplicable y jurisdicción",
    body: (
      <p>
        Estos términos se rigen por las leyes de la República del Ecuador. Cualquier controversia se intentará
        resolver primero de forma directa y amistosa escribiendo a{" "}
        <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. De no lograrse un acuerdo, se someterá a los jueces
        competentes de la ciudad de Quito.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios en estos términos",
    body: (
      <p>
        Podemos modificar estos términos en cualquier momento. La versión vigente es la publicada en esta página, con
        su fecha de última actualización.
      </p>
    ),
  },
];

export default function TerminosYCondiciones() {
  return (
    <LegalDoc
      title="Términos y condiciones"
      intro="Las reglas de uso de este sitio y el alcance de la información y los precios que publicamos."
      sections={sections}
    />
  );
}
