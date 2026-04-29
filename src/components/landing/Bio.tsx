import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Quote, CheckCircle2 } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Bio v2 — Qui est Serujan
// Photo Elev8 à gauche, contenu éditorial + 4 milestones à droite
// Liste credentials sous forme de checklist or
// ═══════════════════════════════════════════════════════════

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Milestone {
  metric: string;
  label: string;
  desc: string;
}

export default function Bio() {
  const { t, ta } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const milestones = ta(translations.bio.milestones) as Milestone[];
  const credentials = ta(translations.bio.credentials) as string[];

  return (
    <section
      id="bio"
      ref={ref}
      className="relative py-28 md:py-36 px-6 bg-black-deep overflow-hidden"
    >
      {/* Halo doré décentré */}
      <div
        className="absolute top-1/3 -right-20 w-[40rem] h-[40rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.07) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
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
              {t(translations.bio.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance"
          >
            <span className="text-foreground">{t(translations.bio.titleLead)} </span>
            <span className="text-gold-gradient italic font-display-italic">
              {t(translations.bio.titleEmphasis)}
            </span>
            <span className="text-foreground/85"> {t(translations.bio.titleTail)}</span>
          </motion.h2>
        </div>

        {/* Layout split : photo + contenu */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mb-20 items-start">
          {/* Photo Elev8 + filet doré encadrant */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="lg:col-span-5 relative lg:sticky lg:top-32"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-elevate">
              <img
                src={clientConfig.bioImageUrl}
                alt={`${clientConfig.name} — ${t(translations.bio.label)}`}
                className="w-full h-auto block"
                loading="lazy"
                decoding="async"
              />
              {/* Voile gradient bas pour lisibilité d'un éventuel sous-titre */}
              <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.07 0.005 260 / 0.7) 0%, transparent 100%)",
                }}
                aria-hidden
              />
            </div>
            {/* Filet doré */}
            <div
              className="mt-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              aria-hidden
            />
          </motion.div>

          {/* Contenu : intro + citation + credentials */}
          <div className="lg:col-span-7 space-y-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="text-lg md:text-xl text-foreground/75 leading-[1.65] text-pretty"
            >
              {t(translations.bio.intro)}
            </motion.p>

            {/* Citation */}
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="relative pl-6 border-l-2 border-gold/40"
            >
              <Quote
                className="absolute -top-2 -left-3 w-5 h-5 text-gold/70 fill-gold/15 bg-black-deep"
                strokeWidth={1.5}
              />
              <blockquote className="font-display italic text-xl md:text-2xl leading-[1.45] text-foreground/90 text-pretty">
                {t(translations.bio.quote)}
              </blockquote>
              <figcaption className="mt-4 text-sm text-gold-light/80 tracking-wide">
                {t(translations.bio.quoteAttribution)}
              </figcaption>
            </motion.figure>

            {/* Credentials checklist */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="space-y-3"
            >
              {credentials.map((line, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/75">
                  <CheckCircle2
                    className="flex-shrink-0 w-4 h-4 mt-1 text-gold/80"
                    strokeWidth={2}
                  />
                  <span className="text-sm md:text-base leading-relaxed">{line}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* 4 milestones */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10 rounded-xl overflow-hidden">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 + i * 0.08, ease }}
              className="bg-black-elevated/60 backdrop-blur-sm px-6 py-7 md:px-7 md:py-8 transition-colors hover:bg-black-elevated"
            >
              <div className="font-display text-3xl md:text-4xl text-gold-gradient leading-none tabular-nums">
                {m.metric}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-foreground/60 font-medium">
                {m.label}
              </div>
              <div className="mt-2 text-xs md:text-sm text-foreground/55 leading-relaxed">
                {m.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA discret */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.05, ease }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 border border-gold/30 text-foreground/90 hover:text-gold hover:border-gold/60 hover:bg-black-elevated/40 font-medium rounded-md transition-all duration-300"
          >
            <span>{t(translations.bio.cta)}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
