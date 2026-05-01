import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

// ═══════════════════════════════════════════════════════════
// CookieBanner — Loi 25 (Québec) + Google Consent Mode v2
//
// Affiche au premier visit. 3 options :
//   1. Accepter tout
//   2. Refuser
//   3. Personnaliser (essential / analytics / marketing)
//
// Persiste le choix 12 mois dans localStorage.
// Notifie ClarityTag + GA4 (gtag consent) + GHL Pixel via custom event.
// ═══════════════════════════════════════════════════════════

const CONSENT_KEY = "intralys-consent-v1";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

interface ConsentChoice {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
}

// Note : `window.gtag` est déjà déclaré globalement dans `src/lib/analytics.ts`.
// On utilise le call signature unique compatible (...args: unknown[]) déjà fourni.

function readConsent(): ConsentChoice | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentChoice;
    if (Date.now() - parsed.ts > ONE_YEAR_MS) return null; // expiré 12 mois
    return parsed;
  } catch {
    return null;
  }
}

function applyConsent(choice: ConsentChoice): void {
  // Google Consent Mode v2
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: choice.marketing ? "granted" : "denied",
      ad_user_data: choice.marketing ? "granted" : "denied",
      ad_personalization: choice.marketing ? "granted" : "denied",
      analytics_storage: choice.analytics ? "granted" : "denied",
    });
  }

  // Notifie ClarityTag + autres composants via custom event
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("intralys-consent-changed", { detail: choice }));
  }
}

export function CookieBanner() {
  const { lang } = useLanguage();
  const [decided, setDecided] = useState<ConsentChoice | null | "loading">("loading");
  const [showCustom, setShowCustom] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const stored = readConsent();
    if (stored) applyConsent(stored);
    setDecided(stored);
  }, []);

  function decide(choice: Omit<ConsentChoice, "ts">) {
    const full: ConsentChoice = { ...choice, ts: Date.now() };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
    } catch {
      // localStorage indispo (Safari private mode) — pas bloquant
    }
    applyConsent(full);
    setDecided(full);
  }

  if (decided === "loading" || decided !== null) return null;

  const isEn = lang === "en";

  return (
    <div
      role="dialog"
      aria-label={isEn ? "Cookie consent" : "Consentement aux cookies"}
      className="fixed bottom-0 inset-x-0 z-[80] bg-black-elevated/95 backdrop-blur-md border-t border-gold/15 px-4 py-4 md:px-6 md:py-5"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-3 md:gap-4 md:items-center">
        <p className="text-sm leading-relaxed text-foreground/85 flex-1">
          {isEn
            ? "Under Quebec Law 25, we use essential cookies plus, with your consent, analytics and marketing cookies to improve your experience."
            : "Conformément à la Loi 25 (Québec), nous utilisons des cookies essentiels au fonctionnement du site et, avec votre consentement, des cookies d'analyse et de marketing pour améliorer votre expérience."}{" "}
          <a href="/confidentialite" className="text-gold underline underline-offset-2">
            {isEn ? "Learn more" : "En savoir plus"}
          </a>
        </p>

        <div className="flex flex-wrap gap-2 shrink-0">
          {!showCustom ? (
            <>
              <button
                type="button"
                onClick={() =>
                  decide({ essential: true, analytics: true, marketing: true })
                }
                className="rounded-full bg-gradient-gold px-5 py-2 text-sm font-medium text-black-deep hover:scale-[1.02] transition"
              >
                {isEn ? "Accept all" : "Accepter tout"}
              </button>
              <button
                type="button"
                onClick={() =>
                  decide({ essential: true, analytics: false, marketing: false })
                }
                className="rounded-full border border-gold/30 px-5 py-2 text-sm text-foreground/80 hover:border-gold/60 transition"
              >
                {isEn ? "Refuse" : "Refuser"}
              </button>
              <button
                type="button"
                onClick={() => setShowCustom(true)}
                className="rounded-full border border-foreground/15 px-5 py-2 text-sm text-foreground/70 hover:border-foreground/35 transition"
              >
                {isEn ? "Customize" : "Personnaliser"}
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <label className="flex items-center gap-2 text-sm text-foreground/85">
                <input type="checkbox" checked disabled className="accent-gold" />
                <span>{isEn ? "Essential (always on)" : "Essentiels (toujours actifs)"}</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground/85 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="accent-gold"
                />
                <span>{isEn ? "Analytics (Clarity, GA4)" : "Analyse (Clarity, GA4)"}</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground/85 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="accent-gold"
                />
                <span>{isEn ? "Marketing (Meta, Google Ads)" : "Marketing (Meta, Google Ads)"}</span>
              </label>
              <button
                type="button"
                onClick={() => decide({ essential: true, analytics, marketing })}
                className="rounded-full bg-gradient-gold px-5 py-2 text-sm font-medium text-black-deep mt-1"
              >
                {isEn ? "Save" : "Enregistrer"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
