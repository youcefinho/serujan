# SESSION.md — État du projet Serujan

> Document de passation généré le **2026-04-29 (v3 — fin session 3)** pour reprise sans perte.
> **À lire en premier au démarrage de chaque nouvelle session, avant tout travail.**

---

## 1. État global — métriques en direct

| Item | Résultat |
|---|---|
| `bun run build` | ✅ 0 erreur (~1.92 s) |
| `bunx tsc --noEmit` | ✅ 0 erreur |
| `bun run test` | ✅ **53/53** passent (3 fichiers : calculator, security, translations) |
| `bunx eslint . --max-warnings=0` | ✅ 0 erreur, 0 warning |
| Git status | ✅ `main` sync à 100 % avec `origin/main` |
| Tag de référence | `v0.1.0` (état pré-déploiement Cloudflare initial) |
| Dernier commit | `f8410ec` — perf: élimine le freeze de 1er scroll en haut de page |

### Bundles (post-lazy-loading)
| Chunk | Taille | Gzip | Quand |
|---|---|---|---|
| `proxy-*.js` (React + motion + deps) | 122.26 KB | 39.96 KB | initial load |
| `index-*.js` (page Index sync : Hero, WhySerujan, Testimonials, Services, About, Process, LendersNetwork, Bio, Footer, Navbar, FABs) | 100.84 KB | **26.63 KB** | initial load |
| `translations-*.js` | 37.92 KB | 13.46 KB | initial load |
| `Calculator-*.js` | 14.87 KB | 4.54 KB | lazy au scroll |
| `LeadForm-*.js` | 11.67 KB | 3.73 KB | lazy au scroll |
| `Elev8Event-*.js` | 9.29 KB | 2.91 KB | lazy au scroll |
| `ExitIntent-*.js` | 6.08 KB | 2.33 KB | lazy (modal armée après 8s) |
| `MidPageCTA-*.js` | 4.69 KB | 1.91 KB | lazy au scroll |
| `Faq-*.js` | 4.07 KB | 1.63 KB | lazy au scroll |
| `index-*.js` (root) | 4.04 KB | 1.95 KB | initial load |

---

## 2. Repo GitHub

- **URL** : https://github.com/youcefinho/serujan
- **Branche principale** : `main`
- **Auteur historique** : `youcefinho <nexusdzai@gmail.com>`
- **Tag actuel** : `v0.1.0` (pré-deploy initial)
- **`gh` CLI** : non installé sur la machine — utiliser `git` directement.

### Branches Dependabot ouvertes (à traiter à terme)

```
origin/dependabot/github_actions/actions/cache-5
origin/dependabot/github_actions/actions/checkout-6
origin/dependabot/npm_and_yarn/eslint-10.2.1
origin/dependabot/npm_and_yarn/minor-and-patch-09c3601fe9
origin/dependabot/npm_and_yarn/types/node-25.6.0
origin/dependabot/npm_and_yarn/typescript-6.0.3      ⚠ MAJEURE — review manuelle
origin/dependabot/npm_and_yarn/vite-8.0.10           ⚠ MAJEURE — review manuelle
```

À traiter à terme : merger les patches/minors une fois CI vert. Les majeures (TypeScript 6, Vite 8, types/node 25) demandent lecture des release notes avant merge.

---

## 3. Historique commits — sessions 2026-04-29 (depuis `c92c9f8`)

