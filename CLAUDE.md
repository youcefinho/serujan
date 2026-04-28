# CLAUDE.md — Instructions pour l'IA

> Ce fichier est lu automatiquement par l'IA à chaque ouverture du projet.
> Respecter ces règles à la lettre.
> Dernière mise à jour : 2026-04-28

---

## 1. Description du projet

Ce projet est un **template de landing page haute conversion** développé par l'agence **Intralys** pour les **courtiers immobiliers au Québec**. Chaque site est une page unique de génération de leads (lead gen) optimisée pour la conversion, le SEO local et la performance mobile.

Le template sert de **référence d'architecture** (standards, sécurité, i18n, D1). Le design de chaque client est unique (créé via Lovable/Zoer), puis restructuré selon ces standards par Claude Code, et finalisé par Antigravity.

---

## 2. Stack technique

| Outil | Version | Rôle |
|---|---|---|
| **React** | 19 | UI — composants fonctionnels uniquement |
| **TypeScript** | 5.8+ | Typage strict obligatoire |
| **Vite** | 7 | Build tool et dev server |
| **TanStack Router** | 1.168+ | Routing type-safe basé sur les fichiers |
| **Tailwind CSS** | v4 | Styles utilitaires (syntaxe v4 avec `@theme inline`, couleurs `oklch`) |
| **Cloudflare Workers** | — | Worker unifié : API + assets statiques |
| **Cloudflare D1** | — | Base de données SQLite serverless (table `leads`) |
| **Resend** | 6+ | Envoi d'emails transactionnels (Lead Magnet) |
| **Bun** | Latest | Runtime et gestionnaire de paquets |
| **Calendly** | Widget JS | Prise de rendez-vous en popup |
| **Zod** | 3.24+ | Validation des formulaires |

### Architecture backend : Worker natif (pas Pages Functions)

Le backend est un **Cloudflare Worker unique** (`src/worker.ts`) qui :
- Sert les assets statiques depuis `dist/` (via `assets.directory` dans `wrangler.jsonc`)
- Route les requêtes API (`/api/*`) vers les handlers internes
- Utilise D1 pour la persistence et Resend pour les emails

> ⚠️ Il n'y a **PAS** de dossier `functions/`. Toute la logique backend est dans `src/worker.ts`.

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

### Structure du projet
```
src/
├── assets/          # Images du courtier, logos
├── components/
│   ├── landing/     # Composants de la landing page (1 par section)
│   └── ui/          # Composants UI réutilisables (accordion, sonner)
├── hooks/           # Hooks custom (useScrollReveal, etc.)
├── lib/             # Utilitaires, contexte, traductions
│   ├── calendly.ts
│   ├── LanguageContext.tsx
│   ├── translations.ts
│   └── utils.ts
├── routes/          # Routes TanStack Router (file-based)
│   ├── __root.tsx
│   ├── index.tsx
│   ├── merci.tsx
│   ├── admin.tsx
│   ├── admin.login.tsx
│   └── admin.leads.tsx
└── worker.ts        # ⭐ Point d'entrée Worker Cloudflare (API)
```

### Conventions de nommage
- Composants : `PascalCase.tsx` (ex: `LeadForm.tsx`)
- Hooks : `camelCase.ts` avec préfixe `use` (ex: `useScrollReveal.ts`)
- Utilitaires : `camelCase.ts` (ex: `calendly.ts`)
- Imports : alias `@/` pour tous les imports internes

---

## 4. Système de traduction bilingue (i18n)

### Architecture
- **`src/lib/translations.ts`** : Fichier unique contenant TOUTES les chaînes FR/EN
- **`src/lib/LanguageContext.tsx`** : Provider React + hook `useLanguage()`
- **Français = langue par défaut**, choix persisté dans `localStorage`

### Utilisation dans les composants
```tsx
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export function MonComposant() {
  const { t, ta } = useLanguage();
  
  // t() — pour une chaîne simple { fr: "...", en: "..." }
  const titre = t(translations.monSection.title);
  
  // ta() — pour un tableau/objet { fr: [...], en: [...] }
  const items = ta(translations.monSection.items) as MonType[];
  
  return <h2>{titre}</h2>;
}
```

### Règle absolue
- **TOUS les textes visibles** par l'utilisateur doivent être dans `translations.ts`
- **Jamais de texte hardcodé** en français ou anglais dans les composants
- Exception : les données factuelles invariables (adresses, numéros de téléphone, noms propres)

