import SectionTitle from "@/components/site/SectionTitle";

const steps = [
  { title: "Diagnóstico gratuito", detail: "Sesión de 45 minutos para entender tu marca, tus objetivos y tu situación digital actual.", tag: "Sin costo ni compromiso" },
  { title: "Propuesta personalizada", detail: "Te enviamos un plan de acción concreto con servicios, alcance y tiempos específicos.", tag: "En 24 horas hábiles" },
  { title: "Onboarding del equipo", detail: "Asignamos tu equipo, levantamos el brief completo y arrancamos con la fase estratégica.", tag: "Semana 1" },
  { title: "Ejecución y reportes", detail: "Producción, publicación, comunidad, optimización de pauta y reporte mensual con indicadores reales.", tag: "Mensual" },
];

export default function HowWeStart() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Cómo empezamos" title="De la primera conversación al equipo activo en tu marca" />
        <ol className="grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-card bg-white p-6 ring-1 ring-navy/5">
              <span className="font-display text-4xl text-teal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">{s.detail}</p>
              <span className="mt-5 inline-block rounded-full bg-magenta/[0.12] px-3 py-1 text-xs font-semibold text-magenta">{s.tag}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
