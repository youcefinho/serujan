import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, Lightbulb, Handshake, UserCheck } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// About / Mon Approche — La vision qui transforme vos projets
// ═══════════════════════════════════════════════════════════

const featureIcons = [Target, Lightbulb, Handshake, UserCheck];

export default function About() {
  const { t, ta } = useLanguage();
  const ref = useScrollReveal();

  const features = ta(translations.approche.features);

  return (
    <section id="approche" className="relative py-24 px-4 bg-black-deep" ref={ref}>
      {/* Lueur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20">
            {t(translations.approche.label)}
          </span>
        </div>

        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-widest text-foreground mb-6">
          {t(translations.approche.title)}
        </h2>

        {/* Description */}
        <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
          {t(translations.approche.description)}
        </p>

        {/* 4 Features en grille */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature: { title: string; desc: string }, i: number) => {
            const Icon = featureIcons[i];
            return (
              <div
                key={i}
                className="group flex gap-5 p-6 rounded-xl bg-black-card border border-gold/5 hover:border-gold/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