```
f8410ec perf: élimine le freeze de 1er scroll en haut de page (translateZ GPU layers)
517213f perf: scroll fluide + FAQ accordéon GPU-friendly (useScrollThreshold + grid-rows)
859d6a1 a11y: reduced-motion + safe-area iOS + tap-highlight (audit groupe D)
a2cd90e perf: lazy load 6 sections bottom-of-fold (audit groupe C)
982c09f security: durcissement headers + suppression logs client (audit groupe B)
0d35f41 chore: code mort + alignement (audit groupe A)
3bfacc3 checkpoint: avant audit performance/compat/sécurité/qualité
6e1754a feat: refonte conversion v3 — tunnel AIDA optimisé + capture multi-points
72cfaa9 checkpoint: avant refonte conversion (Niveau 1+2 + exit-intent élégant)
cb85869 feat: enrichissements factuels Elev8 — claim #1 Canada, intervenants, podcast, financement 100%
1248dac checkpoint: avant enrichissement Bio podcast + Elev8 intervenants
6ad72d5 docs: SESSION.md v2 (passation session 2)
c82db8e feat: WhatsApp FAB + révision CLAUDE.md
... (session 1 antérieure)
```

---

## 4. ✅ Tunnel de conversion v3 — ordre AIDA optimisé

**13 sections principales + 2 composants captures intermédiaires + 5 composants flottants.**

```
 1. Hero            — Titre statique tripartite "Financement commercial / pour
                     promoteurs et investisseurs / de 1 M$ à 50 M$ au Québec."
                     Sous-titre cadrage + 4 stats sourcées (500M$+, 95%, 2016, 900+ Elev8)
                     Trust strip podcast (Patrick Bet-David, Ryan Serhant)
                     Double CTA : "Évaluer mon projet" + tel:+15147016171
                     Parallax léger image bg + halos GPU pré-composités
 2. WhySerujan      — 3 cartes trust signals (Réseau · Expertise · Résultats)
                     + CTA contextuel "Évaluer mon éligibilité"
 3. Testimonials    — 4 avis clients RÉELS Elev8 + CTA "Devenir le prochain"
                     ⭐ Remonté en position 3 (preuve sociale tôt)
 4. Services        — 3 piliers (sans CTA "Voir un cas similaire" — retirés)
                     + CTA global "Discuter de mon projet"
 5. About           — Citation Fraunces italic + 4 features
                     ⭐ Masquée sur mobile (hidden md:block) — couvert par WhySerujan/Bio
 6. Process         — Timeline 4 étapes + ligne or scroll-trace
                     + CTA contextuel "Lancer mon diagnostic"
 7. LendersNetwork  — Marquee 10 catégories génériques + disclaimer
                     ⭐ Masquée sur mobile — couvert par FAQ Q1
 8. Bio             — Split photo + 4 milestones, dont milestone Podcast
                     enrichi : "Patrick Bet-David et Ryan Serhant"
 9. MidPageCTA      — ⭐ Bandeau capture rapide (nom + tel) "Rappel sous 1 h"
                     Soumet /api/leads avec project_type "Rappel rapide"
                     Lazy-loaded
10. Calculator      — 6 inputs + LTV + capture email léger en fin (prénom + email)
                     "Recevoir cette simulation par courriel" — sec. porte d'entrée
                     Lazy-loaded
11. Faq             — Accordéon premium 6 Q/R commerciales
                     ⭐ Anim grid-template-rows GPU (avant: height 0→auto = laggy)
                     Lazy-loaded
12. Elev8Event      — Event (#1 Canada + intervenants Ryan Serhant/Andy Elliott/
                     Olivier Primeau) + Academy fusionnés
                     Lazy-loaded
13. LeadForm        — Form principal avec :
                     ⭐ 3 obligatoires (nom + tel + montant), email/type/message optionnels
                     ⭐ Trust badge en haut "Réponse personnelle sous 24 h · Confidentialité"
                     Lazy-loaded

Composants flottants (rAF-throttled via useScrollThreshold) :
- Navbar (burger morphing 3 barres) — seuil 50px
- MobileStickyBar — seuil 600px (avec safe-area-inset-bottom iOS)
- ScrollProgressBar — motion useScroll + useSpring (zéro re-render React)
- BackToTop (bas-droite, desktop only) — seuil 800px
- WhatsAppFab (bas-gauche, desktop only) — seuil 800px
- MouseSpotlight (desktop only, halo or + 4 traînées)

Modal (lazy) :
- ExitIntent — armée après 8s, déclenchée 1×/session sur mouseleave top desktop
              ou inactivité 45s mobile. 2 champs (nom + tel) + ESC/click-backdrop ferme.
```

