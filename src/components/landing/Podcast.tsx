import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Headphones, Mic } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Podcast — Section podcast avec design minimaliste
// ═══════════════════════════════════════════════════════════

export default function Podcast() {
  const { t } = useLanguage();
  const ref = useScrollReveal();

  return (
    <section className="relative py-20 px-4 bg-black-card" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="relative p-10 md:p-14 rounded-2xl bg-black-deep border border-gold/10 overflow-hidden">
          {/* Motif en arrière-plan */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/3 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Icône podcast */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Mic className="w-12 h-12 md:w-16 md:h-16 text-gold" />
              </div>
            </div>

            {/* Contenu */}
            <div className="text-center md:text-left flex-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold/10 text-gold mb-4">
                <Headphones className="w-3.5 h-3.5" />
                {t(translations.podcast.label)}
              </span>

              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-foreground mb-3">
                {t(translations.podcast.title)}
              </h3>

              <p className="text-muted-foreground text-lg mb-6">
                {t(translations.podcast.subtitle)}
              </p>

              {/* Placeholder — à remplacer par embed Spotify/Apple réel */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/20 text-gold font-semibold rounded-lg hover:bg-gold/20 transition-colors duration-300">
                  <Headphones className="w-4 h-4" />
                  {t(translations.podcast.cta)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
