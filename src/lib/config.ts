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
    display: "(514) 701-6171",
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
} as const;

// ── Types exportés ──────────────────────────────────────
export type ClientConfig = typeof clientConfig;
