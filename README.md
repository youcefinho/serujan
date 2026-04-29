# Serujan Kaneshalingam — Site web v2

Landing page premium noir/or pour **Serujan Kaneshalingam**, courtier hypothécaire commercial à Montréal.

> ⚠️ **Lis [CLAUDE.md](./CLAUDE.md) avant tout travail sur ce projet.** Il contient les règles non-négociables (Bun, TS strict, i18n, sécurité).

---

## État actuel

| Item | État |
|---|---|
| Build (`bun run build`) | ✅ 0 erreur, ~1.7 s |
| Type-check (`bunx tsc --noEmit`) | ✅ 0 erreur |
| Tests (`bun run test`) | ✅ 43/43 passent |
| Sections landing | ✅ 9 sections premium (motion/react) |
| Pages secondaires | ✅ merci, mentions-legales, confidentialite, admin |
| i18n FR/EN | ✅ 100 % du contenu visible |
| Sécurité | ✅ CSP stricte, HSTS, anti-bot, rate limit |
| SEO | ✅ Schema.org, OG, Twitter, sitemap, robots |
| Polices | ✅ Fraunces + Inter self-hosted (zéro Google Fonts) |
| Déploiement Cloudflare | ⏳ À faire — voir [DEPLOYMENT.md](./DEPLOYMENT.md) |

---

## Stack technique

- **React 19** + **TypeScript strict**
- **Vite 7** + **Bun** (jamais npm)
- **TanStack Router** 1.168+ (file-based)
- **Tailwind CSS v4** (`oklch`, `@theme inline`)
- **motion/react** 12 — animations premium
- **Fontsource** : Fraunces Variable + Inter Variable, self-hosted
- **Cloudflare Workers** unifié (API + assets, `run_worker_first`)
- **Cloudflare D1** — SQLite serverless
- **Resend** — emails de notification

---

## Structure du projet

```
serujan/
├── CLAUDE.md                # ⭐ Instructions IA (lire en premier)
├── DEPLOYMENT.md            # Guide déploiement Cloudflare
├── README.md                # Ce fichier
├── CLIENT_SWAP.md           # Guide pour swap futur client
├── gemini.md                # Règles globales Intralys
├── package.json             # Bun, deps minimales
├── tsconfig.json
├── wrangler.jsonc           # Config Cloudflare Worker
├── vite.config.ts
├── eslint.config.js
├── components.json          # shadcn config
├── index.html               # Schema.org, OG, preload hero
├── schema.sql               # ⭐ Schéma D1 complet
├── migrations/              # Migrations incrémentales
│   ├── 001_add_qualification_fields.sql
│   ├── 002_add_auth_tables.sql
│   └── 003_add_lead_attempts.sql
├── public/
│   ├── favicon.ico, icon-192.png, icon-512.png
│   ├── manifest.json
│   ├── robots.txt           # Disallow /admin, /api
│   └── sitemap.xml
└── src/
    ├── main.tsx             # Entry React + import polices
    ├── routeTree.gen.ts     # Auto-généré par TanStack Router
    ├── styles.css           # ⭐ Design system v2 (tokens motion, palette or)
    ├── worker.ts            # ⭐ Backend : API + headers sécurité
    ├── assets/              # Images locales du courtier
    ├── components/
    │   ├── landing/         # 13 fichiers (sections + helpers)
    │   │   ├── Navbar.tsx
    │   │   ├── Hero.tsx              # Section 1
    │   │   ├── Services.tsx          # Section 2
    │   │   ├── About.tsx             # Section 3 (Mon Approche)
    │   │   ├── Process.tsx           # Section 4 (timeline scroll)
    │   │   ├── Calculator.tsx        # Section 5 (donut + sliders)
    │   │   ├── Elev8Event.tsx        # Section 6 (Event + Academy)
    │   │   ├── LeadForm.tsx          # Section 7 (CTA + form)
    │   │   ├── Footer.tsx            # Section 8
    │   │   ├── MobileStickyBar.tsx   # Barre fixe mobile
    │   │   ├── ScrollProgressBar.tsx
    │   │   ├── ScrollReveal.tsx
    │   │   ├── LegalPage.tsx         # Layout pages légales
    │   │   └── LanguageToggle.tsx
    │   └── ui/
    │       └── sonner.tsx            # Toaster (notifications)
    ├── hooks/
    │   ├── useScrollReveal.ts
    │   └── use-mobile.tsx
    ├── lib/
    │   ├── config.ts        # ⭐ Données client (téléphone, email, URLs)
    │   ├── translations.ts  # ⭐ FR/EN — TOUS les textes du site
    │   ├── LanguageContext.tsx
    │   ├── security.ts      # ⭐ Helpers sécurité (XSS, validation, anti-bot)
    │   ├── analytics.ts     # GA4 trackers
    │   ├── calendly.ts      # Popup widget + listener
    │   └── utils.ts         # cn() helper
    ├── routes/              # Routes file-based
    │   ├── __root.tsx       # SkipLink + 404 v2
    │   ├── index.tsx        # Landing (compose les 9 sections)
    │   ├── merci.tsx        # Confirmation post-form
    │   ├── mentions-legales.tsx
    │   ├── confidentialite.tsx
    │   ├── admin.tsx        # Layout admin
    │   ├── admin.login.tsx
    │   └── admin.leads.tsx  # Dashboard leads
    └── test/
        ├── setup.ts
        ├── calculator.test.ts    # Logique calc hypothécaire
        ├── translations.test.ts  # Intégrité FR/EN
        └── security.test.ts      # XSS, validation, anti-bot
```

