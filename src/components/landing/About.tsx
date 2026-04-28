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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-2 border-2 border-crimson rounded-2xl translate-x-4 translate-y-4" />
          <div className="relative aspect-[4/5] bg-cream rounded-2xl overflow-hidden shadow-elevate">
            <img
              src={mathisWhite}
              alt={`Portrait de ${clientConfig.name}`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
            </div>
            {/* Nouvelle génération badge */}
            <div className="absolute -left-6 top-12 bg-white text-navy p-5 rounded-2xl shadow-elevate max-w-[240px] transform -rotate-2 z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center text-white font-bold text-lg">
                  22
                </div>
                <div className="font-bold leading-tight" style={{ whiteSpace: "pre-line" }}>{t(translations.about.badge)}</div>
              </div>
              <p className="text-xs text-navy/70 font-medium">{t(translations.about.badgeDesc)}</p>
            </div>
          </div>

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

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
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

          <div className="flex items-start gap-3 pt-4 border-t border-border">
            <MapPin className="w-5 h-5 text-crimson shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold">{t(translations.about.office)}</div>
              <div className="text-muted-foreground">225 boul. de la Gappe, suite 102, Gatineau</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
