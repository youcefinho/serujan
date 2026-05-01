import { useEffect } from "react";

// ═══════════════════════════════════════════════════════════
// MetaPixel — Facebook / Meta Pixel chargé après consent marketing
//
// Loi 25 (Québec) : NE charge le script qu'après que l'user a accepté
// les cookies marketing via le banner. Vérifie localStorage et écoute
// l'event intralys-consent-changed pour réagir aux changements de consent.
//
// Multi-tenant : VITE_META_PIXEL_ID build-time. Vide = no-op silencieux
// (aucun script injecté, fbq stub uniquement).
//
// Events fire-able après PageView via fbq() depuis lib/analytics.ts.
// ═══════════════════════════════════════════════════════════

const META_PIXEL_SCRIPT = "https://connect.facebook.net/en_US/fbevents.js";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: unknown;
    };
    _fbq?: Window["fbq"];
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

function injectMetaPixel(pixelId: string): void {
  if (typeof window === "undefined" || !pixelId) return;
  if (window.fbq) return;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      // eslint-disable-next-line prefer-rest-params
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, "script", META_PIXEL_SCRIPT);

  // L'IIFE ci-dessus a installé window.fbq via `f.fbq = function() {...}`. TS narrowing
  // ne suit pas l'assignation à travers le cast `any`, donc cast explicite ici.
  const fbq = (window as any).fbq as (...args: unknown[]) => void;
  fbq("init", pixelId);
  fbq("track", "PageView");
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export function MetaPixel() {
  useEffect(() => {
    const pixelId = import.meta.env.VITE_META_PIXEL_ID;
    if (!pixelId) return;

    const consent = readConsent();
    if (consent?.marketing) {
      injectMetaPixel(pixelId);
    }

    function handleConsentChange() {
      const next = readConsent();
      if (next?.marketing && !window.fbq) {
        injectMetaPixel(pixelId);
      } else if (!next?.marketing && window.fbq) {
        // Consent retiré — on bloque les futurs tracks.
        window.fbq = undefined;
      }
    }

    window.addEventListener("intralys-consent-changed", handleConsentChange);
    return () => window.removeEventListener("intralys-consent-changed", handleConsentChange);
  }, []);

  return null;
}