---

## Fichiers clés

| Fichier | Rôle |
|---|---|
| `src/lib/config.ts` | Données client centralisées (téléphone, email, adresse, URLs externes, stats) |
| `src/lib/translations.ts` | TOUTES les chaînes FR/EN du site visible |
| `src/lib/security.ts` | Helpers de sécurité testables (sanitization, validation, anti-bot, CSP) |
| `src/styles.css` | Design system v2 : palette or, motion tokens, animations |
| `src/worker.ts` | Backend Cloudflare Worker : API + headers sécurité |
| `schema.sql` | Schéma D1 complet (leads + admin + rate limits) |
| `wrangler.jsonc` | Config Cloudflare (D1 binding, run_worker_first) |
| `index.html` | Meta SEO, Schema.org FinancialService, preload hero |

---

## Commandes

```bash
bun install            # Installe les dépendances
bun run dev            # Dev server → http://localhost:5173
bun run build          # Build production → dist/
bun run test           # Vitest (43 tests)
bun run lint           # ESLint
bun run format         # Prettier
bunx tsc --noEmit      # Type-check strict
wrangler deploy        # Déploiement Cloudflare (voir DEPLOYMENT.md)
```

---

## 9 sections de la landing page

1. **Hero** — Titre tripartite Fraunces avec emphase italique gold-gradient. 4 stats intégrées (500M$+, 95%, 30 jours, 1000+ projets).
2. **Services** — 3 piliers en cartes éditoriales avec numéro géant en filigrane. Hover : gradient or + sheen sweep + filet doré qui se trace.
3. **About / Mon Approche** — Citation Fraunces italic dans card, layout asymétrique 5/7, 4 features en grille.
4. **Process** — Timeline verticale avec ligne or qui se trace au scroll (motion `useScroll`). Cercles d'étape avec icônes pulsées.
5. **Calculator** — Donut SVG animé en 3 segments d'or. Valeurs animées via `useSpring`. Sliders or custom accessibles.
6. **Elev8** — Fusion Event + Academy : vidéo + countdown, séparateur doré animé, bloc Academy en grille inversée.
7. **LeadForm** — Layout sticky 5/7. Pitch + 2 cards contact direct + formulaire avec anti-bot timing.
8. **Footer** — 4 colonnes asymétriques. Citation Fraunces + réseaux sociaux + liens légaux.
9. **MobileStickyBar** — Barre fixe apparaissant après 600 px de scroll.

---

## Sécurité

- **CSP stricte** : whitelist Calendly + GA4 uniquement
- **HSTS** : 1 an + includeSubDomains + preload
- **X-Frame-Options DENY** + **frame-ancestors 'none'**
- **Rate limit** : 10 leads/h par IP, 5 logins admin/h par IP
- **Anti-bot** : honeypot + timing < 3 s = silencieux (lead non sauvegardé, success retourné)
- **Sanitisation serveur** : trim + maxLen + HTML escape sur tout input
- **Sessions admin** : token D1 avec TTL 24 h + invalidation logout

Voir `src/lib/security.ts` (helpers testables) et `src/worker.ts` (intégration).

---

## Variables d'environnement

### Cloudflare Worker (Dashboard ou `wrangler secret put`)

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Mot de passe admin |
| `RESEND_API_KEY` | Clé Resend |
| `GHL_WEBHOOK_URL` | *(optionnel)* GoHighLevel |

### Client (`.env.local`)

| Variable | Description |
|---|---|
| `VITE_CALENDLY_URL` | URL Calendly de Serujan |

GA4 ID : à remplacer dans `index.html` (deux occurrences `G-XXXXXXXXXX`).

---

## Déploiement

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour la procédure complète.

---

## Documentation associée

- **[CLAUDE.md](./CLAUDE.md)** — instructions IA (règles, structure, design system)
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — guide pas-à-pas Cloudflare
- **[CLIENT_SWAP.md](./CLIENT_SWAP.md)** — référence pour personnaliser le template pour un autre client
- **[gemini.md](./gemini.md)** — règles globales Intralys (multi-projets)

---

## Contact technique

- Email dev : intralys.dev@gmail.com
- Site (à venir) : https://serujan.intralysqc.workers.dev
