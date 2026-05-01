import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Shield, Phone, Mail, ArrowRight } from "lucide-react";
import { GhlFormEmbed } from "@/components/GhlFormEmbed";

// ═══════════════════════════════════════════════════════════
// LeadForm v3 — wrapper visuel + GhlFormEmbed
//
// Architecture v2 (mai 2026) — Site Forms GHL embed.
// Côté gauche : pitch + 2 CTA directs (téléphone, email) — INCHANGÉ
// Côté droit  : <GhlFormEmbed> qui rend le widget GHL dans une iframe
//
// Le composant custom v1 (~500 lignes Zod + state + submit) est archivé.
// La logique form (validation, anti-bot, capture lead) est désormais
// gérée par GHL natively via le trigger "Form Submitted".
// ═══════════════════════════════════════════════════════════

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function LeadForm() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 md:py-36 px-6 bg-black-surface bg-stars grain-overlay overflow-hidden"
    >
      {/* Halos signature — wrapper visuel inchangé */}
      <div
        className="absolute top-1/2 -left-40 w-[40rem] h-[40rem] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.07) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.05) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* ── Côté pitch (inchangé v1→v2) ─────────────────────── */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-gold/50" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light">
              {t(translations.leadForm.label)}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] tracking-tight text-balance"
          >
            <span className="text-foreground">{t(translations.leadForm.titleLead)} </span>
            <span className="text-gold-gradient-animated italic font-display-italic">
              {t(translations.leadForm.titleEmphasis)}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-7 text-lg text-foreground/65 leading-relaxed text-pretty"
          >
            {t(translations.leadForm.intro)}
          </motion.p>

          {/* CTA directs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-10 space-y-3"
          >
            <a
              href={`tel:+${clientConfig.phone.international}`}
              onClick={() => trackPhoneClick("leadform-pitch")}
              className="group flex items-center gap-4 p-5 rounded-xl bg-black-deep/60 border border-gold/15 hover:border-gold/40 hover:bg-black-elevated/60 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 transition-colors">
                <Phone className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/45 mb-1">
                  {t(translations.nav.call)}
                </div>
                <div className="font-display text-lg text-foreground tabular-nums tracking-tight">
                  {clientConfig.phone.display}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gold/50 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
            </a>

            <a
              href={`mailto:${clientConfig.email}`}
              onClick={() => trackEmailClick("leadform-pitch")}
              className="group flex items-center gap-4 p-5 rounded-xl bg-black-deep/60 border border-gold/15 hover:border-gold/40 hover:bg-black-elevated/60 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 transition-colors">
                <Mail className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/45 mb-1">
                  {t(translations.common.email)}
                </div>
                <div className="font-display text-lg text-foreground tracking-tight truncate">
                  {clientConfig.email}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gold/50 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
            </a>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 flex items-center gap-2 text-xs text-foreground/40"
          >
            <Shield className="w-3.5 h-3.5 text-gold/50" />
            <span>{t(translations.leadForm.trustText)}</span>
          </motion.div>
        </div>

        {/* ── Côté formulaire — GHL Site Form embed (v2) ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="lg:col-span-7"
        >
          <div className="relative p-6 md:p-8 rounded-2xl bg-black-deep/70 border border-gold/15 shadow-elevate">
            {/* Trust badge en haut — rassure AVANT de remplir */}
            <div className="flex items-center gap-2 mb-6 pb-5 border-b border-gold/10">
              <Shield className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={1.7} />
              <span className="text-xs md:text-sm text-foreground/75 leading-relaxed">
                {t(translations.leadForm.trustBadge)}
              </span>
            </div>

            {/* Widget GHL Site Form */}
            <GhlFormEmbed
              formId={clientConfig.ghl.formIds.leadform}
              formName="Serujan Lead Form"
              height={650}
            />

            {/* Privacy note Loi 25 */}
            <p className="mt-5 text-[11px] text-foreground/45 leading-relaxed">
              Conformément à la Loi 25 du Québec, vos informations restent strictement confidentielles
              et ne sont jamais transmises à un prêteur sans votre autorisation explicite.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
