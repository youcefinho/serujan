import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Phone } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// FreeConsultation — CTA section avant le formulaire
// ═══════════════════════════════════════════════════════════

export default function FreeConsultation() {
  const { t } = useLanguage();
  const ref = useScrollReveal();

  return (
    <section className="relative py-20 px-4 bg-black-card" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          {t(translations.freeConsultation.title)}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t(translations.freeConsultation.subtitle)}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${clientConfig.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-black-deep font-bold uppercase tracking-widest rounded-lg shadow-gold hover:shadow-gold-sm hover:scale-[1.02] transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            {t(translations.freeConsultation.ctaEmail)}
          </a>
          <a
            href={`tel:+${clientConfig.phone.international}`}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-bold uppercase tracking-widest rounded-lg hover:bg-gold hover:text-black-deep transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            {t(translations.freeConsultation.ctaCall)}
          </a>
        </div>

        {/* Infos contact */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-gold uppercase tracking-widest text-xs mb-2">Email</p>
            <a href={`mailto:${clientConfig.email}`} className="hover:text-gold transition-colors">
              {clientConfig.email}
            </a>
          </div>
          <div>
            <p className="font-semibold text-gold uppercase tracking-widest text-xs mb-2">
              {t(translations.nav.call)}
            </p>
            <a href={`tel:+${clientConfig.phone.international}`} className="hover:text-gold transition-colors">
              {clientConfig.phone.display}
            </a>
          </div>
          <div>
            <p className="font-semibold text-gold uppercase tracking-widest text-xs mb-2">Bureau</p>
            <p>
              {clientConfig.address.street}
              <br />
              {clientConfig.address.suite}, {clientConfig.address.city}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