---

## 5. ✅ Composants utilitaires (src/components/ui/ + src/hooks/)

| Composant | Rôle |
|---|---|
| `CountUp.tsx` | Anime un nombre 0→cible quand visible. Parse préfixe/suffixe. Respecte reduced-motion. |
| `MouseSpotlight.tsx` | Halo doré + 4 traînées qui suivent le curseur (desktop seulement, RAF). |
| `RouteMeta.tsx` | Sync `document.title` + `meta description`/`og:*` par route SPA. |
| `sonner.tsx` | Toaster premium noir/or, position bottom-right, glassmorphism. |
| `useScrollThreshold.ts` | ⭐ NOUVEAU — Hook `useScrollThreshold(N)` : retourne `boolean` true si `scrollY > N`, throttlé via rAF, setState seulement sur transition. Utilisé par Navbar, MobileStickyBar, BackToTop, WhatsAppFab. |

⚠️ `Typewriter.tsx` **supprimé** (commit `0d35f41`) — orphelin après refonte conversion v3.

---

## 6. ✅ Design system v3 + perf optimisations

### Palette (inchangée v3 charbon chaud + ivoire — commit `cdf4fcd` session 2)

| Token | Valeur (axe chaud) |
|---|---|
| `--black-deep` | 0.14 / 70 |
| `--black-surface` | 0.18 / 70 |
| `--black-elevated` | 0.23 / 70 |
| `--off-white` | 0.94 / 80 (ivoire chaud Loro Piana) |
| `--off-white-elevated` | 0.97 / 82 (papier crème) |
| `--ink` | 0.22 / 50 (charbon chaud texte) |

### Animations CSS (styles.css)

- `text-gold-gradient-animated` — shimmer 8s loop sur titles
- `btn-shine` — bande lumineuse 4.2s sur CTAs primaires
- `btn-glow` — pulse au hover
- `glass` / `glass-light` — backdrop-blur(**12px**) saturate(140%) + ⭐ `transform: translateZ(0)` (pré-composite GPU)
- `marquee-mask` + `.marquee-track` / `.marquee-reverse`
- `bg-stars` / `bg-stars-hero` / `bg-stars-light` — étoiles dorées avec `translateZ(0)` sur ::before/::after
- `grain-overlay` — texture noise SVG subtile
- `highlight-underline`, `bg-grad-anim`

### Optimisations perf appliquées (commits `517213f` + `f8410ec`)

| Élément | Avant | Après |
|---|---|---|
| FAQ animation | `motion.div` height 0 → "auto" (reflow par frame) | CSS pur grid-template-rows 0fr → 1fr (GPU) |
| FAQ cards | `glass` (backdrop-blur) sur 6 cards | `bg-black-elevated/40 + border` (pas de blur, look équivalent) |
| ScrollProgressBar | `setState` à chaque scroll event | motion `useScroll + useSpring` (zéro re-render React) |
| Navbar/MobileStickyBar/BackToTop/WhatsAppFab | `setState` à chaque pixel scrollé | `useScrollThreshold(N)` rAF + transition seulement |
| `.glass` | blur(14px) sans pré-composite | blur(12px) + `translateZ(0)` |
| Hero halo doré | filter blur(60px) à la volée | filter blur(40px) + `translateZ(0)` |
| Hero parallax image | sans hint GPU | `willChange: "transform"` |
| `bg-stars` ::before/::after | promu au scroll | promu au mount via `translateZ(0)` |

### Accessibilité

