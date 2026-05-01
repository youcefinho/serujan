// ═══════════════════════════════════════════════════════════
// Helpers de sécurité — testables unitairement, sans dépendance
// au runtime Cloudflare. Importés par src/worker.ts.
// ═══════════════════════════════════════════════════════════

export const MAX_INPUT_LENGTH = 500;
export const MIN_FORM_FILL_MS = 3000;
export const MAX_LEAD_ATTEMPTS = 10;
export const LEAD_WINDOW_HOURS = 1;

/** Échappe les caractères HTML dangereux (protection XSS pour les emails). */
export function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Trim + limite de longueur sur tout input utilisateur. */
export function sanitizeInput(str: string | undefined, maxLen = MAX_INPUT_LENGTH): string {
  if (!str) return "";
  return str.trim().slice(0, maxLen);
}

/** Validation email côté serveur (RFC 5322 simplifié, max 200 chars). */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 200;
}

/** Validation téléphone : 10 à 15 chiffres après nettoyage (E.164 + extension). */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

/** True si l'input ressemble à un soumission bot (timing trop rapide). */
export function isLikelyBot({ elapsed_ms, hp }: { elapsed_ms?: number; hp?: string }): boolean {
  if (hp && hp.trim().length > 0) return true;
  if (typeof elapsed_ms === "number" && elapsed_ms < MIN_FORM_FILL_MS) return true;
  return false;
}

/** Headers de sécurité appliqués à toutes les réponses du worker. */
export function buildSecurityHeaders(csp: string): Record<string, string> {
  return {
    "Content-Security-Policy": csp,
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    // same-site permet les ressources internes mais bloque la lecture cross-origin (Spectre).
    // Pas same-origin car ça casserait le partage légitime sous-domaine si on ajoute www. plus tard.
    "Cross-Origin-Resource-Policy": "same-site",
    "X-DNS-Prefetch-Control": "on",
  };
}

/** CSP whitelist pour Serujan v2 (GA4, Clarity, assets distants, vidéo Elev8). */
export const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://www.clarity.ms https://*.clarity.ms",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://assets.cdn.filesafe.space https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms",
  "font-src 'self' data:",
  "media-src 'self' https://o6xngqfgnt.wpdns.site",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.clarity.ms",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");
