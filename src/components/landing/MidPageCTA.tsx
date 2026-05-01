import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { PhoneCall, ArrowRight } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics";

// ═══════════════════════════════════════════════════════════
// MidPageCTA v3 — bandeau capture rapide entre Bio et Calculator
//
// Architecture v2 (mai 2026) — Site Forms GHL embed.
// Le form custom v1 (2 champs name + tel + submit POST /api/leads) est
// remplacé par un CTA qui scroll vers le LeadForm principal (#contact)
// où le visiteur remplit le form GHL natif.
// ═══════════════════════════════════════════════════════════

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function scrollToContact() {
  if (typeof document === "undefined") return;
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function MidPageCTA() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const cardTransition = reduced ? { duration: 0 } : { duration: 0.7, ease };

  function handleCtaClick() {
    trackCtaClick("midpage", "scroll-to-leadform");
    scrollToContact();
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
          <div className="lg:col-span-7">
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

          {/* CTA */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={handleCtaClick}
              className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-gradient-gold text-black-deep font-semibold text-base hover:-translate-y-0.5 transition-all duration-300 shadow-gold-sm hover:shadow-gold btn-shine btn-glow"
            >
              <span>{t(translations.midPageCTA.submit)}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
