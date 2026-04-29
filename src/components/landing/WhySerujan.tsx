import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Network, Award, Trophy, ArrowRight } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

// ═══════════════════════════════════════════════════════════
// WhySerujan — 3 cartes "trust signals" entre Hero et Services.
// Reproduit le pattern de la demo Intralys/Serujan : RÉSEAU
// EXCLUSIF · EXPERTISE RECONNUE · RÉSULTATS GARANTIS.
// ═══════════════════════════════════════════════════════════

const cardIcons = [Network, Award, Trophy];
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function WhySerujan() {
  const { t, ta } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const cards = ta(translations.whySerujan.cards) as Array<{
    metric: string;
    title: string;
    desc: string;
  }>;

  return (
    <section
      id="pourquoi"
      ref={ref}
      className="relative py-24 md:py-28 px-6 bg-black-surface bg-stars overflow-hidden"
    >
      {/* Halo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[20rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(ellipse, oklch(0.78 0.13 82 / 0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold/50" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light">
              {t(translations.whySerujan.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-balance"
          >
            <span className="text-foreground">{t(translations.whySerujan.titleLead)} </span>
            <span className="text-gold-gradient italic font-display-italic">
              {t(translations.whySerujan.titleEmphasis)}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-7 text-base md:text-lg text-foreground/65 leading-relaxed text-pretty max-w-2xl"
          >
            {t(translations.whySerujan.subtitle)}
          </motion.p>
        </div>

        {/* 3 cartes */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {cards.map((card, i) => {
            const Icon = cardIcons[i];
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease }}
                className="group relative glass rounded-2xl p-7 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30"
              >
                {/* Icône */}
                <div className="relative w-12 h-12 mb-6">
                  <div className="absolute inset-0 rounded-lg bg-gold/10 border border-gold/25 group-hover:bg-gold/15 group-hover:border-gold/40 transition-all duration-500" />
                  <Icon
                    className="relative w-6 h-6 m-auto top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-gold transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Chiffre-clé — impact visuel immédiat */}
                <CountUp
                  value={card.metric}
                  className="font-display text-3xl md:text-4xl text-gold-gradient leading-none tabular-nums mb-4"
                />

                <h3 className="font-display text-lg md:text-xl tracking-tight text-foreground mb-3 text-balance">
                  {card.title}
                </h3>
                <p className="text-foreground/65 leading-relaxed text-sm md:text-[15px] text-pretty">
                  {card.desc}
                </p>

                {/* Filet doré bas qui se trace au hover */}
                <div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-gold to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out"
                  aria-hidden
                />
              </motion.article>
            );
          })}
        </div>

        {/* CTA contextuel — capture les visiteurs convaincus dès la sect. 2 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease }}
          className="mt-12 md:mt-14 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 border border-gold/30 text-foreground/90 hover:text-gold hover:border-gold/60 hover:bg-black-elevated/40 font-medium rounded-md transition-all duration-300"
          >
            <span>{t(translations.whySerujan.cta)}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
