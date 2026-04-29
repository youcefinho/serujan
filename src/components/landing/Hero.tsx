import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Phone, ArrowRight, ArrowDown, Mic, GraduationCap } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Typewriter } from "@/components/ui/Typewriter";

// ═══════════════════════════════════════════════════════════
// Hero v3 — orienté conversion
// Titre statique tripartite (offre + audience + cadrage),
// 4 stats sourcées Elev8/Planiprêt, trust strip podcast,
// double CTA (form + tel direct).
// ═══════════════════════════════════════════════════════════

const STATS = [
  { value: "500M$+", key: "statFunded" as const },
  { value: "95%", key: "statApproval" as const },
  { value: "2016", key: "statSince" as const },
  { value: "900+", key: "statElev8" as const },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function Hero() {
  const { t, ta } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax léger : l'image de fond se déplace en sens inverse du scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-gradient-hero bg-stars-hero"
    >
      {/* Image de fond très atténuée — parallax (will-change pour pré-composite GPU) */}
      {clientConfig.heroImageUrl && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.18]"
          style={{
            backgroundImage: `url(${clientConfig.heroImageUrl})`,
            y: bgY,
            willChange: "transform",
          }}
          aria-hidden
        />
      )}

      {/* Halo doré derrière le titre — blur réduit 60→40px + translateZ
          force la promotion GPU au mount (évite freeze au 1er scroll) */}
      <div
        className="absolute top-1/4 right-0 w-[42rem] h-[42rem] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.10) 0%, transparent 60%)",
          filter: "blur(40px)",
          transform: "translateZ(0)",
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
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light">
            {t(translations.hero.badge)}
          </span>
        </motion.div>

        {/* Titre statique — QUOI + COMBIEN + OÙ en 3 secondes */}
        <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] tracking-tight max-w-5xl">
          <motion.span {...fadeUp(0.08)} className="block text-foreground">
            {t(translations.hero.titleLead)}
          </motion.span>
          <motion.span
            {...fadeUp(0.18)}
            className="block text-gold-gradient-animated italic font-display-italic"
            style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144" }}
          >
            {t(translations.hero.titleEmphasis)}
          </motion.span>
          <motion.span
            {...fadeUp(0.28)}
            className="block text-gold-gradient italic font-display-italic"
            style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144" }}
          >
            {t(translations.hero.titleTail)}
          </motion.span>
        </h1>

        {/* Cartouche identité du service — fusion range + audience + territoire */}
        <motion.div
          {...fadeUp(0.34)}
          className="mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 rounded-md border border-gold/25 bg-gold/[0.06] text-[13px] tracking-[0.04em]"
        >
          {(ta(translations.hero.titleRangePill) as string[]).map((part, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              {i > 0 && <span className="text-foreground/35" aria-hidden>·</span>}
              <span className={i === 0 ? "text-gold font-semibold tabular-nums" : "text-foreground/85"}>
                {part}
              </span>
            </span>
          ))}
        </motion.div>

        {/* Sous-titre — typewriter émotionnel (après que le message est clair) */}
        <motion.div {...fadeUp(0.4)} className="mt-8 max-w-2xl">
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed text-pretty">
            {t(translations.hero.subtitle)}
          </p>
          <p className="mt-3 text-gold-gradient italic font-display-italic text-lg md:text-xl min-h-[1.6em]">
            <Typewriter
              phrases={ta(translations.hero.typewriterPhrases) as string[]}
              typeSpeed={45}
              deleteSpeed={25}
              pauseAfterType={2200}
              pauseAfterDelete={350}
            />
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-gold text-black-deep font-bold tracking-[0.04em] rounded-md shadow-gold hover:shadow-gold-sm transition-all duration-300 hover:-translate-y-0.5 btn-shine btn-glow"
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
            <span className="text-foreground/40 group-hover:text-gold/70 text-sm font-mono tabular-nums tracking-[0.06em] transition-colors">
              {clientConfig.phone.display}
            </span>
          </a>
        </motion.div>

        {/* Badges d'urgence douce — rassure ET crée micro-urgence */}
        <motion.div
          {...fadeUp(0.58)}
          className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] md:text-[13px] text-foreground/55"
        >
          {(ta(translations.hero.urgencyBadges) as string[]).map((badge) => {
            const isResponse = /24\s*h/i.test(badge);
            return (
              <span key={badge} className="inline-flex items-center gap-1.5">
                {isResponse ? (
                  <span className="relative inline-flex w-1.5 h-1.5" aria-hidden>
                    <span className="absolute inset-0 rounded-full bg-emerald-400/70 motion-safe:animate-ping" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/70" aria-hidden />
                )}
                {badge}
              </span>
            );
          })}
        </motion.div>

        {/* Stats — 4 chiffres sourcés (Elev8 + Planiprêt) */}
        <motion.div
          {...fadeUp(0.65)}
          className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/10 border border-gold/10 rounded-xl overflow-hidden"
        >
          {STATS.map((s) => (
            <div
              key={s.key}
              className="glass px-6 py-7 md:px-8 md:py-9 transition-colors hover:bg-black-elevated/70"
            >
              <CountUp
                value={s.value}
                className="font-display font-light tracking-[-0.02em] text-3xl md:text-4xl lg:text-5xl tabular-nums text-gold-gradient leading-none"
              />
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-foreground/55">
                {t(translations.hero[s.key])}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trust strip — preuve sociale médiatique sourcée Elev8 */}
        <motion.div
          {...fadeUp(0.78)}
          className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-foreground/50"
        >
          <Mic className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" strokeWidth={1.5} />
          <span>{t(translations.hero.trustStrip)}</span>
        </motion.div>

        {/* Credentials institutionnels — légitimité (sourcé Elev8 + Planiprêt) */}
        <motion.div
          {...fadeUp(0.84)}
          className="mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-foreground/50"
        >
          <GraduationCap className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" strokeWidth={1.5} />
          <span>{t(translations.hero.credentialsStrip)}</span>
        </motion.div>
      </div>

      {/* Indicateur scroll */}
      <a
        href="#pourquoi"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/40 hover:text-gold transition-colors"
        aria-label={t(translations.hero.scrollHint)}
      >
        <span>{t(translations.hero.scrollHint)}</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
