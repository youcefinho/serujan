import { Heart, Eye, Zap, MapPin } from "lucide-react";
import mathisWhite from "@/assets/mathis-white.jpg";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";

const valueIcons = [Heart, Eye, Zap];

export function About() {
  const { t, ta } = useLanguage();
  const points = ta(translations.about.points) as string[];
  const values = ta(translations.about.values) as { label: string }[];
  const tags = ta(translations.about.tags) as string[];

  return (
    <section id="apropos" className="py-24 lg:py-32 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Photo du courtier + valeurs en dessous */}
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-8 bg-gradient-crimson rounded-full opacity-20 blur-3xl" />
          <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none overflow-hidden rounded-2xl shadow-elevate">
            <img
              src={mathisWhite}
              alt={`${clientConfig.name}, ${t(clientConfig.title)}`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
            {/* Badge nouvelle génération */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm border border-white/20 text-navy px-4 py-2.5 rounded-xl shadow-elevate transform rotate-2">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-crimson mb-0.5">{clientConfig.ageBadge.value}</span>
              <span className="block font-black text-sm leading-tight">{t(clientConfig.ageBadge.label)}</span>
            </div>
            {/* Badge avis 5 étoiles — social proof */}
            <div className="absolute top-6 left-6 bg-navy-deep/90 backdrop-blur-sm border border-crimson/30 text-foreground px-4 py-2.5 rounded-xl shadow-elevate transform -rotate-2">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-0.5">★★★★★</span>
              <span className="block font-black text-sm leading-tight">{t(clientConfig.reviewsBadge.label)}</span>
            </div>
            {/* Bande territoire */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-deep/90 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-crimson" />
                <span className="text-sm font-semibold">{clientConfig.territoryLabel}</span>
              </div>
            </div>
          </div>

          {/* Valeurs — sous la photo, centrées */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 max-w-md mx-auto lg:max-w-none">
            {values.map(({ label }, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={label} className="bg-card border border-border rounded-xl p-4 text-center hover:border-crimson transition">
                  <Icon className="w-6 h-6 text-crimson mx-auto mb-2" />
                  <div className="text-sm font-bold uppercase tracking-wide">{label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Texte à propos */}
        <div className="order-1 lg:order-2 space-y-8">
          <div>
            <span className="text-crimson text-sm font-bold uppercase tracking-widest">{t(translations.about.label)}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase tracking-widest">
              {t(translations.about.title)}
            </h2>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: t(translations.about.desc1) }} />
            <p>{t(translations.about.desc2)}</p>
          </div>

          <ul className="space-y-3 pt-2">
            {points.map((phrase, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-crimson/10 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-crimson" />
                </div>
                <span className="font-medium text-[15px]">{phrase}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-navy text-foreground text-xs font-bold rounded border border-border">{tag}</span>
            ))}
          </div>

          <div className="flex items-start gap-3 pt-4 border-t border-border">
            <MapPin className="w-5 h-5 text-crimson shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold">{t(translations.about.office)}</div>
              <div className="text-muted-foreground">{`${clientConfig.address.street}, ${clientConfig.address.city}`}</div>
            </div>
          </div>

          {/* CTA conversion */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-crimson text-primary-foreground font-bold rounded-md shadow-crimson hover:scale-[1.02] transition-transform uppercase tracking-widest text-sm"
          >
            {t(translations.hero.ctaPrimary)}
          </a>
        </div>
      </div>
    </section>
  );
}
