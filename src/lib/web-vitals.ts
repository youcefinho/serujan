// ═══════════════════════════════════════════════════════════
// Web Vitals — RUM (Real User Monitoring) reporting vers GA4
// ═══════════════════════════════════════════════════════════
// Mesure les Core Web Vitals chez les VRAIS users (pas en lab Lighthouse) :
//   - LCP : Largest Contentful Paint (cible < 2.5s)
//   - INP : Interaction to Next Paint (cible < 200ms)
//   - CLS : Cumulative Layout Shift (cible < 0.1)
//   - FCP : First Contentful Paint (cible < 1.8s)
//   - TTFB : Time to First Byte (cible < 800ms)
//
// Envoie chaque metric à GA4 comme event "web_vitals" pour analyse
// par browser/device/connection en production. Drives data-driven optim.
// ═══════════════════════════════════════════════════════════

import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";

function sendToGA4(metric: Metric) {
  if (typeof window === "undefined" || !window.gtag) return;

  // Round selon le type pour des values lisibles dans GA4
  const value =
    metric.name === "CLS"
      ? Math.round(metric.value * 1000) // CLS multiplié × 1000 (entier)
      : Math.round(metric.value); // ms entier

  window.gtag("event", "web_vitals", {
    event_category: "Web Vitals",
    event_label: metric.id, // unique ID pour dédupliquer
    metric_name: metric.name,
    metric_value: value,
    metric_rating: metric.rating, // "good" | "needs-improvement" | "poor"
    non_interaction: true, // ne compte pas comme bounce
  });
}

export function initWebVitals(): void {
  if (typeof window === "undefined") return;

  onLCP(sendToGA4);
  onINP(sendToGA4);
  onCLS(sendToGA4);
  onFCP(sendToGA4);
  onTTFB(sendToGA4);
}
