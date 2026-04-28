import { CheckCircle, Calendar } from "lucide-react";
import { openCalendly } from "@/lib/calendly";

// Section « Votre première rencontre est gratuite » — Standard Intralys §10.8
// Placée juste avant le LeadForm pour réduire la friction avant conversion
const badges = [
  { label: "Gratuit", desc: "Aucuns frais" },
  { label: "Sans engagement", desc: "Aucune obligation" },
  { label: "Confidentiel", desc: "Vos infos restent privées" },
];

export function FreeConsultation() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-navy to-navy-deep">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        {/* Titre principal */}
        <div className="mb-10">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">Première étape</span>
          <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">
            Votre première rencontre est gratuite
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sans engagement. Sans pression. On discute de votre projet immobilier et on vous donne un plan d'action concret.
          </p>
        </div>

        {/* 3 Badges */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {badges.map(({ label, desc }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-xl p-6 hover:border-crimson transition"
            >
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <div className="font-bold text-lg">{label}</div>
              <div className="text-sm text-muted-foreground mt-1">{desc}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={openCalendly}
          className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-crimson text-primary-foreground font-bold rounded-lg shadow-crimson hover:scale-[1.02] transition-transform text-lg uppercase tracking-widest cursor-pointer"
          aria-label="Prendre une rencontre stratégique gratuite"
        >
          <Calendar className="w-6 h-6" />
          Rencontre stratégique gratuite
        </button>
      </div>
    </section>
  );
}
