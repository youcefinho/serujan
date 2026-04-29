import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { isValidPhone, sanitizeInput } from "@/lib/security";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { X, PhoneCall, Loader2, CheckCircle2 } from "lucide-react";
import { trackExitIntent, trackFormSubmitError, trackLeadFormSubmit } from "@/lib/analytics";

// ═══════════════════════════════════════════════════════════
// ExitIntent — modal sobre, déclenché UNE FOIS par session
// quand l'utilisateur s'apprête à quitter (souris vers le haut
// sur desktop, ou inactivité prolongée sur mobile).
// 2 champs : nom + tel. Backdrop blur, ESC ferme, click backdrop ferme.
// Respect prefers-reduced-motion : pas d'animations agressives.
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

export default function ExitIntent() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const mountRef = useRef<number>(Date.now());
  const reduced = useReducedMotion();
  const backdropTransition = reduced ? { duration: 0 } : { duration: 0.3 };
  const modalTransition = reduced ? { duration: 0 } : { duration: 0.45, ease };
  const successTransition = reduced ? { duration: 0 } : { duration: 0.5, ease };

  const handleClose = useCallback(() => {
    setOpen(false);
    markShown();
    trackExitIntent("closed");
  }, []);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sanitizeInput(name).length < 2) return;
    if (!isValidPhone(phone)) return;
    setStatus("sending");
    const elapsed_ms = Date.now() - mountRef.current;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizeInput(name, 100),
          email: "",
          phone: sanitizeInput(phone, 30),
          project_type: "Exit-intent",
          estimated_amount: "",
          message: t(translations.exitIntent.sourceTag),
          hp: "",
          elapsed_ms,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      trackLeadFormSubmit("Exit-intent");
      trackExitIntent("clicked");
      toast.success(t(translations.exitIntent.success));
      setName("");
      setPhone("");
      // Fermer après 2.5s
      setTimeout(() => setOpen(false), 2500);
    } catch {
      setStatus("idle");
      trackFormSubmitError("exitintent-network");
      toast.error(t(translations.leadForm.error));
    }
  }

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

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={successTransition}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto mb-5 shadow-gold-sm">
                    <CheckCircle2 className="w-7 h-7 text-gold" strokeWidth={2} />
                  </div>
                  <p className="font-display text-xl text-foreground leading-relaxed text-pretty">
                    {t(translations.exitIntent.success)}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
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

                  <div className="space-y-3 mb-5">
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t(translations.exitIntent.name)}
                      aria-label={t(translations.exitIntent.name)}
                      className="w-full px-4 py-3 rounded-md bg-black-elevated/60 border border-gold/15 text-foreground placeholder-foreground/40 focus:border-gold/45 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                    />
                    <input
                      type="tel"
                      required
                      maxLength={30}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t(translations.exitIntent.phone)}
                      aria-label={t(translations.exitIntent.phone)}
                      className="w-full px-4 py-3 rounded-md bg-black-elevated/60 border border-gold/15 text-foreground placeholder-foreground/40 focus:border-gold/45 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-sm tabular-nums"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3 rounded-md bg-gradient-gold text-black-deep font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 shadow-gold-sm hover:shadow-gold disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 btn-shine flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{t(translations.exitIntent.sending)}</span>
                      </>
                    ) : (
                      <span>{t(translations.exitIntent.submit)}</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-3 w-full py-2 text-xs text-foreground/45 hover:text-foreground/70 transition-colors"
                  >
                    {t(translations.exitIntent.decline)}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
