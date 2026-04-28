# CLIENT_SWAP.md — Checklist d'implémentation pour nouveau client Intralys

> Ce fichier documente les **standards de contenu et UX** à implémenter lors du swap d'un site pour un nouveau client.
> Pour les instructions techniques (env vars, Supabase, déploiement), voir `REPRODUCTION_CHECKLIST.md`.

---

## Checklist des Standards Intralys

Cocher chaque item une fois implémenté pour le nouveau client :

### 1. Toggle Bilingue FR/EN
- [ ] Créer ou adapter `LanguageToggle.tsx` dans `src/components/landing/`
- [ ] Intégrer le toggle dans `Navbar.tsx` (desktop et mobile)
- [ ] Français comme langue par défaut
- [ ] Choix persisté dans `localStorage` (clé : `intralys-lang`)
- [ ] Traduire les textes principaux : Hero, CTA, Services, FAQ, Footer

### 2. CTA Principal — « RENCONTRE STRATÉGIQUE GRATUITE »
- [ ] `Hero.tsx` — Bouton CTA principal
- [ ] `Navbar.tsx` — Bouton desktop + bouton mobile
- [ ] `MobileStickyBar.tsx` — Bouton Calendly
- [ ] `ExitIntentPopup.tsx` — Bouton de conversion
- [ ] `Deliverables.tsx` — CTA de fin de section
- [ ] Texte exact : **« RENCONTRE STRATÉGIQUE GRATUITE »** (en majuscules)
- [ ] Tous les CTAs déclenchent `openCalendly()` de `src/lib/calendly.ts`

### 3. Calculatrice Hypothécaire Enrichie
- [ ] `Calculator.tsx` — Ajouter slider ou champ : **Taxe foncière annuelle**
- [ ] `Calculator.tsx` — Ajouter slider ou champ : **Assurance habitation annuelle**
- [ ] Afficher la **ventilation mensuelle** :
  - Paiement hypothécaire : X $/mois
  - Taxes foncières : X $/mois (annuel ÷ 12)
  - Assurance : X $/mois (annuel ÷ 12)
  - **TOTAL MENSUEL : X $/mois**
- [ ] Résumé visuel clair (barres de couleur ou composantes empilées)

### 4. Section Propriétés (Placeholder + Centris)
- [ ] Créer `Properties.tsx` dans `src/components/landing/`
- [ ] Titre : « DÉCOUVREZ NOS PROPRIÉTÉS » (uppercase)
- [ ] 3 à 6 cartes avec : image placeholder, prix, adresse, chambres/salles de bain
- [ ] Bouton CTA : « VOIR TOUTES LES PROPRIÉTÉS SUR CENTRIS »
- [ ] Lien Centris du courtier : `https://www.centris.ca/fr/courtier~ID-DU-COURTIER`
- [ ] Ajouter dans `index.tsx` (ordre de la page)

### 5. Territoire Hero — QUÉBEC | ONTARIO
- [ ] `Hero.tsx` — Badge de territoire affiché en majuscules
- [ ] Format : `ZONE1 | ZONE2` (pipe comme séparateur)
- [ ] Adapter selon le courtier : `GATINEAU | OTTAWA`, `OUTAOUAIS | ONTARIO`, etc.

### 6. Section Équipe Parent
- [ ] Créer `ParentTeam.tsx` dans `src/components/landing/`
- [ ] Logo de la bannière immobilière (Royal LePage, RE/MAX, Sutton, etc.)
- [ ] Nom de l'équipe + brève description
- [ ] Photo de groupe (si disponible)
- [ ] Si courtier indépendant → remplacer par section « Partenaires »
- [ ] Ajouter dans `index.tsx` (ordre de la page)

### 7. Titres et CTAs en UPPERCASE
- [ ] Tous les `<h2>` → ajouter `uppercase tracking-widest`
- [ ] Tous les boutons CTA → ajouter `uppercase tracking-widest`
- [ ] Vérifier : `Hero.tsx`, `Services.tsx`, `Process.tsx`, `Pillars.tsx`, `Faq.tsx`, `LeadForm.tsx`, `LeadMagnet.tsx`, `Testimonials.tsx`
- [ ] Sous-titres et paragraphes : casse normale (ne pas toucher)

