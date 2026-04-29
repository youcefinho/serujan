import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { motion, AnimatePresence } from "motion/react";
import { Phone, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════
// MobileStickyBar v2 — Apparition fluide après 600px de scroll
// ═══════════════════════════════════════════════════════════

export default function MobileStickyBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          // pb-[env(...)] ajoute le safe-area iOS (home indicator) au padding bas
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black-deep/95 backdrop-blur-xl border-t border-gold/15 px-4 pt-3"
        >
          <div className="flex gap-2.5">
            <a
              href={`tel:+${clientConfig.phone.international}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-gold/30 text-gold rounded-md text-sm font-medium"
              aria-label={`${t(translations.mobileStickyBar.call)} ${clientConfig.phone.display}`}
            >
              <Phone className="w-4 h-4" />
              <span>{t(translations.mobileStickyBar.call)}</span>
            </a>
            <a
              href="#contact"
              className="flex-[1.6] relative overflow-hidden flex items-center justify-center gap-2 py-3 bg-gradient-gold text-black-deep font-semibold rounded-md text-sm shadow-gold-sm btn-shine"
            >
              <span>{t(translations.mobileStickyBar.cta)}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
