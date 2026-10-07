import SectionTitle from "@/components/site/SectionTitle";

const pillars = [
  {
    title: "Diagnóstico antes de ejecutar",
    detail: "Nunca lanzamos acciones sin entender tu marca, tu mercado y tus objetivos reales. El diagnóstico es gratuito.",
  },
  {
    title: "Todo integrado en un solo equipo",
    detail: "Estrategia, producción, pauta, web y procesos trabajando por el mismo objetivo, no proveedores sueltos.",
  },
  {
    title: "Resultados medibles, no promesas",
    detail: "Reporte mensual que traduce indicadores en decisiones de negocio: consultas, conversiones y ventas.",
  },
  {
    title: "Conocemos el mercado ecuatoriano",
    detail: "Entendemos cómo decide el consumidor en Quito y Ecuador, y lo usamos para cada pieza y campaña.",
  },
];

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
    <section className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          dark
          eyebrow="Por qué Crealtiva"
          title="Operamos como tu departamento, no como un proveedor"
          intro="Nos comprometemos con tus objetivos de negocio a mediano y largo plazo, no solo con el mes actual."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={p.title} className="rounded-card border border-white/10 bg-white/[0.03] p-6">
              <span className="font-display text-3xl text-teal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-bold text-cream">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{p.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-block ring-1 ring-white/10">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Comparación entre una agencia tradicional y Crealtiva Digital</caption>
            <thead>
              <tr>
                <th scope="col" className="w-1/2 bg-white/[0.04] px-6 py-4 font-semibold text-cream/50">
                  Lo habitual en el mercado
                </th>
                <th scope="col" className="w-1/2 bg-teal px-6 py-4 font-semibold text-cream">
                  Con Crealtiva Digital
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([them, us]) => (
                <tr key={us} className="border-t border-white/10">
                  <td className="px-6 py-4 text-cream/45">
                    <span aria-hidden className="mr-2 text-cream/30">✕</span>
                    {them}
                  </td>
                  <td className="bg-teal/[0.08] px-6 py-4 font-medium text-cream">
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
