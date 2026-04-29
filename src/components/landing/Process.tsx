import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Search, Puzzle, Handshake, CheckCircle } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Process — 4 étapes : Diagnostic → Structure → Négociation → Clôture
// ═══════════════════════════════════════════════════════════

const stepIcons = [Search, Puzzle, Handshake, CheckCircle];

export default function Process() {
  const { t, ta } = useLanguage();
  const ref = useScrollReveal();

  const steps = ta(translations.process.steps);

  return (
    <section id="processus" className="relative py-24 px-4 bg-black-card" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20">
            {t(translations.process.label)}
          </span>
        </div>

        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16 max-w-3xl mx-auto leading-tight">
          {t(translations.process.title)}
        </h2>

        {/* Étapes */}
        <div className="space-y-0">
          {steps.map((step: { title: string; desc: string }, i: number) => {
            const Icon = stepIcons[i];
            return (
              <div key={i} className="relative flex gap-6 md:gap-8">
                {/* Ligne verticale + numéro */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center flex-shrink-0 z-10">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-gold/30 to-gold/5 my-2" />
                  )}
                </div>

                {/* Contenu */}
                <div className="pb-12 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-gold/50 uppercase tracking-widest">
                      Étape {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-widest text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">
                    {step.desc}
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
