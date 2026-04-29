// ═══════════════════════════════════════════════════════════
// Système de traduction bilingue FR/EN — Serujan Kaneshalingam
// Courtage Hypothécaire Commercial
// ═══════════════════════════════════════════════════════════
// Français = langue par défaut. Choix persisté dans localStorage.
// FR + EN sont tous deux des traductions complètes.
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
    badge: {
      fr: "Courtage hypothécaire commercial · Québec",
      en: "Commercial Mortgage Brokerage · Quebec",
    },
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
    typewriterPhrases: {
      fr: [
        "qui ouvre les portes fermées aux autres.",
        "qui finance l'impossible.",
        "qui bâtit des empires.",
        "qui transforme votre vision en réalité.",
      ],
      en: [
        "that opens doors closed to others.",
        "that finances the impossible.",
        "that builds empires.",
        "that turns your vision into reality.",
      ],
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
    eventTagline: {
      fr: "L'événement de référence en investissement immobilier",
      en: "The benchmark event in real estate investing",
    },
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
        {
          title: "Analyse Stratégique",
          desc: "Évaluation complète de votre situation et identification des opportunités",
        },
        {
          title: "Structures Innovantes",
          desc: "Montages financiers créatifs adaptés à vos besoins spécifiques",
        },
        {
          title: "Négociation d'Expert",
          desc: "Conditions optimales grâce à des relations privilégiées",
        },
        { title: "Suivi Personnalisé", desc: "Accompagnement jusqu'à la finalisation complète" },
      ],
      en: [
        {
          title: "Strategic Analysis",
          desc: "Complete assessment of your situation and opportunity identification",
        },
        {
          title: "Innovative Structures",
          desc: "Creative financial arrangements tailored to your specific needs",
        },
        {
          title: "Expert Negotiation",
          desc: "Optimal conditions through privileged relationships",
        },
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

  // --- Bio Serujan ---
  bio: {
    label: { fr: "Qui est Serujan", en: "Who is Serujan" },
    titleLead: { fr: "Bâtisseur d'une", en: "Building a" },
    titleEmphasis: { fr: "communauté", en: "community" },
    titleTail: { fr: "de courtiers d'élite.", en: "of elite brokers." },
    intro: {
      fr: "Diplômé de Concordia (B. Adm.) et certifié par le Collège de l'immobilier du Québec, Serujan Kaneshalingam dirige la Division Alternative chez Planiprêt. En cinq ans, il a accompagné plus de 500 courtiers et fondé Elev8 — l'événement de référence en investissement immobilier au Québec.",
      en: "Concordia BBA graduate and certified by the Collège de l'immobilier du Québec, Serujan Kaneshalingam leads the Alternative Division at Planiprêt. In five years, he has mentored over 500 brokers and founded Elev8 — Quebec's benchmark event in real estate investing.",
    },
    quote: {
      fr: "Je ne vends pas une hypothèque. Je structure une opportunité que personne d'autre ne sait monter.",
      en: "I don't sell mortgages. I structure opportunities others can't even build.",
    },
    quoteAttribution: { fr: "— Serujan Kaneshalingam", en: "— Serujan Kaneshalingam" },
    milestones: {
      fr: [
        {
          metric: "500+",
          label: "Courtiers accompagnés",
          desc: "Mentorat sur 5 ans en banque privée et investissement immobilier",
        },
        {
          metric: "900+",
          label: "Participants Elev8",
          desc: "Salle remplie à la première édition de l'événement fondateur",
        },
        {
          metric: "Top 1%",
          label: "Prêts alternatifs Québec",
          desc: "Référence reconnue en financement privé et solutions hors banque",
        },
        {
          metric: "Podcast",
          label: "Les courtiers du Québec",
          desc: "Plateforme d'interviews des leaders du courtage et de l'immobilier",
        },
      ],
      en: [
        {
          metric: "500+",
          label: "Brokers mentored",
          desc: "Five years of mentorship in private banking and real estate investing",
        },
        {
          metric: "900+",
          label: "Elev8 attendees",
          desc: "Sold-out venue at the inaugural edition of the founding event",
        },
        {
          metric: "Top 1%",
          label: "Quebec alternative lending",
          desc: "Recognized authority in private financing and out-of-bank solutions",
        },
        {
          metric: "Podcast",
          label: "Les courtiers du Québec",
          desc: "Interview platform with the leaders of brokerage and real estate",
        },
      ],
    },
    credentials: {
      fr: [
        "B. Adm., Université Concordia",
        "Courtier hypothécaire — Collège de l'immobilier du Québec",
        "Directeur · Division Alternative · Planiprêt",
        "Fondateur · Elev8 Event & Elev8 Academy",
        "Animateur · Podcast Les courtiers du Québec",
      ],
      en: [
        "BBA, Concordia University",
        "Mortgage Broker — Collège de l'immobilier du Québec",
        "Director · Alternative Division · Planiprêt",
        "Founder · Elev8 Event & Elev8 Academy",
        "Host · Les courtiers du Québec Podcast",
      ],
    },
    cta: { fr: "Travailler avec Serujan", en: "Work with Serujan" },
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
    includingTaxInsurance: {
      fr: "Incluant taxes et assurance",
      en: "Including taxes and insurance",
    },
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
    error: {
      fr: "Erreur lors de l'envoi. Veuillez réessayer.",
      en: "Error sending. Please try again.",
    },
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

  // --- Pages légales ---
  legal: {
    backToHome: { fr: "Retour à l'accueil", en: "Back to home" },
    lastUpdate: { fr: "Dernière mise à jour", en: "Last update" },
    mentions: {
      title: { fr: "Mentions légales", en: "Legal notice" },
      eyebrow: { fr: "Information légale", en: "Legal information" },
      sections: {
        fr: [
          {
            heading: "Éditeur du site",
            body: "Ce site est édité par Serujan Kaneshalingam, courtier hypothécaire commercial à Montréal, exerçant en tant que représentant indépendant.\n\nAdresse : 111 Rue Chabanel O, Suite 617, Montréal, QC, Canada\nTéléphone : (514) 701-6171\nCourriel : expert@serujan.com",
          },
          {
            heading: "Hébergement",
            body: "Le site est hébergé par Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, États-Unis. L'infrastructure utilise les services Cloudflare Workers et Cloudflare D1 (base de données serverless).",
          },
          {
            heading: "Propriété intellectuelle",
            body: "L'ensemble du contenu présent sur ce site — textes, images, logos, mise en page et structure — est protégé par le droit d'auteur. Toute reproduction, distribution, modification ou adaptation sans autorisation écrite préalable est strictement interdite.",
          },
          {
            heading: "Limitation de responsabilité",
            body: "Les informations communiquées sur ce site sont à titre indicatif. Les estimations issues de la calculatrice hypothécaire ne constituent pas une offre de financement. Toute décision de financement nécessite une analyse personnalisée et la signature d'un mandat formel.",
          },
          {
            heading: "Liens externes",
            body: "Ce site contient des liens vers des ressources externes (Elev8 Event, Elev8 Academy, réseaux sociaux). Serujan Kaneshalingam ne peut être tenu responsable du contenu de ces sites tiers.",
          },
          {
            heading: "Droit applicable",
            body: "Le présent site est soumis au droit québécois et canadien. Tout litige sera porté devant les tribunaux compétents de la province du Québec, district de Montréal.",
          },
        ],
        en: [
          {
            heading: "Site editor",
            body: "This site is edited by Serujan Kaneshalingam, commercial mortgage broker in Montreal, operating as an independent representative.\n\nAddress: 111 Rue Chabanel O, Suite 617, Montréal, QC, Canada\nPhone: (514) 701-6171\nEmail: expert@serujan.com",
          },
          {
            heading: "Hosting",
            body: "The site is hosted by Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, USA. The infrastructure runs on Cloudflare Workers and Cloudflare D1 (serverless database).",
          },
          {
            heading: "Intellectual property",
            body: "All content on this site — texts, images, logos, layout and structure — is protected by copyright. Any reproduction, distribution, modification or adaptation without prior written authorization is strictly forbidden.",
          },
          {
            heading: "Liability limitation",
            body: "Information shared on this site is indicative. Estimates from the mortgage calculator do not constitute a financing offer. Any financing decision requires a personalized analysis and the signing of a formal mandate.",
          },
          {
            heading: "External links",
            body: "This site contains links to external resources (Elev8 Event, Elev8 Academy, social networks). Serujan Kaneshalingam cannot be held responsible for the content of these third-party sites.",
          },
          {
            heading: "Applicable law",
            body: "This site is subject to Quebec and Canadian law. Any dispute shall be brought before the competent courts of the Province of Quebec, district of Montreal.",
          },
        ],
      },
    },
    privacy: {
      title: { fr: "Politique de confidentialité", en: "Privacy policy" },
      eyebrow: { fr: "Vos données, vos droits", en: "Your data, your rights" },
      sections: {
        fr: [
          {
            heading: "Données collectées",
            body: "Nous collectons uniquement les informations que vous fournissez volontairement via le formulaire de contact : nom, courriel, téléphone, type de projet, montant estimé et message. Aucune donnée bancaire n'est collectée sur ce site.",
          },
          {
            heading: "Utilisation des données",
            body: "Vos données servent exclusivement à : (1) répondre à votre demande de consultation, (2) vous transmettre des informations relatives à votre projet de financement commercial, (3) améliorer notre service. Elles ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales.",
          },
          {
            heading: "Conservation",
            body: "Vos données sont conservées tant que vous restez en contact actif avec Serujan Kaneshalingam, ou pendant une durée maximale de 5 ans après le dernier échange. Vous pouvez demander leur suppression à tout moment.",
          },
          {
            heading: "Sécurité",
            body: "Les données sont stockées sur Cloudflare D1 (base SQL chiffrée au repos) avec accès restreint par authentification. Le site applique une politique de sécurité de contenu (CSP) stricte, le protocole HTTPS partout, et un rate-limiting automatique des soumissions.",
          },
          {
            heading: "Cookies et analytics",
            body: "Le site utilise un cookie technique pour mémoriser votre choix de langue. Si Google Analytics 4 est activé, il dépose des cookies anonymisés à des fins statistiques (pas de tracking publicitaire). Vous pouvez les bloquer via votre navigateur.",
          },
          {
            heading: "Vos droits",
            body: "Conformément à la Loi 25 du Québec, vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données. Pour exercer ces droits : expert@serujan.com",
          },
        ],
        en: [
          {
            heading: "Data collected",
            body: "We collect only the information you voluntarily provide through the contact form: name, email, phone, project type, estimated amount and message. No banking data is collected on this site.",
          },
          {
            heading: "Use of data",
            body: "Your data is used exclusively to: (1) respond to your consultation request, (2) provide information related to your commercial financing project, (3) improve our service. It is never sold, rented or shared with third parties for commercial purposes.",
          },
          {
            heading: "Retention",
            body: "Your data is kept as long as you remain in active contact with Serujan Kaneshalingam, or for a maximum of 5 years after the last exchange. You can request its deletion at any time.",
          },
          {
            heading: "Security",
            body: "Data is stored on Cloudflare D1 (SQL database encrypted at rest) with access restricted by authentication. The site enforces a strict Content Security Policy (CSP), HTTPS everywhere, and automatic rate-limiting on submissions.",
          },
          {
            heading: "Cookies and analytics",
            body: "The site uses a technical cookie to remember your language preference. If Google Analytics 4 is enabled, it sets anonymized cookies for statistical purposes (no advertising tracking). You can block them via your browser.",
          },
          {
            heading: "Your rights",
            body: "Under Quebec's Law 25, you have the right to access, rectify, port and delete your data. To exercise these rights: expert@serujan.com",
          },
        ],
      },
    },
  },

  // --- Page Merci ---
  merci: {
    badge: { fr: "Demande reçue", en: "Request received" },
    title: { fr: "Merci pour votre", en: "Thank you for your" },
    titleEmphasis: { fr: "confiance.", en: "trust." },
    description: {
      fr: "Votre demande a bien été enregistrée. Serujan vous contactera personnellement dans les 24 prochaines heures (heures d'ouverture) pour discuter de votre projet.",
      en: "Your request has been recorded. Serujan will personally contact you within the next 24 hours (business hours) to discuss your project.",
    },
    callLabel: { fr: "Appeler", en: "Call" },
    emailLabel: { fr: "Courriel", en: "Email" },
    followText: {
      fr: "En attendant, suivez Serujan sur Instagram pour des insights exclusifs",
      en: "In the meantime, follow Serujan on Instagram for exclusive insights",
    },
    backHome: { fr: "Retour à l'accueil", en: "Back to home" },
  },

  // --- LendersNetwork (réseau de prêteurs institutionnels) ---
  lendersNetwork: {
    label: { fr: "Réseau institutionnel", en: "Institutional network" },
    titleLead: { fr: "L'accès qui", en: "The access that" },
    titleEmphasis: { fr: "fait la différence.", en: "makes the difference." },
    subtitle: {
      fr: "Plus de 40 prêteurs institutionnels et privés négociés au Québec et au Canada. Banques, caisses, fonds de pension, capital privé : chaque mandat est présenté au prêteur le mieux placé sur le marché.",
      en: "Over 40 institutional and private lenders negotiated across Quebec and Canada. Banks, credit unions, pension funds, private capital: every mandate is presented to the best-placed lender on the market.",
    },
    disclaimer: {
      fr: "Liste représentative — relations négociées au cas par cas selon le profil du dossier.",
      en: "Representative list — relationships negotiated case-by-case according to file profile.",
    },
  },

  // --- FAQ (objections finales avant conversion) ---
  faq: {
    label: { fr: "Questions fréquentes", en: "Frequently asked" },
    titleLead: { fr: "Tout ce que vous", en: "Everything you" },
    titleEmphasis: { fr: "devez savoir.", en: "need to know." },
    subtitle: {
      fr: "Les questions que les promoteurs et investisseurs nous posent en premier — réponses directes, sans détour.",
      en: "The questions developers and investors ask us first — direct answers, no detour.",
    },
    items: {
      fr: [
        {
          q: "Quels prêteurs négociez-vous ?",
          a: "Plus de 40 institutions et fonds privés au Québec et au Canada — grandes banques, caisses, prêteurs alternatifs, fonds de pension, capital privé. Chaque dossier est présenté au prêteur qui maximise vos conditions, en mettant les acteurs en concurrence quand c'est pertinent.",
        },
        {
          q: "Quels sont les délais d'approbation typiques ?",
          a: "30 jours en moyenne pour un dossier complet d'acquisition ou de refinancement. 14 à 21 jours possible sur les dossiers simples avec garanties solides. Les projets de construction et développement exigent 60 à 90 jours selon la complexité du montage.",
        },
        {
          q: "Quels types de projets traitez-vous ?",
          a: "Acquisitions multifamiliales (10+ unités), refinancements de portefeuilles, financement de construction et de développement, restructurations, sorties de financement-relais. Mandats typiques de 1 M$ à 100 M$+, secteur résidentiel locatif, commercial, industriel et mixte.",
        },
        {
          q: "Quels sont vos honoraires ?",
          a: "Aucun frais d'analyse préliminaire ni d'étude. Nos honoraires sont généralement payés par le prêteur à la conclusion du financement, ou inclus dans les frais de transaction selon la nature du mandat. Toute structure d'honoraires est définie et signée avant que les démarches ne commencent.",
        },
        {
          q: "Comment garantissez-vous la confidentialité ?",
          a: "Engagement de confidentialité (NDA) systématique avant tout partage de documents financiers. Vos états financiers et plans d'affaires ne sont jamais transmis à un prêteur sans votre autorisation explicite, dossier par dossier. Données stockées au Canada, conformes Loi 25.",
        },
        {
          q: "En quoi êtes-vous différent d'une banque directe ?",
          a: "Une banque vous propose ses produits. Nous structurons votre dossier pour le présenter au prêteur le mieux placé sur le marché — souvent à des conditions inaccessibles en guichet direct. La mise en concurrence et l'expertise du montage font la différence sur le taux, le LTV, et les covenants.",
        },
      ],
      en: [
        {
          q: "Which lenders do you negotiate with?",
          a: "Over 40 institutions and private funds across Quebec and Canada — major banks, credit unions, alternative lenders, pension funds, private capital. Every file is presented to the lender that maximizes your terms, with competitive bidding when relevant.",
        },
        {
          q: "What are typical approval timelines?",
          a: "30 days on average for a complete acquisition or refinancing file. 14 to 21 days possible on simple files with strong collateral. Construction and development projects require 60 to 90 days depending on structuring complexity.",
        },
        {
          q: "What types of projects do you handle?",
          a: "Multifamily acquisitions (10+ units), portfolio refinancings, construction and development financing, restructurings, bridge-loan exits. Typical mandates from $1M to $100M+, across multi-residential, commercial, industrial and mixed-use sectors.",
        },
        {
          q: "What are your fees?",
          a: "No preliminary analysis or review fee. Our fees are generally paid by the lender upon closing, or included in transaction fees depending on the mandate. Any fee structure is defined and signed before work begins — no surprises.",
        },
        {
          q: "How do you guarantee confidentiality?",
          a: "Systematic NDA before any sharing of financial documents. Your financial statements and business plans are never transmitted to a lender without your explicit authorization, file by file. Data stored in Canada, Quebec Law 25 compliant.",
        },
        {
          q: "How are you different from going to a bank directly?",
          a: "A bank offers you its products. We structure your file to present it to the best-placed lender on the market — often at terms inaccessible at the branch. Competitive bidding and structuring expertise make the difference on rate, LTV, and covenants.",
        },
      ],
    },
    expand: { fr: "Voir la réponse", en: "See answer" },
    collapse: { fr: "Fermer", en: "Collapse" },
    cta: { fr: "Une autre question ? Parlons-en", en: "Another question? Let's talk" },
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
