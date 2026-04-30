# CLAUDE.md — Instructions pour l'IA

> Ce fichier est lu automatiquement par l'IA à chaque ouverture du projet.
> Respecter ces règles à la lettre, **sauf si elles sont objectivement injustifiées** — auquel cas, les contester avec un argument solide et les corriger ici.
> Dernière mise à jour : 2026-04-29 (v3 — règles révisées : retrait interdictions Lead Magnet / Newsletter / WhatsApp jugées injustifiées pour un courtier commercial B2B au Québec)

---

## 1. Description du projet

Site **Serujan Kaneshalingam**, courtier hypothécaire **COMMERCIAL** à Montréal.
Landing page haute conversion noir/or éditoriale, signature Fraunces + Inter.

⚠️ **PAS un courtier résidentiel.** Pas de Properties / Centris (résidentiel uniquement).
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
│   └── ui/           # sonner
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

### 13 sections landing (`routes/index.tsx`)
```
 1. Hero            — typewriter Fraunces + 4 stats CountUp + parallax
 2. WhySerujan      — 3 cartes trust signals (Réseau · Expertise · Résultats)
 3. Services        — 3 piliers cartes éditoriales (numéro géant filigrane)
 4. About           — citation Fraunces italic + 4 features
 5. Process         — timeline 4 étapes avec ligne or qui se trace au scroll
 6. LendersNetwork  — marquee infinite-scroll 10 catégories de prêteurs
 7. Bio             — split photo + 4 milestones CountUp
 8. Testimonials    — 4 avis clients réels (Elev8 Academy)
 9. Calculator      — 6 inputs + LTV + coûts totaux + donut SVG animé
10. Faq             — accordéon premium 6 Q/R commerciales
11. Elev8           — Event (vidéo + countdown) + Academy fusionnés
12. LeadForm        — pitch sticky + form anti-bot timing
13. Footer          — 4 colonnes éditoriales
+ Navbar (burger morphing), MobileStickyBar, ScrollProgressBar, BackToTop, MouseSpotlight
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
leads(
  id, name, email, phone, project_type, estimated_amount, message,
  -- Attribution (migration 004)
  source, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
  referrer, language, tags,
  -- GHL sync (migration 004)
  synced_to_ghl_at, ghl_status, ghl_response,
  created_at
)
admin_sessions(token, created_at, expires_at)  -- TTL 24h
login_attempts(id, ip, attempted_at)           -- rate limit login
lead_attempts(id, ip, attempted_at)            -- rate limit form
```

### GoHighLevel multi-tenant (migration 004)
- `src/lib/config.ts` → section `clientConfig.ghl` (sourcePrefix, clientName, pixelId, defaultTags, defaultCountry)
- `src/worker/ghl.ts` → module pur (splitName, toE164, deriveTags, buildGhlPayload, forwardToGhl avec retry 1×)
- `src/lib/leadClient.ts` → wrapper `submitLead({ source, payload })` utilisé par les 4 composants
- `src/lib/attribution.ts` → capture UTM/referrer/lang à la 1ère visite (sessionStorage)
- `src/components/GhlPixel.tsx` → injection conditionnelle pixel via `VITE_GHL_PIXEL_ID`
- Worker : `ctx.waitUntil()` non bloquant pour forward GHL + UPDATE D1 avec statut sync
- Onboarding nouveau client : voir DEPLOYMENT.md → section "Onboarding d'un nouveau client"

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
6. **Tests = 52/52** avant push
7. **i18n complet** — toggle FR/EN = 100% du texte visible change
8. **Sécurité** — CSP stricte, rate limits, sanitisation serveur
9. **Français** — réponses, commits, commentaires en français
10. **Polices self-hosted** — jamais de Google Fonts (CSP)
11. **Discipline de commits** — voir section 9.bis ci-dessous

---

## 9.bis Discipline de commits & GitHub

Repo : `https://github.com/youcefinho/serujan`. Branche principale : `main`.

