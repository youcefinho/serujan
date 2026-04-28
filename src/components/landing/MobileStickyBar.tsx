import { Phone, Calendar } from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";

export function MobileStickyBar() {
  const { t } = useLanguage();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-deep/95 backdrop-blur-lg border-t border-white/10 shadow-2xl">
      <div className="grid grid-cols-2 gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a href={`tel:${clientConfig.phone.raw}`} className="flex items-center justify-center gap-2 py-3 border-2 border-foreground/40 text-foreground font-bold rounded-md text-sm" aria-label="Appeler">
          <Phone className="w-4 h-4" />{t(translations.mobileStickyBar.call)}
        </a>
        <button onClick={openCalendly} className="flex items-center justify-center gap-2 py-3 bg-gradient-crimson text-primary-foreground font-bold rounded-md shadow-crimson text-xs uppercase tracking-wider" aria-label={t(translations.mobileStickyBar.cta)}>
          <Calendar className="w-4 h-4" />{t(translations.mobileStickyBar.cta)}
        </button>
      </div>
    </div>
  );
}
