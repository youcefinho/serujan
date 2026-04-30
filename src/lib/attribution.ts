// ═══════════════════════════════════════════════════════════
// Attribution — capture UTM/referrer/language à la 1ère visite
// ═══════════════════════════════════════════════════════════
// captureOnce() : appelé au boot (main.tsx). Si attribution déjà
//   stockée en sessionStorage, ne fait rien. Sinon parse l'URL +
//   document.referrer + navigator.language et stocke.
// getAttribution() : appelé par leadClient.ts juste avant POST.
// Persiste via sessionStorage → survit aux navigations internes,
// reset à la fermeture d'onglet (comportement attribution standard).
// ═══════════════════════════════════════════════════════════

const STORAGE_KEY = "serujan-attribution";

export interface Attribution {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  referrer: string;
  language: string;
  captured_at: string;
}

const EMPTY: Attribution = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  referrer: "",
  language: "",
  captured_at: "",
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function captureOnce(): void {
  if (typeof window === "undefined") return;
  try {
    const existing = window.sessionStorage.getItem(STORAGE_KEY);
    if (existing) return; // déjà capturé pour cette session

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      utm_source: (params.get("utm_source") || "").slice(0, 100),
      utm_medium: (params.get("utm_medium") || "").slice(0, 100),
      utm_campaign: (params.get("utm_campaign") || "").slice(0, 100),
      utm_term: (params.get("utm_term") || "").slice(0, 100),
      utm_content: (params.get("utm_content") || "").slice(0, 100),
      referrer: (document.referrer || "").slice(0, 500),
      language: (navigator.language || "").slice(0, 20),
      captured_at: new Date().toISOString(),
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage peut être bloqué (Safari mode privé, etc.) — fallback silencieux
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<Attribution>;
    // merge defensif — si la struct change un jour, on remplit les manquants
    return {
      utm_source: parsed.utm_source ?? "",
      utm_medium: parsed.utm_medium ?? "",
      utm_campaign: parsed.utm_campaign ?? "",
      utm_term: parsed.utm_term ?? "",
      utm_content: parsed.utm_content ?? "",
      referrer: parsed.referrer ?? "",
      language: parsed.language ?? "",
      captured_at: parsed.captured_at ?? "",
    };
  } catch {
    return { ...EMPTY };
  }
}

// Utile pour les tests + reset manuel si besoin
export function clearAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

// Nom UTM_KEYS exporté pour utilisation côté worker (validation)
export { UTM_KEYS };
