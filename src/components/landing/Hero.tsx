import { Phone, Calendar, Mail, Clock } from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import heroBanner from "@/assets/hero-banner.jpg";
import mathisRed from "@/assets/mathis-red.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Banner background with navy overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Quartier résidentiel à Gatineau au crépuscule"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-navy-deep/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />
      </div>

      {/* Decorative crimson accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-crimson z-10" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-crimson/10 blur-3xl z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 lg:pt-32 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-white/5 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold">La Transaction Sans Stress · Gatineau</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
            Votre premier achat à Gatineau.
            <span className="block text-crimson mt-2">Sans stress.</span>
            <span className="block">Sans mauvaise surprise.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            <span className="text-foreground font-semibold">Mathis Guimont</span> · Courtier immobilier résidentiel à Gatineau
            <br />
            <span className="text-xs sm:text-sm">L'Équipe Xavier Charron & Ali Al · Acheter ou vendre dans l'Outaouais</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openCalendly}
              className="group inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-crimson text-primary-foreground text-sm sm:text-base font-bold rounded-md shadow-crimson hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Prendre rendez-vous
            </button>
            <a
              href="tel:8199183409"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-2 border-foreground/80 text-foreground text-sm sm:text-base font-bold rounded-md hover:bg-foreground hover:text-navy transition"
            >
              <Phone className="w-5 h-5" />
              Appeler maintenant
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-2 border-foreground/30 text-foreground/90 text-sm sm:text-base font-bold rounded-md hover:border-foreground transition"
            >
              <Mail className="w-5 h-5" />
              Envoyer un message
            </a>
          </div>

          {/* Trust badge */}
          <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-300">
              Réponse en moins de 2h · 7j/7 · Québec & Ontario
            </span>
          </div>
        </div>

        {/* Photo of Mathis */}
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-crimson rounded-full opacity-30 blur-3xl" />
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none overflow-hidden">
            <img
              src={mathisRed}
              alt="Mathis Guimont, courtier immobilier résidentiel"
              className="w-full h-full object-cover object-top"
              loading="eager"
              decoding="async"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-deep/90 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-crimson" />
                <span className="text-sm font-semibold">Courtier certifié OACIQ · Québec & Ontario</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
