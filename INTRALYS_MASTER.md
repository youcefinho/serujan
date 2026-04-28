# INTRALYS MASTER DOCUMENTATION

Ce document est la documentation technique complète du template Intralys.
Il permet de reproduire un site client identique en moins de 1 heure.

> Dernière mise à jour : 2026-04-28

---

## 1. Stack technique

**Core :**
- **Vite 7** — Build tool et dev server
- **React 19** — UI, composants fonctionnels uniquement
- **TypeScript 5.8+** — Typage strict obligatoire
- **TanStack Router** — Routing type-safe basé sur les fichiers
- **Tailwind CSS v4** — Styles utilitaires (syntaxe v4, `@theme inline`, couleurs `oklch`)
- **Bun** — Runtime et gestionnaire de paquets

**Backend :**
- **Cloudflare Workers** — Worker unifié servant API + assets statiques
- **Cloudflare D1** — Base de données SQLite serverless (1 DB par client)
- **Resend** — Envoi d'emails transactionnels (Lead Magnet)

**UI :**
- **Radix UI** — Composants accessibles (accordion, slot)
- **Lucide React** — Icônes
- **Sonner** — Notifications toast
- **Zod** — Validation de formulaires

**Intégrations :**
- **Calendly** — Widget JS pour prise de rendez-vous
- **Google Analytics 4** — Suivi des conversions

---

## 2. Architecture du projet

```
projet/
├── src/
│   ├── assets/              # Images courtier, logos
│   ├── components/
│   │   ├── landing/         # 1 composant = 1 section de page
│   │   └── ui/              # Composants UI réutilisables
│   ├── hooks/               # Hooks custom
│   ├── lib/
│   │   ├── calendly.ts      # Helper Calendly
│   │   ├── LanguageContext.tsx  # Provider i18n FR/EN
│   │   ├── translations.ts     # Toutes les traductions
│   │   └── utils.ts
│   ├── routes/              # TanStack Router (file-based)
│   │   ├── __root.tsx
│   │   ├── index.tsx        # Landing page principale
│   │   ├── merci.tsx        # Page de remerciement
│   │   ├── admin.tsx        # Layout admin
│   │   ├── admin.login.tsx  # Login admin (mot de passe unique)
│   │   └── admin.leads.tsx  # Dashboard leads
│   └── worker.ts            # ⭐ Worker Cloudflare (API routes)
├── public/
│   ├── _headers             # Headers de sécurité
│   ├── _redirects           # Redirects SPA
│   ├── robots.txt
│   └── sitemap.xml
├── wrangler.jsonc            # Config Worker + D1
├── schema.sql               # Schéma de la table leads
├── .env.example              # Variables requises (template)
└── package.json
```

### Composants landing (tous dans `src/components/landing/`)

| Section | Composant | i18n |
|---|---|---|
| Navigation | `Navbar.tsx` | ✅ |
| Hero | `Hero.tsx` | ✅ |
| Barre de stats | `StatsBar.tsx` | ✅ |
| Peurs | `Fears.tsx` | ✅ |
| Déclencheurs | `Triggers.tsx` | ✅ |
| À propos | `About.tsx` | ✅ |
| Instagram | `InstagramReels.tsx` | ✅ |
| Équipe | `Team.tsx` | ✅ |
| Piliers | `Pillars.tsx` | ✅ |
| Services | `Services.tsx` | ✅ |
| Marché | `MarketStats.tsx` | ✅ |
| Livrables | `Deliverables.tsx` | ✅ |
| Manifeste | `Manifesto.tsx` | ✅ |
| Témoignages | `Testimonials.tsx` | ✅ |
| Processus | `Process.tsx` | ✅ |
| Calculatrice | `Calculator.tsx` | ✅ |
| Ennemi commun | `Enemy.tsx` | ✅ |
| Lead Magnet | `LeadMagnet.tsx` | ✅ |
| Formulaire | `LeadForm.tsx` | ✅ |
| FAQ | `Faq.tsx` | ✅ |
| Footer | `Footer.tsx` | ✅ |
| WhatsApp | `WhatsAppButton.tsx` | ✅ |
| Barre mobile | `MobileStickyBar.tsx` | ✅ |
| Progression scroll | `ScrollProgressBar.tsx` | N/A |
| Scroll reveal | `ScrollReveal.tsx` | N/A |
| Exit intent | `ExitIntentPopup.tsx` | ✅ |

