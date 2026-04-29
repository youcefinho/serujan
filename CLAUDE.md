# CLAUDE.md — Instructions pour l'IA

> Ce fichier est lu automatiquement par l'IA à chaque ouverture du projet.
> Respecter ces règles à la lettre.
> Dernière mise à jour : 2026-04-29 (v2 — refonte premium)

---

## 1. Description du projet

Site **Serujan Kaneshalingam**, courtier hypothécaire **COMMERCIAL** à Montréal.
Landing page haute conversion noir/or éditoriale, signature Fraunces + Inter.

⚠️ **PAS un courtier résidentiel.** Pas de Lead Magnet, pas de Newsletter, pas de Properties/Centris, pas de WhatsApp.
Financement commercial : acquisitions, refinancements, développements, construction.

### Données client
- **Nom** : Serujan Kaneshalingam · Équipe Serujan
- **Téléphone** : (514) 701-6171
- **Email** : expert@serujan.com
- **Bureau** : 111 Rue Chabanel O, Suite 617, Montréal, QC
- **Site** : https://serujan.intralysqc.workers.dev
- **Elev8 Event** : https://elev82025.ca/
- **Elev8 Academy** : https://elev8academie.ca/

---

## 2. Stack technique

| Outil | Version | Rôle |
|---|---|---|
| **React** | 19 | UI — composants fonctionnels |
| **TypeScript** | 5.8+ | Strict obligatoire |
| **Vite** | 7 | Build + dev server |
| **TanStack Router** | 1.168+ | File-based routing type-safe |
| **Tailwind CSS** | v4 | `@theme inline` + `oklch` |
| **motion/react** | 12 | Animations premium (useScroll, useSpring, AnimatePresence) |
| **@fontsource-variable/fraunces** | 5 | Display sérif self-hosted |
| **@fontsource-variable/inter** | 5 | Body sans-serif self-hosted |
| **Cloudflare Workers** | — | Worker unifié (API + assets) avec `run_worker_first` |
| **Cloudflare D1** | — | SQLite serverless |
| **Resend** | 6+ | Emails de notification |
| **Bun** | Latest | Runtime + paquets |

### Architecture worker

`src/worker.ts` avec `assets.run_worker_first: true` dans `wrangler.jsonc` :
- Toute requête passe d'abord par le worker
- Routes `/api/*` traitées en interne
- Reste délégué à `env.ASSETS.fetch()` (SPA Vite)
- **Tous les responses reçoivent les headers de sécurité** (CSP, HSTS, etc.)

Pas de dossier `functions/`. Tout est dans `src/worker.ts` + helpers `src/lib/security.ts`.

---

## 3. Standards de code

### Gestionnaire de paquets
- **Toujours `bun`** — jamais npm/yarn.

### TypeScript
- Mode strict. Pas de `any` sauf eslint-disable justifié.
- Typer les props.
- `bunx tsc --noEmit` doit retourner 0 erreur.

### Structure
```
src/
├── assets/
├── components/
│   ├── landing/      # 9 sections + LegalPage partagé
│   └── ui/           # accordion, sonner
├── hooks/            # useScrollReveal, useIsMobile
├── lib/
│   ├── config.ts            # ⭐ Données client
│   ├── translations.ts      # ⭐ FR/EN — toutes les chaînes
│   ├── security.ts          # ⭐ Helpers sécurité testables
│   ├── LanguageContext.tsx
│   ├── analytics.ts
│   └── utils.ts
├── routes/
│   ├── __root.tsx           # SkipLink + 404 v2
│   ├── index.tsx            # Landing 9 sections
│   ├── merci.tsx            # Confirmation
│   ├── mentions-legales.tsx # Loi 25 / droit québécois
│   ├── confidentialite.tsx
│   ├── admin.tsx            # Layout admin
│   ├── admin.login.tsx
│   └── admin.leads.tsx      # Dashboard leads
├── test/
│   ├── calculator.test.ts
│   ├── translations.test.ts
│   └── security.test.ts     # XSS, validation, anti-bot
├── worker.ts                # API + headers sécurité
├── main.tsx                 # Imports fonts Fontsource
└── styles.css               # ⭐ Design system v2
```

### 9 sections landing (`routes/index.tsx`)
```
1. Hero        — titre tripartite Fraunces + 4 stats intégrées
2. Services    — 3 piliers cartes éditoriales (numéro géant filigrane)
3. About       — citation Fraunces italic + 4 features
4. Process     — timeline avec ligne or qui se trace au scroll
5. Calculator  — donut SVG animé + sliders or + spring physics
6. Elev8       — Event (vidéo + countdown) + Academy fusionnés
7. LeadForm    — pitch sticky + form anti-bot timing
8. Footer      — 4 colonnes éditoriales
+ Navbar, MobileStickyBar, ScrollProgressBar
```

---

## 4. Design system v2

### Polices
- **Display** : `Fraunces Variable` — pour H1/H2/H3 et accents éditoriaux
- **Body** : `Inter Variable` — pour le corps
- Toutes self-hosted via Fontsource (zéro Google Fonts → CSP plus stricte, LCP rapide)

