import SectionTitle from "@/components/site/SectionTitle";

// Comparación directa con lo que el cliente suele encontrar en el mercado.
const comparison = [
  ["Un freelancer o proveedores sueltos", "Equipo completo asignado a tu cuenta"],
  ["Publicar por publicar", "Cada pieza responde a un objetivo y se mide"],
  ["Porcentaje sobre tu inversión en pauta", "Tarifa de gestión fija en pauta"],
  ["Cuentas y datos a nombre de la agencia", "Tus cuentas y datos siempre son tuyos"],
  ["Contratos forzosos y letra pequeña", "Sin permanencia forzosa: te quedas por resultados"],
  ["Promesas de viralidad", "Identidad sólida y crecimiento sostenido"],
];

export default function Differentiators() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Por qué Crealtiva"
          title="Operamos como tu departamento, no como un proveedor"
          intro="Nos comprometemos con tus objetivos de negocio a mediano y largo plazo, no solo con el mes actual."
        />

        <div className="overflow-hidden rounded-block ring-1 ring-navy/10">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Comparación entre una agencia tradicional y Crealtiva Digital</caption>
            <thead>
              <tr>
                <th scope="col" className="w-1/2 bg-navy/[0.04] px-6 py-4 font-semibold text-navy/50">
                  Lo habitual en el mercado
                </th>
                <th scope="col" className="w-1/2 bg-teal px-6 py-4 font-semibold text-cream">
                  Con Crealtiva Digital
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([them, us]) => (
                <tr key={us} className="border-t border-navy/10">
                  <td className="px-6 py-4 text-navy/45">
                    <span aria-hidden className="mr-2 text-navy/30">✕</span>
                    {them}
                  </td>
                  <td className="bg-teal/[0.08] px-6 py-4 font-medium text-navy">
                    <span aria-hidden className="mr-2 text-teal">✓</span>
                    {us}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
