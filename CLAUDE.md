# CLAUDE.md — Instructions pour l'IA

> Ce fichier est lu automatiquement par l'IA à chaque ouverture du projet.
> Respecter ces règles à la lettre.
> Dernière mise à jour : 2026-04-28

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
| `/api/admin/login` | POST | Authentification admin par mot de passe |
| `/api/admin/leads` | GET | Récupérer tous les leads (protégé par token) |

### Bindings (définis dans `wrangler.jsonc`)

| Binding | Type | Description |
|---|---|---|
| `DB` | D1 Database | Table `leads` — stockage des leads |
| `ADMIN_PASSWORD` | Variable/Secret | Mot de passe du panel admin |
| `RESEND_API_KEY` | Variable/Secret | Clé API Resend pour l'envoi d'emails |

### Table `leads` (D1 SQLite)

```sql
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT DEFAULT '',
  type TEXT DEFAULT 'buy',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

### Option 1 : Déploiement via GitHub (auto-deploy)
```bash
bun run build          # Vérifier localement
git add -A
git commit -m "description"
git push origin main   # Cloudflare auto-deploy
```

Configuration dans Cloudflare Dashboard :
- **Build command** : `bun run build`
- **Deploy command** : `npx wrangler deploy`

### Option 2 : Déploiement CLI (manuel)
```bash
bun run build
npx wrangler deploy
```

### Configuration requise pour un nouveau déploiement
1. Créer une base D1 : `npx wrangler d1 create nom-du-client-leads`
2. Exécuter le schéma : `npx wrangler d1 execute nom-du-client-leads --file=schema.sql`
3. Mettre à jour `wrangler.jsonc` avec le nouveau `database_id`
4. Configurer les variables dans le Dashboard Cloudflare (Settings → Variables et secrets)

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

---

## 10. Standards de contenu et UX — Directives Intralys

### 10.1 — Toggle bilingue FR/EN dans la Navbar
- Bouton FR/EN dans la Navbar. Français par défaut, persisté dans `localStorage`.
- Système : `LanguageContext.tsx` + `translations.ts`.

### 10.2 — CTA principal : « RENCONTRE STRATÉGIQUE GRATUITE »
- Présent dans : Hero, Navbar, MobileStickyBar, ExitIntentPopup, Deliverables.

### 10.3 — Calculatrice enrichie
- Hypothèque + taxe foncière + assurance habitation = coût mensuel total.

### 10.4 — Section Propriétés avec lien Centris
- Cartes placeholder + CTA vers Centris.

### 10.5 — Territoire Hero en MAJUSCULES
- Format : `GATINEAU | OTTAWA` (pipe séparateur).

### 10.6 — Section Équipe Parent
- Logo bannière immobilière (Royal LePage, RE/MAX, etc.).

### 10.7 — Titres et CTAs en UPPERCASE
- `<h2>` : `uppercase tracking-widest`
- Boutons CTA : `uppercase tracking-widest`

### 10.8 — Section « Première rencontre gratuite »
- Juste avant `LeadForm`. Badges ✅ Gratuit · ✅ Sans engagement · ✅ Confidentiel.

### 10.9 — Services — 3 piliers
- ACHAT · VENTE · INVESTISSEMENT — toujours 3.

---

## 11. Documentation obligatoire

Avant toute modification, lire :
1. **`CLAUDE.md`** (ce fichier)
2. **`INTRALYS_MASTER.md`** — Architecture complète du template
3. **`.env.example`** — Variables requises
4. **`wrangler.jsonc`** — Configuration du Worker + D1

> ⚠️ Ne jamais modifier la structure sans mettre à jour la documentation.
