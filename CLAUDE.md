# CLAUDE.md — Instructions pour Claude Code

> Ce fichier est lu automatiquement par Claude Code à chaque ouverture du projet.
> Respecter ces règles à la lettre.

---

## 1. Description du projet

Ce projet est un **template de landing page haute conversion** développé par l'agence **Intralys** pour les **courtiers immobiliers au Québec**. Chaque site est une page unique de génération de leads (lead gen) optimisée pour la conversion, le SEO local et la performance mobile.

Le template actuel est celui de **Mathis Guimont**, courtier immobilier résidentiel à **Gatineau (Outaouais)**. Il sert de base pour reproduire des sites identiques pour chaque nouveau client Intralys en moins de 1 heure.

---

## 2. Stack technique

| Outil | Version | Rôle |
|---|---|---|
| **React** | 19 | UI — composants fonctionnels uniquement |
| **TypeScript** | 5.8+ | Typage strict obligatoire |
| **Vite** | 7 | Build tool et dev server |
| **TanStack Router** | 1.168+ | Routing type-safe basé sur les fichiers |
| **Tailwind CSS** | v4 | Styles utilitaires (syntaxe v4 avec `@theme inline`) |
| **Supabase** | 2.104+ | Base de données PostgreSQL + Auth + RLS |
| **Bun** | Latest | Runtime et gestionnaire de paquets |
| **Netlify** | — | Hébergement statique + Functions serverless |
| **Resend** | 6+ | Envoi d'emails transactionnels (Lead Magnet) |
| **Calendly** | Widget JS | Prise de rendez-vous en popup |
| **Zod** | 3.24+ | Validation des formulaires |

---

## 3. Standards de code

### Gestionnaire de paquets
- **Toujours utiliser `bun`**, jamais `npm` ni `yarn`.
- Installer : `bun install`
- Build : `bun run build`
- Dev : `bun run dev`

### TypeScript
- **Mode strict activé** (`"strict": true` dans `tsconfig.json`).
- Ne jamais utiliser `any` sauf en dernier recours avec un commentaire justificatif.
- Toujours typer les props des composants.

### Structure des composants
- Tous les composants de la landing page sont dans `src/components/landing/`.
- Un composant = un fichier = une section de la page.
- Les composants UI réutilisables (accordion, sonner) sont dans `src/components/ui/`.
- Les routes sont dans `src/routes/` (TanStack Router file-based).

### Conventions de nommage
- Composants : `PascalCase.tsx` (ex: `LeadForm.tsx`, `ScrollReveal.tsx`)
- Hooks : `camelCase.ts` avec préfixe `use` (ex: `useScrollReveal.ts`)
- Utilitaires : `camelCase.ts` (ex: `calendly.ts`)

### Imports
- Utiliser les alias `@/` pour tous les imports internes (configuré dans `tsconfig.json`).
- Exemple : `import { supabase } from "@/integrations/supabase/client";`

---

## 4. Standards de sécurité

### Clés API
- **JAMAIS hardcoder de clé API dans le code source.** Aucune exception.
- Toutes les clés doivent être dans `.env.local` (côté client) ou dans les variables d'environnement Netlify (côté serveur).
- Le fichier `.env.example` documente toutes les variables requises avec des valeurs placeholder.

### Variables d'environnement
| Variable | Côté | Usage |
|---|---|---|
| `VITE_SUPABASE_URL` | Client | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Client | Clé publique Supabase |
| `VITE_CALENDLY_URL` | Client | URL Calendly du courtier |
| `VITE_GA4_ID` | Client | ID Google Analytics (aussi dans `index.html`) |
| `SUPABASE_URL` | Serveur | URL Supabase pour Netlify Functions |
| `SUPABASE_ANON_KEY` | Serveur | Clé anon pour Netlify Functions |
| `SUPABASE_SERVICE_ROLE_KEY` | Serveur | Clé admin Supabase (bypasse RLS) |
| `RESEND_API_KEY` | Serveur | Clé API Resend pour l'envoi d'emails |

### Honeypot anti-spam
- Le formulaire de contact (`LeadForm.tsx`) contient un champ caché `website` invisible aux humains.
- Si un bot le remplit, la soumission est silencieusement rejetée (faux succès).

### Supabase RLS
- Row Level Security est activé sur toutes les tables.
- INSERT public autorisé (formulaires anonymes).
- SELECT réservé aux utilisateurs avec le rôle `admin` dans `user_roles`.

---

## 5. Commande de build

```bash
bun run build
```

**Cette commande DOIT passer avec 0 erreurs et 0 warnings avant tout `git push`.** C'est non négociable.

Si le build échoue :
1. Corriger les erreurs TypeScript en premier.
2. Vérifier que les imports `@/` sont corrects.
3. Vérifier que les variables d'environnement `VITE_*` existent dans `.env.local`.

---

