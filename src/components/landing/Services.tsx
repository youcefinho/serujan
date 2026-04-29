import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Building2, BarChart3, Landmark, ArrowUpRight } from "lucide-react";
// Note : retrait des CTA "Voir un cas similaire" sur chaque carte —
// pas de cas réel publiable, ne pas mentir au visiteur.

// ═══════════════════════════════════════════════════════════
// Services v2 — 3 piliers en cartes éditoriales
// Numéro géant en filigrane, titre Fraunces, hover gradient + sheen
// ═══════════════════════════════════════════════════════════

const PILLARS = [
  { key: "pillar1" as const, Icon: Building2, num: "01" },
  { key: "pillar2" as const, Icon: BarChart3, num: "02" },
  { key: "pillar3" as const, Icon: Landmark, num: "03" },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Services() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-28 md:py-36 px-6 bg-black-deep bg-stars overflow-hidden"
    >
      {/* Lueur dorée discrète à gauche */}
      <div
        className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* En-tête éditorial */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold/50" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light">
              {t(translations.services.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance"
          >
            <span className="text-foreground">{t(translations.services.titleLead)} </span>
            <span className="text-gold-gradient italic font-display-italic">
              {t(translations.services.titleEmphasis)}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-8 text-lg text-foreground/65 leading-relaxed text-pretty max-w-2xl"
          >
            {t(translations.services.subtitle)}
          </motion.p>
        </div>

        {/* 3 piliers */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map(({ key, Icon, num }, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease }}
              className="group relative isolate overflow-hidden rounded-2xl bg-black-elevated/50 border border-gold/10 p-8 md:p-10 transition-all duration-700 hover:border-gold/30 hover:bg-black-elevated/80 hover:-translate-y-1"
            >
              {/* Numéro géant en filigrane */}
              <span
                aria-hidden
                className="absolute -top-2 -right-2 font-display text-[8rem] leading-none text-gold/[0.04] select-none pointer-events-none transition-colors duration-700 group-hover:text-gold/[0.08]"
              >
                {num}
              </span>

              {/* Gradient révélé au hover */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-gold-subtle"
              />

              {/* Sheen sweep au hover */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 30%, oklch(0.95 0.05 85 / 0.08) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  animation: "sheen-sweep 1.4s ease-out 0.2s",
                }}
              />

              <div className="relative">
                {/* Icône avec halo */}
                <div className="relative w-14 h-14 mb-8">
                  <div className="absolute inset-0 rounded-xl bg-gold/10 group-hover:bg-gold/15 transition-colors duration-500" />
                  <div className="absolute inset-0 rounded-xl border border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />
                  <Icon
                    className="relative w-7 h-7 m-auto top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-gold transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Étiquette pilier */}
                <div className="text-[10px] uppercase tracking-[0.24em] text-gold/60 mb-3">
                  {t(translations.services.pillarNumber)} · {num}
                </div>

                {/* Titre */}
                <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight tracking-tight text-foreground mb-4 text-balance">
                  {t(translations.services[key].title)}
                </h3>

                {/* Description */}
                <p className="text-foreground/60 leading-relaxed text-[15px] text-pretty">
                  {t(translations.services[key].desc)}
                </p>
              </div>

              {/* Filet doré qui se trace en bas */}
              <div
                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-gold to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out"
                aria-hidden
              />
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-gold transition-colors group"
          >
            <span className="border-b border-gold/30 group-hover:border-gold pb-0.5 transition-colors">
              {t(translations.services.learnMore)}
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
