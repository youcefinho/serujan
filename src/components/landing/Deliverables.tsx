import { CheckCircle2, Calendar } from "lucide-react";
import { openCalendly } from "@/lib/calendly";

export function Deliverables() {
  const items = [
    "Rencontre de cadrage 60 min",
    "Visites préparées et commentées",
    "Négociation agressive résultats chiffrés",
    "Coordination totale (inspecteur, notaire, courtier hypothécaire) & remise des clés",
  ];

  return (
    <section className="py-24 bg-card border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Visual / Left */}
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute -inset-4 bg-gradient-crimson opacity-20 blur-2xl rounded-full" />
          <div className="relative bg-navy-deep border border-border p-8 md:p-12 rounded-2xl shadow-elevate">
            <h3 className="text-2xl font-bold mb-8">Ce que vous recevez exactement :</h3>
            <ul className="space-y-6">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle2 className="w-6 h-6 text-crimson group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-lg text-foreground/90 font-medium leading-tight">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content / Right */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance uppercase tracking-widest">
            La Transaction <span className="text-crimson">Sans Stress</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Fini de courir après les professionnels et de naviguer à l'aveugle. Je prends en charge toute la complexité pour que vous n'ayez qu'à choisir la maison de vos rêves.
          </p>
          
          <button
            onClick={openCalendly}
            className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-crimson text-primary-foreground font-bold rounded-lg shadow-crimson hover:scale-[1.02] transition-transform text-lg w-full sm:w-auto justify-center uppercase tracking-widest"
          >
            <Calendar className="w-6 h-6" />
            Rencontre stratégique gratuite
          </button>
        </div>

      </div>
    </section>
  );
}