## 6. Structure Supabase

### Table `leads`

| Colonne | Type | Nullable | Description |
|---|---|---|---|
| `id` | UUID | Non | Clé primaire, auto-générée |
| `name` | TEXT | Non | Nom complet du lead |
| `email` | TEXT | Non | Adresse courriel |
| `phone` | TEXT | Non | Numéro de téléphone |
| `message` | TEXT | Oui | Message libre ou note automatique |
| `type` | ENUM (`buy`, `sell`) | Non | Type de lead : acheteur ou vendeur |
| `budget` | TEXT | Oui | Budget (acheteur uniquement) |
| `timeline` | TEXT | Oui | Échéancier (acheteur uniquement) |
| `address` | TEXT | Oui | Adresse de la propriété (vendeur uniquement) |
| `property_type` | TEXT | Oui | Type de propriété (vendeur uniquement) |
| `created_at` | TIMESTAMPTZ | Non | Date de création, auto-générée |

### Sources d'insertion des leads
- **Formulaire de contact** (`LeadForm.tsx`) → type `buy` ou `sell`
- **Lead Magnet** (`send-guide.ts`) → type `buy`, message "Guide Gratuit..."
- **Calendly** (`calendly.ts` listener) → type `buy`, message "Rendez-vous Calendly..."

### Table `user_roles`

| Colonne | Type | Description |
|---|---|---|
| `id` | UUID | Clé primaire |
| `user_id` | UUID | Référence vers `auth.users` |
| `role` | ENUM (`admin`, `moderator`, `user`) | Rôle de l'utilisateur |
| `created_at` | TIMESTAMPTZ | Date de création |

Les migrations SQL sont dans `supabase/migrations/`.

---

## 7. Workflow de déploiement

```bash
# 1. Vérifier le build
bun run build

# 2. Commiter
git add -A
git commit -m "description concise du changement"

# 3. Pousser — Netlify déploie automatiquement
git push origin main
```

Le déploiement est géré par `netlify.toml` :
- Build command : `npm run build`
- Publish directory : `dist`
- Headers de sécurité (CSP, X-Frame-Options, etc.) configurés automatiquement
- Caching immutable sur `/assets/*`, zéro cache sur `/*.html`

---

## 8. Rappel — Documentation obligatoire

Avant **toute modification** pour un nouveau client ou une évolution du template, lire impérativement :

1. **`REPRODUCTION_CHECKLIST.md`** — Audit complet de chaque fonctionnalité + checklist pas-à-pas avec numéros de lignes exacts pour le swap client.
2. **`INTRALYS_MASTER.md`** — Documentation technique complète : stack, composants, features, sécurité, SEO, performance, déploiement.
3. **`.env.example`** — Liste de toutes les variables d'environnement requises.
4. **`README.md`** — Guide de reproduction en français en 9 étapes.

> ⚠️ Ne jamais modifier la structure du template sans mettre à jour ces 4 fichiers de documentation.

---

## 9. Règles absolues (issues de l'audit)

Ces règles sont non négociables. Elles préviennent les erreurs récurrentes identifiées lors de l'audit du template.

### Règle 1 — Jamais de `console.log` en production
- `console.error` et `console.warn` dans les blocs `catch` : ✅ accepté.
- `console.log` pour debug : ❌ **interdit**. Supprimer avant tout commit.
- Si un log de succès est nécessaire, utiliser un commentaire `// Lead saved successfully` à la place.

### Règle 2 — Supprimer les hooks et composants inutilisés avant le build
- Avant chaque `bun run build`, vérifier qu'aucun fichier dans `src/hooks/` ou `src/components/` n'est exporté sans être importé.
- Exception : `use-mobile.tsx` et `client.server.ts` sont gardés comme utilitaires prêts à l'emploi, mais ne doivent **jamais** être importés côté client sans raison.

### Règle 3 — Ne jamais importer `client.server.ts` dans du code frontend
- `src/integrations/supabase/client.server.ts` contient la **clé service_role** qui bypasse le Row Level Security.
- Ce fichier est réservé **exclusivement** aux Netlify Functions (`netlify/functions/`).
- L'importer dans un composant React ou une route **exposerait la clé admin au navigateur**. C'est une faille de sécurité critique.
- Côté client, toujours utiliser `client.ts` (qui utilise la clé anon publique).

### Règle 4 — Toujours utiliser `VITE_SUPABASE_ANON_KEY`, jamais `PUBLISHABLE_KEY`
- Le nom standardisé dans ce projet est `VITE_SUPABASE_ANON_KEY` et `SUPABASE_ANON_KEY`.
- Ne jamais utiliser `VITE_SUPABASE_PUBLISHABLE_KEY` ni `SUPABASE_PUBLISHABLE_KEY` — ces noms sont obsolètes.
- Si un outil Supabase génère du code avec `PUBLISHABLE_KEY`, le renommer immédiatement en `ANON_KEY`.