### 8. Section « Votre Première Rencontre est Gratuite »
- [ ] Créer `FreeConsultation.tsx` dans `src/components/landing/`
- [ ] Titre : « VOTRE PREMIÈRE RENCONTRE EST GRATUITE »
- [ ] Sous-titre : « Sans engagement. Sans pression. On discute de votre projet. »
- [ ] 3 badges visuels : ✅ Gratuit · ✅ Sans engagement · ✅ Confidentiel
- [ ] Placer **juste avant** `<LeadForm />` dans `index.tsx`

### 9. Section Services — 3 Piliers
- [ ] Mettre à jour `Services.tsx` pour avoir exactement **3 piliers** :
  - **ACHAT** (icône : `Home`) — Accompagnement achat de propriété
  - **VENTE** (icône : `TrendingUp`) — Stratégie marketing et mise en marché
  - **INVESTISSEMENT** (icône : `PiggyBank`) — Analyse de rentabilité et conseil patrimonial
- [ ] Titre de chaque pilier en `uppercase tracking-widest`
- [ ] CTA de chaque pilier → lien vers `#contact`

---

## Ordre des Sections dans la Page (Référence)

L'ordre recommandé pour `src/routes/index.tsx` :

```
1.  Navbar
2.  ScrollProgressBar
3.  Hero (avec badge territoire QUÉBEC | ONTARIO)
4.  StatsBar
5.  Triggers
6.  Fears
7.  About
8.  ParentTeam ← NOUVEAU
9.  InstagramReels
10. Services (3 piliers : Achat / Vente / Investissement)
11. Pillars
12. Properties ← NOUVEAU (placeholder + Centris)
13. MarketStats
14. Calculator (enrichi : taxes + assurance)
15. Deliverables
16. Manifesto
17. Testimonials
18. Process
19. Enemy
20. LeadMagnet
21. FreeConsultation ← NOUVEAU (juste avant le formulaire)
22. LeadForm
23. Faq
24. Footer
25. WhatsAppButton
26. MobileStickyBar
27. ExitIntentPopup
```

---

## Éléments Client-Spécifiques à Fournir

Le client doit fournir ces éléments avant le démarrage :

| # | Élément | Format | Utilisé dans |
|---|---|---|---|
| 1 | Nom complet | Texte | Hero, Footer, About, SEO |
| 2 | Titre professionnel | Texte | Hero, About, Schema.org |
| 3 | Téléphone | Texte | Hero, Footer, WhatsApp, MobileStickyBar |
| 4 | Email | Texte | Footer, merci.tsx |
| 5 | Adresse bureau | Texte | Footer, About, Schema.org |
| 6 | Zone de service | Texte | Hero badge (ex: QUÉBEC \| ONTARIO) |
| 7 | URL Calendly | URL | `.env.local` → `VITE_CALENDLY_URL` |
| 8 | URL Centris | URL | Properties.tsx |
| 9 | Réseaux sociaux | URLs | Footer (Facebook, Instagram, TikTok) |
| 10 | Bannière immobilière | Texte + Logo | ParentTeam.tsx |
| 11 | Photo portrait | JPG 800×1000 | Hero, About, Team |
| 12 | Photo bannière hero | JPG 1920×1080 | Hero background |
| 13 | Logo couleur | PNG transparent | Navbar |
| 14 | Logo blanc | PNG transparent | Footer |
| 15 | Témoignages clients | 3–5 textes | Testimonials.tsx |
| 16 | Biographie | 2–3 paragraphes | About.tsx |
| 17 | Guide PDF (Lead Magnet) | PDF + URL hébergée | send-guide.ts |
| 18 | ID Google Analytics | G-XXXXXXXX | `.env.local` + index.html |

---

> ⚠️ Ce fichier doit être mis à jour chaque fois qu'un nouveau standard Intralys est ajouté. Voir aussi `CLAUDE.md` §10 et `INTRALYS_MASTER.md` §11.