---

## 5. Backend — Cloudflare Worker (`src/worker.ts`)

### Routes API

| Route | Méthode | Description |
|---|---|---|
| `/api/leads` | POST | Sauvegarder un lead (formulaire, Calendly) |
| `/api/send-guide` | POST | Envoyer le guide PDF par email + sauvegarder lead |
| `/api/admin/login` | POST | Authentification admin (rate limited : 5/h par IP) |
| `/api/admin/logout` | POST | Déconnexion admin (supprime le token D1) |
| `/api/admin/leads` | GET | Récupérer tous les leads (vérifie token D1 + expiration) |

### Bindings (définis dans `wrangler.jsonc`)

| Binding | Type | Description |
|---|---|---|
| `DB` | D1 Database | Table `leads` — stockage des leads |
| `ADMIN_PASSWORD` | Variable/Secret | Mot de passe du panel admin |
| `RESEND_API_KEY` | Variable/Secret | Clé API Resend pour l'envoi d'emails |

### Tables D1 (SQLite)

```sql
-- Leads (contacts entrants)
CREATE TABLE leads (
  id TEXT PRIMARY KEY, name TEXT, email TEXT, phone TEXT,
  message TEXT, type TEXT, budget TEXT, timeline TEXT,
  address TEXT, property_type TEXT, created_at TEXT
);

-- Sessions admin (token + expiration 24h)
CREATE TABLE admin_sessions (
  token TEXT PRIMARY KEY, created_at TEXT, expires_at TEXT
);

-- Rate limiting (tentatives de connexion)
CREATE TABLE login_attempts (
  id INTEGER PRIMARY KEY, ip TEXT, attempted_at TEXT
);
```

### Sources d'insertion des leads
- **Formulaire de contact** (`LeadForm.tsx`) → `POST /api/leads`
- **Lead Magnet** (`LeadMagnet.tsx`) → `POST /api/send-guide`
- **Calendly** (`calendly.ts` listener) → `POST /api/leads`

---

## 6. Variables d'environnement

### Variables serveur (Cloudflare Dashboard → Settings → Variables et secrets)

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Mot de passe admin pour `/admin` |
| `RESEND_API_KEY` | Clé API Resend (`re_...`) |

> ⚠️ Ces variables doivent être configurées dans la section **"Variables et secrets"** du Worker (pas seulement dans le build).

### Variables client (`.env.local`)

| Variable | Description |
|---|---|
| `VITE_CALENDLY_URL` | URL Calendly du courtier |
| `VITE_GA4_ID` | ID Google Analytics 4 |

### Honeypot anti-spam
- Le formulaire de contact (`LeadForm.tsx`) contient un champ caché `website`.
- Si un bot le remplit, la soumission est silencieusement rejetée.

---

## 7. Commande de build

```bash
bun run build
```

**Cette commande DOIT passer avec 0 erreurs et 0 warnings avant tout `git push`.** Non négociable.

---

## 8. Workflow de déploiement

### Déploiement CLI
```bash
# 1. Build
bun run build

# 2. Deploy
npx wrangler deploy

# 3. ⚠️ OBLIGATOIRE — Remettre les secrets (effacés par le deploy)
node post-deploy.cjs

# 4. Vérifier
# → Login admin, formulaires achat/vente, newsletter emails
```

> ⚠️ `npx wrangler deploy` EFFACE les secrets. `node post-deploy.cjs` les remet.
> Ne jamais utiliser `echo` en PowerShell (ajoute `\r\n`).

### Configuration requise pour un nouveau déploiement
1. Créer une base D1 : `npx wrangler d1 create nom-du-client-leads`
2. Exécuter le schéma : `npx wrangler d1 execute nom-du-client-leads --file=schema.sql --remote`
3. Mettre à jour `wrangler.jsonc` avec le nouveau `database_id`
4. Copier `post-deploy.example.cjs` → `post-deploy.cjs` avec les vrais secrets
5. Ajouter `post-deploy.cjs` au `.gitignore`

---

## 9. Règles absolues

### Règle 1 — Jamais de `console.log` en production
- `console.error` dans les `catch` : ✅
- `console.warn` pour dégradation gracieuse : ✅
- `console.log` : ❌ **interdit**