### Palette `oklch`
- **Or 8 tons** : `gold-50` à `gold-deep` + `gold-light`
- **Noirs profonds** : `black-deep`, `black-surface`, `black-elevated`
- **Crème** : accent neutre chaud
- Texte gradient or : classe `.text-gold-gradient`
- Italic Fraunces optique : classe `.font-display-italic`

### Motion
- Animations via `motion/react` (`useInView`, `useScroll`, `useSpring`, `AnimatePresence`)
- Easing standard : `[0.16, 1, 0.3, 1]` (ease-out-expo)
- `prefers-reduced-motion: reduce` désactive tout

### Pattern de section
Chaque section v2 commence par :
```tsx
<motion.div initial={...} animate={inView ? ... : {}} transition={{ ease }}>
  <span className="w-8 h-px bg-gold/50" aria-hidden />
  <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light">
    {label}
  </span>
</motion.div>
<h2 className="font-display text-5xl ...">
  {titleLead} <span className="text-gold-gradient italic font-display-italic">
    {titleEmphasis}
  </span>
</h2>
```

---

## 5. i18n FR/EN

- Tous les textes visibles dans `src/lib/translations.ts`
- Hook `useLanguage()` retourne `{ lang, setLang, t, ta }`
- `t(obj)` pour string, `ta(obj)` pour array/object
- FR par défaut, choix persisté `localStorage` clé `intralys-lang`
- Test `translations.test.ts` valide que toutes les clés ont fr+en

---

## 6. Backend — Worker

### Routes API
| Route | Méthode | Description |
|---|---|---|
| `/api/leads` | POST | Sauvegarde lead (rate limit 10/h, anti-bot) |
| `/api/admin/login` | POST | Auth admin (rate limit 5/h) |
| `/api/admin/logout` | POST | Déconnexion |
| `/api/admin/leads` | GET | Liste leads (token Bearer requis) |

### Sécurité
- **CSP stricte** : whitelist GA4 + assets distants uniquement
- **HSTS** : 1 an + includeSubDomains + preload
- **X-Frame-Options** : DENY
- **Permissions-Policy** : camera/mic/geo désactivés
- **Anti-bot leads** : honeypot `hp` + `elapsed_ms` (< 3 s = silencieux)
- **Rate limits** : 10/h pour leads, 5/h pour login, par IP
- **Sanitisation** : trim + maxLen + HTML escape sur tout input

### Tables D1 (schema.sql + migrations/)
```sql
leads(id, name, email, phone, project_type, estimated_amount, message, created_at)
admin_sessions(token, created_at, expires_at)  -- TTL 24h
login_attempts(id, ip, attempted_at)           -- rate limit login
lead_attempts(id, ip, attempted_at)            -- rate limit form
```

---

## 7. Variables d'environnement

### Serveur (Cloudflare Dashboard)
| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Mot de passe admin |
| `RESEND_API_KEY` | Clé Resend |
| `GHL_WEBHOOK_URL` | *(optionnel)* GoHighLevel |

### Client (`.env.local`)
| Variable | Description |
|---|---|
| `VITE_GA4_ID` | ID GA4 (sinon mettre dans index.html directement) |

---

## 8. Build & déploiement

```bash
bun install            # Dépendances
bun run dev            # Dev server (localhost:5173)
bun run build          # Build production (dist/)
bun run test           # Vitest (52 tests)
bunx tsc --noEmit      # Type-check strict
```

Voir `DEPLOYMENT.md` pour les étapes Cloudflare D1 + secrets + deploy.

---

## 9. Règles absolues

1. **Bun, jamais npm** — `bun add`, `bun install`, `bun run`
2. **0 console.log** en prod (`console.error/warn` dans catch OK)
3. **0 données hardcodées** dans les composants — tout dans `config.ts` ou `translations.ts`
4. **TypeScript strict** — pas de `any` non justifié
5. **Build = 0 erreur** avant push
6. **Tests = 43/43** avant push
7. **i18n complet** — toggle FR/EN = 100% du texte visible change
8. **Sécurité** — CSP stricte, rate limits, sanitisation serveur
9. **Français** — réponses, commits, commentaires en français
10. **Polices self-hosted** — jamais de Google Fonts (CSP)

---

## 10. Ce qui n'existe PAS (NE PAS AJOUTER)

- ❌ Lead Magnet / PDF guide
- ❌ Newsletter
- ❌ Section Properties / Centris
- ❌ WhatsApp button
- ❌ Témoignages (en attente de contenu client)
- ❌ Supabase (D1)
- ❌ Dossier `functions/`
- ❌ Google Fonts (Fontsource self-hosted)
- ❌ ExitIntentPopup (anti-pattern UX)

---

## 11. Références

- **Template source** : `../intralys-template-commercial/`
- **Site demo référence visuelle** : https://demo.intralys.com/serujan
- **Config client** : `src/lib/config.ts`
- **Traductions** : `src/lib/translations.ts`
- **Helpers sécurité testables** : `src/lib/security.ts`
- **Migrations** : `migrations/001`, `002`, `003`
