# SESSION.md — État du projet Serujan

> Document de passation généré le **2026-04-29 (v2 — fin session 2)** pour reprise sans perte.
> **À lire en premier au démarrage de chaque nouvelle session, avant tout travail.**

---

## 1. État global — métriques en direct

| Item | Résultat |
|---|---|
| `bun run build` | ✅ 0 erreur (~1.87 s · 286 KB main / 91.89 KB gzip) |
| `bunx tsc --noEmit` | ✅ 0 erreur |
| `bun run test` | ✅ **53/53** passent (3 fichiers : calculator, security, translations) |
| `bunx eslint . --max-warnings=0` | ✅ 0 erreur, 0 warning |
| Git status | ✅ `main` sync à 100 % avec `origin/main` |
| Tag de référence | `v0.1.0` (état pré-déploiement Cloudflare initial) |
| Dernier commit | `c82db8e` — feat: WhatsApp FAB + révision CLAUDE.md |

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

## 3. Historique commits — session du 2026-04-29 (depuis `c92c9f8`)

```
c82db8e feat: WhatsApp FAB + révision CLAUDE.md (retire interdictions injustifiées)
4c6abfc checkpoint: avant révision règles CLAUDE.md
cc187a1 feat: 4 ajouts inspirés demo Intralys + Elev8 (Pourquoi Serujan, Témoignages, Calculator complet)
8a5306e checkpoint: avant 4 ajouts
428056c fix: retire affirmations non vérifiables FAQ + LendersNetwork (factuel uniquement)
f09fe10 feat: section Réseau institutionnel + FAQ accordéon (inspiration Intralys)
f6e4150 checkpoint: avant FAQ + Réseau
cdf4fcd style: palette adoucie - charbon chaud + ivoire premium
a0778b1 checkpoint: avant calibrage palette
83e22ad feat: SEO meta dynamiques + Sonner toasts + back-to-top + burger animé + lazy vidéo + grain
db65ddd checkpoint: avant SEO/Sonner/back-to-top
f80c2d9 feat: polish effets premium - Bio CountUp/glass, Hero parallax/glass, gradient anim CTA/titres
7c303bd feat: typewriter hero — cycle de 4 phrases (Antigravity)
49d1ab1 fix: spotlight souris plus fluide + lien Elev8 corrigé (Antigravity)
a4a297f feat: effets premium — spotlight + CountUp + shimmer + gradient animé (Antigravity)
6dfeac1 feat: MouseSpotlight (Antigravity)
0111d23 style: fond noir adouci + étoiles partout (Antigravity)
6418538 checkpoint: avant effets visuels premium
```

---

## 4. ✅ Structure landing finale — 13 sections

```
 1. Hero            — typewriter Fraunces (4 phrases) + 4 stats CountUp + parallax bg image
 2. WhySerujan      — 3 cartes trust signals (Réseau · Expertise · Résultats)
 3. Services        — 3 piliers cartes éditoriales (numéro géant filigrane)
 4. About           — citation Fraunces italic + 4 features
 5. Process         — timeline 4 étapes ligne or qui se trace au scroll
                     (DIAGNOSTIC FINANCIER · STRUCTURE & STRATÉGIE · NÉGOCIATION · CLÔTURE & EXÉCUTION)
 6. LendersNetwork  — marquee infinite-scroll 10 catégories de prêteurs (volontairement non nominal)
 7. Bio             — split photo + 4 milestones CountUp + glass cards
 8. Testimonials    — 4 avis clients RÉELS (Elev8 Academy) avec photos + 5 étoiles dorées
 9. Calculator      — 6 inputs (Prix, Mise de fonds, Taux, Amort., Taxes, Assurance)
                     + 7 résultats (Mensuel, Hypothèque, Taxes, Assurance, Coût intérêts, Coût total, LTV)
                     + donut SVG animé + sliders or éditables
10. Faq             — accordéon premium 6 Q/R commerciales (sans chiffres inventés)
11. Elev8           — Event (vidéo lazy + countdown 2026) + Academy fusionnés
12. LeadForm        — pitch sticky + form anti-bot timing + Sonner toast success/error
13. Footer          — 4 colonnes éditoriales

Composants flottants : Navbar (burger morphing 3 barres), MobileStickyBar,
ScrollProgressBar, BackToTop (bas-droite, 800px), WhatsAppFab (bas-gauche, 800px),
MouseSpotlight (desktop only, halo or + 4 traînées)
```