### Pattern de commits obligatoire

| Quand | Préfixe | Exemple |
|---|---|---|
| **Avant** une modification importante (sécurité = rollback facile) | `checkpoint:` | `checkpoint: avant refonte navbar` |
| Tâche terminée et validée | `feat:` / `fix:` / `refactor:` / `docs:` / `chore:` / `style:` | `feat: effets visuels étoiles ajoutés` |

Toujours en français. Toujours après `bun run build` 0 erreur + `bun run test` qui passe.

### Workflow type pour une nouvelle modification

```bash
# 1. Avant de toucher quoi que ce soit
git commit --allow-empty -m "checkpoint: avant <description>"

# 2. Travail + validation utilisateur
# (modif du code, build, test visuel)

# 3. Commit final propre
git add <fichiers ciblés>
git commit -m "feat: <description claire>"

# 4. Push
git push origin main
```

### Rollback en cas de problème

```bash
git log --oneline      # repérer le hash du checkpoint
git reset --hard <hash-checkpoint>   # destructif, perd les modifs locales
git push --force-with-lease origin main   # uniquement si tu es seul sur le repo
```

---

## 10. Politiques de contenu et choix techniques

### 🚫 Interdictions structurelles (justifiées)

- ❌ **Section Properties / Centris** — Centris est un service résidentiel. Serujan opère en commercial.
- ❌ **Supabase** — D1 est utilisé à la place (Cloudflare-native, déploiement simplifié).
- ❌ **Dossier `functions/`** — Tout est centralisé dans `src/worker.ts` + `src/lib/security.ts`.
- ❌ **Google Fonts** — Polices self-hosted via Fontsource pour CSP plus stricte + LCP plus rapide.
- ❌ **ExitIntentPopup** — Intrusif, casse la direction artistique éditoriale, anti-pattern d'accessibilité.

### ✅ Pratiques validées

- **Témoignages** — 4 témoignages clients **réels** intégrés (`Testimonials.tsx`), source publiée sur `elev8academie.ca`.
- **WhatsApp** — bouton flottant (FAB) discret, désactivable. Utile pour la cible commerciale B2B internationale de Serujan.

### 🔮 Options ouvertes (non implémentées, en attente de contenu)

- **Lead Magnet PDF** — Pertinent pour B2B premium ("Guide stratégique : structurer un financement commercial 7 chiffres"). Implémentation différée tant que Serujan n'a pas validé un PDF réel.
- **Newsletter** — Possible à terme avec stratégie de content marketing (analyses de marché mensuelles). Pas critique pour le launch.
- **Carte territoriale Québec** — Pertinent pour SEO local. Optionnel.
- **Études de cas chiffrés** — En attente des chiffres réels validés par Serujan (3-4 cas anonymisés).

### 📏 Règle d'or

Toute affirmation publiée (chiffres, noms de prêteurs, délais, certifications) doit être **vérifiable**.
- ✅ Confirmé par Elev8 Academy : "depuis 2016" / "500 M$+ financés" / "900+ participants conférence"
- ⚠️ À vérifier avec Serujan : "15 ans" (incohérence avec 2016), "1000+ projets", "30 jours moyen", "Division Alternative chez Planiprêt" (site Planiprêt n'affiche que "Division Commerciale")
- ❌ Jamais inventer des chiffres ou noms de partenaires sans source.

---

## 11. Références

- **Template source** : `../intralys-template-commercial/`
- **Site demo référence visuelle** : https://demo.intralys.com/serujan
- **Config client** : `src/lib/config.ts`
- **Traductions** : `src/lib/translations.ts`
- **Helpers sécurité testables** : `src/lib/security.ts` — `sanitizeHtml`, `sanitizeInput`, `isValidEmail`, `isValidPhone`, `isLikelyBot`, `buildSecurityHeaders`, `CSP_DIRECTIVES`
- **Migrations** : `migrations/001`, `002`, `003`
