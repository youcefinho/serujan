import { clientConfig } from "@/lib/config";
import { trackCtaClick } from "@/lib/analytics";

// ═══════════════════════════════════════════════════════════
// Calendly — popup widget lazy-loaded au premier click
//
// Le script + CSS Calendly ne sont injectés QU'au premier click sur
// un bouton "Prendre rendez-vous". Évite de charger ~80 KB de Calendly
// au load initial pour un feature secondaire.
//
// Si calendlyUrl pas configuré → fallback mailto.
// ═══════════════════════════════════════════════════════════

const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";
const PLACEHOLDER = "REPLACE_WITH_CALENDLY_URL";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

function injectCalendlyAssets(onReady: () => void): void {
  if (typeof document === "undefined") return;

  // CSS
  if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = CALENDLY_CSS;
    document.head.appendChild(css);
  }

  // JS
  if (window.Calendly) {
    onReady();
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_JS}"]`);
  if (existing) {
    existing.addEventListener("load", onReady, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = CALENDLY_JS;
  script.async = true;
  script.onload = onReady;
  document.head.appendChild(script);
}

export function openCalendly(source: string = "leadform"): void {
  const url = clientConfig.calendlyUrl;

  trackCtaClick("calendly", source);

  // Fallback : pas de Calendly configuré → mailto
  if (!url || url === PLACEHOLDER) {
    window.location.href = `mailto:${clientConfig.email}?subject=Prise%20de%20rendez-vous`;
    return;
  }

  // Lazy load Calendly + open popup
  injectCalendlyAssets(() => {
    window.Calendly?.initPopupWidget({ url });
  });
}
