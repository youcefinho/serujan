import { TrendingUp, Clock, MapPin } from "lucide-react";

export function MarketStats() {
  const stats = [
    { label: "Transactions annuelles Gatineau", value: "8 500", icon: TrendingUp },
    { label: "Prix médian maison", value: "372 000$", icon: MapPin },
    { label: "Hausse annuelle", value: "+5.8%", icon: TrendingUp, accent: true },
    { label: "Délai médian", value: "24 jours", icon: Clock },
    { label: "Offres multiples", value: "28%", icon: TrendingUp },
  ];

  return (
    <section className="py-24 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12 md:text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-widest">
            Le marché de Gatineau en chiffres
          </h2>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-crimson">
            Données 2024 — Aylmer · Hull · Gatineau · Buckingham · Masson-Angers · Cantley
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl border ${
                stat.accent
                  ? "bg-gradient-crimson border-transparent text-primary-foreground shadow-crimson"
                  : "bg-navy-deep border-border hover:border-crimson/50 transition-colors"
              }`}
            >
              <div className="flex items-center gap-3 mb-3 opacity-80">
                <stat.icon className="w-5 h-5 shrink-0" />
                <span className="text-xs uppercase tracking-widest font-semibold">{stat.label}</span>
              </div>
              <div className="text-2xl md:text-4xl font-bold">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
