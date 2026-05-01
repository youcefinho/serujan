import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { X, PhoneCall, ArrowRight, Phone } from "lucide-react";
import { trackExitIntent, trackPhoneClick, trackCtaClick } from "@/lib/analytics";

// ═══════════════════════════════════════════════════════════
// ExitIntent v3 — modal sortie souris/inactivité
//
// Architecture v2 (mai 2026) — Site Forms GHL embed.
// Le form custom v1 (name + tel + submit POST /api/leads) est remplacé
// par 2 CTAs : appel direct OU scroll vers LeadForm principal (#contact).
//
// Modal s'affiche UNE fois par session (sessionStorage).
// Respecte prefers-reduced-motion.
// ═══════════════════════════════════════════════════════════

const STORAGE_KEY = "serujan-exitintent-shown";
const MOBILE_INACTIVITY_MS = 45_000;
const DESKTOP_DELAY_MIN_MS = 8_000;
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function alreadyShown(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* sessionStorage indisponible */
  }
}

function scrollToContact() {
  if (typeof document === "undefined") return;
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ExitIntent() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);
  const reduced = useReducedMotion();
  const backdropTransition = reduced ? { duration: 0 } : { duration: 0.3 };
  const modalTransition = reduced ? { duration: 0 } : { duration: 0.45, ease };

  const handleClose = useCallback(() => {
    setOpen(false);
    markShown();
    trackExitIntent("closed");
  }, []);

  function handleScrollCta() {
    trackExitIntent("clicked");
    trackCtaClick("exit-intent", "scroll-to-leadform");
    setOpen(false);
    markShown();
    // Petit délai pour laisser la modal se fermer avant le scroll
    setTimeout(scrollToContact, 200);
  }

  // Armer le déclencheur après un court délai (évite faux positif au load)
  useEffect(() => {
    if (alreadyShown()) return;
    const id = setTimeout(() => setArmed(true), DESKTOP_DELAY_MIN_MS);
    return () => clearTimeout(id);
  }, []);

  // Desktop : souris quitte par le haut
  useEffect(() => {
    if (!armed || open || alreadyShown()) return;
    function onLeave(e: MouseEvent) {
      if (e.clientY <= 0 && e.relatedTarget === null) {
        setOpen(true);
        markShown();
        trackExitIntent("shown");
      }
    }
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [armed, open]);

  // Mobile : inactivité prolongée (pas de mousemove possible)
  useEffect(() => {
    if (!armed || open || alreadyShown()) return;
    const isCoarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (!isCoarse) return;
    let last = Date.now();
    const reset = () => {
      last = Date.now();
    };
    const id = setInterval(() => {
      if (Date.now() - last > MOBILE_INACTIVITY_MS && document.hasFocus()) {
        setOpen(true);
        markShown();
        trackExitIntent("shown");
      }
    }, 5000);
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("touchstart", reset, { passive: true });
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("touchstart", reset);
    };
  }, [armed, open]);

  // ESC pour fermer
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          {/* Backdrop sombre + blur */}
          <div className="absolute inset-0 bg-black-deep/75 backdrop-blur-sm" aria-hidden />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={modalTransition}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-black-deep border border-gold/30 shadow-elevate p-7 md:p-9"
          >
            {/* Bouton fermer */}
            <button
              type="button"
              onClick={handleClose}
              aria-label={t(translations.exitIntent.close)}
              className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center rounded-full text-foreground/55 hover:text-gold hover:bg-black-elevated/60 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <PhoneCall className="w-3.5 h-3.5 text-gold" strokeWidth={1.7} />
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold-light">
                {t(translations.midPageCTA.label)}
              </span>
            </div>

            <h3
              id="exit-intent-title"
              className="font-display text-2xl md:text-3xl text-foreground tracking-tight mb-3 text-balance"
            >
              {t(translations.exitIntent.title)}
            </h3>

            <p className="text-sm text-foreground/65 leading-relaxed mb-6 text-pretty">
              {t(translations.exitIntent.subtitle)}
            </p>

            {/* CTAs : appel direct OU scroll vers form */}
            <div className="space-y-3">
              <a
                href={`tel:+${clientConfig.phone.international}`}
                onClick={() => trackPhoneClick("exit-intent")}
                className="group w-full inline-flex items-center justify-center gap-2 py-3 rounded-md bg-gradient-gold text-black-deep font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 shadow-gold-sm hover:shadow-gold btn-shine"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{clientConfig.phone.display}</span>
              </a>

              <button
                type="button"
                onClick={handleScrollCta}
                className="group w-full inline-flex items-center justify-center gap-2 py-3 rounded-md border border-gold/30 text-foreground font-medium text-sm hover:border-gold/60 hover:bg-gold/5 transition-all duration-300"
              >
                <span>{t(translations.exitIntent.submit)}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-4 w-full py-2 text-xs text-foreground/45 hover:text-foreground/70 transition-colors"
            >
              {t(translations.exitIntent.decline)}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
