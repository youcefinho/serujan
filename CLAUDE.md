# CLAUDE.md — Instructions pour l'IA

> Ce fichier est lu automatiquement par l'IA à chaque ouverture du projet.
> Respecter ces règles à la lettre.
> Dernière mise à jour : 2026-04-29

---

## 1. Description du projet

Ce projet est le **site de Serujan Kaneshalingam**, courtier hypothécaire **COMMERCIAL** à Montréal. C'est une landing page haute conversion construite sur le **template commercial Intralys** (`intralys-template-commercial`).

⚠️ **Ce n'est PAS un courtier immobilier résidentiel.** Pas de ACHAT/VENTE de maisons, pas de Lead Magnet PDF, pas de newsletter, pas de Properties/Centris, pas de WhatsApp. C'est du **financement commercial** (immeubles, multi-logements, développement, construction).

### Données client
- **Nom** : Serujan Kaneshalingam
- **Équipe** : Équipe Serujan
- **Téléphone** : (514) 701-6171
- **Email** : expert@serujan.com
- **Bureau** : 111 Rue Chabanel O, Suite 617, Montréal, QC
- **Territoire** : MONTRÉAL | QUÉBEC
- **Site** : https://serujan.intralysqc.workers.dev
- **Design** : Noir/Or premium
- **Elev8 Event** : https://elev82025.ca/
- **Elev8 Academy** : https://elev8academie.ca/

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
| **Resend** | 6+ | Envoi d'emails de notification |
| **Bun** | Latest | Runtime et gestionnaire de paquets |
| **Calendly** | Widget JS | Prise de rendez-vous en popup |

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

### TypeScript
- **Mode strict activé** (`"strict": true` dans `tsconfig.json`).
- Ne jamais utiliser `any` sauf en dernier recours avec un commentaire justificatif.
- Toujours typer les props des composants.

### Structure du projet
```
src/
├── assets/          # Images du courtier, logos
├── components/
│   ├── landing/     # 20 composants de la landing page
│   └── ui/          # Composants UI réutilisables (accordion, sonner)
├── hooks/           # useScrollReveal, useIsMobile
├── lib/
│   ├── config.ts         # ⭐ DONNÉES CLIENT — Modifier ici pour personnaliser
│   ├── translations.ts   # ⭐ TRADUCTIONS FR/EN — 14 sections
│   ├── LanguageContext.tsx
│   ├── analytics.ts
│   ├── calendly.ts
│   └── utils.ts
├── routes/          # Routes TanStack Router (file-based)
│   ├── __root.tsx
│   ├── index.tsx    # Page principale (14 sections)
│   ├── merci.tsx    # Page post-formulaire
│   ├── admin.tsx
│   ├── admin.login.tsx
│   └── admin.leads.tsx
├── test/            # Vitest (calculatrice + traductions)
├── worker.ts        # ⭐ API Cloudflare Workers (leads, auth admin, email, GHL)
├── main.tsx
└── styles.css       # ⭐ Design system Noir/Or (oklch)
```

### 14 sections de la page (index.tsx)
```
1. Hero — Accroche + CTA + logo
2. ValueCards — 3 cartes sous le hero
3. StatsBar — Chiffres animés (500M$, 95%, etc.)
4. Services — 3 piliers commerciaux
5. Elev8Event — Événement + vidéo + countdown
6. Podcast — Embed Spotify
7. Process — 4 étapes méthodologie
8. About (Mon Approche) — Bio + features
9. Elev8Academy — Formation investissement
10. Calculator — Simulateur hypothécaire commercial (donut chart)
11. FreeConsultation — CTA avant formulaire
12. LeadForm — Formulaire contact (type projet + montant)
13. ExitIntentPopup — Popup avant de quitter
14. Footer — Contact + réseaux + copyright
+ MobileStickyBar — Barre fixe mobile
+ ScrollProgressBar — Barre de progression
```

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
  // ta() — pour un tableau/objet { fr: [...], en: [...] }
}
```

### Règle absolue
- **TOUS les textes visibles** doivent être dans `translations.ts`
- **Jamais de texte hardcodé** dans les composants

---

## 5. Backend — Worker (`src/worker.ts`)

### Routes API
| Route | Méthode | Description |
|---|---|---|
| `/api/leads` | POST | Sauvegarder un lead commercial |
| `/api/admin/login` | POST | Auth admin (rate limited : 5/h par IP) |
| `/api/admin/logout` | POST | Déconnexion admin |
| `/api/admin/leads` | GET | Récupérer tous les leads |

### Tables D1 (schema.sql)
```sql
CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,      -- Acquisition, Refinancement, Développement, Construction, Autre
  estimated_amount TEXT,  -- 500K$-2M$, 2M$-5M$, etc.
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_sessions (
  token TEXT PRIMARY KEY, created_at TEXT, expires_at TEXT
);

CREATE TABLE login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT, attempted_at TEXT
);
```

### Sécurité intégrée
- `sanitizeHtml()` — protection XSS pour les emails
- `sanitizeInput()` — trim + maxLength sur tout input
- Rate limiting : 5 tentatives/heure par IP
- Sessions token D1 avec expiration 24h
- Webhook GHL optionnel

---

## 6. Variables d'environnement

### Serveur (Cloudflare Dashboard → Variables et secrets)
| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Mot de passe admin |
| `RESEND_API_KEY` | Clé API Resend |
| `GHL_WEBHOOK_URL` | *(optionnel)* Webhook GoHighLevel |

### Client (`.env.local`)
| Variable | Description |
|---|---|
| `VITE_CALENDLY_URL` | URL Calendly de Serujan |
| `VITE_GA4_ID` | ID Google Analytics 4 |

---

## 7. Build

```bash
bun run build    # DOIT être 0 erreurs avant tout push
bun run test     # 12 tests doivent passer
bun run dev      # Dev server
```

---

## 8. Règles absolues

1. **Bun, jamais npm** — `bun install`, `bun run build`, `bun add`
2. **0 console.log** en production (console.error dans catch OK)
3. **0 données hardcodées** — tout dans config.ts ou translations.ts
4. **TypeScript strict** — pas de `any`
5. **Build = 0 erreurs** avant de terminer
6. **i18n complet** — toggle FR/EN = 100% du texte change
7. **Centralisation** — toutes données client dans `config.ts`
8. **Sécurité admin** — token D1 + expiration + rate limiting
9. **Sanitisation serveur** — XSS + trim + maxLen sur tout input
10. **Français** — réponses, commits, commentaires en français

---

## 9. Ce qui n'existe PAS dans ce projet (NE PAS AJOUTER)

- ❌ Lead Magnet / PDF guide
- ❌ Newsletter / inscription email
- ❌ Section Properties / Centris
- ❌ WhatsApp button
- ❌ Section Témoignages (pas encore fournis par le client)
- ❌ Supabase (on utilise D1)
- ❌ Dossier `functions/` (tout est dans worker.ts)
- ❌ Section Équipe Parent / bannière immobilière

---

## 10. Références

- **Template source** : `../intralys-template-commercial/` (architecture de référence)
- **Site demo existant** : https://demo.intralys.com/serujan
- **Config client** : `src/lib/config.ts`
- **Traductions** : `src/lib/translations.ts`
