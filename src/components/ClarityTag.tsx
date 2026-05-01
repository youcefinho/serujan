import { useEffect } from "react";

// ═══════════════════════════════════════════════════════════
// ClarityTag — Microsoft Clarity (heatmap + session replay)
//
// Loi 25 compliant : ne charge le script qu'après consent.analytics = true.
// Vérifie localStorage.intralys-consent-v1 au mount + écoute les changements.
// ═══════════════════════════════════════════════════════════

const CLARITY_SCRIPT_URL = "https://www.clarity.ms/tag/";

declare global {
  interface Window {
    clarity?: ((action: string, ...args: unknown[]) => void) & {
      q?: unknown[];
    };
  }
}

interface ConsentChoice {
  analytics: boolean;
  marketing: boolean;
  ts: number;
}

function readConsent(): ConsentChoice | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem("intralys-consent-v1");
    if (!raw) return null;
    return JSON.parse(raw) as ConsentChoice;
  } catch {
    return null;
  }
}

function injectClarity(projectId: string): void {
  if (typeof window === "undefined" || !projectId) return;
  if (window.clarity) return; // déjà chargé

  // Loader Clarity officiel (minifié officiel Microsoft)
  // Cf. https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (function (c: any, l: any, a: string, r: string, i: string) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    const t = l.createElement(r);
    t.async = 1;
    t.src = CLARITY_SCRIPT_URL + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", projectId);
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export function ClarityTag() {
  useEffect(() => {
    const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID;
    if (!projectId) return;

    // Charge initial selon consent stocké
    const consent = readConsent();
    if (consent?.analytics) {
      injectClarity(projectId);
    }

    // Écoute les changements de consent (déclenché par CookieBanner)
    function handleConsentChange() {
      const next = readConsent();
      if (next?.analytics) injectClarity(projectId);
      // Si l'utilisateur retire son consent, Clarity ne peut plus être unloadé
      // (script déjà injecté). On peut juste appeler clarity("consent", false)
      // si besoin d'une session existante (rare).
      else if (window.clarity) {
        window.clarity("consent", false);
      }
    }

    window.addEventListener("intralys-consent-changed", handleConsentChange);
    return () => window.removeEventListener("intralys-consent-changed", handleConsentChange);
  }, []);

  return null;
}
