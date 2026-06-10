import { WA_DIAGNOSTICO, EMAIL } from "@/lib/constants";

interface CTABannerProps {
  headline?: string;
  subtitle?: string;
  ctaText?: string;
  waMessage?: string;
}

export default function CTABanner({
  headline = "¿Listo para dar el siguiente paso?",
  subtitle = "Agenda tu diagnóstico gratuito de 45 minutos. Analizamos tu negocio y te entregamos un plan de acción concreto.",
  ctaText = "Agendar Diagnóstico Gratuito",
  waMessage,
}: CTABannerProps) {
  const href = waMessage
    ? `https://api.whatsapp.com/send?phone=593959227420&text=${encodeURIComponent(waMessage)}`
    : WA_DIAGNOSTICO;

  return (
    <section className="bg-navy py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-gradient-to-br from-teal to-green-deep rounded-block px-8 md:px-14 py-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="relative">
            <span className="inline-block bg-white/15 text-white text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide">
              Sin costo · Sin compromiso · 45 minutos
            </span>
            <h2 className="font-grotesk font-bold text-white text-3xl md:text-4xl leading-tight mb-4 max-w-xl mx-auto">
              {headline}
            </h2>
            <p className="font-sans text-white/70 text-base leading-relaxed mb-8 max-w-lg mx-auto">
              {subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-navy font-grotesk font-bold text-sm px-7 py-3.5 rounded-full hover:bg-cream transition-colors"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {ctaText}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center border border-white/30 text-white font-grotesk font-semibold text-sm px-7 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-colors"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
