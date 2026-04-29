import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Plus, ArrowRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Faq — accordéon premium pour les objections finales B2B
// avant conversion. 6 Q/R commerciales : prêteurs, délais,
// types projets, honoraires, confidentialité, différentiation.
// ═══════════════════════════════════════════════════════════

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Faq() {
  const { t, ta } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = ta(translations.faq.items) as Array<{ q: string; a: string }>;

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-28 md:py-36 px-6 bg-black-surface bg-stars overflow-hidden"
    >
      {/* Halo */}
      <div
        className="absolute top-1/2 -right-40 w-[36rem] h-[36rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.07) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold/50" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light">
              {t(translations.faq.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-balance"
          >
            <span className="text-foreground">{t(translations.faq.titleLead)} </span>
            <span className="text-gold-gradient-animated italic font-display-italic">
              {t(translations.faq.titleEmphasis)}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-8 text-lg text-foreground/65 leading-relaxed text-pretty max-w-2xl"
          >
            {t(translations.faq.subtitle)}
          </motion.p>
        </div>

        {/* Accordéon */}
        <ul className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.06, ease }}
                className={`rounded-xl overflow-hidden bg-black-elevated/40 border transition-colors duration-300 ${
                  isOpen ? "border-gold/35" : "border-gold/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-6 text-left transition-colors hover:bg-black-elevated/60"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <h3 className="font-display text-lg md:text-xl text-foreground tracking-tight pr-4">
                    {item.q}
                  </h3>
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-gold/20 border-gold/50" : ""
                    }`}
                    aria-hidden
                  >
                    <Plus className="w-4 h-4 text-gold" strokeWidth={2} />
                  </span>
                </button>

                {/* Panneau — ouverture/fermeture rapide */}
                <div
                  id={`faq-panel-${i}`}
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "grid-template-rows 200ms cubic-bezier(0.16,1,0.3,1), opacity 150ms ease",
                  }}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="px-6 md:px-8 pb-6 md:pb-7 pt-1">
                      <div
                        className="h-px bg-gradient-to-r from-gold/30 via-gold/15 to-transparent mb-5"
                        aria-hidden
                      />
                      <p className="text-foreground/70 leading-[1.7] text-[15px] md:text-base text-pretty">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* CTA en bas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-gold text-black-deep font-semibold rounded-md shadow-gold-sm hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5 btn-shine btn-glow"
          >
            <span>{t(translations.faq.cta)}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
