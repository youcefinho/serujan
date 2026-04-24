import { useState, useMemo } from "react";
import { Calculator as CalcIcon } from "lucide-react";

export function Calculator() {
  const [price, setPrice] = useState(450000);
  const [down, setDown] = useState(10);
  const [rate, setRate] = useState(5.25);
  const [years, setYears] = useState(25);

  const monthly = useMemo(() => {
    const principal = price * (1 - down / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [price, down, rate, years]);

  const fmt = (v: number) =>
    new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(v);

  return (
    <section className="py-24 lg:py-32 bg-navy-deep">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">Outil</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Calculateur hypothécaire</h2>
          <p className="mt-4 text-muted-foreground">Estimez votre paiement mensuel en quelques secondes.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 bg-card border border-border rounded-2xl p-6 lg:p-10 shadow-elevate">
          <div className="space-y-6">
            <Field label="Prix de la propriété" value={fmt(price)}>
              <input
                type="range" min={150000} max={1500000} step={5000}
                value={price} onChange={(e) => setPrice(+e.target.value)}
                className="w-full accent-crimson"
              />
            </Field>
            <Field label="Mise de fonds" value={`${down}%`}>
              <input
                type="range" min={5} max={50} step={1}
                value={down} onChange={(e) => setDown(+e.target.value)}
                className="w-full accent-crimson"
              />
            </Field>
            <Field label="Taux d'intérêt" value={`${rate.toFixed(2)}%`}>
              <input
                type="range" min={2} max={10} step={0.05}
                value={rate} onChange={(e) => setRate(+e.target.value)}
                className="w-full accent-crimson"
              />
            </Field>
            <Field label="Amortissement" value={`${years} ans`}>
              <input
                type="range" min={5} max={30} step={1}
                value={years} onChange={(e) => setYears(+e.target.value)}
                className="w-full accent-crimson"
              />
            </Field>
          </div>

          <div className="bg-gradient-hero border border-border rounded-xl p-8 flex flex-col justify-center items-center text-center space-y-4">
            <CalcIcon className="w-10 h-10 text-crimson" strokeWidth={1.5} />
            <div className="text-sm uppercase tracking-widest text-muted-foreground">Paiement mensuel estimé</div>
            <div className="text-5xl lg:text-6xl font-black text-crimson">{fmt(monthly)}</div>
            <div className="text-sm text-muted-foreground pt-4 border-t border-border w-full">
              <div className="flex justify-between py-1"><span>Mise de fonds</span><span className="text-foreground">{fmt(price * down / 100)}</span></div>
              <div className="flex justify-between py-1"><span>Montant emprunté</span><span className="text-foreground">{fmt(price * (1 - down / 100))}</span></div>
            </div>
            <a href="#contact" className="mt-2 inline-flex px-6 py-3 bg-gradient-crimson rounded-md font-bold text-sm shadow-crimson">
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