---

## 3. Backend — Worker Cloudflare

### Point d'entrée : `src/worker.ts`

Le Worker gère à la fois les **routes API** et le **service des assets statiques** (SPA).

```
wrangler.jsonc
├── main: "src/worker.ts"     ← Point d'entrée
├── assets.directory: "./dist" ← Assets statiques (Vite build)
└── d1_databases              ← Binding D1
```

### Routes API

| Route | Méthode | Description |
|---|---|---|
| `POST /api/leads` | Sauvegarder un lead |
| `POST /api/send-guide` | Envoyer guide PDF + sauvegarder lead |
| `POST /api/admin/login` | Auth admin (mot de passe → token) |
| `GET /api/admin/leads` | Lister les leads (protégé) |

### Bindings

| Nom | Type | Configuré dans |
|---|---|---|
| `DB` | D1 Database | `wrangler.jsonc` |
| `ADMIN_PASSWORD` | Secret | Cloudflare Dashboard → Variables et secrets |
| `RESEND_API_KEY` | Secret | Cloudflare Dashboard → Variables et secrets |

> ⚠️ Les secrets doivent être dans la section **"Variables et secrets"** du Dashboard (runtime), pas seulement dans les variables de build.

### Table `leads` (schéma D1 complet)

```sql
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT DEFAULT '',
  type TEXT CHECK (type IN ('buy', 'sell')) DEFAULT 'buy',
  budget TEXT DEFAULT '',
  timeline TEXT DEFAULT '',
  address TEXT DEFAULT '',
  property_type TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);
```

> ⚠️ `CREATE TABLE IF NOT EXISTS` ne modifie PAS les tables existantes.
> Utiliser `migration-leads.sql` (ALTER TABLE) pour ajouter des colonnes.
> Le worker utilise un INSERT résilient (try/catch + auto-migration + fallback).

---

## 4. Système i18n (Bilingue FR/EN)

### Architecture

1. **`translations.ts`** — Toutes les chaînes FR/EN en un seul fichier
2. **`LanguageContext.tsx`** — Provider React avec `useLanguage()` hook
3. **Toggle FR/EN** dans la Navbar, choix persisté dans `localStorage`

### Pattern d'utilisation

```tsx
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export function MonComposant() {
  const { t, ta } = useLanguage();
  // t() = chaîne simple, ta() = tableau/objet
  return <h2>{t(translations.maSection.title)}</h2>;
}
```

### Règle : tout texte dans `translations.ts`
- Jamais de texte hardcodé dans les composants
- Exception : données invariables (adresses, noms propres, URLs)

---

## 5. Features implémentées

1. **Calendly Popup** — `openCalendly()` depuis `calendly.ts`, auto-sync lead
2. **Calculatrice canadienne** — Compounding semi-annuel, CMHC, taxe de bienvenue
3. **Formulaire dual** — Tabs "J'achète" / "Je vends" → `POST /api/leads`
4. **Admin Dashboard** — Login par mot de passe → token → liste des leads
5. **Compteurs animés** — Count-up au scroll dans `StatsBar.tsx`
6. **Scroll animations** — `ScrollReveal.tsx` fade/slide au scroll
7. **Barre de progression** — `ScrollProgressBar.tsx` fixée en haut
8. **Barre mobile sticky** — CTA persistants sur mobile
9. **Exit Intent Popup** — Modal quand la souris quitte la page
10. **WhatsApp flottant** — Chat direct avec le courtier
11. **Lead Magnet** — Capture email → envoi guide PDF via Resend
12. **Instagram Reels** — Section de contenu social
13. **Bilingue FR/EN** — Toggle dans Navbar, TOUS les composants traduits

---

## 6. Sécurité

