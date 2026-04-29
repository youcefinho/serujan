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
    badge: { fr: "Courtage hypothécaire commercial · Québec", en: "Commercial Mortgage Brokerage · Quebec" },
    titleLead: { fr: "Le financement", en: "Financing" },
    titleEmphasis: { fr: "qui ouvre les portes", en: "that opens doors" },
    titleTail: { fr: "fermées aux autres.", en: "closed to others." },
    subtitle: {
      fr: "Acquisitions, refinancements, développements et construction. Structurés avec rigueur, négociés avec un réseau institutionnel privilégié.",
      en: "Acquisitions, refinancing, developments and construction. Structured with rigor, negotiated through a privileged institutional network.",
    },
    ctaPrimary: { fr: "Évaluer mon projet", en: "Evaluate my project" },
    ctaCall: { fr: "Parler à Serujan", en: "Speak with Serujan" },
    statFunded: { fr: "Financés", en: "Funded" },
    statApproval: { fr: "Taux d'approbation", en: "Approval rate" },
    statDays: { fr: "Jours en moyenne", en: "Days on average" },
    statProjects: { fr: "Projets menés", en: "Projects led" },
    scrollHint: { fr: "Découvrir l'expertise", en: "Discover the expertise" },
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

  // --- Elev8 (Event + Academy fusionnés) ---
  elev8: {
    label: { fr: "Écosystème Elev8", en: "Elev8 Ecosystem" },
    titleLead: { fr: "Au-delà du courtage,", en: "Beyond brokerage," },
    titleEmphasis: { fr: "une communauté", en: "a community" },
    titleTail: { fr: "d'investisseurs.", en: "of investors." },
    intro: {
      fr: "Elev8, c'est l'événement annuel et la formation continue qui forment l'élite du financement immobilier au Québec. Là où les investisseurs sérieux apprennent ce que les autres ignorent.",
      en: "Elev8 is the annual event and ongoing training that shape Quebec's elite in real estate financing. Where serious investors learn what others ignore.",
    },
    eventTitle: { fr: "Elev8 2026", en: "Elev8 2026" },
    eventTagline: { fr: "L'événement de référence en investissement immobilier", en: "The benchmark event in real estate investing" },
    eventDescription: {
      fr: "Conférences magistrales, panels d'experts, rencontres privilégiées. Un seul jour pour repartir avec un réseau, des stratégies et la clarté qu'il faut pour propulser vos projets.",
      en: "Keynote speeches, expert panels, exclusive meetings. One day to leave with a network, strategies, and the clarity needed to propel your projects.",
    },
    eventCta: { fr: "Réserver ma place", en: "Reserve my spot" },
    countdownTitle: { fr: "Compte à rebours", en: "Countdown" },
    days: { fr: "jours", en: "days" },
    hours: { fr: "heures", en: "hours" },
    minutes: { fr: "minutes", en: "minutes" },
    seconds: { fr: "secondes", en: "seconds" },
    academyTitle: { fr: "Elev8 Academy", en: "Elev8 Academy" },
    academyTagline: { fr: "Investir sans mise de fonds", en: "Invest without down payment" },
    academyDescription: {
      fr: "La formation qui révèle les techniques de financement créatif que les investisseurs avertis utilisent pour bâtir leur portefeuille immobilier sans capital initial.",
      en: "The training that reveals creative financing techniques savvy investors use to build their real estate portfolio without initial capital.",
    },
    academyFeatures: {
      fr: ["Financement créatif avancé", "Réseau de prêteurs privés", "Mentorat personnalisé"],
      en: ["Advanced creative financing", "Private lender network", "Personal mentorship"],
    },
    academyCta: { fr: "Découvrir la méthode", en: "Discover the method" },
    videoLabel: { fr: "Aperçu vidéo", en: "Video preview" },
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
    label: { fr: "Méthodologie", en: "Methodology" },
    titleLead: { fr: "De la première", en: "From the first" },
    titleEmphasis: { fr: "discussion", en: "conversation" },
    titleTail: { fr: "au déblocage des fonds.", en: "to fund release." },
    subtitle: {
      fr: "Quatre étapes maîtrisées, exécutées dans l'ordre, à chaque fois. Pas de raccourci, pas d'improvisation.",
      en: "Four mastered steps, executed in order, every time. No shortcuts, no improvisation.",
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
    label: { fr: "Mon approche", en: "My approach" },
    titleLead: { fr: "Un partenaire", en: "A partner" },
    titleEmphasis: { fr: "stratégique,", en: "strategic," },
    titleTail: { fr: "pas un intermédiaire.", en: "not a middleman." },
    quote: {
      fr: "Quand un dossier est complexe, c'est précisément là que la valeur ajoutée d'un courtier d'élite se révèle.",
      en: "When a file is complex, that's precisely where an elite broker's added value reveals itself.",
    },
    quoteAttribution: { fr: "— Serujan Kaneshalingam", en: "— Serujan Kaneshalingam" },
    description: {
      fr: "Chaque mandat commercial est unique. Mon rôle dépasse le simple courtage : je structure le montage, j'ouvre les portes du réseau institutionnel et je négocie les conditions que la majorité des courtiers ignorent même qu'elles existent.",
      en: "Every commercial mandate is unique. My role goes beyond brokerage: I structure the deal, open doors to the institutional network, and negotiate terms most brokers don't even know exist.",
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
    label: { fr: "Expertise", en: "Expertise" },
    titleLead: { fr: "Trois piliers,", en: "Three pillars," },
    titleEmphasis: { fr: "une seule exigence.", en: "one standard." },
    subtitle: {
      fr: "Chaque mandat est traité avec la même rigueur : structurer ce que personne d'autre ne sait structurer, négocier ce que les banques refusent en première instance, livrer dans les délais.",
      en: "Every mandate gets the same rigor: structuring what others can't, negotiating what banks decline at first, delivering on time.",
    },
    pillarNumber: { fr: "Pilier", en: "Pillar" },
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
    learnMore: { fr: "Discuter de mon projet", en: "Discuss my project" },
    pillarCta: { fr: "Voir un cas similaire", en: "See a similar case" },
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
    label: { fr: "Outil interactif", en: "Interactive tool" },
    titleLead: { fr: "Simulez", en: "Simulate" },
    titleEmphasis: { fr: "votre paiement.", en: "your payment." },
    subtitle: {
      fr: "Ajustez les paramètres et visualisez instantanément le coût total mensuel de votre projet commercial. Estimation à titre indicatif — la structure réelle est négociée selon votre profil.",
      en: "Adjust parameters and instantly visualize your project's total monthly cost. Estimate only — the real structure is negotiated based on your profile.",
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
    label: { fr: "Évaluation gratuite", en: "Free evaluation" },
    titleLead: { fr: "Discutons de", en: "Let's discuss" },
    titleEmphasis: { fr: "votre prochain projet.", en: "your next project." },
    intro: {
      fr: "Réponse personnelle de Serujan dans les 24h. Confidentialité garantie. Aucun engagement.",
      en: "Personal response from Serujan within 24h. Confidentiality guaranteed. No commitment.",
    },
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
    step: { fr: "Étape", en: "Step" },
    email: { fr: "Email", en: "Email" },
    office: { fr: "Bureau", en: "Office" },
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
    elev8Method: { fr: "Méthode Elev8", en: "Elev8 Method" },
    elev8Event: { fr: "Événement Elev8 2025", en: "Elev8 2025 Event" },
    elev8EventShort: { fr: "Événement Elev8", en: "Elev8 Event" },
    podcastVideoLabel: { fr: "Vidéo Elev8 Event", en: "Elev8 Event video" },
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
