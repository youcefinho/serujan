// ═══════════════════════════════════════════════════════
// Module Analytics — Tracking GA4 des événements clés
// ═══════════════════════════════════════════════════════
// Utilisation : import { trackEvent } from "@/lib/analytics";
//              trackEvent("cta_click", { location: "hero" });
// ═══════════════════════════════════════════════════════

// Typage pour gtag (Google Analytics 4)
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Événement GA4 générique
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// ── Événements prédéfinis ────────────────────────────

// CTA Calendly cliqué
export function trackCalendlyClick(location: string): void {
  trackEvent("calendly_click", {
    event_category: "conversion",
    event_label: location,
    cta_location: location,
  });
}

// Formulaire de contact soumis
export function trackLeadFormSubmit(type: "buy" | "sell"): void {
  trackEvent("lead_form_submit", {
    event_category: "conversion",
    event_label: type,
    lead_type: type,
  });
}

// Lead Magnet (guide) téléchargé
export function trackLeadMagnetDownload(): void {
  trackEvent("lead_magnet_download", {
    event_category: "conversion",
    event_label: "guide_premier_acheteur",
  });
}

// Toggle langue
export function trackLanguageToggle(lang: "fr" | "en"): void {
  trackEvent("language_toggle", {
    event_category: "engagement",
    event_label: lang,
    language: lang,
  });
}

// Appel téléphonique
export function trackPhoneClick(location: string): void {
  trackEvent("phone_click", {
    event_category: "conversion",
    event_label: location,
    cta_location: location,
  });
}

// WhatsApp cliqué
export function trackWhatsAppClick(): void {
  trackEvent("whatsapp_click", {
    event_category: "conversion",
    event_label: "floating_button",
  });
}

// Scroll depth (pour mesurer l'engagement)
export function trackScrollDepth(percent: number): void {
  trackEvent("scroll_depth", {
    event_category: "engagement",
    event_label: `${percent}%`,
    scroll_percent: percent,
  });
}

// Calculatrice utilisée
export function trackCalculatorUse(): void {
  trackEvent("calculator_use", {
    event_category: "engagement",
    event_label: "mortgage_calculator",
  });
}

// Exit intent popup affiché
export function trackExitIntent(action: "shown" | "closed" | "clicked"): void {
  trackEvent("exit_intent", {
    event_category: "engagement",
    event_label: action,
  });
}
