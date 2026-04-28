import { MessageSquareWarning, ShieldAlert, BadgeDollarSign } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const icons = [MessageSquareWarning, ShieldAlert, BadgeDollarSign];

export function Fears() {
  const { t, ta } = useLanguage();
  const cards = ta(translations.fearsCards) as { title: string; text: string }[];

  return (
    <section className="py-24 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance uppercase tracking-widest">
            {t(translations.fears.title)}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(translations.fearsSubtitle)}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-8 relative overflow-hidden group hover:border-crimson/50 transition-colors"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson shadow-crimson group-hover:w-1.5 transition-all" />
                <Icon className="w-10 h-10 text-crimson mb-6" />
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
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
