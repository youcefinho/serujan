// ═══════════════════════════════════════════════════════════
// Configuration client — FICHIER UNIQUE À MODIFIER PAR CLIENT
// ═══════════════════════════════════════════════════════════
// Ce fichier centralise TOUTES les informations spécifiques
// au courtier. Pour un nouveau client, modifier uniquement
// ce fichier + translations.ts + les assets photos/logos.
// ═══════════════════════════════════════════════════════════

export const clientConfig = {
  // ── Identité ──────────────────────────────────────────
  name: "Mathis Guimont",
  title: {
    fr: "Courtier immobilier résidentiel",
    en: "Residential Real Estate Broker",
  },
  // Âge ou années d'expérience affiché dans le badge Hero
  ageBadge: {
    value: "22 ans",
    label: { fr: "Nouvelle\ngénération", en: "New\ngeneration" },
  },
  // Badge avis — social proof sur la photo Hero
  reviewsBadge: {
    label: { fr: "Avis 5 étoiles", en: "5-Star Reviews" },
  },

  // ── Contact ───────────────────────────────────────────
  phone: {
    display: "819-918-3409",    // Format affiché
    raw: "8199183409",          // Format pour tel: et WhatsApp
    international: "18199183409", // Format WhatsApp international
  },
  email: "info@mathisguimont.com",

  // ── Adresse ───────────────────────────────────────────
  address: {
    street: "225 boul. de la Gappe, suite 102",
    city: "Gatineau",
    region: "Outaouais",
    province: "QC",
    postalCode: "J8T 8K5",
    country: "CA",
  },

  // ── Territoire (badge Hero) ───────────────────────────
  territory: "GATINEAU | OTTAWA",
  territoryLabel: "Outaouais",

  // ── Réseaux sociaux ───────────────────────────────────
  socials: {
    instagram: {
      url: "https://www.instagram.com/mathis_guimont/",
      handle: "@mathis_guimont",
    },
    facebook: {
      url: "https://www.facebook.com/mathis.guimont/reels/",
    },
    tiktok: {
      url: "https://www.tiktok.com/@mathisguimont",
    },
    linkedin: null as string | null, // null = ne pas afficher
  },

  // ── Bannière immobilière ──────────────────────────────
  banner: {
    name: "L'Équipe Xavier Charron & Ali Al",
    // Si le courtier est indépendant, mettre null
    team: "Royal LePage" as string | null,
  },

  // ── Membres de l'équipe ──────────────────────────────
  // SWAP: Ajouter/retirer les membres selon le client
  // Pour les photos : importer dans le composant ParentTeam.tsx
  teamMembers: [
    { name: "Xavier Charron", role: { fr: "Courtier immobilier", en: "Real Estate Broker" }, initials: "XC" },
    { name: "Ali Al", role: { fr: "Courtier immobilier", en: "Real Estate Broker" }, initials: "AA" },
    { name: "François-Xavier Charbonneau", role: { fr: "Courtier immobilier", en: "Real Estate Broker" }, initials: "FX" },
    { name: "François-Luc Charron", role: { fr: "Courtier immobilier", en: "Real Estate Broker" }, initials: "FL" },
  ],

  // ── URLs ──────────────────────────────────────────────
  centrisUrl: "https://www.centris.ca/fr",
  googleReviewUrl: "https://g.page/r/mathisguimont/review",
  guideUrl: "https://drive.google.com/file/d/1dzYfbnMTxe5sO9C78E_PaTx-9bblW0C3/view?usp=drive_link",
  siteUrl: "https://gatineau.intralysqc.workers.dev",

  // ── Page Merci ────────────────────────────────────────
  merci: {
    callbackDelay: {
      fr: "dans les 2 prochaines heures",
      en: "within the next 2 hours",
    },
    followText: {
      fr: "En attendant, suivez {name} sur Instagram pour des conseils immobiliers",
      en: "In the meantime, follow {name} on Instagram for real estate tips",
    },
  },

  // ── Email Lead Magnet (worker.ts) ─────────────────────
  // Ces valeurs sont utilisées dans le worker — à synchroniser
  emailFrom: "Mathis Guimont <onboarding@resend.dev>",
  emailSubject: {
    fr: "🏠 Votre Guide Gratuit du Premier Acheteur à Gatineau est prêt !",
    en: "🏠 Your Free First-Time Buyer Guide for Gatineau is ready!",
  },
} as const;

// ── Types exportés ──────────────────────────────────────
export type ClientConfig = typeof clientConfig;
