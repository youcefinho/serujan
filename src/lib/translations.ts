// Système de traduction bilingue FR/EN — Standard Intralys §10.1
// Français = langue par défaut. Choix persisté dans localStorage.

export type Language = "fr" | "en";

export const translations = {
  // --- Navbar ---
  nav: {
    about: { fr: "À propos", en: "About" },
    services: { fr: "Services", en: "Services" },
    testimonials: { fr: "Témoignages", en: "Testimonials" },
    faq: { fr: "FAQ", en: "FAQ" },
    contact: { fr: "Contact", en: "Contact" },
    cta: { fr: "Rencontre stratégique", en: "Free consultation" },
    ctaMobile: { fr: "Rencontre stratégique gratuite", en: "Free strategic consultation" },
    call: { fr: "Appeler", en: "Call" },
  },

  // --- Hero ---
  hero: {
    badge: { fr: "La Transaction Sans Stress · Gatineau", en: "The Stress-Free Transaction · Gatineau" },
    title: { fr: "Votre premier achat à Gatineau.", en: "Your first home in Gatineau." },
    phrases: {
      fr: ["Sans stress.", "Sans mauvaise surprise."],
      en: ["Stress-free.", "No bad surprises."],
    },
    description: {
      fr: "\"Et si on se trompe de quartier ? Et si la maison a des problèmes cachés ? Et si on n'est pas vraiment prêts financièrement ?\"",
      en: "\"What if we pick the wrong neighborhood? What if the house has hidden problems? What if we're not really financially ready?\"",
    },
    descriptionBold: {
      fr: "est le seul courtier de Gatineau qui répond à ces questions avant même que vous les posiez.",
      en: "is the only broker in Gatineau who answers these questions before you even ask them.",
    },
    ctaPrimary: { fr: "RENCONTRE STRATÉGIQUE GRATUITE", en: "FREE STRATEGIC CONSULTATION" },
    ctaCall: { fr: "Appeler maintenant", en: "Call now" },
    ctaMessage: { fr: "Envoyer un message", en: "Send a message" },
    trustBadge: { fr: "Réponse en moins de 2h · 7j/7 · Outaouais", en: "Response within 2h · 7/7 · Outaouais" },
  },

  // --- Fears ---
  fears: {
    title: { fr: "Ce que vous ressentez.", en: "What you're feeling." },
    subtitle: { fr: "Ces inquiétudes sont normales. Et elles méritent des réponses claires.", en: "These worries are normal. And they deserve clear answers." },
  },

  // --- Triggers ---
  triggers: {
    title: { fr: "Vous vous reconnaissez ?", en: "Sound familiar?" },
    subtitle: { fr: "Ces situations déclenchent souvent la décision d'agir.", en: "These situations often trigger the decision to act." },
  },

  // --- Services ---
  services: {
    label: { fr: "Services", en: "Services" },
    title: { fr: "Trois missions. Une expertise.", en: "Three missions. One expertise." },
    achat: {
      title: { fr: "ACHAT", en: "BUYING" },
      desc: { fr: "Trouvez la propriété parfaite. Accompagnement complet de la première visite jusqu'à la remise des clés.", en: "Find the perfect property. Complete support from first visit to key handover." },
      points: {
        fr: ["Recherche ciblée", "Négociation experte", "Inspection accompagnée"],
        en: ["Targeted search", "Expert negotiation", "Guided inspection"],
      },
    },
    vente: {
      title: { fr: "VENTE", en: "SELLING" },
      desc: { fr: "Maximisez la valeur de votre propriété grâce à une stratégie marketing puissante et un large réseau d'acheteurs.", en: "Maximize your property value with a powerful marketing strategy and wide buyer network." },
      points: {
        fr: ["Évaluation gratuite", "Marketing premium", "Photos professionnelles"],
        en: ["Free evaluation", "Premium marketing", "Professional photos"],
      },
    },
    investissement: {
      title: { fr: "INVESTISSEMENT", en: "INVESTMENT" },
      desc: { fr: "Identifiez les meilleures opportunités d'investissement immobilier. Analyse de rentabilité et accompagnement patrimonial.", en: "Identify the best real estate investment opportunities. Profitability analysis and wealth management." },
      points: {
        fr: ["Analyse de marché", "Calcul de rendement", "Stratégie long terme"],
        en: ["Market analysis", "Return calculation", "Long-term strategy"],
      },
    },
    learnMore: { fr: "En savoir plus", en: "Learn more" },
  },

  // --- Properties ---
  properties: {
    label: { fr: "Propriétés", en: "Properties" },
    title: { fr: "Découvrez nos propriétés", en: "Discover our properties" },
    subtitle: { fr: "Voici un aperçu de nos inscriptions. Consultez notre page complète pour voir toutes les propriétés disponibles.", en: "Here's a preview of our listings. Visit our full page to see all available properties." },
    cta: { fr: "Voir toutes les propriétés sur Centris", en: "See all properties on Centris" },
    beds: { fr: "ch.", en: "bd." },
    baths: { fr: "sdb.", en: "ba." },
  },

  // --- Calculator ---
  calculator: {
    label: { fr: "Outil", en: "Tool" },
    title: { fr: "Calculateur hypothécaire", en: "Mortgage calculator" },
    subtitle: { fr: "Estimez votre coût mensuel total incluant hypothèque, taxes et assurance.", en: "Estimate your total monthly cost including mortgage, taxes and insurance." },
    price: { fr: "Prix de la propriété", en: "Property price" },
    downPayment: { fr: "Mise de fonds", en: "Down payment" },
    interestRate: { fr: "Taux d'intérêt", en: "Interest rate" },
    amortization: { fr: "Amortissement", en: "Amortization" },
    propertyTax: { fr: "Taxe foncière annuelle", en: "Annual property tax" },
    insurance: { fr: "Assurance habitation annuelle", en: "Annual home insurance" },
    totalMonthly: { fr: "Coût mensuel total", en: "Total monthly cost" },
    mortgage: { fr: "Hypothèque", en: "Mortgage" },
    taxes: { fr: "Taxes foncières", en: "Property taxes" },
    insuranceLabel: { fr: "Assurance", en: "Insurance" },
    downPaymentAmount: { fr: "Mise de fonds", en: "Down payment" },
    cta: { fr: "Discuter de mon projet", en: "Discuss my project" },
    perMonth: { fr: "/mois", en: "/mo" },
  },

  // --- ParentTeam ---
  parentTeam: {
    label: { fr: "Notre bannière", en: "Our banner" },
    title: { fr: "Une équipe, une vision", en: "One team, one vision" },
    teamName: { fr: "Équipe Immobilière", en: "Real Estate Team" },
    description: {
      fr: "Nous faisons partie d'un réseau immobilier reconnu à travers le Québec. Notre affiliation nous permet d'offrir une visibilité maximale à nos clients et un accès privilégié aux outils de mise en marché les plus performants du marché.",
      en: "We are part of a recognized real estate network across Quebec. Our affiliation allows us to offer maximum visibility to our clients and privileged access to the most effective marketing tools.",
    },
    tags: {
      fr: ["Réseau provincial", "Marketing avancé", "Formation continue"],
      en: ["Provincial network", "Advanced marketing", "Continuous training"],
    },
  },

  // --- FreeConsultation ---
  freeConsultation: {
    label: { fr: "Première étape", en: "First step" },
    title: { fr: "Votre première rencontre est gratuite", en: "Your first meeting is free" },
    subtitle: { fr: "Sans engagement. Sans pression. On discute de votre projet immobilier et on vous donne un plan d'action concret.", en: "No commitment. No pressure. We discuss your real estate project and give you a concrete action plan." },
    badges: {
      fr: [
        { label: "Gratuit", desc: "Aucuns frais" },
        { label: "Sans engagement", desc: "Aucune obligation" },
        { label: "Confidentiel", desc: "Vos infos restent privées" },
      ],
      en: [
        { label: "Free", desc: "No fees" },
        { label: "No commitment", desc: "No obligation" },
        { label: "Confidential", desc: "Your info stays private" },
      ],
    },
    cta: { fr: "Rencontre stratégique gratuite", en: "Free strategic consultation" },
  },

  // --- LeadForm ---
  leadForm: {
    label: { fr: "Contact", en: "Contact" },
    title: { fr: "Démarrons votre projet.", en: "Let's start your project." },
    tabBuy: { fr: "J'achète", en: "I'm buying" },
    tabSell: { fr: "Je vends", en: "I'm selling" },
    name: { fr: "Nom complet", en: "Full name" },
    email: { fr: "Courriel", en: "Email" },
    phone: { fr: "Téléphone", en: "Phone" },
    message: { fr: "Message (optionnel)", en: "Message (optional)" },
    budget: { fr: "Budget approximatif", en: "Approximate budget" },
    timeline: { fr: "Échéancier", en: "Timeline" },
    address: { fr: "Adresse de la propriété", en: "Property address" },
    propertyType: { fr: "Type de propriété", en: "Property type" },
    submit: { fr: "Envoyer ma demande", en: "Send my request" },
    sending: { fr: "Envoi en cours...", en: "Sending..." },
    success: { fr: "Message envoyé avec succès !", en: "Message sent successfully!" },
    error: { fr: "Erreur lors de l'envoi. Veuillez réessayer.", en: "Error sending. Please try again." },
  },

  // --- FAQ ---
  faq: {
    label: { fr: "FAQ", en: "FAQ" },
    title: { fr: "Questions fréquentes", en: "Frequently asked questions" },
  },

  // --- Deliverables ---
  deliverables: {
    listTitle: { fr: "Ce que vous recevez exactement :", en: "What you'll receive exactly:" },
    title: { fr: "La Transaction", en: "The Transaction" },
    titleAccent: { fr: "Sans Stress", en: "Stress-Free" },
    description: { fr: "Fini de courir après les professionnels et de naviguer à l'aveugle. Je prends en charge toute la complexité pour que vous n'ayez qu'à choisir la maison de vos rêves.", en: "No more chasing professionals and navigating blindly. I handle all the complexity so you only have to choose your dream home." },
    cta: { fr: "Rencontre stratégique gratuite", en: "Free strategic consultation" },
  },

  // --- ExitIntentPopup ---
  exitIntent: {
    title: { fr: "Avant de partir…", en: "Before you go…" },
    description: { fr: "Obtenez votre", en: "Get your" },
    descriptionBold: { fr: "évaluation gratuite", en: "free evaluation" },
    descriptionEnd: { fr: "en 30 secondes. Aucun engagement.", en: "in 30 seconds. No commitment." },
    cta: { fr: "Rencontre stratégique gratuite", en: "Free strategic consultation" },
    callAlt: { fr: "ou appelez directement le", en: "or call directly at" },
  },

  // --- MobileStickyBar ---
  mobileStickyBar: {
    call: { fr: "Appeler", en: "Call" },
    cta: { fr: "Rencontre gratuite", en: "Free meeting" },
  },

  // --- Common ---
  common: {
    years: { fr: "ans", en: "years" },
  },
} as const;

// Type utilitaire pour accéder aux traductions
export type TranslationKey = keyof typeof translations;