- **Headers CSP** : Configurés dans `public/_headers` — doivent refléter les services utilisés
- **Honeypot anti-spam** : Champ caché `website` dans `LeadForm.tsx`
- **Variables serveur** : Jamais dans le code source, toujours via `post-deploy.cjs` ou Dashboard Cloudflare
- **Token admin** : `crypto.randomUUID()` stocké en D1 (`admin_sessions`) avec expiration 24h
- **Rate limiting** : 5 tentatives/heure par IP sur `/api/admin/login`
- **Sanitisation** : `sanitizeHtml()` sur tout input dans du HTML, `sanitizeInput()` (trim+maxLen) sur tout input
- **Secrets** : Effacés par `npx wrangler deploy` → `node post-deploy.cjs` obligatoire après chaque deploy

---

## 7. SEO

Configuré dans `index.html` :
- Canonical URL + hreflang fr-CA
- Schema.org JSON-LD (type `RealEstateAgent`)
- Open Graph + Twitter Cards
- Sitemap + robots.txt dans `public/`

---

## 8. Déploiement

### Nouveau client — Étapes complètes

```bash
# 1. Cloner le template
git clone https://github.com/youcefinho/intralys-template.git nom-du-client
cd nom-du-client
git remote set-url origin https://github.com/youcefinho/nom-du-client.git

# 2. Installer
bun install

# 3. Créer la base D1
npx wrangler d1 create nom-du-client-leads
# → Copier le database_id dans wrangler.jsonc

# 4. Exécuter le schéma
npx wrangler d1 execute nom-du-client-leads --file=schema.sql --remote

# 5. Configurer
cp .env.example .env.local           # VITE_CALENDLY_URL, VITE_GA4_ID
cp post-deploy.example.cjs post-deploy.cjs  # Vrais secrets

# 6. Suivre CLIENT_SWAP.md pour le rebranding

# 7. Build + Deploy
bun run build
npx wrangler deploy

# 8. ⚠️ OBLIGATOIRE — Remettre les secrets
node post-deploy.cjs

# 9. Vérifications post-deploy
# → Login admin, formulaires achat/vente, newsletter, emails
```

---

## 9. Swap client — Éléments à modifier

| Fichier | Quoi modifier |
|---|---|
| `src/lib/config.ts` | ⭐ TOUTES les données client (nom, tel, email, URLs, équipe) |
| `src/lib/translations.ts` | Textes FR/EN (bio, témoignages, FAQ, stats) |
| `src/assets/` | Photos courtier, logos, hero banner |
| `src/styles.css` | Couleurs de marque (--crimson, --navy) |
| `index.html` | title, meta, Schema.org, GA4 ID (chercher `SWAP:`) |
| `wrangler.jsonc` | `name`, `database_name`, `database_id` |
| `.env.local` | VITE_CALENDLY_URL, VITE_GA4_ID |
| `post-deploy.cjs` | Vrais secrets (ADMIN_PASSWORD, RESEND_API_KEY) |
| `public/manifest.json` | name, short_name, description |
| `public/sitemap.xml` | URL du site |
| `public/robots.txt` | URL du sitemap |

> 📖 Guide détaillé : `CLIENT_SWAP.md`

---

## 10. Couleurs (Tailwind v4 + oklch)

Définies dans `src/styles.css` :

```css
:root {
  --navy: oklch(0.21 0.04 260);
  --navy-deep: oklch(0.16 0.035 260);
  --crimson: oklch(0.56 0.22 25);
  --crimson-glow: oklch(0.63 0.24 25);
  --cream: oklch(0.97 0.01 80);
  --font-display: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

Modifier `--crimson` et `--navy` pour rebrander instantanément tout le site.

---

## 11. Standards de contenu Intralys

1. **Toggle FR/EN** dans la Navbar (français par défaut)
2. **CTA** : « RENCONTRE STRATÉGIQUE GRATUITE » partout
3. **Calculatrice** : hypothèque + taxes + assurance = total mensuel
4. **Propriétés** : cartes placeholder + lien Centris
5. **Territoire Hero** : MAJUSCULES avec pipe `|`
6. **Équipe Parent** : logo bannière immobilière
7. **Titres `<h2>`** : `uppercase tracking-widest`
8. **Section gratuite** : juste avant LeadForm, badges ✅
9. **Services** : 3 piliers exactement (ACHAT · VENTE · INVESTISSEMENT)

---

*Ce template est maintenu par Intralys. Toute modification structurelle doit être reflétée dans cette documentation.*
