import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { motion } from "motion/react";
import { Phone, ArrowRight, ArrowDown } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Typewriter } from "@/components/ui/Typewriter";

// ═══════════════════════════════════════════════════════════
// Hero v2 — éditorial, dense, signature
// Titre tripartite (Fraunces) + sous-titre Inter + 4 stats
// Une seule section pour : promesse + preuves + double CTA.
// ═══════════════════════════════════════════════════════════

const STATS = [
  { value: "500M$+", key: "statFunded" as const },
  { value: "95%", key: "statApproval" as const },
  { value: "30", key: "statDays" as const },
  { value: "1000+", key: "statProjects" as const },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function Hero() {
  const { t, ta } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-gradient-hero bg-stars-hero"
    >
      {/* Image de fond très atténuée */}
      {clientConfig.heroImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.18]"
          style={{ backgroundImage: `url(${clientConfig.heroImageUrl})` }}
          aria-hidden
        />
      )}

      {/* Halo doré derrière le titre */}
      <div
        className="absolute top-1/4 right-0 w-[42rem] h-[42rem] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.10) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      {/* Filets dorés horizontaux discrets */}
      <div
        className="absolute top-32 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent"
        aria-hidden
      />
      <div
        className="absolute bottom-32 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-20 md:pt-32 md:pb-24">
        {/* Badge */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-gold/60" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light">
            {t(translations.hero.badge)}
          </span>
        </motion.div>

        {/* Titre avec typewriter */}
        <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.02] tracking-tight max-w-5xl">
          <motion.span {...fadeUp(0.08)} className="block text-foreground">
            {t(translations.hero.titleLead)}
          </motion.span>
          <motion.span
            {...fadeUp(0.18)}
            className="block text-gold-gradient-animated italic font-display-italic min-h-[2.4em] sm:min-h-[1.2em]"
            style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144" }}
          >
            <Typewriter
              phrases={ta(translations.hero.typewriterPhrases) as string[]}
              typeSpeed={45}
              deleteSpeed={25}
              pauseAfterType={2200}
              pauseAfterDelete={400}
            />
          </motion.span>
        </h1>

        {/* Sous-titre */}
        <motion.p
          {...fadeUp(0.4)}
          className="mt-10 max-w-2xl text-lg md:text-xl text-foreground/70 leading-relaxed text-pretty"
        >
          {t(translations.hero.subtitle)}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-gold text-black-deep font-semibold rounded-md shadow-gold hover:shadow-gold-sm transition-all duration-300 hover:-translate-y-0.5 btn-shine btn-glow"
          >
            <span>{t(translations.hero.ctaPrimary)}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:+${clientConfig.phone.international}`}
            className="group inline-flex items-center justify-center gap-2 px-7 py-4 border border-gold/30 text-foreground/90 hover:text-gold hover:border-gold/60 font-medium rounded-md transition-all duration-300"
            aria-label={`${t(translations.hero.ctaCall)} — ${clientConfig.phone.display}`}
          >
            <Phone className="w-4 h-4 text-gold/80 group-hover:text-gold transition-colors" />
            <span>{t(translations.hero.ctaCall)}</span>
            <span className="text-foreground/40 group-hover:text-gold/70 text-sm tabular-nums transition-colors">
              {clientConfig.phone.display}
            </span>
          </a>
        </motion.div>

        {/* Stats — 4 chiffres avec micro-typo Fraunces */}
        <motion.div
          {...fadeUp(0.65)}
          className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10 border border-gold/10 rounded-xl overflow-hidden"
        >
          {STATS.map((s) => (
            <div
              key={s.key}
              className="bg-black-deep/80 backdrop-blur-sm px-6 py-7 md:px-8 md:py-9 transition-colors hover:bg-black-elevated/60"
            >
              <CountUp
                value={s.value}
                className="font-display text-3xl md:text-4xl lg:text-5xl tabular-nums text-gold-gradient leading-none"
              />
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-foreground/55">
                {t(translations.hero[s.key])}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicateur scroll */}
      <a
        href="#services"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/40 hover:text-gold transition-colors"
        aria-label={t(translations.hero.scrollHint)}
      >
        <span>{t(translations.hero.scrollHint)}</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
