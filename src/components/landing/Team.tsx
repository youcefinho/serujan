import { Building2, Award, ArrowRight } from "lucide-react";
import mathisWhite from "@/assets/mathis-white.jpg";
import logoEquipeColor from "@/assets/logo-equipe-color.png";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";

export function Team() {
  const { t } = useLanguage();

  return (
    <section id="equipe" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-crimson mb-3">{t(translations.team.label)}</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            {t(translations.team.title)}
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t(translations.team.subtitle)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <div className="relative group mx-auto w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-crimson rounded-2xl transform rotate-3 scale-105 opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-xl" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 shadow-elevate">
              <img
                src={mathisWhite}
                alt={`${clientConfig.name}, ${t(clientConfig.title)}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4">
                <img src={logoEquipeColor} alt="L'Équipe" className="h-6 object-contain opacity-70 brightness-0 invert drop-shadow-md" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-2">{clientConfig.name}</h3>
              <p className="text-crimson font-bold text-lg mb-6">{t(translations.team.role)}</p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t(translations.team.bio)}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-crimson" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{t(translations.team.feature1Title)}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(translations.team.feature1Desc)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-crimson" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{t(translations.team.feature2Title)}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(translations.team.feature2Desc)}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-navy font-bold rounded-md hover:bg-crimson hover:text-primary-foreground transition-colors group"
              >
                {t(translations.team.cta)}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
