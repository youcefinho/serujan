import { Bell, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

// Section « Alertes Propriétés » — capture de leads sans engagement
export function PropertyAlerts() {
  const { t } = useLanguage();
  const tr = translations.propertyAlerts;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Alerte Propriété",
          email: email.trim(),
          phone: "",
          message: "Inscription alertes propriétés",
          type: "buy",
        }),
      });
      setSubmitted(true);
    } catch {
      // Fallback silencieux — on ne bloque pas l'UX
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-crimson/10 via-navy-deep to-crimson/10 border-y border-crimson/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Icône + texte */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-crimson" />
              <span className="text-crimson text-sm font-bold uppercase tracking-widest">{t(tr.label)}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">{t(tr.title)}</h3>
            <p className="text-sm text-muted-foreground">{t(tr.subtitle)}</p>
          </div>

          {/* Formulaire */}
          <div className="w-full md:w-auto shrink-0">
            {submitted ? (
              <div className="flex items-center gap-2 px-6 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <span className="text-emerald-400 font-bold text-sm">✓ {t(tr.success)}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t(tr.placeholder)}
                  className="px-4 py-3 bg-card border border-border rounded-lg text-sm w-64 focus:border-crimson focus:outline-none transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-crimson text-primary-foreground font-bold rounded-lg hover:scale-[1.02] transition-transform text-sm uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  <ArrowRight className="w-4 h-4" />
                  {t(tr.cta)}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
