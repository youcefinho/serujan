import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { Phone, ArrowDown } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Hero — Section héro premium noir/or pour Serujan
// ═══════════════════════════════════════════════════════════

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero grain-overlay"
    >
      {/* Image de fond avec overlay */}
      {clientConfig.heroImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${clientConfig.heroImageUrl})` }}
        >
          <div className="absolute inset-0 bg-black-deep/80" />
        </div>
      )}

      {/* Motifs décoratifs */}
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-gold/3 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-32 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-gold/10 text-gold border border-gold/20 mb-8">
          {t(translations.hero.badge)}
        </div>

        {/* Logo SK */}
        {clientConfig.logoUrl && (
          <div className="flex justify-center mb-8">
            <img
              src={clientConfig.logoUrl}
              alt={clientConfig.teamName}
              className="h-20 md:h-28 w-auto"
            />
          </div>
        )}

        {/* Titre principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-foreground mb-6 leading-tight">
          {t(translations.hero.title)}
        </h1>

        {/* Sous-titre */}
        <p className="text-xl md:text-2xl text-gold font-medium mb-4 tracking-wide">
          {t(translations.hero.subtitle)}
        </p>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t(translations.hero.description)}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-gold text-black-deep font-bold uppercase tracking-widest rounded-lg shadow-gold hover:shadow-gold-sm hover:scale-[1.02] transition-all duration-300 animate-pulse-gold"
          >
            {t(translations.hero.ctaPrimary)}
          </a>
          <a
            href={`tel:+${clientConfig.phone.international}`}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold/30 text-gold font-bold uppercase tracking-widest rounded-lg hover:bg-gold/10 transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            {t(translations.hero.ctaCall)}
          </a>
        </div>

        {/* Badge de confiance */}
        <p className="text-sm text-muted-foreground tracking-wider">
          {t(translations.hero.trustBadge)}
        </p>
      </div>

      {/* Flèche scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#value-cards" className="flex flex-col items-center gap-2 text-gold/40 hover:text-gold/70 transition-colors">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