### Règle 2 — Pas de Supabase
- Le projet a été migré de Supabase vers **Cloudflare D1**.
- Ne jamais réintroduire `@supabase/supabase-js` ni les fichiers `client.ts`/`client.server.ts`.
- La persistance se fait via D1 dans `src/worker.ts`.

### Règle 3 — Pas de dossier `functions/`
- L'ancien dossier `functions/` (Pages Functions) a été supprimé.
- Toute logique backend va dans `src/worker.ts`.

### Règle 4 — Traduction obligatoire
- Tout nouveau texte visible doit être ajouté dans `src/lib/translations.ts`.
- Tout nouveau composant doit utiliser `useLanguage()` + `t()` / `ta()`.

### Règle 5 — Variables d'environnement
- Les variables serveur (RESEND_API_KEY, ADMIN_PASSWORD) doivent être dans le Dashboard Cloudflare → Settings → **Variables et secrets** (runtime, pas build).
- Côté worker, accès via `env.VARIABLE` (pas `process.env`).

### Règle 6 — Sécurité admin obligatoire
- **JAMAIS** de validation de token par longueur seule. Tout token doit être **vérifié dans D1**.
- Les sessions admin doivent avoir une **expiration** (24h par défaut).
- Le login doit être **rate limité** (5 tentatives/heure par IP max).
- La déconnexion doit **supprimer le token côté serveur** (pas seulement côté client).
- Pattern obligatoire : `login → stocker token D1 → vérifier token D1 → logout → supprimer token D1`.

### Règle 7 — Centralisation config client
- Toutes les données spécifiques au courtier (nom, téléphone, email, réseaux sociaux, URLs) doivent être dans `src/lib/config.ts`.
- **JAMAIS** de données client hardcodées dans les composants `.tsx`.

---

## 10. Standards de contenu et UX — Directives Intralys

### 10.1 — Toggle bilingue FR/EN dans la Navbar
- Bouton FR/EN dans la Navbar. Français par défaut, persisté dans `localStorage`.
- Système : `LanguageContext.tsx` + `translations.ts`.

### 10.2 — CTA principal : « RENCONTRE STRATÉGIQUE GRATUITE »
- Présent dans : Hero, Navbar, MobileStickyBar, ExitIntentPopup, Deliverables.

### 10.3 — Calculatrice enrichie
- Hypothèque + taxe foncière + assurance habitation = coût mensuel total.

### 10.4 — Section Propriétés avec vraies données
- Vraies photos de maisons (Unsplash ou photos client), JAMAIS de placeholder vide.
- Badges de statut : NOUVELLE (vert), EXCLUSIVE (crimson), VENDU (gris + grayscale).
- Données complètes : prix, localisation précise (quartier), chambres, salles de bain, superficie (pi²).
- CTA vers Centris du courtier.

### 10.5 — Territoire Hero en MAJUSCULES
- Format : `GATINEAU | OTTAWA` (pipe séparateur).

### 10.6 — Section Équipe Parent
- Logo bannière immobilière (Royal LePage, RE/MAX, etc.).

### 10.7 — Titres et CTAs en UPPERCASE
- `<h2>` : `uppercase tracking-widest`
- Boutons CTA : `uppercase tracking-widest`

### 10.8 — Section « Première rencontre gratuite » + photo courtier
- Juste avant `LeadForm`. Badges ✅ Gratuit · ✅ Sans engagement · ✅ Confidentiel.
- **Layout split** : texte + badges à gauche, photo courtier (fond couleur forte) à droite.

### 10.9 — Services — 3 piliers
- ACHAT · VENTE · INVESTISSEMENT — toujours 3.
- Boutons CTA honnêtes : `"Me contacter →"` (pas "En savoir plus" sans destination).

### 10.10 — Hero : titre inclusif ACHAT + VENTE
- Le titre hero doit couvrir ACHAT et VENTE (pas juste "premier achat").
- Un vendeur qui arrive doit se sentir ciblé aussi.
- Mauvais : "Votre premier achat à Gatineau" → exclut les vendeurs.
- Bon : "Achetez. Vendez. Sans stress." → couvre les 2 cas.

### 10.11 — Réseaux sociaux : haut ET bas de page
- **OBLIGATOIRE** : liens sociaux dans le Hero (haut) ET dans le Footer (bas).
- Hero : boutons pills discrets avec backdrop-blur.
- Footer : icônes carrées "SUIVEZ-MOI".
- Doublon intentionnel — le visiteur doit pouvoir suivre à tout moment.