---

## 5. ✅ Composants utilitaires (src/components/ui/)

| Composant | Rôle |
|---|---|
| `CountUp.tsx` | Anime un nombre 0→cible quand visible. Parse préfixe/suffixe (ex "500M$+"). Respecte reduced-motion. |
| `Typewriter.tsx` | Cycle entre N phrases : tape, pause, efface, suivante. Curseur clignotant. |
| `MouseSpotlight.tsx` | Halo doré + 4 traînées qui suivent le curseur (desktop seulement). |
| `RouteMeta.tsx` | Sync `document.title` + `meta description`/`og:*` par route SPA, restaure au démontage. |
| `sonner.tsx` | Toaster premium noir/or, position bottom-right, glassmorphism. |

---

## 6. ✅ Design system v3 — palette adoucie

### Tokens OKLCH (commit `cdf4fcd`)

| Token | Avant (axe 260° bleu) | Après (axe chaud) |
|---|---|---|
| `--black-deep` | 0.10 / 260 | **0.14 / 70** (charbon chaud) |
| `--black-surface` | 0.14 / 260 | **0.18 / 70** |
| `--black-elevated` | 0.19 / 260 | **0.23 / 70** |
| `--off-white` | 0.98 / 85 (presque blanc) | **0.94 / 80** (ivoire chaud Loro Piana) |
| `--off-white-elevated` | 0.94 (plus sombre que fond) | **0.97 / 82** (papier crème — élévation lumineuse) |
| `--ink` | 0.18 / 260 | **0.22 / 50** (charbon chaud texte) |

### Animations CSS (styles.css)

- `text-gold-gradient-animated` — shimmer 8s loop sur titles
- `btn-shine` — bande lumineuse 4.2s sur CTAs primaires
- `btn-glow` — pulse au hover
- `glass` / `glass-light` — backdrop-blur(14px) saturate(140%)
- `marquee-mask` + `.marquee-track` / `.marquee-reverse` — infinite scroll horizontal
- `bg-stars` / `bg-stars-hero` / `bg-stars-light` — étoiles dorées scintillantes
- `grain-overlay` — texture noise SVG subtile (Bio + LeadForm)
- `highlight-underline` — filet doré qui se trace
- `bg-grad-anim` — gradient pan slow

---

## 7. ✅ i18n FR/EN — sections couvertes

`src/lib/translations.ts` — toutes ces sections ont `fr` + `en` complets, validés par test garde-fou :

```
nav, hero (+ typewriterPhrases [4]), valueCards, whySerujan, services,
approche, process (4 steps), bio (5 credentials, 4 milestones),
lendersNetwork (10 categories), testimonials (4 items), calculator (étendu),
faq (6 items), elev8, leadForm, mobileStickyBar, common, legal, merci,
footer, mentions/confidentialite, whatsapp
```

Test `translations.test.ts` valide aussi que les sections orphelines retirées
ne sont pas réintroduites : `["exitIntent", "podcast", "elev8Academy", "freeConsultation"]`.

---

## 8. ✅ Backend & sécurité — inchangé cette session

- Worker [src/worker.ts](src/worker.ts) : fail-fast `if (!env.DB || !env.ADMIN_PASSWORD)` en tête.
- Helpers [src/lib/security.ts](src/lib/security.ts) : `sanitizeHtml`, `sanitizeInput`, `isValidEmail`, `isValidPhone`, `isLikelyBot`, `buildSecurityHeaders`, `CSP_DIRECTIVES`.
- Schema D1 + 2 migrations actives (`002_add_auth_tables`, `003_add_lead_attempts`).
- CSP `img-src` autorise `https://assets.cdn.filesafe.space` (logo + photos témoignages Elev8).

