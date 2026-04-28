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
    title: { fr: "Achetez. Vendez. Sans stress.", en: "Buy. Sell. Stress-free." },
    phrases: {
      fr: ["Sans mauvaise surprise.", "Sans pression.", "De A à Z."],
      en: ["No bad surprises.", "No pressure.", "From A to Z."],
    },
    description: {
      fr: "Je sais exactement ce qui vous empêche de dormir la nuit. La peur de payer trop cher. La peur du vice caché. L'incertitude face à vos finances.",
      en: "I know exactly what keeps you up at night. The fear of overpaying. The fear of hidden defects. The uncertainty about your finances.",
    },
    descriptionBold: {
      fr: "est votre stratège implacable — de A à Z.",
      en: "is your relentless strategist — from A to Z.",
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
    learnMore: { fr: "Me contacter", en: "Contact me" },
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
    cta: { fr: "Analyser ce scénario avec Mathis", en: "Analyze this scenario with Mathis" },
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
    trustText: { fr: "en moins de 2h. Vos informations restent confidentielles.", en: "within 2 hours. Your information remains confidential." },
    trustBold: { fr: "Réponse personnelle de", en: "Personal response from" },
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

  // --- About ---
  about: {
    label: { fr: "À propos", en: "About" },
    title: { fr: "Un courtier immobilier à Gatineau qui comprend vos enjeux.", en: "A Gatineau real estate broker who understands your challenges." },
    desc1: {
      fr: "Mathis Guimont est <strong>courtier immobilier résidentiel à Gatineau</strong>, spécialisé pour les premiers acheteurs et les investisseurs. Avec une expertise marquée en marketing immobilier, il vous offre une visibilité maximale pour <strong>vendre à Gatineau</strong> et un accompagnement stratégique pour <strong>acheter à Gatineau</strong>.",
      en: "Mathis Guimont is a <strong>residential real estate broker in Gatineau</strong>, specialized for first-time buyers and investors. With strong expertise in real estate marketing, he offers maximum visibility to <strong>sell in Gatineau</strong> and strategic guidance to <strong>buy in Gatineau</strong>.",
    },
    desc2: {
      fr: "Évaluation de maison à Gatineau, recherche ciblée, négociation experte — son approche repose sur des conseils clairs, une écoute attentive et une stratégie adaptée à votre projet, que ce soit votre première propriété, un condo ou votre prochain investissement locatif dans l'Outaouais.",
      en: "Home evaluation in Gatineau, targeted search, expert negotiation — his approach relies on clear advice, attentive listening, and a strategy tailored to your project, whether it's your first property, a condo, or your next rental investment in the Outaouais.",
    },
    points: {
      fr: ["Une transaction de A à Z — vous n'avez qu'un seul interlocuteur", "Négociation agressive en votre faveur — pas juste ouvrir des portes", "Vos intérêts passent avant les miens — toujours", "Un investissement dont vous serez fier dans 10 ans"],
      en: ["A-to-Z transaction — you have a single point of contact", "Aggressive negotiation in your favor — not just opening doors", "Your interests come before mine — always", "An investment you'll be proud of in 10 years"],
    },
    values: {
      fr: [{ label: "Famille" }, { label: "Transparence" }, { label: "Efficacité" }],
      en: [{ label: "Family" }, { label: "Transparency" }, { label: "Efficiency" }],
    },
    tags: {
      fr: ["Connaissance du marché", "Expert Marketing", "Disponible 7j/7"],
      en: ["Market knowledge", "Marketing Expert", "Available 7/7"],
    },
    badge: { fr: "Nouvelle\ngénération", en: "New\ngeneration" },
    badgeDesc: { fr: "L'énergie et les stratégies d'aujourd'hui au service de vos projets.", en: "Today's energy and strategies at the service of your projects." },
    office: { fr: "Bureau", en: "Office" },
  },

  // --- Fears (cards) ---
  fearsCards: {
    fr: [
      { title: "Peur d'être jugé pour votre choix", text: "Votre famille va avoir des opinions. Mon travail c'est de vous donner les arguments pour défendre votre choix avec des chiffres." },
      { title: "Peur du vice caché qui ruine tout", text: "C'est pour ça qu'on ne signe rien sans inspection rigoureuse. J'ai un réseau d'experts qui protège votre investissement à chaque étape." },
      { title: "Peur de ne pas être prêt financièrement", text: "Avant de signer quoi que ce soit, on va ensemble dans les chiffres complets. Pas de mauvaise surprise. Jamais." },
    ],
    en: [
      { title: "Fear of being judged for your choice", text: "Your family will have opinions. My job is to give you the arguments to defend your choice with numbers." },
      { title: "Fear of hidden defects ruining everything", text: "That's why we don't sign anything without a rigorous inspection. I have a network of experts protecting your investment at every step." },
      { title: "Fear of not being financially ready", text: "Before signing anything, we'll go through the complete numbers together. No bad surprises. Ever." },
    ],
  },
  fearsSubtitle: {
    fr: "Acheter sa première propriété est angoissant. C'est normal. Ne laissez pas la peur dicter vos décisions.",
    en: "Buying your first property is stressful. That's normal. Don't let fear dictate your decisions.",
  },

  // --- Triggers (cards) ---
  triggersCards: {
    fr: [
      { title: "Bébé en route ou enfant en bas âge", text: "L'appartement devient trop petit. Vous avez besoin d'espace, d'une cour, et vite." },
      { title: "Je paye 1 800$/mois pour engraisser quelqu'un d'autre", text: "Votre loyer augmente chaque année, mais votre capital n'avance pas d'un pouce." },
      { title: "Si eux ont pu le faire, on peut surement le faire", text: "Vos amis achètent. Vous avez de bons emplois. C'est votre tour de bâtir votre patrimoine." },
      { title: "On est enfin stabilisés — c'est le bon moment", text: "Fini les études, jobs stables, économies de côté. Vous êtes prêts pour la prochaine étape." },
    ],
    en: [
      { title: "Baby on the way or toddler at home", text: "The apartment is getting too small. You need space, a yard, and fast." },
      { title: "I'm paying $1,800/month to pad someone else's pockets", text: "Your rent goes up every year, but your equity hasn't moved an inch." },
      { title: "If they could do it, we surely can too", text: "Your friends are buying. You have good jobs. It's your turn to build wealth." },
      { title: "We're finally settled — this is the right time", text: "Done with school, stable jobs, savings set aside. You're ready for the next step." },
    ],
  },
  triggersSubtitle: {
    fr: "La majorité de mes clients se trouvent dans l'une de ces 4 situations quand ils me contactent pour la première fois.",
    en: "Most of my clients find themselves in one of these 4 situations when they first contact me.",
  },

  // --- Enemy ---
  enemy: {
    label: { fr: "L'ennemi commun", en: "The common enemy" },
    line1: { fr: "Pas un intermédiaire passif. Pas un ouvreur de portes.", en: "Not a passive middleman. Not a door opener." },
    line2: { fr: "Un accompagnateur de A à Z, disponible, objectif, qui met vos intérêts avant les siens —", en: "An A-to-Z guide, available, objective, who puts your interests first —" },
    accent: { fr: "et qui vous prépare à défendre votre choix même face à la tante Carole du dimanche.", en: "and who prepares you to defend your choice even against Aunt Carol at Sunday dinner." },
  },

  // --- Pillars ---
  pillars: {
    title: { fr: "4 Piliers de mon service", en: "4 Pillars of my service" },
    subtitle: { fr: "Mon approche est structurée pour vous offrir le maximum de protection et de résultats, sans compromis.", en: "My approach is structured to offer you maximum protection and results, no compromises." },
    items: {
      fr: [
        { title: "Service de A à Z", text: "Je coordonne inspecteur, notaire, courtier hypothécaire et évaluateur." },
        { title: "Négociation agressive en votre faveur", text: "Je me bats pour le meilleur prix possible." },
        { title: "Éducation avant la transaction", text: "Vous comprendrez ce que vous achetez avant de signer." },
        { title: "Ancrage communautaire Gatineau", text: "Je connais chaque quartier, chaque rue, chaque dynamique locale." },
      ],
      en: [
        { title: "A-to-Z Service", text: "I coordinate inspector, notary, mortgage broker, and appraiser." },
        { title: "Aggressive negotiation in your favor", text: "I fight for the best possible price." },
        { title: "Education before the transaction", text: "You'll understand what you're buying before signing." },
        { title: "Gatineau community roots", text: "I know every neighborhood, every street, every local dynamic." },
      ],
    },
  },

  // --- Process ---
  process: {
    label: { fr: "Le processus", en: "The process" },
    title: { fr: "5 étapes vers votre propriété.", en: "5 steps to your property." },
    steps: {
      fr: [
        { title: "L'Audit Stratégique", desc: "On s'assoit, on regarde vos vrais chiffres sans jugement et on bâtit une stratégie blindée." },
        { title: "Radar Exclusif", desc: "Accès aux propriétés hors-marché et alertes avant qu'elles soient saturées d'offres." },
        { title: "Rigueur Juridique", desc: "J'épluche les déclarations, je détecte les vices cachés et je négocie férocement le prix." },
        { title: "Transaction Blindée", desc: "Inspection, financement, notaire — vous sortez avec zéro stress, 100% protégé." },
        { title: "Les Clés", desc: "Signature chez le notaire. Vous recevez les clés de votre nouvelle propriété." },
      ],
      en: [
        { title: "Strategic Audit", desc: "We sit down, look at your real numbers without judgment and build a bulletproof strategy." },
        { title: "Exclusive Radar", desc: "Access to off-market properties and alerts before they're flooded with overbidding offers." },
        { title: "Legal Rigor", desc: "I scrutinize declarations, detect hidden defects and fiercely negotiate the price." },
        { title: "Secured Transaction", desc: "Inspection, financing, notary — you come out with zero stress, 100% protected." },
        { title: "The Keys", desc: "Signing at the notary. You receive the keys to your new property." },
      ],
    },
  },

  // --- Manifesto ---
  manifesto: {
    fr: [
      { num: "01", title: "URGENCE", desc: "Le marché bouge vite. Les bonnes occasions ne reviennent pas. Agir maintenant, c'est sécuriser votre avenir." },
      { num: "02", title: "RÉBELLION", desc: "Refuser les compromis. Casser les règles dépassées de l'immobilier traditionnel. Vous méritez mieux que le statu quo." },
      { num: "03", title: "FACILITÉ", desc: "Un processus clair, des étapes simples, un courtier qui répond. L'achat d'une maison ne devrait jamais être un casse-tête." },
    ],
    en: [
      { num: "01", title: "URGENCY", desc: "The market moves fast. Good opportunities don't come back. Acting now means securing your future." },
      { num: "02", title: "REBELLION", desc: "Refuse compromises. Break the outdated rules of traditional real estate. You deserve better than the status quo." },
      { num: "03", title: "EASE", desc: "A clear process, simple steps, a broker who answers. Buying a home should never be a headache." },
    ],
  },

  // --- Testimonials ---
  testimonials: {
    label: { fr: "Témoignages", en: "Testimonials" },
    title: { fr: "Ils ont fait confiance à Mathis.", en: "They trusted Mathis." },
    subtitle: { fr: "Plus de 50 avis 5 étoiles de premiers acheteurs, vendeurs et investisseurs de l'Outaouais.", en: "Over 50 five-star reviews from first-time buyers, sellers, and investors in the Outaouais." },
    googleBadge: { fr: "50+ avis 5 étoiles Google", en: "50+ Google 5-star reviews" },
    verify: { fr: "Vérifiez par vous-même", en: "See for yourself" },
    recentLabel: { fr: "Vendu récemment", en: "Recently sold" },
    recentTitle: { fr: "Des résultats concrets dans l'Outaouais.", en: "Real results in the Outaouais." },
    sold: { fr: "Vendu", en: "Sold" },
    soldIn: { fr: "Vendu en", en: "Sold in" },
    days: { fr: "jours", en: "days" },
    cards: {
      fr: [
        { name: "Sarah & Marc Tremblay", quartier: "Premier achat · Aylmer", text: "Mathis nous a accompagnés du début à la fin pour notre première maison. Patient, à l'écoute et toujours disponible — il a vraiment rendu le processus sans stress comme promis !" },
        { name: "Karine Lavoie", quartier: "Vente d'un condo · Hull", text: "Vendu en 11 jours au-dessus du prix demandé. Sa stratégie marketing et ses photos professionnelles ont fait toute la différence. Un courtier qui livre." },
        { name: "David Bouchard", quartier: "Investisseur · Gatineau", text: "J'ai acheté 2 plex avec Mathis cette année. Son analyse des chiffres et sa connaissance du marché locatif de l'Outaouais sont impressionnantes. Recommandé à 100 %." },
        { name: "Émilie Roy", quartier: "Premier achat · Buckingham", text: "Comme première acheteuse, j'avais 1000 questions. Mathis a pris le temps de tout m'expliquer sans jargon. Je me suis sentie en confiance à chaque étape." },
        { name: "Patrick & Julie Gagnon", quartier: "Maison familiale · Aylmer", text: "Service exceptionnel. Mathis a négocié une réduction de 15 000 $ sur le prix d'achat et trouvé des défauts cachés à l'inspection. Mieux qu'on espérait !" },
      ],
      en: [
        { name: "Sarah & Marc Tremblay", quartier: "First purchase · Aylmer", text: "Mathis guided us from start to finish for our first home. Patient, attentive, and always available — he truly made the process stress-free as promised!" },
        { name: "Karine Lavoie", quartier: "Condo sale · Hull", text: "Sold in 11 days above asking price. His marketing strategy and professional photos made all the difference. A broker who delivers." },
        { name: "David Bouchard", quartier: "Investor · Gatineau", text: "I bought 2 plexes with Mathis this year. His number crunching and knowledge of the Outaouais rental market are impressive. 100% recommended." },
        { name: "Émilie Roy", quartier: "First purchase · Buckingham", text: "As a first-time buyer, I had 1000 questions. Mathis took the time to explain everything without jargon. I felt confident at every step." },
        { name: "Patrick & Julie Gagnon", quartier: "Family home · Aylmer", text: "Exceptional service. Mathis negotiated a $15,000 reduction on the purchase price and found hidden defects during inspection. Better than we hoped!" },
      ],
    },
    recentSales: {
      fr: [
        { quartier: "Hull", type: "Condo 2 ch.", prix: "385 000 $", delai: "11 jours" },
        { quartier: "Aylmer", type: "Maison unifamiliale", prix: "542 000 $", delai: "18 jours" },
        { quartier: "Gatineau", type: "Plex (3 logements)", prix: "725 000 $", delai: "9 jours" },
        { quartier: "Buckingham", type: "Bungalow rénové", prix: "415 000 $", delai: "14 jours" },
      ],
      en: [
        { quartier: "Hull", type: "2-bed condo", prix: "$385,000", delai: "11 days" },
        { quartier: "Aylmer", type: "Single family", prix: "$542,000", delai: "18 days" },
        { quartier: "Gatineau", type: "Plex (3 units)", prix: "$725,000", delai: "9 days" },
        { quartier: "Buckingham", type: "Renovated bungalow", prix: "$415,000", delai: "14 days" },
      ],
    },
  },

  // --- MarketStats ---
  marketStats: {
    title: { fr: "Le marché de Gatineau en chiffres", en: "The Gatineau market in numbers" },
    dataLabel: { fr: "Données 2024 — Aylmer · Hull · Gatineau · Buckingham · Masson-Angers · Cantley", en: "2024 Data — Aylmer · Hull · Gatineau · Buckingham · Masson-Angers · Cantley" },
    items: {
      fr: [
        { label: "Transactions annuelles Gatineau", value: "8 500" },
        { label: "Prix médian maison", value: "372 000$" },
        { label: "Hausse annuelle", value: "+5.8%" },
        { label: "Délai médian", value: "24 jours" },
        { label: "Offres multiples", value: "28%" },
      ],
      en: [
        { label: "Annual transactions Gatineau", value: "8,500" },
        { label: "Median house price", value: "$372,000" },
        { label: "Annual increase", value: "+5.8%" },
        { label: "Median days on market", value: "24 days" },
        { label: "Multiple offers", value: "28%" },
      ],
    },
  },

  // --- InstagramReels ---
  instagram: {
    title: { fr: "Dans les tranchées de l'immobilier.", en: "In the trenches of real estate." },
    subtitle: { fr: "Conseils, analyses de marché et coulisses de l'immobilier en Outaouais.", en: "Tips, market analysis, and behind-the-scenes of Outaouais real estate." },
    cta: { fr: "Voir tous mes Reels", en: "See all my Reels" },
    reels: {
      fr: [
        { caption: "3 erreurs fatales lors de la première visite 🏠❌" },
        { caption: "Le marché à Gatineau ce mois-ci : ce qu'il faut savoir 📊" },
        { caption: "Pourquoi l'inspection pré-achat est non négociable 🔍" },
      ],
      en: [
        { caption: "3 fatal mistakes during the first visit 🏠❌" },
        { caption: "Gatineau market this month: what you need to know 📊" },
        { caption: "Why the pre-purchase inspection is non-negotiable 🔍" },
      ],
    },
  },

  // --- Team ---
  team: {
    label: { fr: "Notre Équipe", en: "Our Team" },
    title: { fr: "Des experts dédiés à votre succès.", en: "Experts dedicated to your success." },
    subtitle: { fr: "Une expertise pointue combinée à une approche humaine pour vous accompagner à chaque étape.", en: "Sharp expertise combined with a human approach to guide you at every step." },
    role: { fr: "Courtier immobilier résidentiel", en: "Residential real estate broker" },
    bio: { fr: "Passionné par l'immobilier et dévoué à la réussite de vos projets, je mets mon expertise du marché de l'Outaouais à votre service. Mon objectif : rendre votre transaction aussi simple, transparente et profitable que possible.", en: "Passionate about real estate and dedicated to the success of your projects, I put my expertise of the Outaouais market at your service. My goal: make your transaction as simple, transparent, and profitable as possible." },
    feature1Title: { fr: "Accompagnement personnalisé", en: "Personalized guidance" },
    feature1Desc: { fr: "De la première visite à la signature chez le notaire, je suis à vos côtés.", en: "From the first visit to the notary signing, I'm by your side." },
    feature2Title: { fr: "Soutien d'une équipe performante", en: "Support from a high-performing team" },
    feature2Desc: { fr: "Je vous fais bénéficier d'un réseau étendu et d'une force de frappe exceptionnelle.", en: "I give you access to an extensive network and exceptional firepower." },
    cta: { fr: "Parler avec Mathis", en: "Talk to Mathis" },
  },

  // --- Footer ---
  footer: {
    desc: { fr: "Mathis Guimont · Courtier immobilier résidentiel en Outaouais. Spécialisé pour les premiers acheteurs et investisseurs.", en: "Mathis Guimont · Residential real estate broker in Outaouais. Specialized for first-time buyers and investors." },
    contact: { fr: "Contact", en: "Contact" },
    followMe: { fr: "Suivez-moi", en: "Follow me" },
    available: { fr: "Disponible 7j/7 pour répondre à vos questions.", en: "Available 7/7 to answer your questions." },
    copyright: { fr: "Mathis Guimont · Courtier immobilier résidentiel", en: "Mathis Guimont · Residential real estate broker" },
    madeIn: { fr: "Conçu avec passion à Gatineau", en: "Crafted with passion in Gatineau" },
  },

  // --- StatsBar ---
  statsBar: {
    fr: [
      { suffix: "+", label: "avis 5 étoiles" },
      { suffix: "+", label: "clients accompagnés" },
      { label: "Outaouais", suffix: "" },
      { suffix: "j/7", label: "disponible" },
    ],
    en: [
      { suffix: "+", label: "5-star reviews" },
      { suffix: "+", label: "clients served" },
      { label: "Outaouais", suffix: "" },
      { suffix: "/7", label: "available" },
    ],
  },

  // --- FAQ (questions/réponses) ---
  faqItems: {
    fr: [
      { q: "Travaillez-vous avec les premiers acheteurs ?", a: "Oui — c'est même ma spécialité. J'accompagne les premiers acheteurs à Gatineau à chaque étape : pré-approbation hypothécaire, recherche, visites, négociation, inspection et signature. Mon objectif : vous offrir la transaction sans stress, sans mauvaise surprise." },
      { q: "Travaillez-vous avec les investisseurs immobiliers ?", a: "Absolument. J'aide les investisseurs à identifier des propriétés rentables dans l'Outaouais — analyse de cashflow, potentiel locatif, plex et unifamiliales. Que ce soit votre premier investissement ou votre dixième, on bâtit une stratégie alignée sur vos objectifs de patrimoine." },
      { q: "Vendez-vous des condos à Gatineau ?", a: "Oui, je vends et j'aide à acheter des condos partout en Outaouais. Je connais bien les particularités du marché des copropriétés : fonds de prévoyance, déclaration de copropriété, frais de condo — on examine tout ensemble avant de signer." },
    ],
    en: [
      { q: "Do you work with first-time buyers?", a: "Yes — it's actually my specialty. I guide first-time buyers in Gatineau through every step: mortgage pre-approval, search, visits, negotiation, inspection, and signing. My goal: a stress-free transaction with no bad surprises." },
      { q: "Do you work with real estate investors?", a: "Absolutely. I help investors identify profitable properties in the Outaouais — cashflow analysis, rental potential, plexes and single-family homes. Whether it's your first or tenth investment, we build a strategy aligned with your wealth goals." },
      { q: "Do you sell condos in Gatineau?", a: "Yes, I sell and help buy condos throughout the Outaouais. I know the condo market well: contingency fund, declaration of co-ownership, condo fees — we examine everything together before signing." },
    ],
  },

  // --- LeadMagnet ---
  leadMagnet: {
    title: { fr: "Guide Gratuit du Premier Acheteur à Gatineau", en: "Free First-Time Buyer Guide for Gatineau" },
    subtitle: { fr: "Les 5 erreurs les plus courantes, le vrai coût d'achat, et le processus étape par étape — offert gratuitement.", en: "The 5 most common mistakes, the real cost of buying, and the step-by-step process — offered free." },
    firstName: { fr: "Prénom", en: "First name" },
    firstNamePlaceholder: { fr: "Votre prénom", en: "Your first name" },
    email: { fr: "Courriel", en: "Email" },
    emailPlaceholder: { fr: "votre@courriel.com", en: "your@email.com" },
    cta: { fr: "Recevoir le guide gratuitement", en: "Receive the free guide" },
    success: { fr: "Merci ! Vérifiez votre boîte email.", en: "Thank you! Check your inbox." },
  },

  // --- WhatsApp ---
  whatsapp: {
    tooltip: { fr: "Écrivez-moi sur WhatsApp", en: "Message me on WhatsApp" },
    message: { fr: "Bonjour Mathis ! J'aimerais en savoir plus sur vos services de courtier immobilier.", en: "Hello Mathis! I'd like to learn more about your real estate brokerage services." },
  },
} as const;

// Type utilitaire pour accéder aux traductions
export type TranslationKey = keyof typeof translations;

