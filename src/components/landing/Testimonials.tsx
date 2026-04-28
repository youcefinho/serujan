import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";

export function Testimonials() {
  const { t, ta } = useLanguage();
  const cards = ta(translations.testimonials.cards) as { name: string; quartier: string; text: string }[];
  const recentSales = ta(translations.testimonials.recentSales) as { quartier: string; type: string; prix: string; delai: string }[];

  const initials = ["ST", "KL", "DB", "ER", "PG"];

  return (
    <section id="temoignages" className="py-24 lg:py-32 bg-navy-deep relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-crimson/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-crimson text-sm font-bold uppercase tracking-widest">
            {t(translations.testimonials.label)}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest">
            {t(translations.testimonials.title)}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t(translations.testimonials.subtitle)}
          </p>
          
          <a
            href={clientConfig.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-bold shadow-elevate hover:scale-105 transition-transform"
          >
            <div className="flex text-[#FFC107]">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left">
              <span className="block text-sm">{t(translations.testimonials.googleBadge)}</span>
              <span className="block text-[10px] text-gray-500 font-medium">{t(translations.testimonials.verify)}</span>
            </div>
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {cards.slice(0, 3).map((card, i) => (
            <TestimonialCard key={card.name} {...card} rating={5} initials={initials[i]} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-24">
          {cards.slice(3).map((card, i) => (
            <TestimonialCard key={card.name} {...card} rating={5} initials={initials[i + 3]} />
          ))}
        </div>

        <div className="border-t border-border pt-16">
          <div className="text-center mb-12">
            <span className="text-crimson text-sm font-bold uppercase tracking-widest">
              {t(translations.testimonials.recentLabel)}
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold">
              {t(translations.testimonials.recentTitle)}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentSales.map((v, i) => (
              <div
                key={i}
                className="group relative bg-card border border-border rounded-xl p-4 sm:p-6 hover:border-crimson transition-all hover:shadow-crimson"
              >
                <div className="absolute top-4 right-4 px-2 py-1 bg-crimson/10 border border-crimson/30 rounded-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-crimson">
                    {t(translations.testimonials.sold)}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  {v.quartier}
                </div>
                <div className="mt-2 text-lg font-bold text-foreground">{v.type}</div>
                <div className="mt-4 text-2xl sm:text-3xl font-bold text-crimson">{v.prix}</div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {t(translations.testimonials.soldIn)} {v.delai}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  quartier,
  rating,
  text,
  initials,
}: {
  name: string;
  quartier: string;
  rating: number;
  text: string;
  initials: string;
}) {
  return (
    <div className="relative bg-card border border-border rounded-2xl p-5 sm:p-8 hover:border-crimson/50 transition-all hover:shadow-elevate">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-crimson/20" />

      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-crimson text-crimson" />
        ))}
      </div>

      <p className="text-foreground/90 leading-relaxed mb-6">« {text} »</p>

      <div className="flex items-center gap-3 pt-6 border-t border-border">
        <div className="w-11 h-11 rounded-full bg-gradient-crimson flex items-center justify-center text-sm font-bold text-primary-foreground">
          {initials}
        </div>
        <div>
          <div className="font-bold text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            {quartier}
          </div>
        </div>
      </div>
    </div>
  );
}
