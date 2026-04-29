import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Building2, BarChart3, Landmark } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Services — 3 piliers d'expertise commerciale
// Financement / Optimisation / Prêteurs Institutionnels
// ═══════════════════════════════════════════════════════════

const pillars = [
  { key: "pillar1" as const, Icon: Building2 },
  { key: "pillar2" as const, Icon: BarChart3 },
  { key: "pillar3" as const, Icon: Landmark },
];

export default function Services() {
  const { t } = useLanguage();
  const ref = useScrollReveal();

  return (
    <section id="services" className="relative py-24 px-4 bg-black-deep" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20">
            {t(translations.services.label)}
          </span>
        </div>

        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-widest text-foreground mb-4">
          {t(translations.services.title)}
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16 text-lg">
          {t(translations.services.subtitle)}
        </p>

        {/* 3 piliers */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map(({ key, Icon }) => (
            <div
              key={key}
              className="group relative p-8 rounded-2xl bg-black-card border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient overlay au hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-gold-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Icône */}
                <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-gold" />
                </div>

                {/* Titre du pilier */}
                <h3 className="text-lg font-bold uppercase tracking-widest text-gold mb-4 leading-tight">
                  {t(translations.services[key].title)}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {t(translations.services[key].desc)}
                </p>
              </div>

              {/* Barre dorée en bas */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-gold rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-bold uppercase tracking-widest rounded-lg hover:bg-gold hover:text-black-deep transition-all duration-300"
          >
            {t(translations.services.learnMore)}
          </a>
        </div>
      </div>
    </section>
  );
}