- `prefers-reduced-motion` : 6 emplacements + 4 règles styles.css (CountUp, MouseSpotlight, BackToTop, **MidPageCTA**, **ExitIntent**, styles.css)
- `:focus-visible` global outline gold + offset (WCAG)
- `-webkit-tap-highlight-color: transparent` (iOS Safari)
- `-webkit-text-size-adjust: 100%` (anti-zoom auto iOS)
- `env(safe-area-inset-bottom)` body padding mobile + MobileStickyBar

---

## 7. ✅ i18n FR/EN — sections couvertes

`src/lib/translations.ts` — toutes ces sections ont `fr` + `en` complets, validés par test garde-fou :

```
nav, hero (titre tripartite + 4 stats sourcées + trustStrip), valueCards,
whySerujan (+ cta), services, approche, process (+ cta), bio (5 credentials, 4 milestones),
lendersNetwork, testimonials (+ cta), calculator (étendu + capture email),
faq (6 items), elev8 (+ eventSpeakers), leadForm (+ trustBadge + optional + amountRequired),
midPageCTA, exitIntent, mobileStickyBar, common, legal, merci,
footer, mentions/confidentialite, whatsapp
```

Test garde-fou (`translations.test.ts`) — sections retirées (ne pas réintroduire sans composant) :
`["podcast", "elev8Academy", "freeConsultation"]`
*(`exitIntent` retirée de la liste car composant ExitIntent.tsx existe maintenant.)*

---

## 8. ✅ Backend & sécurité — assouplissement validation /api/leads

### Validation `/api/leads` (worker.ts) — ⭐ assouplie commit `6e1754a`

```ts
// Avant : name + email obligatoires
// Après : name + (email OU phone) — permet capture mid-page/exit-intent (nom + tel sans email)
//                                  + capture calculator (nom + email sans tel)
```

### Headers sécurité (`buildSecurityHeaders`) — ⭐ +CORP commit `982c09f`

| Header | Valeur |
|---|---|
| Content-Security-Policy | strict avec whitelist GA4 + filesafe.space |
| Strict-Transport-Security | max-age=31536000; includeSubDomains; preload |
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=(), interest-cohort=() |
| Cross-Origin-Opener-Policy | same-origin |
| **Cross-Origin-Resource-Policy** | **same-site** ⭐ ajouté |
| X-DNS-Prefetch-Control | on |

### Schema D1 (inchangé)

```sql
leads(id, name, email, phone, project_type, estimated_amount, message, created_at)
admin_sessions(token, created_at, expires_at)  -- TTL 24h
login_attempts(id, ip, attempted_at)
lead_attempts(id, ip, attempted_at)
```

---

## 9. 🔍 Données factuelles validées (mises à jour session 3)

**Sources publiques consultées le 2026-04-29** :

| Source | Information vérifiée |
|---|---|
| **elev8academie.ca** | "depuis 2016" · "500 M$+ financés" · "stratégies financement alternatives / 100% sans mise de fonds" · "Fondateur Elev8" · "900+ participants conférence" · ⭐ "Conférence #1 au Canada" (claim Elev8) · ⭐ Podcast invités: Patrick Bet-David, Ryan Serhant · ⭐ Conférence Elev8 intervenants: Ryan Serhant, Andy Elliott, Olivier Primeau · WhatsApp/SMS Elev8 : `+1 438-814-9894` (numéro distinct du mobile, **non utilisé** car Rochdi a confirmé garder 514-701-6171) |
| **demo.intralys.com/serujan** | "95% taux d'approbation" · "15 ans" *(⚠️ contradiction Elev8)* |
| **planipret.com** | Partenaires nommés (TD, Desjardins, Scotia, Manulife, etc.) · "Division Commerciale" *(Bio dit "Division Alternative" — incohérence)* |
| **LinkedIn** | Bloqué (HTTP 999, anti-bot) |

**4 témoignages réels intégrés** dans `Testimonials.tsx` (sources Elev8) :
James R. · Puva Siva · Lauren K. · Nina Martellino

