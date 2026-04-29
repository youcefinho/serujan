import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Target, Lightbulb, Handshake, UserCheck, Quote } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// About v2 — Mon Approche, éditorial avec citation premium
// ═══════════════════════════════════════════════════════════

const featureIcons = [Target, Lightbulb, Handshake, UserCheck];
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function About() {
  const { t, ta } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const features = ta(translations.approche.features) as Array<{ title: string; desc: string }>;

  return (
    <section id="approche" ref={ref} className="relative py-28 md:py-36 px-6 bg-black-surface overflow-hidden">
      {/* Halo doré central */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.06) 0%, transparent 60%)", filter: "blur(80px)" }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold/50" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light">
              {t(translations.approche.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance"
          >
            <span className="text-foreground">{t(translations.approche.titleLead)} </span>
            <span className="text-gold-gradient italic font-display-italic">
              {t(translations.approche.titleEmphasis)}
            </span>
            <span className="text-foreground/85"> {t(translations.approche.titleTail)}</span>
          </motion.h2>
        </div>

        {/* Citation éditoriale + description */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
          <motion.figure
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="lg:col-span-5 relative"
          >
            <div className="relative p-8 md:p-10 rounded-2xl bg-black-deep/60 border border-gold/15 shadow-elevate">
              <Quote className="absolute -top-3 -left-3 w-8 h-8 text-gold/80 fill-gold/20" strokeWidth={1.5} />
              <blockquote className="font-display italic text-xl md:text-2xl leading-[1.4] text-foreground/90 text-pretty">
                {t(translations.approche.quote)}
              </blockquote>
              <figcaption className="mt-6 text-sm text-gold-light/80 tracking-wide">
                {t(translations.approche.quoteAttribution)}
              </figcaption>
              {/* Filet doré */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden />
            </div>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="lg:col-span-7 flex items-center"
          >
            <p className="text-lg md:text-xl text-foreground/70 leading-[1.7] text-pretty">
              {t(translations.approche.description)}
            </p>
          </motion.div>
        </div>

        {/* 4 features */}
        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease }}
                className="group relative flex gap-5 p-6 md:p-7 rounded-xl bg-black-deep/40 border border-gold/10 transition-all duration-500 hover:border-gold/25 hover:bg-black-elevated/60 hover:-translate-y-0.5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center group-hover:bg-gold/15 group-hover:border-gold/30 transition-all duration-500">
                  <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-lg text-foreground mb-1.5 tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-foreground/55 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
