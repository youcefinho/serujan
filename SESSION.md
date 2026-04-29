# SESSION.md — État du projet Serujan

> Document de passation généré le 2026-04-29 pour reprise de session sans rien réinventer.
> **À lire en premier au démarrage de chaque nouvelle session, avant tout travail.**

---

## 1. État global — métriques en direct

| Item | Résultat |
|---|---|
| `bun run build` | ✅ 0 erreur (~1.7-2.0 s) |
| `bunx tsc --noEmit` | ✅ 0 erreur |
| `bun run test` | ✅ **53/53** passent (3 fichiers : calculator, security, translations) |
| `bunx eslint . --max-warnings=0` | ✅ 0 erreur, 0 warning |
| Git status | ✅ `main` sync à 100 % avec `origin/main` |
| Tag de référence | `v0.1.0` (état pré-déploiement Cloudflare) |
| Dev server | http://localhost:5174/ (port 5173 occupé sur la session courante) |

---

## 2. Repo GitHub

- **URL** : https://github.com/youcefinho/serujan
- **Branche principale** : `main`
- **Auteur historique** : `youcefinho <nexusdzai@gmail.com>`
- **Tag actuel** : `v0.1.0` (annoté, contient le résumé de l'état pré-deploy)
- **`gh` CLI** : non installé sur la machine — utiliser `git` directement.

### Branches distantes Dependabot (7 PRs ouvertes par le bot)

```
origin/dependabot/github_actions/actions/cache-5
origin/dependabot/github_actions/actions/checkout-6
origin/dependabot/npm_and_yarn/eslint-10.2.1
origin/dependabot/npm_and_yarn/minor-and-patch-09c3601fe9
origin/dependabot/npm_and_yarn/types/node-25.6.0
origin/dependabot/npm_and_yarn/typescript-6.0.3      ⚠ MAJEURE — review manuelle
origin/dependabot/npm_and_yarn/vite-8.0.10           ⚠ MAJEURE — review manuelle
```

À traiter à terme : merger les patches/minors une fois le CI vert sur chaque PR. Les majeures (TypeScript 6, Vite 8) demandent une lecture des release notes avant merge.

---

## 3. Historique de session — commits depuis `df7dfc5`

```
a3bb0cf chore(ci): GitHub Actions CI + Dependabot weekly         ← TAG v0.1.0
0dc922e checkpoint: avant ajout CI workflow + Dependabot + tag v0.1.0
b89d00f chore: discipline commits checkpoint + ignore .claude/ et .lovable/
214e332 feat: alternance sombre/clair — About + Calculator passent en off-white
2e48f5c feat: étoiles dorées scintillantes + inputs éditables sur la calculatrice
d6104db feat: section Bio Serujan + photos locales self-hosted
ae4bd77 docs: mention isValidPhone dans CLAUDE.md
1a9e9d2 chore: corrections post-audit (lint, docs, garde-fou i18n)
72d7584 refactor: nettoyage post-audit — retrait Calendly, validatePhone partagé, fail-fast worker
df7dfc5 chore(handoff): audit final — préparation reprise Antigravity (point de départ session)
```

---

## 4. ✅ Ce qui est terminé et fonctionnel

### Backend & sécurité
- **Worker Cloudflare** ([src/worker.ts](src/worker.ts)) : routes `/api/leads`, `/api/admin/login`, `/api/admin/logout`, `/api/admin/leads`. Fail-fast `if (!env.DB || !env.ADMIN_PASSWORD)` en tête.
- **Helpers sécurité** ([src/lib/security.ts](src/lib/security.ts)) : `sanitizeHtml`, `sanitizeInput`, `isValidEmail`, **`isValidPhone`** (partagé client+serveur), `isLikelyBot`, `buildSecurityHeaders`, `CSP_DIRECTIVES` (whitelist GA4 uniquement, plus de Calendly ni Spotify).
- **Auth admin** : token D1 + TTL 24 h + rate limit 5 logins/h, 10 leads/h par IP.
- **Anti-bot** : honeypot `hp` + timing `elapsed_ms` < 3 s = silencieux.
- **Schema D1** ([schema.sql](schema.sql)) : `leads`, `admin_sessions`, `login_attempts`, `lead_attempts` + index.
- **Migrations** : `002_add_auth_tables.sql`, `003_add_lead_attempts.sql` (la `001` a été supprimée — colonnes orphelines).

### Frontend — sections landing (ordre dans [routes/index.tsx](src/routes/index.tsx))

| # | Section | Fond | Étoiles | Notes |
|---|---|---|---|---|
| 1 | **Hero** | `bg-gradient-hero` | `bg-stars-hero` (haute densité) | Photo locale `/serujan-stage.webp` (100 K), titre Fraunces tripartite, 4 stats inline, double CTA |
| 2 | **Services** | `bg-black-deep` | — | 3 piliers cartes éditoriales avec numéro géant filigrane + sheen au hover |
| 3 | **About** | `bg-off-white` ⭐ | `bg-stars-light` | **Converti en clair** ce sprint — citation Fraunces italic, 4 features, palette `gold-deep` + `text-ink` |
| 4 | **Process** | `bg-black-deep` | — | Timeline verticale, ligne or qui se trace au scroll (`useScroll`) |
| 5 | **Bio** ✨ | `bg-black-deep` | `bg-stars` | **Nouvelle section** ce sprint — photo `/serujan-elev8.jpg`, citation, 5 credentials, 4 milestones (500+ courtiers, 900+ Elev8, etc.) |
| 6 | **Calculator** | `bg-off-white` ⭐ | `bg-stars-light` | **Converti en clair** + **inputs `number` éditables** synchronisés avec sliders. Donut SVG animé + spring physics |
| 7 | **Elev8Event** | `bg-black-deep` | — | Vidéo + countdown 2026 + bloc Academy fusionné |
| 8 | **LeadForm** | `bg-black-surface` | `bg-stars` | Layout sticky 5/7, anti-bot timing, 2 CTA contact direct + form. Validation client utilise `isValidEmail`/`isValidPhone`/`sanitizeInput` partagés |
| 9 | **Footer** | `bg-black-deep` | — | 4 colonnes éditoriales, citation Fraunces, socials |

Plus : Navbar (sticky, avec toggle FR/EN), MobileStickyBar (apparaît après 600 px), ScrollProgressBar.

### i18n
- [src/lib/translations.ts](src/lib/translations.ts) : 613 lignes, FR + EN complets, sections orphelines retirées (`exitIntent`, `podcast`, `elev8Academy`, `freeConsultation`).
- Test garde-fou dans [translations.test.ts](src/test/translations.test.ts) qui assert que ces 4 sections **NE SONT PAS** réintroduites.
- Hook `useLanguage()` avec `t()` + `ta()`, persistance `localStorage["intralys-lang"]`.

### Pages secondaires
- `/merci` (post-soumission lead)
- `/mentions-legales` + `/confidentialite` (Loi 25 Québec, layout via `LegalPage.tsx`)
- `/admin/login` + `/admin/leads` (avec layout `admin.tsx` et bouton retour site)
- 404 stylée dans `__root.tsx`

### Polices & assets
- **Fraunces Variable + Inter Variable** self-hosted via `@fontsource-variable/*` (zéro Google Fonts → CSP plus stricte).
- **Photos client** : `public/serujan-stage.webp` (100 K, hero) + `public/serujan-elev8.jpg` (80 K, Bio).
- **Favicon, icons 192/512, manifest, robots, sitemap** présents.

### Effets visuels
- Étoiles dorées scintillantes via `.bg-stars` / `.bg-stars-hero` / `.bg-stars-light` (3 utilities CSS dans [styles.css](src/styles.css)) — 2 couches `::before` (stables) + `::after` (anim `twinkle` 4-6 s ease-in-out infinite). Désactivées en `prefers-reduced-motion`.
- Halos dorés en radial-gradient blur sur la plupart des sections.
- Sheen sweep au hover sur cards Services.
- Animations `motion/react` : `useInView`, `useScroll`, `useSpring`, `AnimatePresence` partout.

### CI / GitHub
- [.github/workflows/ci.yml](.github/workflows/ci.yml) : à chaque push/PR vers `main`, lance install (`--frozen-lockfile`), tsc, eslint, vitest, vite build. Cache `~/.bun/install/cache` + `node_modules`. Concurrency cancel-in-progress.
- [.github/dependabot.yml](.github/dependabot.yml) : MAJ npm hebdo lundi 9 h Montréal, group minor+patch, bloque majeurs React/React-DOM, met aussi à jour les actions GitHub.

### Documentation
- [CLAUDE.md](CLAUDE.md) — 299 lignes — règles non-négociables, structure, design system, **section 9.bis discipline commits checkpoint + workflow + rollback documenté**.
- [README.md](README.md) — métriques, stack, structure, fichiers clés.
- [DEPLOYMENT.md](DEPLOYMENT.md) — procédure Cloudflare D1 + secrets + deploy en 11 étapes.
- [CLIENT_SWAP.md](CLIENT_SWAP.md) — guide pour personnaliser le template pour un autre client.

---

## 5. ⏳ Ce qui est en cours / inachevé

### Branch Protection sur GitHub (manuel via UI)
**État** : décisions prises, pas encore appliquées par Rochdi.

À cocher sur https://github.com/youcefinho/serujan/settings/rules :
- ✅ Restrict deletions (déjà fait — vu sur screenshot)
- ✅ Block force pushes (déjà fait — vu sur screenshot)
- ⏳ **Require status checks to pass** + sélectionner le job `Build · Type-check · Tests · Lint` (uniquement disponible APRÈS le 1er run du CI vert sur `a3bb0cf`)
- ⏳ Require branches to be up to date before merging
- ⏳ Require linear history

### Secret scanning + Push protection (manuel via UI)
**État** : à activer.
URL : https://github.com/youcefinho/serujan/settings/security_analysis
- ⏳ Activer Secret scanning
- ⏳ Activer Push protection (bloque push si clé API détectée)

---

## 6. 📋 Prévu mais pas encore commencé

### Phase 4 — Déploiement Cloudflare (réservé à Rochdi en local)

À faire dans cet ordre, depuis le terminal de Rochdi :

1. **Créer la base D1** : `wrangler d1 create serujan-leads` → copier le `database_id`.
2. **Mettre à jour [wrangler.jsonc](wrangler.jsonc)** ligne 16 : remplacer `"REMPLACER-PAR-LE-VRAI-ID-DEPUIS-CLOUDFLARE-DASHBOARD"` par le vrai ID.
3. **Initialiser le schéma** : `wrangler d1 execute serujan-leads --file=./schema.sql --remote`.
4. **Configurer les secrets** :
   - `wrangler secret put ADMIN_PASSWORD --name serujan`
   - `wrangler secret put RESEND_API_KEY --name serujan`
   - (optionnel) `wrangler secret put GHL_WEBHOOK_URL --name serujan`
5. **Configurer GA4** : remplacer `G-XXXXXXXXXX` × 2 dans [index.html](index.html) lignes 36 et 41 par l'ID GA4 réel.
6. **Build + deploy** : `bun run build && wrangler deploy`.
7. **Smoke test** : login admin, formulaire lead, email Resend reçu, calculatrice, scroll Process, countdown Elev8, toggle FR/EN, pages légales, 404.
8. **Tagger en `v1.0.0`** une fois la production validée : `git tag -a v1.0.0 -m "v1.0.0 — première mise en prod"` + `git push origin v1.0.0`.

### Polish optionnel (à proposer ou différer)

- Étendre l'alternance sombre/clair à **LeadForm** (formulaire généralement plus lisible sur fond clair).
- Étendre `bg-stars` aux sections sans étoiles : **Services**, **Process**, **Elev8Event** (à doser pour ne pas saturer).
- Lighthouse pass après deploy : cible 95+/100/100/100.
- Domaine custom (`serujan.com`) — voir DEPLOYMENT.md §8.

---

## 7. 🐛 Bugs & points sensibles détectés

### Bloquants pour deploy
- **`wrangler.jsonc:16`** — `database_id: "REMPLACER-PAR-LE-VRAI-ID..."`. Le worker fail-fast renverra 500 « Configuration manquante » sans vrai ID. **À corriger lors de Phase 4 étape 2.**
- **`index.html:36+41`** — GA4 placeholder `G-XXXXXXXXXX`. Non bloquant mais analytics inactives tant que pas remplacé.

### Non-bloquants
- **`emailFrom`** dans [config.ts:85](src/lib/config.ts#L85) utilise `onboarding@resend.dev` (plan gratuit Resend = haut risque spam). À remplacer par un domaine custom validé dans Resend Dashboard avant la mise en prod sérieuse.
- **CSS validate** dans `.vscode/settings.json` doit rester `false` (Tailwind v4 vs validateur natif).
- **`.lovable/plan.md`** signalé par l'IDE comme ouvert mais le dossier `.lovable/` n'existe pas physiquement — c'est probablement un fichier virtuel d'éditeur ; ignoré dans `.gitignore`.
- **3 PRs Dependabot majeures** ouvertes (`typescript-6.0.3`, `vite-8.0.10`, `types/node-25.6.0`) : ne pas merger sans lire les release notes.

### Vérifié OK
- Aucun `console.log` en prod (`console.error/warn` dans catch uniquement, conforme à la règle 2).
- Aucun secret dans l'historique git (scanné).
- `.env`, `.env.*`, `post-deploy.cjs`, `.dev.vars`, `.wrangler/`, `.claude/`, `.lovable/` sont tous dans `.gitignore`.

---

## 8. 🎨 Effets visuels — état détaillé

### Présents
- **Étoiles dorées scintillantes** (`bg-stars-hero`, `bg-stars`, `bg-stars-light`) sur Hero / About / Bio / Calculator / LeadForm.
- **Halos dorés** en radial-gradient blur sur toutes les sections principales.
- **Hero** : titre Fraunces tripartite avec emphase italique gold-gradient, double CTA avec animation hover, 4 stats en grille avec micro-typographie.
- **Services** : numéros géants en filigrane, sheen sweep au hover, filet doré qui se trace.
- **About** (clair ⭐) : citation Fraunces italic dans card, layout asymétrique 5/7, 4 features grid.
- **Process** : ligne or qui se trace au scroll (`useScroll` motion/react), cercles d'étape pulsés.
- **Bio** ✨ (sombre constellé, nouveau) : layout split 5/7 avec photo Elev8 sticky à gauche, citation italique, 5 credentials checklist, 4 milestones grid.
- **Calculator** (clair ⭐) : donut SVG animé en 3 segments, valeurs animées par `useSpring`, sliders + inputs number éditables synchronisés.
- **Elev8Event** : vidéo locale + countdown live vers 2026, bloc Academy en grille inversée.
- **LeadForm** : pitch sticky + form premium avec succès en `AnimatePresence`.
- **Toggle FR/EN** : 100 % du texte change.

### Manquants ou potentiels
- Pas d'étoiles sur Services / Process / Elev8Event / Footer / LegalPage. À doser si extension souhaitée.
- Pas de témoignages clients (volontairement absent — en attente de contenu, voir CLAUDE.md §10).
- Pas de section Properties / Centris (volontairement absente — courtier commercial).
- Pas de WhatsApp button, ExitIntentPopup, Newsletter, Lead Magnet (volontairement absents).

---

## 9. 🔧 État GitHub détaillé

| Item | État | Lien |
|---|---|---|
| Repo connecté | ✅ HTTPS via `origin` | https://github.com/youcefinho/serujan |
| Branche `main` sync | ✅ 100 % | — |
| Tag `v0.1.0` | ✅ pushé (annoté) | https://github.com/youcefinho/serujan/releases/tag/v0.1.0 |
| Workflow CI | ✅ présent | [.github/workflows/ci.yml](.github/workflows/ci.yml) → https://github.com/youcefinho/serujan/actions |
| Dependabot config | ✅ présent | [.github/dependabot.yml](.github/dependabot.yml) — 7 PRs déjà ouvertes |
| Branch protection | ⏳ partiellement (deletions + force-push bloqués), reste à activer status checks | Settings → Rules |
| Secret scanning | ⏳ à activer | Settings → Code security |
| `.gitignore` propre | ✅ `.claude/`, `.lovable/`, `.env*`, `post-deploy.cjs`, `.dev.vars`, `.wrangler/` | [.gitignore](.gitignore) |

---

## 10. Discipline de travail (rappel)

Voir [CLAUDE.md §9.bis](CLAUDE.md). Pattern de commits **non négociable** :

| Quand | Préfixe | Exemple |
|---|---|---|
| Avant modif structurante | `checkpoint:` | `checkpoint: avant refonte navbar` |
| Tâche validée | `feat:` / `fix:` / `refactor:` / `docs:` / `chore:` / `style:` | `feat: alternance sombre/clair` |

**Toujours** en français, **toujours** après `bun run build` 0 erreur + `bun run test` qui passe. Push vers `origin/main`.

Rollback : `git log --oneline` → repérer hash checkpoint → `git reset --hard <hash>` → `git push --force-with-lease origin main` (uniquement si solo).

---

## 11. Comment reprendre une nouvelle session

1. Ouvrir une nouvelle session Claude dans le dossier `c:\Users\rochdi\.gemini\antigravity\scratch\serujan`.
2. Coller le **message de passation** ci-dessous en premier prompt.
3. Claude lira automatiquement `CLAUDE.md` et chargera la mémoire (`feedback_commit_discipline.md`, `reference_serujan_repo.md`).
4. Avant toute modif structurante : `git commit --allow-empty -m "checkpoint: avant <X>"`.
5. Après validation : commit final propre + `git push origin main`.

---
