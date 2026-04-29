import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

// ═══════════════════════════════════════════════════════════
// LendersNetwork — bandeau "réseau institutionnel" avec
// marquee infinite-scroll des noms de prêteurs en typo
// Fraunces or. Effet "preuve sociale" pour le commercial :
// la valeur ajoutée du courtier = son réseau.
// ═══════════════════════════════════════════════════════════

const LENDERS = [
  "Banque Nationale",
  "RBC",
  "BMO",
  "CIBC",
  "TD",
  "Banque Scotia",
  "Desjardins Entreprises",
  "Banque Laurentienne",
  "HSBC Canada",
  "Industrielle Alliance",
  "MCAN Financial",
  "Equitable Bank",
  "CWB Trust",
  "First National",
  "Otera Capital",
  "Trez Capital",
  "Romspen",
  "KingSett Capital",
  "Foresters",
  "Cohen & Cohen",
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function LendersNetwork() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Doublé pour boucle visuellement continue
  const loop = [...LENDERS, ...LENDERS];

  return (
    <section
      id="reseau"
      ref={ref}
      className="relative py-24 md:py-28 px-6 bg-black-deep overflow-hidden"
    >
      {/* Halos */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[24rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(ellipse, oklch(0.78 0.13 82 / 0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold/50" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light">
              {t(translations.lendersNetwork.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-balance"
          >
            <span className="text-foreground">{t(translations.lendersNetwork.titleLead)} </span>
            <span className="text-gold-gradient italic font-display-italic">
              {t(translations.lendersNetwork.titleEmphasis)}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-7 text-base md:text-lg text-foreground/65 leading-relaxed text-pretty max-w-2xl"
          >
            {t(translations.lendersNetwork.subtitle)}
          </motion.p>
        </div>

        {/* Marquee — 2 rangées qui défilent en sens opposés */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="relative space-y-3 marquee-mask"
        >
          {/* Rangée 1 — gauche → droite */}
          <div className="marquee-track">
            <div className="marquee-content">
              {loop.map((name, i) => (
                <LenderChip key={`row1-${i}`} name={name} />
              ))}
            </div>
          </div>

          {/* Rangée 2 — droite → gauche, décalée */}
          <div className="marquee-track marquee-reverse">
            <div className="marquee-content">
              {[...loop.slice(10), ...loop.slice(0, 10)].map((name, i) => (
                <LenderChip key={`row2-${i}`} name={name} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Disclaimer discret */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 text-[11px] uppercase tracking-[0.2em] text-foreground/40 text-center"
        >
          {t(translations.lendersNetwork.disclaimer)}
        </motion.p>
      </div>
    </section>
  );
}

function LenderChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-6 py-3 mx-2 rounded-full border border-gold/20 bg-black-elevated/40 text-foreground/80 hover:border-gold/45 hover:text-gold transition-colors duration-300 font-display text-base md:text-lg italic font-display-italic whitespace-nowrap select-none">
      {name}
    </span>
  );
}
