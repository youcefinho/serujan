import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { GraduationCap, Users, Lightbulb, ExternalLink } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Elev8Academy — Investir sans mise de fonds + lien elev8academie.ca
// ═══════════════════════════════════════════════════════════

const icons = [Lightbulb, Users, GraduationCap];

export default function Elev8Academy() {
  const { t, ta } = useLanguage();
  const { ref } = useScrollReveal();

  const features = ta(translations.elev8Academy.features);

  return (
    <section className="relative py-24 px-4 bg-black-deep overflow-hidden" ref={ref}>
      {/* Lueur d'accentuation */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20">
            <GraduationCap className="w-3.5 h-3.5" />
            {t(translations.elev8Academy.label)}
          </span>
        </div>

        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-widest text-foreground mb-6">
          {t(translations.elev8Academy.title)}
        </h2>

        {/* Description */}
        <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
          {t(translations.elev8Academy.description)}
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature: { title: string; desc: string }, i: number) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-black-card border border-gold/10 hover:border-gold/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-md font-bold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={clientConfig.elev8AcademyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-black-deep font-bold uppercase tracking-widest rounded-lg shadow-gold hover:shadow-gold-sm hover:scale-[1.02] transition-all duration-300"
          >
            {t(translations.elev8Academy.cta)}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