---

## 9. 🔍 Données factuelles validées

**Sources publiques consultées le 2026-04-29** :

| Source | Information vérifiée |
|---|---|
| **elev8academie.ca** | "Courtier hypothécaire **depuis 2016**" (~9 ans en 2026) · "**500 M$+ financés**" · "Spécialiste financement alternatif" · "Fondateur Elev8" · "**900+ participants** conférence" · "100% financement commercial" |
| **demo.intralys.com/serujan** | "**95% taux d'approbation**" · "**15 ans d'expérience**" *(⚠️ contradiction avec Elev8 "2016=9 ans")* |
| **planipret.com** | Partenaires nommés : TD, Desjardins, Scotia, Manulife, Home Trust, MCAP, Alterna, First National, Laurentian, National, EQB, Capital Express, Merix, Pentor, FCT, Castleton, Neighbourhood Holdings, CHIP. **"Division Commerciale"** mentionnée *(Bio dit "Division Alternative" — incohérence)* |
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
| 3 | Stats Hero "1000+ projets" et "30 jours moyen" | Non confirmés sources publiques — validés par Serujan ? |
| 4 | Bio milestones "500+ courtiers accompagnés" et "Top 1% prêts alternatifs Québec" | À valider |
| 5 | WhatsApp `clientConfig.whatsapp.international = "15147016171"` (= mobile) | Numéro WhatsApp business séparé existe ? Sinon laisser tel quel |
| 6 | Liste nominative des prêteurs réellement actifs | Si Serujan accepte, remplacer les catégories LendersNetwork par 10-20 noms |

**Données confirmées et OK** :
- ✅ "500 M$+ financés" (Hero + WhySerujan)
- ✅ "95% taux d'approbation" (Hero + WhySerujan)
- ✅ "depuis 2016" (WhySerujan, après correction)
- ✅ "900+ Elev8" (Bio milestone)
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
7. **Smoke test** : login admin, formulaire lead, email Resend, calculator (LTV !), countdown Elev8, FR/EN, témoignages, WhatsApp link, BackToTop, MouseSpotlight.
8. **Tagger** `v1.0.0` : `git tag -a v1.0.0 -m "v1.0.0 — première mise en prod"` + `git push origin v1.0.0`.

---

## 12. 🔮 Pistes ouvertes — non implémentées (en attente de contenu)

| Item | Bloquant | Trigger |
|---|---|---|
| **Lead Magnet PDF** | PDF à fournir par Serujan | Quand on a un guide réel ("Structurer un financement commercial 7 chiffres"), je crée la modal email-gate + téléchargement |
| **Newsletter mensuelle** | Stratégie content + design template Resend | Quand Serujan veut commencer le content marketing |
| **Études de cas chiffrés** | 3-4 montants réels anonymisés | Section preuve sociale "12M$ refi 18j", etc. |
| **Carte Québec couverture** | Pas critique | SEO local optionnel |
| **Logos prêteurs nominatifs** | Validation Serujan + assets logos | Remplacer les catégories LendersNetwork |
| **Branch Protection GitHub** | UI manuelle | Settings → Rules : Require status checks après 1er CI vert |
| **Secret scanning + Push protection** | UI manuelle | Settings → Code security |

---

## 13. 🐛 Bugs & points sensibles

### Bloquants pour deploy
- **`wrangler.jsonc:16`** — `database_id: "REMPLACER..."`. Worker fail-fast renverra 500 sans vrai ID.
- **`index.html:36+41`** — GA4 placeholder `G-XXXXXXXXXX`. Analytics inactives tant que pas remplacé.

