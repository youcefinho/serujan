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

  // ── Stats ──────────────────────────────────────────────
  stats: {
    funded: { value: "500", suffix: "M$+", label: { fr: "financés", en: "funded" } },
    approval: { value: "95", suffix: "%", label: { fr: "approbation", en: "approval rate" } },
    avgDays: { value: "30", suffix: "", label: { fr: "jours moyens", en: "average days" } },
    projects: { value: "1000", suffix: "+", label: { fr: "projets", en: "projects" } },
  },

  // ── URLs externes ──────────────────────────────────────
  elev8EventUrl: "https://elev8academie.ca/",
  elev8AcademyUrl: "https://elev8academie.ca/",
  siteUrl: "https://serujan.intralysqc.workers.dev",

  // ── Assets ─────────────────────────────────────────────
  logoUrl:
    "https://assets.cdn.filesafe.space/uE8otTz2VFBFG6lqzsmK/media/68b7fd5c7f707b51d1928b4d.png",
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
