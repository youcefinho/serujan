// ═══════════════════════════════════════════════════════════
// Configuration client — FICHIER UNIQUE À MODIFIER PAR CLIENT
// ═══════════════════════════════════════════════════════════
// SWAP: Pour un nouveau client, modifier TOUTES les valeurs
// ci-dessous + translations.ts + les assets photos/logos.
// Chercher "SWAP" pour trouver les zones à modifier.
// ═══════════════════════════════════════════════════════════

export const clientConfig = {
  // SWAP: Nom complet du courtier
  name: "NOM DU COURTIER",
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
  // SWAP: Email professionnel du courtier
  email: "info@courtier.com",

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

  // SWAP: Réseaux sociaux du courtier (null = ne pas afficher)
  socials: {
    instagram: {
      url: "https://www.instagram.com/COURTIER/",
      handle: "@COURTIER",
    },
    facebook: {
      url: "https://www.facebook.com/COURTIER/",
    },
    tiktok: {
      url: "https://www.tiktok.com/@COURTIER",
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
    {
      name: "Xavier Charron",
      role: { fr: "Courtier immobilier", en: "Real Estate Broker" },
      initials: "XC",
      phone: "+1 819-962-7764",
      website: "xaviercharron.com",
      location: "Gatineau, QC",
      stars: 5.0,
      reviews: 108,
    },
    {
      name: "Ali Al",
      role: { fr: "Courtier immobilier", en: "Real Estate Broker" },
      initials: "AA",
      phone: "+1 819-923-2828",
      website: "aliremax.com",
      location: "Gatineau, QC",
      stars: 5.0,
      reviews: 124,
    },
    {
      name: "François-Xavier Charbonneau",
      role: { fr: "Courtier immobilier", en: "Real Estate Broker" },
      initials: "FX",
      phone: "+1 514-817-3915",
      website: "fxcharbonneau.com",
      location: "Gatineau, QC",
      stars: 5.0,
      reviews: 2,
    },
    {
      name: "François-Luc Charron",
      role: { fr: "Courtier immobilier", en: "Real Estate Broker" },
      initials: "FL",
      phone: "+1 514-979-8620",
      website: "francoisluccharron.com",
      location: "Gatineau, QC",
      stars: 5.0,
      reviews: 3,
    },
  ],

  // SWAP: URLs du courtier
  centrisUrl: "https://www.centris.ca/fr",
  googleReviewUrl: "https://g.page/r/COURTIER/review",
  guideUrl: "https://drive.google.com/file/d/VOTRE-GUIDE-PDF/view",
  siteUrl: "https://NOM-CLIENT.intralysqc.workers.dev",

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
  // SWAP: Nom du courtier dans l'email + domaine Resend
  emailFrom: "NOM DU COURTIER <onboarding@resend.dev>",
  // SWAP: Adapter le sujet avec la ville du courtier
  emailSubject: {
    fr: "🏠 Votre Guide Gratuit du Premier Acheteur est prêt !",
    en: "🏠 Your Free First-Time Buyer Guide is ready!",
  },
} as const;

// ── Types exportés ──────────────────────────────────────
export type ClientConfig = typeof clientConfig;
