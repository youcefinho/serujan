// ═══════════════════════════════════════════════════════════
// Système de traduction bilingue FR/EN — Serujan Kaneshalingam
// Courtage Hypothécaire Commercial
// ═══════════════════════════════════════════════════════════
// Français = langue par défaut. Choix persisté dans localStorage.
// EN = placeholder pour Phase 2 (traductions réelles à venir)
// ═══════════════════════════════════════════════════════════

export type Language = "fr" | "en";

export const translations = {
  // --- Navbar ---
  nav: {
    services: { fr: "Services", en: "Services" },
    approche: { fr: "Mon Approche", en: "My Approach" },
    processus: { fr: "Processus", en: "Process" },
    elev8: { fr: "Elev8", en: "Elev8" },
    simulateur: { fr: "Simulateur", en: "Simulator" },
    contact: { fr: "Contact", en: "Contact" },
    cta: { fr: "Consultation", en: "Consultation" },
    inscription: { fr: "S'inscrire", en: "Register" },
    call: { fr: "Appeler", en: "Call" },
  },

  // --- Hero ---
  hero: {
    badge: { fr: "Courtage Hypothécaire Commercial · Québec", en: "Commercial Mortgage Brokerage · Quebec" },
    title: { fr: "L'excellence en financement commercial", en: "Excellence in commercial financing" },
    subtitle: {
      fr: "Quand votre projet mérite plus qu'un simple financement.",
      en: "When your project deserves more than simple financing.",
    },
    description: {
      fr: "Structures sur mesure, négociations d'expert, résultats garantis.",
      en: "Custom structures, expert negotiations, guaranteed results.",
    },
    ctaPrimary: { fr: "ÉVALUER MON PROJET", en: "EVALUATE MY PROJECT" },
    ctaCall: { fr: "CONSULTATION RAPIDE", en: "QUICK CONSULTATION" },
    trustBadge: {
      fr: "500M$+ financés · 95% approbation · Montréal",
      en: "500M$+ funded · 95% approval · Montréal",
    },
  },

  // --- ValueCards (3 cartes sous le hero) ---
  valueCards: {
    intro: {
      fr: "Dans un marché où chaque détail compte, l'expérience et le réseau font toute la différence",
      en: "In a market where every detail matters, experience and network make all the difference",
    },
    cards: {
      fr: [
        {
          title: "RÉSEAU EXCLUSIF",
          desc: "Accès privilégié aux décideurs des plus grandes institutions financières du Québec et du Canada",
        },
        {
          title: "EXPERTISE RECONNUE",
          desc: "Plus de 15 ans d'expérience dans les montages financiers les plus complexes du marché commercial",
        },
        {
          title: "RÉSULTATS GARANTIS",
          desc: "Taux d'approbation de 95% et délais respectés grâce à une méthodologie éprouvée",
        },
      ],
      en: [
        {
          title: "EXCLUSIVE NETWORK",
          desc: "Privileged access to decision-makers at the largest financial institutions in Quebec and Canada",
        },
        {
          title: "RECOGNIZED EXPERTISE",
          desc: "Over 15 years of experience in the most complex financial arrangements in the commercial market",
        },
        {
          title: "GUARANTEED RESULTS",
          desc: "95% approval rate and respected deadlines through a proven methodology",
        },
      ],
    },
  },

  // --- StatsBar ---
  statsBar: {
    fr: [
      { value: "500", suffix: "M$+", label: "financés" },
      { value: "95", suffix: "%", label: "approbation" },
      { value: "30", suffix: "", label: "jours moyens" },
      { value: "1000", suffix: "+", label: "projets" },
    ],
    en: [
      { value: "500", suffix: "M$+", label: "funded" },
      { value: "95", suffix: "%", label: "approval" },
      { value: "30", suffix: "", label: "average days" },
      { value: "1000", suffix: "+", label: "projects" },
    ],
  },

  // --- Elev8 Event ---
  elev8Event: {
    label: { fr: "Événement", en: "Event" },
    title: { fr: "ELEV8 2025", en: "ELEV8 2025" },
    description: {
      fr: "L'événement Elev8 réunit des investisseurs, des entrepreneurs et des experts du financement commercial dans un cadre propice à l'apprentissage et au réseautage.",
      en: "The Elev8 event brings together investors, entrepreneurs, and commercial financing experts in a setting conducive to learning and networking.",
    },
    details: {
      fr: "Conférences magistrales, panels d'experts et rencontres privilégiées : chaque participant repart avec un arsenal d'outils pratiques, des stratégies éprouvées et un réseau de contacts stratégiques pour propulser ses projets vers de nouveaux sommets.",
      en: "Keynote speeches, expert panels, and exclusive meetings: every participant leaves with a toolkit of practical tools, proven strategies, and a network of strategic contacts to propel their projects to new heights.",
    },
    ctaVisit: { fr: "VISITER LA PAGE DE L'ÉVÉNEMENT", en: "VISIT THE EVENT PAGE" },
    ctaReserve: { fr: "RÉSERVER MA PLACE MAINTENANT", en: "RESERVE MY SPOT NOW" },
    countdownTitle: {
      fr: "COMPTE À REBOURS ELEV8 2025",
      en: "ELEV8 2025 COUNTDOWN",
    },
    countdownSubtitle: {
      fr: "Ne manquez pas cet événement exceptionnel",
      en: "Don't miss this exceptional event",
    },
    days: { fr: "jours", en: "days" },
    hours: { fr: "heures", en: "hours" },
    minutes: { fr: "minutes", en: "minutes" },
    seconds: { fr: "secondes", en: "seconds" },
  },

  // --- Podcast ---
  podcast: {
    label: { fr: "Podcast", en: "Podcast" },
    title: { fr: "ÉCOUTEZ LE PODCAST", en: "LISTEN TO THE PODCAST" },
    subtitle: {
      fr: "Insights exclusifs et stratégies d'experts",
      en: "Exclusive insights and expert strategies",
    },
    cta: { fr: "Écouter maintenant", en: "Listen now" },
  },

  // --- Process ---
  process: {
    label: { fr: "Le processus", en: "The process" },
    title: {
      fr: "Une approche systématique qui maximise vos chances de succès",
      en: "A systematic approach that maximizes your chances of success",
    },
    steps: {
      fr: [
        {
          title: "DIAGNOSTIC FINANCIER",
          desc: "Analyse complète et approfondie de votre situation financière avec identification précise des opportunités.",
        },
        {
          title: "STRUCTURE & STRATÉGIE",
          desc: "Conception de la structure financière optimale et définition de la stratégie d'approche personnalisée.",
        },
        {
          title: "NÉGOCIATION",
          desc: "Négociation experte des meilleures conditions et gestion rigoureuse de la conformité réglementaire.",
        },
        {
          title: "CLÔTURE & EXÉCUTION",
          desc: "Finalisation méticuleuse du dossier et suivi personnalisé jusqu'au déblocage complet des fonds.",
        },
      ],
      en: [
        {
          title: "FINANCIAL DIAGNOSTIC",
          desc: "Complete and thorough analysis of your financial situation with precise identification of opportunities.",
        },
        {
          title: "STRUCTURE & STRATEGY",
          desc: "Design of the optimal financial structure and definition of personalized approach strategy.",
        },
        {
          title: "NEGOTIATION",
          desc: "Expert negotiation of the best conditions and rigorous management of regulatory compliance.",
        },
        {
          title: "CLOSING & EXECUTION",
          desc: "Meticulous finalization of the file and personalized follow-up until complete fund disbursement.",
        },
      ],
    },
  },

  // --- Approche (Mon Approche) ---
  approche: {
    label: { fr: "Mon Approche", en: "My Approach" },
    title: {
      fr: "LA VISION QUI TRANSFORME VOS PROJETS",
      en: "THE VISION THAT TRANSFORMS YOUR PROJECTS",
    },
    description: {
      fr: "Chaque projet immobilier commercial est unique. Mon approche va au-delà du simple courtage : je deviens votre partenaire stratégique pour structurer, négocier et concrétiser vos ambitions les plus audacieuses.",
      en: "Every commercial real estate project is unique. My approach goes beyond simple brokerage: I become your strategic partner to structure, negotiate, and realize your most ambitious goals.",
    },
    features: {
      fr: [
        { title: "Analyse Stratégique", desc: "Évaluation complète de votre situation et identification des opportunités" },
        { title: "Structures Innovantes", desc: "Montages financiers créatifs adaptés à vos besoins spécifiques" },
        { title: "Négociation d'Expert", desc: "Conditions optimales grâce à des relations privilégiées" },
        { title: "Suivi Personnalisé", desc: "Accompagnement jusqu'à la finalisation complète" },
      ],
      en: [
        { title: "Strategic Analysis", desc: "Complete assessment of your situation and opportunity identification" },
        { title: "Innovative Structures", desc: "Creative financial arrangements tailored to your specific needs" },
        { title: "Expert Negotiation", desc: "Optimal conditions through privileged relationships" },
        { title: "Personalized Follow-up", desc: "Support through to complete finalization" },
      ],
    },
  },

  // --- Services (3 piliers) ---
  services: {
    label: { fr: "Services", en: "Services" },
    title: {
      fr: "TROIS PILIERS D'EXPERTISE",
      en: "THREE PILLARS OF EXPERTISE",
    },
    subtitle: {
      fr: "Solutions complètes pour tous vos besoins en financement commercial",
      en: "Complete solutions for all your commercial financing needs",
    },
    pillar1: {
      title: { fr: "FINANCEMENT HYPOTHÉCAIRE COMMERCIAL", en: "COMMERCIAL MORTGAGE FINANCING" },
      desc: {
        fr: "Structures de financement sur mesure pour acquisitions, refinancements et développements avec négociation d'expert.",
        en: "Custom financing structures for acquisitions, refinancing, and developments with expert negotiation.",
      },
    },
    pillar2: {
      title: { fr: "OPTIMISATION DE PORTEFEUILLE", en: "PORTFOLIO OPTIMIZATION" },
      desc: {
        fr: "Stratégies avancées de restructuration et d'optimisation pour maximiser la performance de vos actifs immobiliers.",
        en: "Advanced restructuring and optimization strategies to maximize the performance of your real estate assets.",
      },
    },
    pillar3: {
      title: { fr: "ACCÈS AUX PRÊTEURS INSTITUTIONNELS", en: "ACCESS TO INSTITUTIONAL LENDERS" },
      desc: {
        fr: "Réseau exclusif de prêteurs institutionnels et privés pour des solutions de financement inaccessibles au grand public.",
        en: "Exclusive network of institutional and private lenders for financing solutions inaccessible to the general public.",
      },
    },
    learnMore: { fr: "Me contacter", en: "Contact me" },
  },

  // --- Elev8 Academy ---
  elev8Academy: {
    label: { fr: "Formation", en: "Training" },
    title: { fr: "INVESTIR SANS MISE DE FONDS", en: "INVEST WITH NO DOWN PAYMENT" },
    description: {
      fr: "Découvrez les stratégies avancées de financement créatif qui permettent aux investisseurs avertis de bâtir leur portefeuille immobilier sans capital initial.",
      en: "Discover advanced creative financing strategies that allow savvy investors to build their real estate portfolio without initial capital.",
    },
    features: {
      fr: [
        { title: "Techniques de Financement Créatif", desc: "Maîtrisez les stratégies les plus avancées du marché" },
        { title: "Réseau de Prêteurs Privés", desc: "Accès exclusif aux sources de financement alternatives" },
        { title: "Accompagnement Personnalisé", desc: "Mentorat direct avec Serujan et son équipe" },
      ],
      en: [
        { title: "Creative Financing Techniques", desc: "Master the most advanced market strategies" },
        { title: "Private Lender Network", desc: "Exclusive access to alternative financing sources" },
        { title: "Personalized Coaching", desc: "Direct mentorship with Serujan and his team" },
      ],
    },
    cta: { fr: "DÉCOUVRIR LA MÉTHODE", en: "DISCOVER THE METHOD" },
  },

  // --- Calculatrice hypothécaire commerciale ---
  calculator: {
    label: { fr: "Outil", en: "Tool" },
    title: { fr: "SIMULATEUR HYPOTHÉCAIRE COMMERCIAL", en: "COMMERCIAL MORTGAGE SIMULATOR" },
    subtitle: {
      fr: "Estimation complète avec analyse des coûts totaux et visualisation graphique",
      en: "Complete estimate with total cost analysis and graphical visualization",
    },
    loanAmount: { fr: "Montant du prêt", en: "Loan amount" },
    interestRate: { fr: "Taux d'intérêt", en: "Interest rate" },
    amortization: { fr: "Amortissement", en: "Amortization" },
    propertyTax: { fr: "Taxe foncière annuelle", en: "Annual property tax" },
    insurance: { fr: "Assurance annuelle", en: "Annual insurance" },
    monthlyMortgage: { fr: "Paiement hypothécaire mensuel", en: "Monthly mortgage payment" },
    capitalInterest: { fr: "Capital + Intérêts", en: "Principal + Interest" },
    totalMonthly: { fr: "Paiement mensuel total", en: "Total monthly payment" },
    includingTaxInsurance: { fr: "Incluant taxes et assurance", en: "Including taxes and insurance" },
    mortgage: { fr: "Hypothèque", en: "Mortgage" },
    taxes: { fr: "Taxes foncières", en: "Property taxes" },
    insuranceLabel: { fr: "Assurance", en: "Insurance" },
    cta: { fr: "OBTENIR UNE ÉVALUATION PRÉCISE", en: "GET A PRECISE EVALUATION" },
    perMonth: { fr: "/mois", en: "/mo" },
    disclaimer: {
      fr: "Ces résultats sont estimatifs et ne constituent pas une offre de financement. Les taux réels peuvent varier selon votre profil et les conditions du marché. Consultez Serujan pour une évaluation précise et personnalisée de votre projet commercial.",
      en: "These results are estimates and do not constitute a financing offer. Actual rates may vary based on your profile and market conditions. Consult Serujan for a precise and personalized evaluation of your commercial project.",
    },
  },

  // --- FreeConsultation / Contact CTA ---
  freeConsultation: {
    title: {
      fr: "Chaque projet est unique.",
      en: "Every project is unique.",
    },
    subtitle: {
      fr: "Discutons de vos objectifs et explorons ensemble les meilleures solutions de financement pour concrétiser votre vision.",
      en: "Let's discuss your goals and explore together the best financing solutions to realize your vision.",
    },
    ctaEmail: { fr: "ÉCRIRE UN COURRIEL", en: "SEND AN EMAIL" },
    ctaCall: { fr: "APPELER MAINTENANT", en: "CALL NOW" },
  },

  // --- LeadForm ---
  leadForm: {
    label: { fr: "Contact", en: "Contact" },
    title: { fr: "Évaluons votre projet.", en: "Let's evaluate your project." },
    name: { fr: "Nom complet", en: "Full name" },
    email: { fr: "Courriel", en: "Email" },
    phone: { fr: "Téléphone", en: "Phone" },
    projectType: { fr: "Type de projet", en: "Project type" },
    estimatedAmount: { fr: "Montant estimé", en: "Estimated amount" },
    message: { fr: "Décrivez votre projet (optionnel)", en: "Describe your project (optional)" },
    submit: { fr: "ÉVALUER MON PROJET", en: "EVALUATE MY PROJECT" },
    sending: { fr: "Envoi en cours...", en: "Sending..." },
    success: { fr: "Demande envoyée avec succès !", en: "Request sent successfully!" },
    error: { fr: "Erreur lors de l'envoi. Veuillez réessayer.", en: "Error sending. Please try again." },
    trustText: {
      fr: "Réponse personnelle de Serujan dans les 24h. Vos informations restent confidentielles.",
      en: "Personal response from Serujan within 24h. Your information remains confidential.",
    },
    projectTypeOptions: {
      fr: ["Acquisition", "Refinancement", "Développement", "Construction", "Autre"],
      en: ["Acquisition", "Refinancing", "Development", "Construction", "Other"],
    },
    amountOptions: {
      fr: ["500K$ - 2M$", "2M$ - 5M$", "5M$ - 10M$", "10M$ - 25M$", "25M$+"],
      en: ["$500K - $2M", "$2M - $5M", "$5M - $10M", "$10M - $25M", "$25M+"],
    },
    // Validation
    nameRequired: { fr: "Nom requis (min. 2 caractères)", en: "Name required (min. 2 characters)" },
    phoneInvalid: { fr: "Numéro de téléphone invalide", en: "Invalid phone number" },
    emailInvalid: { fr: "Courriel invalide", en: "Email invalid" },
    serverError: { fr: "Erreur serveur", en: "Server error" },
    validationError: { fr: "Veuillez vérifier les champs.", en: "Please check the fields." },
    genericError: {
      fr: "Une erreur est survenue. Veuillez réessayer ou appeler",
      en: "An error occurred. Please try again or call",
    },
    honeypot: { fr: "Ne pas remplir", en: "Do not fill" },
  },

  // --- ExitIntentPopup ---
  exitIntent: {
    title: { fr: "Avant de partir…", en: "Before you go…" },
    description: { fr: "Obtenez votre", en: "Get your" },
    descriptionBold: { fr: "évaluation gratuite de projet", en: "free project evaluation" },
    descriptionEnd: { fr: "en 30 secondes. Aucun engagement.", en: "in 30 seconds. No commitment." },
    cta: { fr: "ÉVALUER MON PROJET", en: "EVALUATE MY PROJECT" },
    callAlt: { fr: "ou appelez directement le", en: "or call directly at" },
  },

  // --- MobileStickyBar ---
  mobileStickyBar: {
    call: { fr: "Appeler", en: "Call" },
    cta: { fr: "Évaluer mon projet", en: "Evaluate my project" },
  },

  // --- Common ---
  common: {
    years: { fr: "ans", en: "years" },
  },

  // --- Footer ---
  footer: {
    desc: {
      fr: "Financement commercial d'exception, exécuté avec rigueur et professionnalisme. L'expertise qui transforme vos projets en succès.",
      en: "Exceptional commercial financing, executed with rigor and professionalism. The expertise that transforms your projects into success.",
    },
    servicesTitle: { fr: "Services", en: "Services" },
    contactTitle: { fr: "Contact", en: "Contact" },
    followMe: { fr: "Suivez-nous", en: "Follow us" },
    usefulLinks: { fr: "Liens utiles", en: "Useful links" },
    copyright: {
      fr: "Serujan Kaneshalingam · Courtage Hypothécaire Commercial",
      en: "Serujan Kaneshalingam · Commercial Mortgage Brokerage",
    },
    madeIn: { fr: "Conçu avec passion à Montréal", en: "Crafted with passion in Montréal" },
    mentions: { fr: "Mentions légales", en: "Legal notice" },
    confidentialite: { fr: "Confidentialité", en: "Privacy" },
  },
} as const;

// Type utilitaire pour accéder aux traductions
export type TranslationKey = keyof typeof translations;
