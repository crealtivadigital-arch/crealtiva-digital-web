import WhatsAppIcon from "@/components/site/WhatsAppIcon";
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
        <div className="bg-green rounded-block px-8 md:px-14 py-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="relative">
            <span className="inline-block bg-white/15 text-cream text-xs font-grotesk font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide">
              Sin costo · Sin compromiso · 45 minutos
            </span>
            <h2 className="font-grotesk font-bold text-cream text-3xl md:text-4xl leading-tight mb-4 max-w-xl mx-auto">
              {headline}
            </h2>
            <p className="font-sans text-cream/70 text-base leading-relaxed mb-8 max-w-lg mx-auto">
              {subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-navy font-grotesk font-bold text-sm px-7 py-3.5 rounded-full hover:bg-cream transition-colors"
              >
                <WhatsAppIcon />
                {ctaText}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center border border-white/30 text-cream font-grotesk font-semibold text-sm px-7 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-colors"
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
