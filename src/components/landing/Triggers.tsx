import { Baby, Wallet, ThumbsUp, KeyRound } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const icons = [Baby, Wallet, ThumbsUp, KeyRound];

export function Triggers() {
  const { t, ta } = useLanguage();
  const cards = ta(translations.triggersCards) as { title: string; text: string }[];

  return (
    <section className="py-24 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance uppercase tracking-widest">
            {t(translations.triggers.title)}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(translations.triggersSubtitle)}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="bg-navy-deep border border-border rounded-xl p-6 relative overflow-hidden group hover:border-crimson/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-elevate"
              >
                <div className="w-12 h-12 rounded-lg bg-crimson/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-crimson" />
                </div>
                <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
