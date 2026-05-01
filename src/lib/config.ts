// ═══════════════════════════════════════════════════════════
// Configuration client — Serujan Kaneshalingam
// Courtage Hypothécaire Commercial — Montréal
// ═══════════════════════════════════════════════════════════

export const clientConfig = {
  // Identité
  name: "Serujan Kaneshalingam",
  shortName: "Serujan",
  teamName: "Équipe Serujan",
  title: {
    fr: "Courtage Hypothécaire Commercial",
    en: "Commercial Mortgage Brokerage",
  },

  // ── Contact ───────────────────────────────────────────
  phone: {
    display: "514 · 701 · 6171",
    raw: "5147016171",
    international: "15147016171",
  },
  email: "expert@serujan.com",

  // WhatsApp — utile B2B international (cible Sud-Asiatique de Serujan + promoteurs)
  whatsapp: {
    international: "15147016171", // même numéro que mobile par défaut, à ajuster si Serujan en a un séparé
    defaultMessage: {
      fr: "Bonjour Serujan, je souhaite discuter d'un projet de financement commercial.",
      en: "Hello Serujan, I'd like to discuss a commercial financing project.",
    },
  },

  // ── Adresse ───────────────────────────────────────────
  address: {
    street: "111 Rue Chabanel O",
    suite: "Suite 617",
    city: "Montréal",
    region: "Montréal",
    province: "QC",
    postalCode: "",
    country: "CA",
  },

  // ── Territoire ─────────────────────────────────────────
  territory: "MONTRÉAL | QUÉBEC",
  territoryLabel: "Québec",

  // ── Réseaux sociaux ────────────────────────────────────
  socials: {
    instagram: {
      url: "https://www.instagram.com/serujan.k/",
      handle: "@serujan.k",
    },
    facebook: {
      url: "https://www.facebook.com/serujanhypotheque",
    },
    linkedin: "https://www.linkedin.com/in/serujan-kaneshalingam-911a3b112/",
    tiktok: null as string | null,
  },

  // ── URLs externes ──────────────────────────────────────
  elev8EventUrl: "https://elev82025.ca/",
  elev8AcademyUrl: "https://elev8academie.ca/",
  siteUrl: "https://serujan.intralysqc.workers.dev",

  // ── Assets ─────────────────────────────────────────────
  // Logo officiel "Équipe Serujan" — version recolorée (charbon-friendly)
  // ÉQUIPE en or #D4AF37 + SERUJAN en blanc + monogramme SK
  // Servi en local via Cloudflare ASSETS (asset versionné au build)
  logoUrl: "/logo-equipe-serujan.png",
  heroImageUrl: "/serujan-stage.webp",
  bioImageUrl: "/serujan-elev8.jpg",
  elev8VideoUrl: "https://o6xngqfgnt.wpdns.site/wp-content/uploads/2025/07/Video-elev8.mp4",

  // ── Page Merci ─────────────────────────────────────────
  merci: {
    callbackDelay: {
      fr: "dans les 24 prochaines heures",
      en: "within the next 24 hours",
    },
    followText: {
      fr: "En attendant, suivez {name} sur Instagram pour des insights exclusifs",
      en: "In the meantime, follow {name} on Instagram for exclusive insights",
    },
  },

  // ── Email notification (worker.ts) ─────────────────────
  emailFrom: "Équipe Serujan <onboarding@resend.dev>",

  // ── GoHighLevel (multi-tenant ready) ────────────────────
  // Architecture v2 (mai 2026) : Site Forms GHL embed au lieu de webhook custom.
  // Voir intralys-blueprint/05-lead-form-rapide/composant-config-driven.md
  //
  // Pour onboarder un nouveau client :
  // 1. GHL → Sites → Forms → New Form → ajouter champs niche → Save
  // 2. Récupérer le formId depuis l'embed code GHL
  // 3. Renseigner clientConfig.ghl.formIds.leadform ci-dessous
  // 4. Côté GHL : créer workflow "Form Submitted" → automations niche-specific
  ghl: {
    // ── v2 Site Forms ────────────────────────────────────
    formIds: {
      // ⚠️ PLACEHOLDER — à remplacer par le formId réel après création du form GHL.
      // Tant que c'est "REPLACE_AFTER_GHL_SETUP", l'iframe affiche un message dev.
      leadform: "REPLACE_AFTER_GHL_SETUP",
    },

    // ── v1 webhook (legacy, à retirer en D3) ─────────────
    enabled: true,                  // master switch (false → forward désactivé même si webhook configuré)
    pixelId: "",                    // Public, build-time. Vide = pas d'injection pixel.
    sourcePrefix: "serujan",        // → tags GHL kebab-case : "serujan-leadform"
    clientName: "Serujan",          // → custom field GHL "site_source"
    defaultTags: ["site-lead"],     // tags appliqués à TOUS les leads de ce client
    defaultCountry: "CA",           // pour normalisation phone E.164 (+1 pour CA/US)
  },
} as const;

// ── Types exportés ──────────────────────────────────────
export type ClientConfig = typeof clientConfig;
