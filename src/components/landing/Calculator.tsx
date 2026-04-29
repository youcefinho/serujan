import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useMemo } from "react";
import { Calculator as CalcIcon } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Calculator — Simulateur hypothécaire COMMERCIAL
// Montants commerciaux : 500K$ - 50M$
// ═══════════════════════════════════════════════════════════

export default function Calculator() {
  const { t } = useLanguage();
  const ref = useScrollReveal();

  // Valeurs par défaut commerciales
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);
  const [propertyTax, setPropertyTax] = useState(25000);
  const [insurance, setInsurance] = useState(5000);

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = amortization * 12;

    // Paiement hypothécaire mensuel
    const monthlyMortgage =
      monthlyRate === 0
        ? loanAmount / numPayments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const totalMonthly = monthlyMortgage + monthlyTax + monthlyInsurance;

    return {
      monthlyMortgage,
      monthlyTax,
      monthlyInsurance,
      totalMonthly,
      // Pourcentages pour le graphique
      mortgagePercent: (monthlyMortgage / totalMonthly) * 100,
      taxPercent: (monthlyTax / totalMonthly) * 100,
      insurancePercent: (monthlyInsurance / totalMonthly) * 100,
    };
  }, [loanAmount, interestRate, amortization, propertyTax, insurance]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

  return (
    <section id="simulateur" className="relative py-24 px-4 bg-black-card" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20">
            <CalcIcon className="w-3.5 h-3.5" />
            {t(translations.calculator.label)}
          </span>
        </div>

        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-widest text-foreground mb-4">
          {t(translations.calculator.title)}
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 text-lg">
          {t(translations.calculator.subtitle)}
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Sliders */}
          <div className="space-y-8 p-8 rounded-2xl bg-black-deep border border-gold/10">
            {/* Montant du prêt */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-muted-foreground">{t(translations.calculator.loanAmount)}</label>
                <span className="text-sm font-bold text-gold">{formatCurrency(loanAmount)}</span>
              </div>
              <input
                type="range"
                min={500000}
                max={50000000}
                step={100000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-black-surface cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-gold-sm"
              />
            </div>

            {/* Taux d'intérêt */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-muted-foreground">{t(translations.calculator.interestRate)}</label>
                <span className="text-sm font-bold text-gold">{interestRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-black-surface cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-gold-sm"
              />
            </div>

            {/* Amortissement */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-muted-foreground">{t(translations.calculator.amortization)}</label>
                <span className="text-sm font-bold text-gold">{amortization} {t(translations.common.years)}</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={amortization}
                onChange={(e) => setAmortization(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-black-surface cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-gold-sm"
              />
            </div>

            {/* Taxe foncière */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-muted-foreground">{t(translations.calculator.propertyTax)}</label>
                <span className="text-sm font-bold text-gold">{formatCurrency(propertyTax)}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={200000}
                step={1000}
                value={propertyTax}
                onChange={(e) => setPropertyTax(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-black-surface cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-gold-sm"
              />
            </div>

            {/* Assurance */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-muted-foreground">{t(translations.calculator.insurance)}</label>
                <span className="text-sm font-bold text-gold">{formatCurrency(insurance)}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={insurance}
                onChange={(e) => setInsurance(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-black-surface cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-gold-sm"
              />
            </div>
          </div>

          {/* Résultats */}
          <div className="space-y-6">
            {/* Paiement hypothécaire */}
            <div className="p-8 rounded-2xl bg-black-deep border border-gold/10 text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                {t(translations.calculator.monthlyMortgage)}
              </p>
              <p className="text-4xl md:text-5xl font-bold text-gold mb-1">
                {formatCurrency(calculations.monthlyMortgage)}
              </p>
              <p className="text-xs text-muted-foreground">
                ({t(translations.calculator.capitalInterest)})
              </p>
            </div>

            {/* Paiement total */}
            <div className="p-8 rounded-2xl bg-gradient-gold-subtle border border-gold/20 text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                {t(translations.calculator.totalMonthly)}
              </p>
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-1">
                {formatCurrency(calculations.totalMonthly)}
              </p>
              <p className="text-xs text-muted-foreground">
                ({t(translations.calculator.includingTaxInsurance)})
              </p>
            </div>

            {/* Ventilation */}
            <div className="p-6 rounded-2xl bg-black-deep border border-gold/10 space-y-3">
              {/* Barre de ventilation */}
              <div className="flex h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gold"
                  style={{ width: `${calculations.mortgagePercent}%` }}
                />
                <div
                  className="bg-gold/50"
                  style={{ width: `${calculations.taxPercent}%` }}
                />
                <div
                  className="bg-gold/25"
                  style={{ width: `${calculations.insurancePercent}%` }}
                />
              </div>

              {/* Légende */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gold" />
                  <span className="text-muted-foreground">{t(translations.calculator.mortgage)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gold/50" />
                  <span className="text-muted-foreground">{t(translations.calculator.taxes)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gold/25" />
                  <span className="text-muted-foreground">{t(translations.calculator.insuranceLabel)}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="block w-full py-4 bg-gradient-gold text-black-deep text-center font-bold uppercase tracking-widest rounded-lg shadow-gold hover:shadow-gold-sm hover:scale-[1.01] transition-all duration-300"
            >
              {t(translations.calculator.cta)}
            </a>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              {t(translations.calculator.disclaimer)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
