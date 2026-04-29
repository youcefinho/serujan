import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

// ═══════════════════════════════════════════════════════════
// Layout commun pour les pages légales (mentions + confidentialité)
// Design v2 : Fraunces sur titre, halo discret, retour fluide
// ═══════════════════════════════════════════════════════════

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Section {
  heading: string;
  body: string;
}

interface Props {
  eyebrow: string;
  title: string;
  sections: Section[];
}

export function LegalPage({ eyebrow, title, sections }: Props) {
  const { t } = useLanguage();
  const today = new Date().toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="relative min-h-screen bg-black-deep text-foreground px-6 py-24 md:py-32 overflow-hidden">
      {/* Halo discret */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(ellipse, oklch(0.78 0.13 82 / 0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        aria-hidden
      />

      <article className="relative max-w-3xl mx-auto">
        {/* Retour */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm text-foreground/55 hover:text-gold transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>{t(translations.legal.backToHome)}</span>
        </Link>

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-gold/50" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-balance mb-4"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-16"
        >
          {t(translations.legal.lastUpdate)} : {today}
        </motion.p>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.06, ease }}
              className="relative"
            >
              <h2 className="font-display text-2xl md:text-3xl text-foreground tracking-tight mb-4">
                {section.heading}
              </h2>
              <div className="text-foreground/70 leading-relaxed text-pretty whitespace-pre-line text-[15px] md:text-base">
                {section.body}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Filet doré final */}
        <div
          className="mt-20 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          aria-hidden
        />

        <div className="mt-8 text-xs text-foreground/40 text-center">
          © {new Date().getFullYear()} Serujan Kaneshalingam · Courtage Hypothécaire Commercial
        </div>
      </article>
    </main>
  );
}
