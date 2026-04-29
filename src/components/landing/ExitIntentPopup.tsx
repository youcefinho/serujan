import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { useState, useEffect, useCallback } from "react";
import { X, Phone } from "lucide-react";

export default function ExitIntentPopup() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !dismissed && !sessionStorage.getItem("exit-popup-shown")) {
      setShow(true);
      sessionStorage.setItem("exit-popup-shown", "true");
    }
  }, [dismissed]);

  useEffect(() => {
    document.addEventListener("mouseout", handleMouseLeave);
    return () => document.removeEventListener("mouseout", handleMouseLeave);
  }, [handleMouseLeave]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => { setShow(false); setDismissed(true); }}>
      <div className="absolute inset-0 bg-black-deep/80 backdrop-blur-sm" />
      <div className="relative max-w-md w-full p-8 rounded-2xl bg-black-card border border-gold/20 animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => { setShow(false); setDismissed(true); }} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-bold text-foreground mb-3">{t(translations.exitIntent.title)}</h3>
        <p className="text-muted-foreground mb-6">
          {t(translations.exitIntent.description)}{" "}
          <strong className="text-gold">{t(translations.exitIntent.descriptionBold)}</strong>{" "}
          {t(translations.exitIntent.descriptionEnd)}
        </p>
        <a href="#contact" onClick={() => setShow(false)} className="block w-full py-4 bg-gradient-gold text-black-deep text-center font-bold uppercase tracking-widest rounded-lg shadow-gold mb-4">
          {t(translations.exitIntent.cta)}
        </a>
        <p className="text-center text-sm text-muted-foreground">
          {t(translations.exitIntent.callAlt)}{" "}
          <a href={`tel:+${clientConfig.phone.international}`} className="text-gold font-semibold">
            <Phone className="w-3.5 h-3.5 inline" /> {clientConfig.phone.display}
          </a>
        </p>
      </div>
    </div>
  );
}
