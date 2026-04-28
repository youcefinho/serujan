import { Phone, Calendar, Mail, Clock } from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { TypingAnimation } from "@/components/landing/TypingAnimation";
import heroBanner from "@/assets/hero-banner.jpg";
import mathisRed from "@/assets/mathis-red.jpg";

export function Hero() {
  const { t, ta } = useLanguage();

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
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold">{t(translations.hero.badge)}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
            {t(translations.hero.title)}
            <span className="block text-crimson mt-2">
              <TypingAnimation
                phrases={ta(translations.hero.phrases)}
                typingSpeed={70}
                deletingSpeed={35}
                pauseAfterPhrase={1500}
              />
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t(translations.hero.description)}<br/><br/>
            <span className="text-foreground font-semibold">{clientConfig.name}</span> {t(translations.hero.descriptionBold)}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openCalendly}
              className="group inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-crimson text-primary-foreground text-sm sm:text-base font-bold rounded-md shadow-crimson hover:scale-[1.02] transition-transform cursor-pointer"
              aria-label={t(translations.hero.ctaPrimary)}
            >
              <Calendar className="w-5 h-5" />
              {t(translations.hero.ctaPrimary)}
            </button>
            <a
              href={`tel:${clientConfig.phone.raw}`}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-2 border-foreground/80 text-foreground text-sm sm:text-base font-bold rounded-md hover:bg-foreground hover:text-navy transition"
              aria-label={t(translations.hero.ctaCall)}
            >
              <Phone className="w-5 h-5" />
              {t(translations.hero.ctaCall)}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-2 border-foreground/30 text-foreground/90 text-sm sm:text-base font-bold rounded-md hover:border-foreground transition"
              aria-label={t(translations.hero.ctaMessage)}
            >
              <Mail className="w-5 h-5" />
              {t(translations.hero.ctaMessage)}
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
              {t(translations.hero.trustBadge)}
            </span>
          </div>
        </div>

        {/* Photo de Mathis */}
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-crimson rounded-full opacity-30 blur-3xl" />
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none overflow-hidden">
            <img
              src={mathisRed}
              alt={`${clientConfig.name}, ${t(clientConfig.title)}`}
              className="w-full h-full object-cover object-top"
              loading="eager"
              decoding="async"
            />
            {/* Badge nouvelle génération */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm border border-white/20 text-navy px-4 py-2.5 rounded-xl shadow-elevate transform rotate-2">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-crimson mb-0.5">{clientConfig.ageBadge.value}</span>
              <span className="block font-black text-sm leading-tight">{t(clientConfig.ageBadge.label)}</span>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-deep/90 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-crimson" />
                <span className="text-sm font-semibold">{clientConfig.territoryLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
