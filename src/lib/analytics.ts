// ═══════════════════════════════════════════════════════
// Module Analytics — Tracking GA4 des événements clés
// ═══════════════════════════════════════════════════════
// Utilisation : import { trackEvent } from "@/lib/analytics";
//              trackEvent("cta_click", { location: "hero" });
// ═══════════════════════════════════════════════════════

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// ── Événements prédéfinis ────────────────────────────

export function trackLeadFormSubmit(projectType: string): void {
  trackEvent("lead_form_submit", {
    event_category: "conversion",
    event_label: projectType || "unspecified",
    project_type: projectType || "unspecified",
  });
}

export function trackLanguageToggle(lang: "fr" | "en"): void {
  trackEvent("language_toggle", {
    event_category: "engagement",
    event_label: lang,
    language: lang,
  });
}

export function trackPhoneClick(location: string): void {
  trackEvent("phone_click", {
    event_category: "conversion",
    event_label: location,
    cta_location: location,
  });
}

export function trackScrollDepth(percent: number): void {
  trackEvent("scroll_depth", {
    event_category: "engagement",
    event_label: `${percent}%`,
    scroll_percent: percent,
  });
}

export function trackCalculatorUse(): void {
  trackEvent("calculator_use", {
    event_category: "engagement",
    event_label: "commercial_mortgage_calculator",
  });
}

export function trackExitIntent(action: "shown" | "closed" | "clicked"): void {
  trackEvent("exit_intent", {
    event_category: "engagement",
    event_label: action,
  });
}

// Click sur un CTA primaire (Hero, MidPage, ExitIntent, MobileSticky, etc.)
export function trackCtaClick(location: string, label?: string): void {
  trackEvent("cta_click", {
    event_category: "conversion",
    event_label: label || location,
    cta_location: location,
  });
}

// Click sur le bouton flottant WhatsApp
export function trackWhatsappClick(location: string = "fab"): void {
  trackEvent("whatsapp_click", {
    event_category: "conversion",
    event_label: location,
  });
}

// Premier input du LeadForm — l'user a démarré la saisie
export function trackFormStart(formName: string = "lead"): void {
  trackEvent("form_start", {
    event_category: "engagement",
    event_label: formName,
    form_name: formName,
  });
}

// LeadForm a échoué (validation, réseau, rate limit)
export function trackFormSubmitError(reason: string): void {
  trackEvent("form_submit_error", {
    event_category: "conversion",
    event_label: reason,
    error_reason: reason,
  });
}

// Lien email cliqué (mailto:)
export function trackEmailClick(location: string): void {
  trackEvent("email_click", {
    event_category: "conversion",
    event_label: location,
    cta_location: location,
  });
}
