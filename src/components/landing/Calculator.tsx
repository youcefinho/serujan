import { useState, useMemo } from "react";
import { Calculator as CalcIcon, Home, Shield, Receipt } from "lucide-react";

// Calculatrice hypothécaire enrichie — Standard Intralys §10.3
// Inclut : hypothèque + taxe foncière + assurance habitation + ventilation mensuelle
export function Calculator() {
  const [price, setPrice] = useState(450000);
  const [down, setDown] = useState(10);
  const [rate, setRate] = useState(5.25);
  const [years, setYears] = useState(25);
  const [propertyTax, setPropertyTax] = useState(4000);
  const [insurance, setInsurance] = useState(1800);

  // Paiement hypothécaire mensuel — formule canadienne (semi-annual compounding)
  const mortgageMonthly = useMemo(() => {
    const principal = price * (1 - down / 100);
    const r = Math.pow(1 + rate / 100 / 2, 1 / 6) - 1;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [price, down, rate, years]);

  // Ventilation mensuelle
  const taxMonthly = propertyTax / 12;
  const insuranceMonthly = insurance / 12;
  const totalMonthly = mortgageMonthly + taxMonthly + insuranceMonthly;

  const fmt = (v: number) =>
    new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(v);

  return (
    <section className="py-24 lg:py-32 bg-navy-deep">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">Outil</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">Calculateur hypothécaire</h2>
          <p className="mt-4 text-muted-foreground">Estimez votre coût mensuel total incluant hypothèque, taxes et assurance.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-10 shadow-elevate">
          {/* Sliders */}
          <div className="space-y-6">
            <Field label="Prix de la propriété" value={fmt(price)}>
              <input
                type="range" min={150000} max={1500000} step={5000}
                value={price} onChange={(e) => setPrice(+e.target.value)}
                className="w-full accent-crimson"
                aria-label="Prix de la propriété"
              />
            </Field>
            <Field label="Mise de fonds" value={`${down}%`}>
              <input
                type="range" min={5} max={50} step={1}
                value={down} onChange={(e) => setDown(+e.target.value)}
                className="w-full accent-crimson"
                aria-label="Mise de fonds en pourcentage"
              />
            </Field>
            <Field label="Taux d'intérêt" value={`${rate.toFixed(2)}%`}>
              <input
                type="range" min={2} max={10} step={0.05}
                value={rate} onChange={(e) => setRate(+e.target.value)}
                className="w-full accent-crimson"
                aria-label="Taux d'intérêt"
              />
            </Field>
            <Field label="Amortissement" value={`${years} ans`}>
              <input
                type="range" min={5} max={30} step={1}
                value={years} onChange={(e) => setYears(+e.target.value)}
                className="w-full accent-crimson"
                aria-label="Durée d'amortissement en années"
              />
            </Field>
            <Field label="Taxe foncière annuelle" value={fmt(propertyTax)}>
              <input
                type="range" min={1000} max={10000} step={100}
                value={propertyTax} onChange={(e) => setPropertyTax(+e.target.value)}
                className="w-full accent-crimson"
                aria-label="Taxe foncière annuelle"
              />
            </Field>
            <Field label="Assurance habitation annuelle" value={fmt(insurance)}>
              <input
                type="range" min={500} max={5000} step={100}
                value={insurance} onChange={(e) => setInsurance(+e.target.value)}
                className="w-full accent-crimson"
                aria-label="Assurance habitation annuelle"
              />
            </Field>
          </div>

          {/* Résultat — Ventilation mensuelle */}
          <div className="bg-gradient-hero border border-border rounded-xl p-5 sm:p-8 flex flex-col justify-center items-center text-center space-y-5">
            <CalcIcon className="w-10 h-10 text-crimson" strokeWidth={1.5} />
            <div className="text-sm uppercase tracking-widest text-muted-foreground">Coût mensuel total</div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-crimson">{fmt(totalMonthly)}</div>

            {/* Ventilation détaillée */}
            <div className="text-sm text-muted-foreground pt-4 border-t border-border w-full space-y-2">
              <div className="flex justify-between py-1">
                <span className="flex items-center gap-2"><Home className="w-4 h-4 text-crimson" /> Hypothèque</span>
                <span className="text-foreground font-semibold">{fmt(mortgageMonthly)}/mois</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="flex items-center gap-2"><Receipt className="w-4 h-4 text-crimson" /> Taxes foncières</span>
                <span className="text-foreground font-semibold">{fmt(taxMonthly)}/mois</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-crimson" /> Assurance</span>
                <span className="text-foreground font-semibold">{fmt(insuranceMonthly)}/mois</span>
              </div>
              <div className="flex justify-between py-2 border-t border-border mt-2 font-bold text-foreground">
                <span>Mise de fonds</span>
                <span>{fmt(price * down / 100)}</span>
              </div>
            </div>

            <a href="#contact" className="mt-2 inline-flex px-6 py-3 bg-gradient-crimson rounded-md font-bold text-sm shadow-crimson uppercase tracking-widest" aria-label="Discuter de mon projet immobilier">
              Discuter de mon projet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-sm font-semibold text-muted-foreground">{label}</label>
        <span className="text-lg font-bold">{value}</span>
      </div>
      {children}
    </div>
  );
}
