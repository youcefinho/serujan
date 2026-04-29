import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Phone, Mail, ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { RouteMeta } from "@/components/RouteMeta";

export const Route = createFileRoute("/merci")({
  component: MerciPage,
  head: () => ({
    meta: [{ title: "Merci — Serujan Kaneshalingam" }],
  }),
});

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Countdown 24h visuel — démarre quand la page mount et compte vers le bas.
// But : rassurer le lead que la réponse arrive vraiment, pas presser.
function useCountdown24h() {
  const startRef = useRef<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(24 * 60 * 60 * 1000);

  useEffect(() => {
    startRef.current = Date.now();
    const target = startRef.current + 24 * 60 * 60 * 1000;
    const tick = () => {
      const left = Math.max(0, target - Date.now());
      setRemainingMs(left);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const totalMin = Math.floor(remainingMs / 60_000);
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;
  return { hours, minutes };
}

function MerciPage() {
  const { t, ta, lang } = useLanguage();
  const { hours, minutes } = useCountdown24h();
  const units = ta(translations.merci.countdownUnits) as { hours: string; minutes: string };

  return (
    <main className="relative min-h-screen bg-black-deep text-foreground flex items-center justify-center px-6 py-20 overflow-hidden">
      <RouteMeta
        title={
          lang === "en"
            ? "Thank you — your request has been received | Serujan Kaneshalingam"
            : "Merci — votre demande a bien été reçue | Serujan Kaneshalingam"
        }
        description={
          lang === "en"
            ? "Your request has been received. Serujan Kaneshalingam will contact you within 24 hours to discuss your commercial financing project."
            : "Votre demande a bien été reçue. Serujan Kaneshalingam vous contactera dans les 24h pour discuter de votre projet de financement commercial."
        }
        noindex
      />
      {/* Halo doré */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.10) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        aria-hidden
      />

      <article className="relative max-w-2xl w-full text-center">
        {/* Icône succès */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/15 border border-gold/40 mb-10 shadow-gold-sm"
        >
          <CheckCircle2 className="w-10 h-10 text-gold" strokeWidth={2} />
          <span
            className="absolute inset-0 rounded-full border border-gold/30 animate-pulse-gold"
            aria-hidden
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-gold/50" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light">
            {t(translations.merci.badge)}
          </span>
          <span className="w-8 h-px bg-gold/50" aria-hidden />
        </motion.div>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance"
        >
          <span className="text-foreground">{t(translations.merci.title)} </span>
          <span className="text-gold-gradient italic font-display-italic">
            {t(translations.merci.titleEmphasis)}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          className="mt-8 text-lg text-foreground/65 leading-relaxed text-pretty max-w-xl mx-auto"
        >
          {t(translations.merci.description)}
        </motion.p>

        {/* Countdown 24h — rassure sans presser */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.42 }}
          className="mt-10 inline-flex flex-col items-center gap-3 px-6 py-5 rounded-xl border border-gold/20 bg-black-elevated/40"
        >
          <div className="text-[10px] uppercase tracking-[0.32em] text-gold-light/80">
            {t(translations.merci.countdownLabel)}
          </div>
          <div className="flex items-baseline gap-2 font-mono tabular-nums text-foreground">
            <span className="text-3xl md:text-4xl font-light tracking-[-0.02em]">
              {String(hours).padStart(2, "0")}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-foreground/50">{units.hours}</span>
            <span className="text-3xl md:text-4xl text-gold-gradient font-light">·</span>
            <span className="text-3xl md:text-4xl font-light tracking-[-0.02em]">
              {String(minutes).padStart(2, "0")}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-foreground/50">{units.minutes}</span>
          </div>
        </motion.div>

        {/* Citation signée — engagement personnel Serujan */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.55 }}
          className="mt-12 max-w-xl mx-auto px-8"
        >
          <div className="font-display italic font-display-italic text-gold-gradient text-xl md:text-2xl leading-[1.5]">
            « {t(translations.merci.pledge)} »
          </div>
          <figcaption className="mt-4 text-[11px] uppercase tracking-[0.32em] text-foreground/50">
            {t(translations.merci.pledgeSignature)}
          </figcaption>
        </motion.figure>

        {/* CTA contact direct */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          className="mt-12 grid sm:grid-cols-2 gap-3 max-w-md mx-auto"
        >
          <a
            href={`tel:+${clientConfig.phone.international}`}
            className="group flex flex-col items-center gap-2 p-5 rounded-xl bg-black-elevated/50 border border-gold/15 hover:border-gold/40 hover:bg-black-elevated/80 transition-all duration-300"
          >
            <Phone className="w-5 h-5 text-gold" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">
              {t(translations.merci.callLabel)}
            </span>
            <span className="font-display text-sm text-foreground tabular-nums">
              {clientConfig.phone.display}
            </span>
          </a>
          <a
            href={`mailto:${clientConfig.email}`}
            className="group flex flex-col items-center gap-2 p-5 rounded-xl bg-black-elevated/50 border border-gold/15 hover:border-gold/40 hover:bg-black-elevated/80 transition-all duration-300"
          >
            <Mail className="w-5 h-5 text-gold" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">
              {t(translations.merci.emailLabel)}
            </span>
            <span className="font-display text-sm text-foreground break-all">
              {clientConfig.email}
            </span>
          </a>
        </motion.div>

        {/* Instagram */}
        {clientConfig.socials.instagram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-14 pt-10 border-t border-gold/10"
          >
            <p className="text-sm text-foreground/55 mb-4 text-pretty">
              {t(translations.merci.followText)}
            </p>
            <a
              href={clientConfig.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-gold hover:text-gold-light transition-colors font-display italic"
            >
              <span>{clientConfig.socials.instagram.handle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        )}

        {/* Retour accueil */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-16"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm text-foreground/55 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{t(translations.merci.backHome)}</span>
          </Link>
        </motion.div>
      </article>
    </main>
  );
}
