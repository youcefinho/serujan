import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Building2, Award, TrendingUp } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// ValueCards — 3 cartes premium : Réseau / Expertise / Résultats
// ═══════════════════════════════════════════════════════════

const icons = [Building2, Award, TrendingUp];

export default function ValueCards() {
  const { ta, t } = useLanguage();
  const ref = useScrollReveal();

  const cards = ta(translations.valueCards.cards);

  return (
    <section className="relative py-24 px-4 bg-black-deep" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <p className="text-center text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
          {t(translations.valueCards.intro)}
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card: { title: string; desc: string }, i: number) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="group relative p-8 rounded-2xl bg-black-card border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Lueur dorée subtile au hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-gold-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icône */}
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>

                  {/* Titre */}
                  <h3 className="text-lg font-bold uppercase tracking-widest text-gold mb-4">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Ligne dorée en bas */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
