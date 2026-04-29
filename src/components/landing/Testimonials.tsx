import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Quote, Star, ArrowRight } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// Testimonials — 4 avis clients réels publiés sur Elev8
// Academy. Layout en grille 2x2 (1 col mobile), card glass
// avec citation, photo, nom + rôle, et 5 étoiles dorées.
// ═══════════════════════════════════════════════════════════

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  photo: string;
}

export default function Testimonials() {
  const { t, ta } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const items = ta(translations.testimonials.items) as Testimonial[];

  return (
    <section
      id="temoignages"
      ref={ref}
      className="relative py-28 md:py-36 px-6 bg-black-deep bg-stars overflow-hidden"
    >
      {/* Halo */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50rem] h-[28rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(ellipse, oklch(0.78 0.13 82 / 0.07) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold/50" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light">
              {t(translations.testimonials.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-balance"
          >
            <span className="text-foreground">{t(translations.testimonials.titleLead)} </span>
            <span className="text-gold-gradient italic font-display-italic">
              {t(translations.testimonials.titleEmphasis)}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-8 text-lg text-foreground/65 leading-relaxed text-pretty max-w-2xl"
          >
            {t(translations.testimonials.subtitle)}
          </motion.p>
        </div>

        {/* Grille 2x2 témoignages */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease }}
              className="group relative glass rounded-2xl p-7 md:p-9 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30"
            >
              {/* Quote icon décorative */}
              <Quote
                className="absolute top-6 right-6 w-7 h-7 text-gold/20 group-hover:text-gold/35 transition-colors duration-500"
                strokeWidth={1.5}
                aria-hidden
              />

              {/* 5 étoiles */}
              <div className="flex gap-1 mb-5">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-gold fill-gold" aria-hidden />
                ))}
              </div>

              {/* Citation */}
              <blockquote className="font-display italic text-base md:text-lg leading-[1.55] text-foreground/85 text-pretty mb-7 pr-6">
                « {item.quote} »
              </blockquote>

              {/* Auteur + photo */}
              <div className="flex items-center gap-3 pt-5 border-t border-gold/15">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt={item.author}
                    loading="lazy"
                    decoding="async"
                    className="w-11 h-11 rounded-full object-cover border border-gold/30 flex-shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0 font-display text-gold">
                    {item.author.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-display text-sm md:text-base text-foreground tracking-tight truncate">
                    {item.author}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-foreground/50 mt-0.5 truncate">
                    {item.role}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Source */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-10 text-[11px] uppercase tracking-[0.2em] text-foreground/40 text-center"
        >
          {t(translations.testimonials.source)}
        </motion.p>

        {/* CTA contextuel — capitalise sur l'effet de preuve sociale */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.95, ease }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-gold text-black-deep font-semibold rounded-md shadow-gold-sm hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5 btn-shine btn-glow"
          >
            <span>{t(translations.testimonials.cta)}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