### 10.12 — Photos courtier : 3 placements stratégiques
- **About** (haut) : photo fond neutre/blanc + badges flottants (étoiles + ancienneté).
- **Milieu** : section équipe ou Instagram — photo contextuelle.
- **FreeConsultation** (bas) : photo percutante fond rouge/couleur forte.
- JAMAIS la même photo à 2 endroits.

### 10.13 — Flow des sections : funnel de conversion logique
- Maximum **15 sections**. Pas 20+.
- Ordre obligatoire :
  ```
  QUI : About → ParentTeam
  APPROCHE : Fears → Services → Process → Pillars
  PREUVES : Testimonials → Properties → Instagram
  OUTILS : Calculator → MarketStats
  CONVERSION : Deliverables → LeadMagnet → FreeConsultation → LeadForm → FAQ
  ```
- About AVANT les peurs (le visiteur doit savoir QUI parle avant d'avoir peur).
- Process AVANT Testimonials (comprendre le service avant les avis).

### 10.14 — CTA dans la section About
- Toujours un bouton CTA dans About. Le visiteur convaincu ne doit pas scroller pour convertir.

### 10.15 — Copywriting percutant
- Process : titres agressifs ("L'Audit Stratégique", "Radar Exclusif", pas "Consultation").
- Calculator CTA : personnalisé avec le nom du courtier.
- Instagram : titre émotionnel ("Dans les tranchées", pas "Suivez-nous").

### 10.16 — wrangler.jsonc : database_id RÉEL avant deploy
- **JAMAIS** déployer avec un `database_id` placeholder.
- Vérifier dans le Dashboard Cloudflare → D1 → copier le vrai ID.
- Ajouter cette vérification dans la checklist de déploiement.

### 10.17 — Section Alertes Propriétés (PropertyAlerts)
- Composant email-only après la section Properties.
- Le visiteur s'inscrit pour recevoir les exclusivités AVANT publication.
- Lead stocké en D1 via `/api/leads` avec type "buy" et message "Inscription alertes propriétés".
- Capture de leads sans engagement — low friction = taux de conversion élevé.

### 10.18 — Piliers enrichis (descriptions concrètes)
- Chaque pilier doit avoir 2-3 phrases de description concrète.
- Mauvais : "Je coordonne inspecteur, notaire..." (1 phrase vague).
- Bon : "...Vous n'avez qu'un seul interlocuteur — moi. Je gère toute la complexité..." (concret + bénéfice client).

### 10.19 — Google Reviews dans le footer + "Laisser un avis"
- Lien ★★★★★ "Laisser un avis Google" dans le footer (colonne Secteurs).
- `config.ts` contient `googleReviewUrl` — utilisé dans Testimonials ET Footer.
- Double exposition : badge Google en haut (Testimonials) + lien en bas (Footer).

### 10.20 — Secteurs desservis dans le footer (SEO local)
- Colonne dédiée dans le footer avec 6-8 villes/quartiers du courtier.
- Bon pour le SEO local : Google indexe les noms de villes.
- Données dans `translations.ts` → `footer.sectors` + `footer.sectorsTitle`.

### 10.21 — Favicon personnalisé (icône onglet navigateur)
- **OBLIGATOIRE** : chaque site client doit avoir un favicon personnalisé.
- Design : fond navy (`#0D1B2A`) + initiale(s) du courtier en crimson (`#C41230`).
- 3 fichiers dans `public/` : `favicon.ico`, `icon-192.png`, `icon-512.png`.
- Marqueur `<!-- SWAP: Favicon -->` dans `index.html`.
- Le manifest PWA (`manifest.json`) référence `icon-192.png` et `icon-512.png`.
- Générer avec Antigravity (`generate_image`) ou un outil de design.

---

## 11. Documentation obligatoire

Avant toute modification, lire :
1. **`CLAUDE.md`** (ce fichier)
2. **`INTRALYS_MASTER.md`** — Architecture complète du template
3. **`src/lib/config.ts`** — Configuration client centralisée
4. **`.env.example`** — Variables requises
5. **`wrangler.jsonc`** — Configuration du Worker + D1

> ⚠️ Ne jamais modifier la structure sans mettre à jour la documentation.

---

## 12. 🚨 LEÇONS APPRISES — NE JAMAIS RÉPÉTER

> ⚠️ **AU DÉMARRAGE DE CHAQUE NOUVEAU PROJET, LIRE CETTE SECTION EN PREMIER.**
> Chaque point a été découvert lors de l'audit et du premier déploiement du template.
> Ces erreurs ne doivent **JAMAIS** être reproduites sur un nouveau client.

### 12.1 — Centralisation des données client
- **❌** Téléphone, email, nom, réseaux sociaux hardcodés dans 14+ fichiers `.tsx`.
- **✅** Tout dans `src/lib/config.ts`. Zéro donnée client dans les composants.

### 12.2 — Schéma D1 complet dès le départ
- **❌** Formulaire frontend collectait des champs absents du schéma D1 et de l'API.
- **✅** Pour chaque champ : Frontend (Zod) → API body → Worker → D1 → Admin. Tous alignés.

### 12.3 — Authentification admin sécurisée
- **❌** Token validé par longueur seule. Accès libre à tous les leads.
- **✅** `crypto.randomUUID()` stocké en D1 avec `expires_at` 24h + rate limiting 5/h/IP.

### 12.4 — Gestion des erreurs API côté frontend
- **❌** Page blanche sur token expiré (401). Pas de message 429 (rate limit).
- **✅** 401 → redirection login. 429 → message clair. Erreur → bouton Réessayer.

### 12.5 — Sanitisation des inputs serveur
- **❌** `${prenom}` injecté dans le HTML d'email sans échappement (XSS).
- **✅** `sanitizeHtml()` pour le HTML + `sanitizeInput()` (trim+maxLen) + whitelist pour `type`.

### 12.6 — Marqueurs SWAP dans les fichiers statiques
- **❌** `index.html` avec 15+ éléments client sans marqueur.
- **✅** `<!-- SWAP: -->` dans HTML, `# SWAP:` dans robots/sitemap, `_comment_SWAP` dans JSON.

### 12.7 — i18n complet sans exception
- **❌** Boutons, texte de confiance, messages d'erreur hardcodés en français.
- **✅** TOUS les textes visibles via `useLanguage()` + `translations.ts`. Toggle = 100% change.

### 12.8 — Notification email au courtier
- **❌** Lead soumis → stocké en D1 seulement. Courtier devait checker l'admin manuellement.
- **✅** Email instantané au courtier avec nom, téléphone, email, type, budget/adresse.

### 12.9 — CSP headers à jour
- **❌** `connect-src` contenait `supabase.co` alors que le projet utilise D1.
- **✅** CSP doit refléter les services réellement utilisés. Nettoyer à chaque migration.

### 12.10 — Schéma SQL complet pour base neuve
- **✅** `schema.sql` contient TOUTES les tables. `migrations/` pour les DB existantes.

### 12.11 — Titre Hero exclusif (un seul public)
- **❌** Hero dit "Votre premier achat" mais formulaire propose aussi "Je vends".
- **✅** Titre couvre ACHAT + VENTE. Ex: "Achetez. Vendez. Sans stress."

### 12.12 — Boutons CTA trompeurs
- **❌** "En savoir plus" qui mène au formulaire de contact.
- **✅** "Me contacter →" — label honnête = confiance = meilleure conversion.

### 12.13 — Trop de sections (20+)
- **❌** 20 sections dont des doublons (Pillars ≈ Services, Enemy ≈ About).
- **✅** Max 15 sections dans un funnel logique. Fusionner les doublons.

### 12.14 — Propriétés sans photos
- **❌** Cartes avec gradient vide — aucune photo de maison.
- **✅** Vraies photos + badges (NOUVELLE/EXCLUSIVE/VENDU) + superficie.

### 12.15 — Section About sans CTA
- **❌** Le visiteur convaincu par About devait scroller 10 sections pour trouver le formulaire.
- **✅** CTA "RENCONTRE STRATÉGIQUE GRATUITE" directement dans About.

### 12.16 — Photos courtier mal placées
- **❌** Photo fond rouge dans le hero (trop agressif), photo fond blanc en bas (peu visible).
- **✅** Blanc/neutre en haut (About), rouge/fort en bas (FreeConsultation).

### 12.17 — wrangler.jsonc avec faux database_id
- **❌** `database_id` placeholder `8d67c8e5-...` → deploy échoue.
- **✅** Vérifier le vrai ID dans le Dashboard Cloudflare AVANT le premier deploy.

### 12.18 — Réseaux sociaux en bas seulement
- **❌** Socials uniquement dans le footer — le visiteur ne les voit que s'il scroll tout en bas.
- **✅** Socials en HAUT (Hero) ET en BAS (Footer). Double exposition.

### 12.19 — Secrets Cloudflare s'effacent au deploy
- **❌** `npx wrangler deploy` efface les secrets (ADMIN_PASSWORD, RESEND_API_KEY).
- **✅** Script `post-deploy.cjs` (dans `.gitignore`) remet les secrets via Node.js `execSync` avec `{ input: value }`.
- **Workflow** : `npx wrangler deploy` → `node post-deploy.cjs` → vérifier login admin.

### 12.20 — D1 CREATE TABLE IF NOT EXISTS ne modifie PAS les tables existantes
- **❌** Table existante avec 7 colonnes → `CREATE TABLE IF NOT EXISTS` avec 11 colonnes ne fait RIEN.
- **✅** `migration-leads.sql` (ALTER TABLE) + INSERT résilient dans le worker (try/catch + auto-migration + fallback).

### 12.21 — Login admin : ne jamais navigate() + reload()
- **❌** `navigate()` puis `window.location.reload()` → race condition → boucle login.
- **✅** `window.location.href = "/admin/leads"` directement.

### 12.22 — Resend plan gratuit : emails en spam
- **❌** `onboarding@resend.dev` → emails en spam.
- **✅** Domaine custom dans Resend pour la production. `onboarding@resend.dev` = dev/test.

### 12.23 — PowerShell echo corrompt les secrets
- **❌** `echo "value" | wrangler secret put NAME` → ajoute `\r\n`.
- **✅** Node.js `execSync('npx wrangler secret put NAME', { input: 'value', stdio: ['pipe','inherit','inherit'] })`.

### 12.24 — Pages admin : toujours un lien retour
- **✅** `/admin/login` : "← Retour au site" sous le formulaire.
- **✅** `/admin/leads` : "← Retour au site" à côté de "Déconnexion".

### 12.25 — Section Équipe : données enrichies + modal
- **✅** Config : `name, role, initials, phone, website, location, stars, reviews`.
- **✅** `ParentTeam.tsx` : modal cliquable (photo agrandie + infos contact).

### 12.26 — Newsletter : email de bienvenue automatique
- **✅** Le worker détecte `cleanName === 'Alerte Propriété'` → 2 emails : notification courtier + bienvenue subscriber.

### 12.27 — VS Code : désactiver le validateur CSS pour Tailwind v4
- **✅** `.vscode/settings.json` avec `"css.validate": false`.

---

### 12.99 — Checklist nouveau projet (MISE À JOUR)
- [ ] `config.ts` contient toutes les données client
- [ ] Zéro hardcoded dans les `.tsx`
- [ ] Schema D1 = API = Frontend = Admin (alignés)
- [ ] Auth admin : token D1 + expiration + rate limiting + logout
- [ ] Sanitisation serveur (HTML escape + trim + maxLen + whitelist)
- [ ] Marqueurs SWAP dans tous les fichiers statiques
- [ ] CSP headers correspond aux services utilisés
- [ ] Admin gère 401 + 429 + erreurs (jamais page blanche)
- [ ] Notification email courtier à chaque lead
- [ ] Newsletter email de bienvenue automatique
- [ ] i18n complet (toggle = 100% change)
- [ ] `bun run build` = 0 erreurs
- [ ] Hero titre couvre ACHAT + VENTE
- [ ] Socials en haut (Hero) ET en bas (Footer)
- [ ] 3 photos courtier : blanc haut, contextuelle milieu, rouge bas
- [ ] Flow 15 sections max — funnel logique
- [ ] CTA dans About
- [ ] Propriétés avec vraies photos + badges + superficie
- [ ] Boutons CTA honnêtes
- [ ] wrangler.jsonc database_id = VRAI ID
- [ ] `post-deploy.cjs` créé avec les vrais secrets (dans .gitignore)
- [ ] Login admin testé après chaque deploy
- [ ] Formulaires achat + vente testés en production
- [ ] Newsletter email de bienvenue vérifié
- [ ] Admin pages lien "← Retour au site" présent
- [ ] teamMembers enrichis (phone/website/stars/reviews) + modal
- [ ] `.vscode/settings.json` CSS validate = false
