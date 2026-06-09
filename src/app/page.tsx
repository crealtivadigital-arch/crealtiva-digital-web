export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
      <div className="text-center px-6">
        <div className="mb-8">
          {/* Logo placeholder */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#159AA2] flex items-center justify-center">
              <div className="w-3 h-3 bg-[#159AA2] rounded-full" />
            </div>
            <span className="font-grotesk text-white text-xl font-bold tracking-tight">
              Crealtiva Digital
            </span>
          </div>
        </div>

        <h1 className="font-grotesk text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Sitio web en{" "}
          <span className="text-[#159AA2]">construcción.</span>
        </h1>

        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Estamos rediseñando nuestra presencia digital con la misma
          exigencia con la que trabajamos para nuestros clientes.
        </p>

        <a
          href="https://api.whatsapp.com/send?phone=593959227420&text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Crealtiva%20Digital..."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#159AA2] text-white font-grotesk font-bold text-sm px-6 py-3 rounded-full hover:bg-[#0d7880] transition-colors"
        >
          Contáctanos por WhatsApp →
        </a>
      </div>
    </main>
  );
}
