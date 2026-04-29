import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { isValidPhone, sanitizeInput } from "@/lib/security";
import { motion, useInView, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { PhoneCall, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { trackCtaClick, trackFormSubmitError, trackLeadFormSubmit } from "@/lib/analytics";

// ═══════════════════════════════════════════════════════════
// MidPageCTA — bandeau capture rapide entre Bio et Calculator
// 2 champs (nom + tel) → "Rappel sous 1 h ouvrée".
// Source/marqueur : "Source: rappel rapide" envoyé dans message.
// ═══════════════════════════════════════════════════════════

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MidPageCTA() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const cardTransition = reduced ? { duration: 0 } : { duration: 0.7, ease };
  const successTransition = reduced ? { duration: 0 } : { duration: 0.5, ease };

  const mountRef = useRef<number>(Date.now());
  useEffect(() => {
    mountRef.current = Date.now();
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

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
          project_type: "Rappel rapide",
          estimated_amount: "",
          message: t(translations.midPageCTA.sourceTag),
          hp: "",
          elapsed_ms,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      trackLeadFormSubmit("Rappel rapide");
      trackCtaClick("midpage", "rappel-rapide");
      toast.success(t(translations.midPageCTA.success));
      setName("");
      setPhone("");
    } catch {
      setStatus("idle");
      trackFormSubmitError("midpage-network");
      toast.error(t(translations.leadForm.error));
    }
  }

  return (
    <section ref={ref} className="relative py-16 md:py-20 px-6 bg-black-elevated overflow-hidden">
      {/* Halo discret */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[16rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(ellipse, oklch(0.78 0.13 82 / 0.10) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={cardTransition}
          className="grid lg:grid-cols-12 gap-8 items-center p-8 md:p-10 rounded-2xl bg-black-deep/80 border border-gold/20 shadow-elevate"
        >
          {/* Pitch */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-3">
              <PhoneCall className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={1.7} />
              <span className="text-[11px] uppercase tracking-[0.24em] text-gold-light">
                {t(translations.midPageCTA.label)}
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-tight mb-3 text-balance">
              {t(translations.midPageCTA.title)}
            </h3>
            <p className="text-sm md:text-[15px] text-foreground/65 leading-relaxed text-pretty">
              {t(translations.midPageCTA.subtitle)}
            </p>
          </div>

          {/* Form / Success */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="mid-success"
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={successTransition}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gold/10 border border-gold/30"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" strokeWidth={2} />
                  <p className="text-sm text-foreground leading-relaxed">
                    {t(translations.midPageCTA.success)}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="mid-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid sm:grid-cols-12 gap-3"
                >
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t(translations.midPageCTA.name)}
                    aria-label={t(translations.midPageCTA.name)}
                    className="sm:col-span-4 w-full px-4 py-3 rounded-md bg-black-elevated/60 border border-gold/15 text-foreground placeholder-foreground/40 focus:border-gold/45 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                  />
                  <input
                    type="tel"
                    required
                    maxLength={30}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t(translations.midPageCTA.phone)}
                    aria-label={t(translations.midPageCTA.phone)}
                    className="sm:col-span-4 w-full px-4 py-3 rounded-md bg-black-elevated/60 border border-gold/15 text-foreground placeholder-foreground/40 focus:border-gold/45 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-sm tabular-nums"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group sm:col-span-4 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-gradient-gold text-black-deep font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 shadow-gold-sm hover:shadow-gold disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 btn-shine"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{t(translations.midPageCTA.sending)}</span>
                      </>
                    ) : (
                      <>
                        <span>{t(translations.midPageCTA.submit)}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
