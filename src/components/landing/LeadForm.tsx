import { useLanguage } from "@/lib/LanguageContext";
import { useNavigate } from "@tanstack/react-router";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { trackLeadFormSubmit } from "@/lib/analytics";
import { isValidEmail, isValidPhone, sanitizeInput } from "@/lib/security";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════
// LeadForm v2 — fusion FreeConsultation + Form
// Côté gauche : pitch + 2 CTA directs (téléphone, email)
// Côté droit  : formulaire premium avec anti-bot timing
// ═══════════════════════════════════════════════════════════

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function LeadForm() {
  const { t, ta } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();

  // Timestamp de mount pour anti-bot timing
  const mountTimeRef = useRef<number>(Date.now());
  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    estimatedAmount: "",
    message: "",
    hp: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const projectTypeOptions = ta(translations.leadForm.projectTypeOptions) as string[];
  const amountOptions = ta(translations.leadForm.amountOptions) as string[];

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    // Nom obligatoire (≥ 2 chars)
    if (sanitizeInput(form.name).length < 2) newErrors.name = t(translations.leadForm.nameRequired);
    // Téléphone obligatoire et valide
    if (!form.phone.trim() || !isValidPhone(form.phone))
      newErrors.phone = t(translations.leadForm.phoneInvalid);
    // Montant obligatoire (sélection non vide)
    if (!form.estimatedAmount) newErrors.estimatedAmount = t(translations.leadForm.amountRequired);
    // Email optionnel mais validé si rempli
    if (form.email && !isValidEmail(form.email))
      newErrors.email = t(translations.leadForm.emailInvalid);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error(t(translations.leadForm.validationError));
    }
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.hp) return;
    if (!validate()) return;

    setStatus("sending");
    const elapsed_ms = Date.now() - mountTimeRef.current;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizeInput(form.name, 100),
          email: sanitizeInput(form.email, 200),
          phone: sanitizeInput(form.phone, 20),
          project_type: sanitizeInput(form.projectType, 50),
          estimated_amount: sanitizeInput(form.estimatedAmount, 50),
          message: sanitizeInput(form.message, 2000),
          hp: form.hp,
          elapsed_ms,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as Record<string, string>;
        throw new Error(data.error || t(translations.leadForm.serverError));
      }

      setStatus("success");
      toast.success(t(translations.leadForm.success), {
        description: t(translations.leadForm.trustText),
      });
      trackLeadFormSubmit(form.projectType);
      setForm({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        estimatedAmount: "",
        message: "",
        hp: "",
      });
      // Redirection vers /merci pour tracking conversion
      setTimeout(() => {
        navigate({ to: "/merci" });
      }, 800);
    } catch {
      setStatus("error");
      toast.error(t(translations.leadForm.error), {
        description: `${t(translations.leadForm.genericError)} ${clientConfig.phone.display}`,
      });
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 md:py-36 px-6 bg-black-surface bg-stars grain-overlay overflow-hidden"
    >
      {/* Halo */}
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
        {/* ── Côté pitch ────────────────────────────────────── */}
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

        {/* ── Formulaire ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="lg:col-span-7"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease }}
                className="relative p-10 md:p-12 rounded-2xl bg-gradient-to-br from-black-deep to-black-elevated border border-gold/30 shadow-elevate text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto mb-6 shadow-gold-sm">
                  <CheckCircle2 className="w-8 h-8 text-gold" strokeWidth={2} />
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4 tracking-tight">
                  {t(translations.leadForm.success)}
                </h3>
                <p className="text-foreground/65 leading-relaxed max-w-md mx-auto">
                  {t(translations.leadForm.trustText)}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, scale: 0.98 }}
                className="relative p-8 md:p-10 rounded-2xl bg-black-deep/70 border border-gold/15 shadow-elevate"
              >
                {/* Trust badge en haut — rassure AVANT de remplir */}
                <div className="flex items-center gap-2 mb-7 pb-6 border-b border-gold/10">
                  <Shield className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={1.7} />
                  <span className="text-xs md:text-sm text-foreground/75 leading-relaxed">
                    {t(translations.leadForm.trustBadge)}
                  </span>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="hp"
                  value={form.hp}
                  onChange={(e) => setForm({ ...form, hp: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                />

                {/* ── 3 champs essentiels (friction minimale) ── */}

                {/* Nom — obligatoire */}
                <Field label={`${t(translations.leadForm.name)} *`} error={errors.name}>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                    placeholder="Jean-Pierre Tremblay"
                  />
                </Field>

                <div className="grid md:grid-cols-2 gap-5 mt-5">
                  {/* Téléphone — obligatoire (B2B prime au tel) */}
                  <Field label={`${t(translations.leadForm.phone)} *`} error={errors.phone}>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputCls}
                      placeholder="(514) 555-1234"
                    />
                  </Field>
                  {/* Montant — obligatoire (qualification) */}
                  <Field
                    label={`${t(translations.leadForm.estimatedAmount)} *`}
                    error={errors.estimatedAmount}
                  >
                    <select
                      required
                      value={form.estimatedAmount}
                      onChange={(e) => setForm({ ...form, estimatedAmount: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">—</option>
                      {amountOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* ── Accordéon optionnel — réduit la friction visuelle ── */}
                <details className="mt-6 group">
                  <summary className="cursor-pointer text-sm text-foreground/50 hover:text-gold transition-colors select-none flex items-center gap-2">
                    <span className="w-4 h-4 rounded border border-gold/25 flex items-center justify-center text-[10px] text-gold/60 group-open:rotate-90 transition-transform duration-300">
                      ›
                    </span>
                    {t(translations.leadForm.projectType)} {t(translations.leadForm.optional)}
                  </summary>
                  <div className="mt-4 space-y-5 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-5">
                      {/* Email — optionnel */}
                      <Field
                        label={`${t(translations.leadForm.email)} ${t(translations.leadForm.optional)}`}
                        error={errors.email}
                      >
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={inputCls}
                          placeholder="jean@entreprise.com"
                        />
                      </Field>
                      {/* Type — optionnel */}
                      <Field
                        label={`${t(translations.leadForm.projectType)} ${t(translations.leadForm.optional)}`}
                      >
                        <select
                          value={form.projectType}
                          onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                          className={inputCls}
                        >
                          <option value="">—</option>
                          {projectTypeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    {/* Message — optionnel */}
                    <Field label={t(translations.leadForm.message)}>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputCls} resize-none`}
                        placeholder=""
                      />
                    </Field>
                  </div>
                </details>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative overflow-hidden mt-8 w-full py-4 bg-gradient-gold text-black-deep font-semibold rounded-md shadow-gold-sm hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2 btn-shine btn-glow"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t(translations.leadForm.sending)}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      <span>{t(translations.leadForm.submit)}</span>
                    </>
                  )}
                </button>

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/30 text-destructive-foreground text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p>
                      {t(translations.leadForm.genericError)}{" "}
                      <a
                        href={`tel:+${clientConfig.phone.international}`}
                        className="underline font-semibold"
                      >
                        {clientConfig.phone.display}
                      </a>
                    </p>
                  </motion.div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-md bg-black-elevated/40 border border-gold/10 text-foreground placeholder-foreground/30 focus:border-gold/40 focus:bg-black-elevated/60 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-200";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.18em] text-foreground/55 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-destructive-foreground mt-1.5">{error}</p>}
    </div>
  );
}
