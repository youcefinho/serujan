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
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// ── Événements prédéfinis ────────────────────────────

export function trackCalendlyClick(location: string): void {
  trackEvent("calendly_click", {
    event_category: "conversion",
    event_label: location,
    cta_location: location,
  });
}

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