### Règle 5 — Toujours inclure les 3 variables critiques dans `.env.example`
- `VITE_CALENDLY_URL` — URL de rendez-vous du courtier.
- `RESEND_API_KEY` — Clé API pour l'envoi d'emails (Lead Magnet).
- `VITE_GA4_ID` — ID Google Analytics 4 (aussi à coller dans `index.html`).
- Si une nouvelle variable d'environnement est ajoutée au code, elle **doit** être ajoutée à `.env.example` dans le même commit.

---

## 10. Standards de contenu et UX — Directives Intralys

Ces directives définissent l'identité visuelle et le contenu standardisé pour **tous** les sites clients Intralys. Elles ne concernent pas la stack technique ni le déploiement.

### 10.1 — Toggle bilingue FR/EN dans la Navbar
- Chaque site doit inclure un **bouton de bascule FR / EN** dans la barre de navigation.
- Le français est la langue par défaut. Le toggle doit persister le choix dans `localStorage`.
- Les textes traduits sont gérés via un fichier de traduction ou des constantes inline.

### 10.2 — CTA principal : « RENCONTRE STRATÉGIQUE GRATUITE »
- Le call-to-action principal sur **tout le site** est toujours : **« RENCONTRE STRATÉGIQUE GRATUITE »**.
- Ce texte remplace tous les anciens CTA comme "Prendre rendez-vous", "Parlons-en", etc.
- Il doit apparaître dans : Hero, Navbar, MobileStickyBar, ExitIntentPopup, Deliverables.

### 10.3 — Calculatrice enrichie (taxes + assurances)
- Le calculateur hypothécaire doit inclure **3 champs supplémentaires** en plus du paiement mensuel :
  - **Taxe foncière annuelle** (montant estimé ou saisie manuelle)
  - **Assurance habitation** (montant estimé ou saisie manuelle)
  - **Ventilation mensuelle complète** : hypothèque + taxes + assurance = coût mensuel total
- Afficher les 3 composantes dans un résumé visuel clair avec barres ou camembert.

### 10.4 — Section Propriétés avec lien Centris
- Ajouter une section **« Propriétés à vendre »** (placeholder) avec :
  - Un titre comme « DÉCOUVREZ NOS PROPRIÉTÉS »
  - 3 à 6 cartes de propriétés placeholder (image, prix, adresse, chambres/salles de bain)
  - Un bouton CTA vers la page Centris du courtier : `https://www.centris.ca/fr/courtier~VOTRE-ID`
- Cette section est un aperçu visuel — les données réelles sont sur Centris.

### 10.5 — Territoire affiché : QUÉBEC | ONTARIO
- Le badge de territoire dans le Hero doit afficher : **QUÉBEC | ONTARIO** (ou la zone de service du courtier).
- Format : toujours en majuscules, séparé par un pipe `|`.
- Exemples : `GATINEAU | OTTAWA`, `OUTAOUAIS | ONTARIO`, `QUÉBEC | ONTARIO`.

### 10.6 — Section Équipe Parent (Parent Team)
- Ajouter une section dédiée à l'**équipe ou la bannière du courtier** (ex: Royal LePage, RE/MAX, Sutton).
- Contenu : logo de la bannière, nom de l'équipe, brève description, photo de groupe.
- Si le courtier est indépendant, cette section peut être remplacée par une section "Partenaires".

### 10.7 — Titres et CTAs en MAJUSCULES
- Tous les **titres de section** (`<h2>`) doivent être en `uppercase` via Tailwind (`uppercase tracking-widest`).
- Tous les **boutons CTA** doivent être en `uppercase` avec `tracking-widest` ou `tracking-wider`.
- Les sous-titres et paragraphes restent en casse normale.

### 10.8 — Section « Votre première rencontre est gratuite »
- Ajouter une section dédiée **juste avant** les formulaires de contact (`LeadForm`).
- Contenu :
  - Titre : « VOTRE PREMIÈRE RENCONTRE EST GRATUITE »
  - Sous-titre : « Sans engagement. Sans pression. On discute de votre projet. »
  - Icônes : ✅ Gratuit · ✅ Sans engagement · ✅ Confidentiel
- Objectif : réduire la friction avant le formulaire de conversion.

### 10.9 — Section Services avec 3 piliers et icônes
- La section Services doit présenter exactement **3 piliers** (pas 2, pas 4) :
  - **ACHAT** — Accompagnement complet pour l'achat de propriété
  - **VENTE** — Stratégie marketing et mise en marché
  - **INVESTISSEMENT** — Analyse de rentabilité et conseil patrimonial
- Chaque pilier a : une icône Lucide, un titre en majuscules, une description, et un CTA vers `#contact`.

> 📖 Voir `CLIENT_SWAP.md` pour la checklist d'implémentation de ces standards lors du swap client.

