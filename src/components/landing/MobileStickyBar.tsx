import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { Phone, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function MobileStickyBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black-deep/95 backdrop-blur-xl border-t border-gold/20 px-4 py-3 animate-fade-in">
      <div className="flex gap-3">
        <a href={`tel:+${clientConfig.phone.international}`} className="flex-1 flex items-center justify-center gap-2 py-3 border border-gold/30 text-gold font-semibold rounded-lg text-sm">
          <Phone className="w-4 h-4" />
          {t(translations.mobileStickyBar.call)}
        </a>
        <a href="#contact" className="flex-[2] flex items-center justify-center gap-2 py-3 bg-gradient-gold text-black-deep font-bold uppercase tracking-wider rounded-lg text-sm">
          {t(translations.mobileStickyBar.cta)}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
