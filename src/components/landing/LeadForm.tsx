import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { clientConfig } from "@/lib/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// LeadForm — Formulaire "Évaluer mon projet" (commercial)
// Pas d'onglets ACHAT/VENTE → formulaire unique
// ═══════════════════════════════════════════════════════════

// Sanitisation basique côté client
function sanitize(input: string, maxLen = 500): string {
  return input.trim().slice(0, maxLen);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export default function LeadForm() {
  const { t, ta } = useLanguage();
  const ref = useScrollReveal();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    estimatedAmount: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const projectTypeOptions = ta(translations.leadForm.projectTypeOptions);
  const amountOptions = ta(translations.leadForm.amountOptions);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (sanitize(form.name).length < 2) {
      newErrors.name = t(translations.leadForm.nameRequired);
    }
    if (!validateEmail(form.email)) {
      newErrors.email = t(translations.leadForm.emailInvalid);
    }
    if (form.phone && !validatePhone(form.phone)) {
      newErrors.phone = t(translations.leadForm.phoneInvalid);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return; // Bot trap
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitize(form.name, 100),
          email: sanitize(form.email, 200),
          phone: sanitize(form.phone, 20),
          project_type: sanitize(form.projectType, 50),
          estimated_amount: sanitize(form.estimatedAmount, 50),
          message: sanitize(form.message, 2000),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as Record<string, string>;
        throw new Error(data.error || t(translations.leadForm.serverError));
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", projectType: "", estimatedAmount: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 px-4 bg-black-deep" ref={ref}>
      <div className="max-w-2xl mx-auto">
        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20">
            {t(translations.leadForm.label)}
          </span>
        </div>

        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {t(translations.leadForm.title)}
        </h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl bg-black-card border border-gold/10">
          {/* Honeypot */}
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-label={t(translations.leadForm.honeypot)}
          />

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              {t(translations.leadForm.name)} *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-black-surface border border-gold/10 text-foreground placeholder-muted-foreground/50 focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none transition-all"
              placeholder="Jean-Pierre Tremblay"
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          {/* Email + Phone */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                {t(translations.leadForm.email)} *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black-surface border border-gold/10 text-foreground placeholder-muted-foreground/50 focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                placeholder="jean@entreprise.com"
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                {t(translations.leadForm.phone)}
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black-surface border border-gold/10 text-foreground placeholder-muted-foreground/50 focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                placeholder="(514) 555-1234"
              />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Type de projet + Montant estimé */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                {t(translations.leadForm.projectType)}
              </label>
              <select
                value={form.projectType}
                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black-surface border border-gold/10 text-foreground focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none transition-all"
              >
                <option value="">—</option>
                {projectTypeOptions.map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                {t(translations.leadForm.estimatedAmount)}
              </label>
              <select
                value={form.estimatedAmount}
                onChange={(e) => setForm({ ...form, estimatedAmount: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-black-surface border border-gold/10 text-foreground focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none transition-all"
              >
                <option value="">—</option>
                {amountOptions.map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1.5">
              {t(translations.leadForm.message)}
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-black-surface border border-gold/10 text-foreground placeholder-muted-foreground/50 focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none transition-all resize-none"
              placeholder=""
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-4 bg-gradient-gold text-black-deep font-bold uppercase tracking-widest rounded-lg shadow-gold hover:shadow-gold-sm hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t(translations.leadForm.sending)}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t(translations.leadForm.submit)}
              </>
            )}
          </button>

          {/* Status */}
          {status === "success" && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-green-900/20 border border-green-500/30 text-green-400">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p>{t(translations.leadForm.success)}</p>
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-red-900/20 border border-red-500/30 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>
                {t(translations.leadForm.genericError)}{" "}
                <a href={`tel:+${clientConfig.phone.international}`} className="underline font-semibold">
                  {clientConfig.phone.display}
                </a>
              </p>
            </div>
          )}

          {/* Trust */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-gold/50" />
            <p>{t(translations.leadForm.trustText)}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
