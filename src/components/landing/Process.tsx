import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Search, Puzzle, Handshake, CheckCircle2, ArrowRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Process v2 — Timeline verticale avec ligne or qui se trace
// au scroll (motion/react useScroll). Chaque étape se révèle.
// ═══════════════════════════════════════════════════════════

const stepIcons = [Search, Puzzle, Handshake, CheckCircle2];
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Process() {
  const { t, ta } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  // Ligne or qui se trace au scroll
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = ta(translations.process.steps) as Array<{ title: string; desc: string }>;

  return (
    <section
      id="processus"
      ref={ref}
      className="relative py-28 md:py-36 px-6 bg-black-deep bg-stars overflow-hidden"
    >
      {/* Halo discret */}
      <div
        className="absolute top-1/2 right-0 w-[40rem] h-[40rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.05) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto">
        {/* En-tête */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold/50" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light">
              {t(translations.process.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-balance"
          >
            <span className="text-foreground">{t(translations.process.titleLead)} </span>
            <span className="text-gold-gradient italic font-display-italic">
              {t(translations.process.titleEmphasis)}
            </span>
            <span className="text-foreground/85"> {t(translations.process.titleTail)}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-8 text-lg text-foreground/65 leading-relaxed text-pretty max-w-xl"
          >
            {t(translations.process.subtitle)}
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-16 md:pl-20">
          {/* Rail de fond gris discret */}
          <div className="absolute left-6 md:left-7 top-2 bottom-2 w-px bg-gold/10" aria-hidden />

          {/* Ligne or qui se trace au scroll */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-7 top-2 w-px"
            aria-hidden
          >
            <div className="w-full h-full bg-gradient-to-b from-gold via-gold/70 to-gold/20" />
            {/* Tête lumineuse */}
            <div
              className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full"
              style={{
                background: "var(--gold)",
                boxShadow: "0 0 14px 2px oklch(0.78 0.13 82 / 0.6)",
              }}
            />
          </motion.div>

          {/* Étapes */}
          {steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease }}
                className="relative pb-14 md:pb-20 last:pb-0"
              >
                {/* Cercle icône — déborde sur la ligne */}
                <div className="absolute -left-16 md:-left-20 top-0">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-black-deep border-2 border-gold/40 flex items-center justify-center shadow-gold-sm">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-gold" strokeWidth={1.5} />
                    {/* Anneau pulsé */}
                    <span
                      className="absolute inset-0 rounded-full border border-gold/30 animate-pulse-gold"
                      aria-hidden
                    />
                  </div>
                </div>

                {/* Contenu */}
                <div className="pt-1">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-gold/60 mb-2">
                    {t(translations.common.step)} ·{" "}
                    <span className="font-mono tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight text-foreground mb-3 text-balance">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed text-[15px] md:text-base text-pretty max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA contextuel — déclenche le pas après avoir vu le process */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          className="mt-8 md:mt-12 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-gold text-black-deep font-semibold rounded-md shadow-gold-sm hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5 btn-shine btn-glow"
          >
            <span>{t(translations.process.cta)}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