---

## 10. ⚠️ Incohérences à clarifier avec Serujan / Rochdi

**Avant le déploiement final**, ces points doivent être validés :

| # | Incohérence | À résoudre |
|---|---|---|
| 1 | **"15 ans" (demo) vs "depuis 2016 = 9 ans" (Elev8)** | Quelle est l'année de début exacte ? |
| 2 | **Bio dit "Division Alternative chez Planiprêt"** mais site Planiprêt n'affiche que **"Division Commerciale"** | Quel est l'intitulé exact ? |
| 3 | Stats Hero "1000+ projets" et "30 jours moyen" | ⭐ **RETIRÉES Hero** (commit refonte) — remplacées par sourcées (2016, 900+ Elev8) |
| 4 | Bio milestones "500+ courtiers accompagnés" et "Top 1% prêts alternatifs Québec" | À valider |
| 5 | WhatsApp `clientConfig.whatsapp.international = "15147016171"` (= mobile) | ⭐ Confirmé Rochdi : on garde 514-701-6171 (l'écosystème Elev8 a un autre numéro 438-814-9894 mais non utilisé pour le site Serujan) |
| 6 | Liste nominative des prêteurs réellement actifs | Si Serujan accepte, remplacer les catégories LendersNetwork par 10-20 noms |

**Données confirmées et OK** :
- ✅ "500 M$+ financés"
- ✅ "95% taux d'approbation"
- ✅ "depuis 2016" / "Au service depuis"
- ✅ "900+ participants Elev8"
- ✅ "Conférence #1 Canada" (claim Elev8 sourcé)
- ✅ Patrick Bet-David + Ryan Serhant (podcast invités)
- ✅ Ryan Serhant + Andy Elliott + Olivier Primeau (Elev8 conférence)
- ✅ "Stratégies de financement 100% sans mise de fonds" (angle Elev8)
- ✅ Coordonnées : (514) 701-6171 · expert@serujan.com · 111 Rue Chabanel O Suite 617

---

## 11. 📋 Phase 4 — Déploiement Cloudflare (réservé Rochdi en local)

À faire dans cet ordre, depuis le terminal de Rochdi :

1. **Créer la base D1** : `wrangler d1 create serujan-leads` → copier le `database_id`.
2. **wrangler.jsonc:16** : remplacer `"REMPLACER-PAR-LE-VRAI-ID..."` par le vrai ID.
3. **Schéma** : `wrangler d1 execute serujan-leads --file=./schema.sql --remote`.
4. **Secrets** :
   - `wrangler secret put ADMIN_PASSWORD --name serujan`
   - `wrangler secret put RESEND_API_KEY --name serujan`
   - (optionnel) `wrangler secret put GHL_WEBHOOK_URL --name serujan`
5. **GA4** : remplacer `G-XXXXXXXXXX` × 2 dans `index.html` lignes 36 et 41 par l'ID réel.
6. **Build + deploy** : `bun run build && wrangler deploy`.
7. **Smoke test** :
   - Hero (titre statique + 4 stats animent + trust strip podcast visibles)
   - Tous les CTAs scroll vers `#contact`
   - LeadForm (3 obligatoires, optionnels marqués)
   - **MidPageCTA** (bandeau entre Bio et Calculator — submit nom+tel sans email)
   - Calculator + capture email à la fin
   - **ExitIntent** (déplacer souris vers le haut > 8s après chargement)
   - Toggle FR/EN — 100% du texte change
   - Mobile (About + LendersNetwork masquées, MobileStickyBar avec safe-area)
   - Faq accordéon fluide (anim grid-rows)
   - Scroll fluide dès le 1er mouvement (pas de freeze Hero)
8. **Tagger** `v1.0.0` : `git tag -a v1.0.0 -m "v1.0.0 — première mise en prod"` + `git push origin v1.0.0`.

---

## 12. 🔮 Pistes ouvertes — non implémentées

| Item | Bloquant | Trigger |
|---|---|---|
| **Lead Magnet PDF** | PDF à fournir par Serujan | Modal email-gate + téléchargement |
| **Newsletter mensuelle** | Stratégie content + design template Resend | Quand Serujan veut commencer |
| **Études de cas chiffrés** | 3-4 montants réels anonymisés | Section preuve sociale |
| **Carte Québec couverture** | Pas critique | SEO local optionnel |
| **Logos prêteurs nominatifs** | Validation Serujan + assets logos | Remplacer catégories LendersNetwork |
| **Calendly intégré** | Décision Serujan (RDV auto-bookés ?) | Niveau 3, refusé pour l'instant |
| **Pixel Meta + LinkedIn Insight** | Budget paid Serujan ? | Si campagnes prévues |
| **Branch Protection GitHub** | UI manuelle | Settings → Rules |
| **Secret scanning + Push protection** | UI manuelle | Settings → Code security |

---

## 13. 🐛 Bugs & points sensibles

### Bloquants pour deploy
- **`wrangler.jsonc:16`** — `database_id: "REMPLACER..."`. Worker fail-fast renverra 500 sans vrai ID.
- **`index.html:36+41`** — GA4 placeholder `G-XXXXXXXXXX`. Analytics inactives tant que pas remplacé.

### Non-bloquants
- `emailFrom` dans `config.ts:94` utilise `onboarding@resend.dev` (plan gratuit Resend = haut risque spam). À remplacer par domaine custom validé Resend Dashboard avant prod sérieuse.
- IDE diagnostic `FormEvent` déprécié dans LeadForm.tsx + Calculator.tsx (TypeScript 6 hint, sans incidence runtime).
- 3 PRs Dependabot majeures ouvertes (typescript-6, vite-8, types/node-25) — release notes nécessaires avant merge.

### Vérifié OK
- Aucun `console.log` en prod.
- Aucun `console.error/warn` côté client (admin.login + admin.leads silencieux). Logs serveur worker conservés (Cloudflare logs privés).
- Aucun secret dans l'historique git.
- `.env`, `.env.*`, `.dev.vars`, `.wrangler/`, `.claude/`, `.lovable/` dans `.gitignore`.
- CSP autorise déjà `filesafe.space` (logo + photos témoignages).
- CORP same-site ajouté (durcissement Spectre).

---

## 14. 🎯 Récapitulatif des optimisations conversion v3

### Tunnel AIDA (5 portes de sortie au lieu d'1)

1. **CTA Hero principal** : "Évaluer mon projet" → `#contact` (LeadForm)
2. **CTA Hero secondaire** : Téléphone tel:+15147016171 (clic direct)
3. **MidPageCTA** : nom + tel → "Rappel sous 1 h ouvrée"
4. **Calculator capture** : prénom + email → rapport personnalisé (warm lead)
5. **ExitIntent** : nom + tel → rappel 1 h (rattrapage départ)
6. **LeadForm complet** : 3 obligatoires (nom + tel + montant) + optionnels (email, type, message)
7. **MobileStickyBar** : Phone direct + CTA `#contact` (mobile permanent)
8. **WhatsAppFab** : message pré-rempli (desktop)

### CTA contextuels (capture mi-scroll)

- WhySerujan : "Évaluer mon éligibilité"
- Process : "Lancer mon diagnostic"
- Testimonials : "Devenir le prochain"

### Anti-pattern conversion supprimés

- ❌ Typewriter Hero (anti-pattern lisibilité)
- ❌ 3 CTA cartes Services "Voir un cas similaire" (mensonge, pas de cas)
- ❌ Stats Hero non sourcées ("1000+ projets" / "30j moyen")

---

## 15. Discipline de travail (rappel)

Voir [CLAUDE.md §9.bis](CLAUDE.md). Pattern de commits **non négociable** :

| Quand | Préfixe | Exemple |
|---|---|---|
| Avant modif structurante | `checkpoint:` | `checkpoint: avant refonte navbar` |
| Tâche validée | `feat:` / `fix:` / `refactor:` / `docs:` / `chore:` / `style:` / `perf:` / `security:` / `a11y:` | `feat: section témoignages Elev8` |

**Toujours** en français, **toujours** après `bun run build` 0 erreur + `bun run test` qui passe + `bunx eslint . --max-warnings=0` propre. Push vers `origin/main`.

**Règle d'or factualité** :
- ✅ Confirmé Elev8 : "depuis 2016", "500 M$+", "900+ participants", "Conférence #1 Canada", invités Patrick Bet-David / Ryan Serhant / Andy Elliott / Olivier Primeau
- ⚠️ À vérifier : "15 ans", "Division Alternative", "Top 1% Québec", "500+ courtiers"
- ❌ Jamais inventer chiffres ou noms de prêteurs sans source

Rollback : `git log --oneline` → repérer hash checkpoint → `git reset --hard <hash>` → `git push --force-with-lease origin main` (uniquement si solo).

---

## 16. Comment reprendre une nouvelle session

1. Ouvrir une nouvelle session Claude dans `c:\Users\rochdi\.gemini\antigravity\scratch\serujan`.
2. Coller le **prompt de passation** (Rochdi a la version courte ; pointe vers SESSION.md + CLAUDE.md + mémoire).
3. Claude lira automatiquement `CLAUDE.md` + chargera la mémoire (`feedback_commit_discipline.md`, `feedback_factuality.md`, `reference_serujan_repo.md`, `reference_serujan_sources.md`).
4. Avant toute modif structurante : `git commit --allow-empty -m "checkpoint: avant <X>"`.
5. Après validation : commit final propre + `git push origin main`.

### Prompt court pour reprise (à copier-coller en nouvelle session)

```
Je reprends le projet Serujan Kaneshalingam (courtier hypothécaire commercial,
Montréal). Repo : https://github.com/youcefinho/serujan, branche main, dernier
commit f8410ec, tag v0.1.0.

AVANT TOUTE ACTION, lis dans cet ordre :
1. SESSION.md à la racine — état exhaustif fin session 3 (v3). Tunnel
   conversion AIDA optimisé : 13 sections + MidPageCTA + ExitIntent + 5
   flottants. 6 chunks lazy-loaded. Hero v3 statique (sans Typewriter), 4
   stats sourcées (500M$+, 95%, 2016, 900+ Elev8). Mobile : About + Lenders
   masqués. Performance : useScrollThreshold rAF + GPU pre-composite Hero.
2. CLAUDE.md — règles révisées v3.
3. La mémoire (.claude/projects/.../memory/) — 4 entrées :
   - feedback_commit_discipline.md
   - feedback_factuality.md
   - reference_serujan_repo.md
   - reference_serujan_sources.md (incluant invités podcast/conférence)

Confirme-moi par écrit, en 6 lignes max, que tu as lu ces 3 sources et que
tu as compris :
- L'état actuel (build 0 erreur, tests 53/53, ESLint 0/0, main sync à f8410ec)
- Le tunnel conversion v3 + 5 portes de sortie (LeadForm/MidPageCTA/Calculator
  capture/ExitIntent/tel direct)
- Le pattern checkpoint:/feat: avant chaque modif structurante
- La RÈGLE D'OR FACTUALITÉ : jamais inventer chiffres ou noms de prêteurs
- Que la Phase 4 (deploy Cloudflare D1 + secrets + wrangler deploy) est
  réservée à Rochdi en local
- Les 3 PRs Dependabot majeures ouvertes (typescript-6, vite-8, types/node-25)
  à NE PAS merger sans review release notes

Puis attends mes instructions.
```

---
