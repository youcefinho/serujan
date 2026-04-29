import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { motion, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Calendar, Play, ArrowUpRight, GraduationCap, Check, ExternalLink } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Elev8 v2 — Fusion Event + Academy en une section unique
// Bloc Event (vidéo + countdown) + Bloc Academy (features + CTA)
// ═══════════════════════════════════════════════════════════

const EVENT_DATE = new Date("2026-10-17T09:00:00-04:00");
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useCountdown(target: Date) {
  const [t, setT] = useState(getTimeLeft(target));
  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function getTimeLeft(target: Date) {
  const d = target.getTime() - Date.now();
  if (d < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor((d % 86_400_000) / 3_600_000),
    minutes: Math.floor((d % 3_600_000) / 60_000),
    seconds: Math.floor((d % 60_000) / 1000),
  };
}

export default function Elev8() {
  const { t, ta, lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const countdown = useCountdown(EVENT_DATE);
  const [playing, setPlaying] = useState(false);

  const academyFeatures = ta(translations.elev8.academyFeatures) as string[];
  const eventDateFormatted = new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(EVENT_DATE);
  const cd = [
    { value: countdown.days, label: t(translations.elev8.days) },
    { value: countdown.hours, label: t(translations.elev8.hours) },
    { value: countdown.minutes, label: t(translations.elev8.minutes) },
    { value: countdown.seconds, label: t(translations.elev8.seconds) },
  ];

  return (
    <section
      id="elev8"
      ref={ref}
      className="relative py-28 md:py-36 px-6 bg-black-deep bg-stars overflow-hidden"
    >
      {/* Halo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold/50" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light">
              {t(translations.elev8.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance"
          >
            <span className="text-foreground">{t(translations.elev8.titleLead)} </span>
            <span className="text-gold-gradient italic font-display-italic">
              {t(translations.elev8.titleEmphasis)}
            </span>
            <span className="text-foreground/85"> {t(translations.elev8.titleTail)}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-8 text-lg text-foreground/65 leading-relaxed text-pretty max-w-2xl"
          >
            {t(translations.elev8.intro)}
          </motion.p>
        </div>

        {/* ── Bloc Event ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20 md:mb-28"
        >
          {/* Vidéo */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-gold/15 aspect-video bg-black-elevated shadow-elevate">
            {clientConfig.elev8VideoUrl && !playing ? (
              <button
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex items-center justify-center"
                aria-label={t(translations.elev8.videoLabel)}
              >
                <div className="absolute inset-0 bg-black-deep/40" />
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50"
                  style={{ backgroundImage: `url(${clientConfig.heroImageUrl})` }}
                />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="relative w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-8 h-8 text-gold ml-1" fill="currentColor" />
                    <span
                      className="absolute inset-0 rounded-full border-2 border-gold/40 animate-pulse-gold"
                      aria-hidden
                    />
                  </div>
                  <span className="text-xs uppercase tracking-[0.24em] text-foreground/80">
                    {t(translations.elev8.videoLabel)}
                  </span>
                </div>
              </button>
            ) : clientConfig.elev8VideoUrl ? (
              <video
                src={clientConfig.elev8VideoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          {/* Détails event */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-gold-light">
                {eventDateFormatted}
              </span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-foreground tracking-tight mb-3">
              {t(translations.elev8.eventTitle)}
            </h3>
            <p className="text-gold-light/80 text-sm tracking-wide mb-5">
              {t(translations.elev8.eventTagline)}
            </p>
            <p className="text-foreground/65 leading-relaxed mb-8 text-pretty">
              {t(translations.elev8.eventDescription)}
            </p>

            {/* Countdown compact */}
            <div className="grid grid-cols-4 gap-2 md:gap-3 mb-8 max-w-md">
              {cd.map((c, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-2xl md:text-3xl tabular-nums text-gold-gradient leading-none mb-1.5">
                    {String(c.value).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/50">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={clientConfig.elev8EventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-gold text-black-deep font-semibold rounded-md shadow-gold-sm hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5 self-start btn-shine"
            >
              <span>{t(translations.elev8.eventCta)}</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Séparateur doré */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease }}
          className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-20 md:mb-28 origin-center"
          aria-hidden
        />

        {/* ── Bloc Academy ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-7 lg:order-2 lg:pl-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-gold" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-gold-light">
                {t(translations.elev8.academyTitle)}
              </span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-foreground tracking-tight mb-3 text-balance">
              {t(translations.elev8.academyTagline)}
            </h3>
            <p className="text-foreground/65 leading-relaxed mb-8 text-pretty">
              {t(translations.elev8.academyDescription)}
            </p>

            {/* Features liste */}
            <ul className="space-y-3 mb-8">
              {academyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                    <Check className="w-3 h-3 text-gold" strokeWidth={2.5} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={clientConfig.elev8AcademyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3.5 border border-gold/40 text-gold hover:bg-gold/10 font-semibold rounded-md transition-all duration-300"
            >
              <span>{t(translations.elev8.academyCta)}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Card visuelle Academy */}
          <div className="lg:col-span-5 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gold/15 bg-gradient-to-br from-black-elevated to-black-deep shadow-elevate p-10 flex flex-col justify-between">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, oklch(0.78 0.13 82 / 0.18) 0%, transparent 60%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <GraduationCap className="w-12 h-12 text-gold/80 mb-6" strokeWidth={1.2} />
                <div className="text-[11px] uppercase tracking-[0.24em] text-gold-light/70 mb-4">
                  Formation premium
                </div>
                <div className="font-display italic text-3xl md:text-4xl text-foreground/95 leading-tight text-balance">
                  Elev8 Academy
                </div>
              </div>
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">
                  elev8academie.ca
                </div>
                <div
                  className="h-px bg-gradient-to-r from-gold/60 via-gold/30 to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
