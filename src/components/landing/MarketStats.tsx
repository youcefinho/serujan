import { TrendingUp, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const iconMap = [TrendingUp, MapPin, TrendingUp, Clock, TrendingUp];

export function MarketStats() {
  const { t, ta } = useLanguage();
  const stats = ta(translations.marketStats.items) as { label: string; value: string }[];

  return (
    <section className="py-24 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12 md:text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-widest">
            {t(translations.marketStats.title)}
          </h2>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-crimson">
            {t(translations.marketStats.dataLabel)}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
          {stats.map((stat, i) => {
            const Icon = iconMap[i];
            const isAccent = i === 2;
            return (
              <div
                key={i}
                className={`p-6 rounded-xl border ${
                  isAccent
                    ? "bg-gradient-crimson border-transparent text-primary-foreground shadow-crimson"
                    : "bg-navy-deep border-border hover:border-crimson/50 transition-colors"
                }`}
              >
                <div className="flex items-center gap-3 mb-3 opacity-80">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-xs uppercase tracking-widest font-semibold">{stat.label}</span>
                </div>
                <div className="text-2xl md:text-4xl font-bold">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