### Non-bloquants
- `emailFrom` dans [config.ts:85](src/lib/config.ts#L85) utilise `onboarding@resend.dev` (plan gratuit Resend = haut risque spam). À remplacer par domaine custom validé Resend Dashboard avant prod sérieuse.
- IDE diagnostic `FormEvent` déprécié dans LeadForm.tsx:64 (TypeScript 6 hint, sans incidence runtime).
- 3 PRs Dependabot majeures ouvertes (typescript-6, vite-8, types/node-25) — release notes nécessaires avant merge.

### Vérifié OK
- Aucun `console.log` en prod (seul `console.error/warn` dans catch).
- Aucun secret dans l'historique git.
- `.env`, `.env.*`, `.dev.vars`, `.wrangler/`, `.claude/`, `.lovable/` dans `.gitignore`.
- CSP autorise déjà `filesafe.space` (logo + photos témoignages).

---

## 14. 🎨 Récapitulatif des 21 effets visuels actifs

### Texte / Titres
1. Gradient or animé (shimmer 8s) sur tous les `titleEmphasis`
2. Italic optique Fraunces (`font-display-italic`)
3. Typewriter cycle 4 phrases Hero
4. CountUp stats Hero (4) + milestones Bio (4)

### Scroll / Transitions
5. Fade-up + slide-in sur toutes les 13 sections (`useInView`)
6. Parallax léger image Hero (translateY 0→30%)
7. Timeline ligne or qui se trace au scroll (Process)
8. Smooth scroll natif + scroll-padding-top
9. ScrollProgressBar 3px gold top page

### CTA / Boutons
10. `btn-shine` — bande lumineuse continue 4.2s
11. `btn-glow` — pulse au hover
12. Hover lift `-translate-y-0.5` + ArrowRight `translate-x-1`
13. Sheen sweep one-shot cards Services
14. Anneau pulsé (`animate-pulse-gold`) sur icônes Process + bouton play Elev8

### Background / Ambiance
15. Étoiles dorées 3 variantes (hero / dark / light) partout
16. Halos radial blur or sur chaque section
17. Glassmorphism cards (Hero stats, Bio milestones, Faq, Testimonials, WhySerujan)
18. Grain overlay subtil (Bio + LeadForm)
19. MouseSpotlight desktop (halo + 4 traînées lerp)

### Navigation / UX
20. Navbar dynamique scroll>50px (blur + border)
21. Burger 3 barres morphing en X (CSS pure, ARIA correct)

### En plus
- Sonner toaster premium noir/or câblé sur LeadForm
- BackToTop bas-droite (800px scroll)
- WhatsAppFab bas-gauche (800px scroll)
- MobileStickyBar mobile (600px scroll)
- AnimatePresence sur form success / status

---

## 15. Discipline de travail (rappel)

Voir [CLAUDE.md §9.bis](CLAUDE.md). Pattern de commits **non négociable** :

| Quand | Préfixe | Exemple |
|---|---|---|
| Avant modif structurante | `checkpoint:` | `checkpoint: avant refonte navbar` |
| Tâche validée | `feat:` / `fix:` / `refactor:` / `docs:` / `chore:` / `style:` | `feat: section témoignages Elev8` |

**Toujours** en français, **toujours** après `bun run build` 0 erreur + `bun run test` qui passe + `bunx eslint . --max-warnings=0` propre. Push vers `origin/main`.

**Règle d'or factualité** (apprise dur cette session) :
- ✅ Confirmé Elev8 : "depuis 2016", "500 M$+", "900+ participants"
- ⚠️ À vérifier : "15 ans", "1000+ projets", "Division Alternative"
- ❌ Jamais inventer chiffres ou noms de prêteurs sans source

Rollback : `git log --oneline` → repérer hash checkpoint → `git reset --hard <hash>` → `git push --force-with-lease origin main` (uniquement si solo).

---

## 16. Comment reprendre une nouvelle session

1. Ouvrir une nouvelle session Claude dans `c:\Users\rochdi\.gemini\antigravity\scratch\serujan`.
2. Coller le **prompt de passation** (voir bloc dédié plus bas — Rochdi a la version courte).
3. Claude lira automatiquement `CLAUDE.md` + chargera la mémoire (`feedback_commit_discipline.md`, `feedback_factuality.md`, `reference_serujan_repo.md`, `reference_serujan_sources.md`).
4. Avant toute modif structurante : `git commit --allow-empty -m "checkpoint: avant <X>"`.
5. Après validation : commit final propre + `git push origin main`.

---
