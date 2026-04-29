# EXISTING_EFFECTS.md — Inventaire des effets visuels du site Serujan

> **Phase 1 du handoff Claude Design v2.** Document généré pour cartographier
> tous les effets visuels existants AVANT toute modification, afin de garantir
> qu'aucune amélioration ne casse ce qui est déjà en place.
>
> **Branche actuelle** : `refonte-premium` (créée à partir de `main`).
> **Aucun fichier source n'a été modifié à cette étape.**

---

## 1. Stack technique identifié

- **Framework** : React 19 + TanStack Router 1.168 (SPA, file-based routing)
- **Build** : Vite 7 + autoCodeSplitting (TanStack Router plugin)
- **Styles** : Tailwind CSS v4 (`@theme inline` + tokens `oklch`)
- **Animations** : `motion/react` v12 (= Framer Motion successor)
- **Polices** : Fontsource self-hosted — **Fraunces Variable** (display) + **Inter Variable** (body)
- **Backend** : Cloudflare Worker (`src/worker.ts`) avec D1 + Resend + GHL webhook optionnel
- **CSS principal** : `src/styles.css` (665 lignes, tokens + utilities + keyframes)

---

## 2. Tokens couleurs CSS — VALEURS EXACTES (NE PAS REMPLACER)

⚠️ **RÈGLE D'OR** : ces valeurs sont volontaires et travaillées (palette v3 charbon
chaud + ivoire, axe orange/jaune en `oklch`). Ne jamais remplacer par des
valeurs hex génériques. Toute modif doit utiliser les variables existantes.

### 2.1 — Or signature (8 tons) — `src/styles.css:77-83`

| Token | Valeur OKLCH | Usage |
|---|---|---|
| `--gold-50` | `oklch(0.97 0.02 85)` | Très clair |
| `--gold-100` | `oklch(0.93 0.04 85)` | Subtil |
| `--gold-200` | `oklch(0.88 0.07 85)` | Léger |
| `--gold-300` | `oklch(0.83 0.10 85)` | Médium-léger |
| `--gold` | `oklch(0.78 0.13 82)` | **Or principal — chaud, riche** |
| `--gold-light` | `oklch(0.86 0.14 85)` | Hover/glow |
| `--gold-deep` | `oklch(0.62 0.14 75)` | Or sourd, ombres |

### 2.2 — Noirs charbon chauds (axe orange) — `src/styles.css:86-88`

| Token | Valeur OKLCH | Usage |
|---|---|---|
| `--black-deep` | `oklch(0.14 0.008 70)` | **Fond principal — charbon chaud** |
| `--black-surface` | `oklch(0.18 0.012 70)` | Sections alternées |
| `--black-elevated` | `oklch(0.23 0.014 70)` | Cards élevées |

### 2.3 — Sections claires — beige ivoire premium — `src/styles.css:95-99`

| Token | Valeur OKLCH | Usage |
|---|---|---|
| `--off-white` | `oklch(0.94 0.018 80)` | **Fond clair — ivoire chaud Loro Piana** |
| `--off-white-elevated` | `oklch(0.97 0.013 82)` | Cards en élévation — papier crème |
| `--ink` | `oklch(0.22 0.012 50)` | Charbon chaud pour texte |
| `--ink-muted` | `oklch(0.45 0.015 50)` | Texte secondaire |
| `--ink-soft` | `oklch(0.60 0.014 55)` | Texte tertiaire / labels |

### 2.4 — Crème éditorial — `src/styles.css:91-92`

| Token | Valeur OKLCH | Usage |
|---|---|---|
| `--cream` | `oklch(0.94 0.02 85)` | Accent neutre chaud |
| `--cream-muted` | `oklch(0.78 0.015 85)` | Variante adoucie |

### 2.5 — Tokens shadcn (autour des thèmes ci-dessus) — `src/styles.css:101-120`

- `--background = var(--black-deep)`
- `--foreground = oklch(0.96 0.008 85)`
- `--card = oklch(0.20 0.012 70)` (cards sombres signature)
- `--primary = var(--gold)` ; `--accent = var(--gold)`
- `--border = oklch(1 0 0 / 8%)` (border blanc translucide 8%)
- `--ring = var(--gold)`

### 2.6 — Typographie — `src/styles.css:122-124`

- `--font-display: "Fraunces Variable", "Fraunces", Georgia, serif`
- `--font-sans: "Inter Variable", "Inter", system-ui, sans-serif`

### 2.7 — Gradients signature — `src/styles.css:127-131`

- `--gradient-hero` : double radial-gradient (ellipse top center or chaud + ellipse top right)
- `--gradient-gold` : `linear-gradient(135deg, --gold → --gold-light)`
- `--gradient-gold-subtle` : variante 0.10/0.02 alpha
- `--gradient-sheen` : `linear-gradient(110deg, transparent 30%, oklch(0.95 0.05 85 / 0.18) 50%, transparent 70%)`

### 2.8 — Ombres premium — `src/styles.css:134-137`

- `--shadow-gold` : `0 20px 60px -20px oklch(0.78 0.13 82 / 0.4)`
- `--shadow-gold-sm` : `0 8px 30px -10px oklch(0.78 0.13 82 / 0.35)`
- `--shadow-elevate` : `0 30px 80px -30px oklch(0 0 0 / 0.7)`
- `--shadow-card` : double box-shadow (inset 1px highlight + 12px deep glow)

### 2.9 — Tokens motion — `src/styles.css:140-146`

- `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` ⭐ ease signature
- `--ease-in-out-quad: cubic-bezier(0.45, 0, 0.55, 1)`
- `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`
- Durées : `--duration-fast: 150ms` / `base: 300ms` / `slow: 600ms` / `deliberate: 900ms`

---

## 3. Classes utilitaires signature — NE PAS RÉÉCRIRE

### 3.1 — Background décoratifs — `src/styles.css:277-456`

| Classe | Effet | Animation | Pré-composite GPU |
|---|---|---|---|
| `.bg-stars` | 15 radial-gradients étoiles or claires | `twinkle 6s alternate` | ✅ `translateZ(0)` |
| `.bg-stars-light` | 10 radial-gradients étoiles or sombres | `twinkle 8s alternate` | ✅ `translateZ(0)` |
| `.bg-stars-hero` | 16 étoiles fixes (::before) + 7 grosses scintillantes (::after) | `twinkle 4.2s` | ✅ `translateZ(0)` |
| `.bg-stars-floating` | Les pseudos animent en float-y | `float-y 9-11s + twinkle 5s` | — |
| `.grain-overlay::before` | Texture noise SVG inline subtile | aucune | — |
| `.bg-grad-anim` | 5-stop linear-gradient charbon qui pan slow | `bg-grad-pan 18s` | — |

### 3.2 — Glassmorphism — `src/styles.css:355-374`

| Classe | Background | Backdrop | Border | Shadow | GPU pré-composite |
|---|---|---|---|---|---|
| `.glass` | `oklch(0.16 0.010 70 / 0.55)` | `blur(12px) saturate(140%)` | `oklch(1 0 0 / 0.06)` | inset 1px highlight + deep | ✅ `translateZ(0)` |
| `.glass-light` | `oklch(0.96 0.018 80 / 0.65)` | `blur(12px) saturate(140%)` | `oklch(0.62 0.14 75 / 0.18)` | inset 1px lighter + medium | ✅ `translateZ(0)` |

### 3.3 — Texte gradient or — `src/styles.css:267-273` & `334-349`

| Classe | Effet | Animation |
|---|---|---|
| `.text-gold-gradient` | `linear-gradient(135deg, --gold-light → --gold → --gold-deep)` clip-text | aucune |
| `.text-gold-gradient-animated` | Même gradient, taille 220% | `gradient-shimmer 8s infinite` |
| `.font-display-italic` | Fraunces italic + `font-variation-settings: "SOFT" 100` | — |

### 3.4 — Boutons CTA — `src/styles.css:551-585`

| Classe | Effet pseudo-élément | Animation |
|---|---|---|
| `.btn-shine` | `::before` bande lumineuse 35% width, blanc/45% alpha, skew | `shine-pass 4.2s infinite, delay 1.5s` |
| `.btn-glow` (au hover) | `box-shadow` qui pulse | `glow-pulse 1.8s infinite` |
| `.sheen` (au hover) | `::after` gradient or glissé sur background-position | transition 900ms `ease-out-expo` |

### 3.5 — Highlight underline — `src/styles.css:377-394`

`.highlight-underline::after` — filet doré qui se trace en `scaleX(0 → 1)` après 0.6s, animation `underline-trace 1.4s ease-out-expo`. Border-radius 2px.

### 3.6 — Marquee infinite — `src/styles.css:600-622`

- `.marquee-track` + `.marquee-content` : `marquee-x 48s linear infinite` (ou 56s reverse)
- `:hover .marquee-content { animation-play-state: paused }` ⭐
- `.marquee-mask` : masque latéral fade 8% gauche/droite
- Désactivé en `prefers-reduced-motion`

### 3.7 — Animation pulse or — `src/styles.css:475-479`

`.animate-pulse-gold` : `pulse-gold 2.4s infinite` (box-shadow qui s'expand de 0 à 14px puis fade)

### 3.8 — Stagger delays — `src/styles.css:658-663`

`.stagger-1` à `.stagger-6` : `animation-delay: 80ms × N`

---

## 4. Keyframes (toutes les animations CSS) — `src/styles.css:475-526`

| Keyframe | Description |
|---|---|
| `pulse-gold` | Box-shadow expand 0→14px puis fade |
| `fade-in` | opacity 0→1 |
| `fade-up` | opacity 0→1 + translateY(24px → 0) |
| `scale-in` | opacity 0→1 + scale(0.96 → 1) + translateY(12px → 0) |
| `sheen-sweep` | background-position -200% → 200% |
| `twinkle` | opacity 0.4↔1 + scale 0.96↔1.04 |
| `gradient-shimmer` | background-position 0%↔100% |
| `underline-trace` | scaleX(0 → 1) |
| `shine-pass` | translateX(-130% → 220%) + skewX -18deg + opacity ramps |
| `glow-pulse` | box-shadow gold-sm ↔ gold + glow halo 28px |
| `float-y` | translateY(0 → -10px) |
| `bg-grad-pan` | background-position 0%↔100% |
| `marquee-x` | translateX(0 → -50%) |

---

## 5. Effets motion/react par composant

### 5.1 — Hero (`src/components/landing/Hero.tsx`)

- `useScroll` + `useTransform` → parallax `bgY: 0% → 30%` sur image bg (will-change: transform)
- `motion.div` parallax (image opacity 0.18, will-change)
- 2 halos blur : `filter: blur(40px)` + `transform: translateZ(0)` (pré-composite GPU)
- 2 filets dorés horizontaux gradient transparent
- `bg-stars-hero` (étoiles deux couches)
- `Typewriter` cycle 4 phrases en sous-titre or italique
- Stats grid : 4× `.glass` avec `CountUp`
- 6 `motion.div` avec `fadeUp(delay)` séquentiel (0 / 0.08 / 0.18 / 0.28 / 0.4 / 0.5 / 0.58 / 0.65 / 0.78 / 0.84)
- Trust strip Mic + GraduationCap (preuve sociale + credentials)
- 2 CTAs : `.btn-shine .btn-glow` primaire or + secondaire transparent border gold/30
- ArrowDown scroll hint avec `animate-bounce`

### 5.2 — Bio (`src/components/landing/Bio.tsx`)

- `useInView` once amount: 0.1
- Halo blur-80px décentré (radial gold 0.07 alpha)
- Photo Elev8 avec border `gold/20` + `shadow-elevate`
- Voile gradient bas sur photo (lisibilité)
- `grain-overlay` actif
- Citation `<figure>` border-l-2 gold/40 + Quote icon
- 4 milestones grid avec `.glass` cards + `CountUp`
- 5 credentials checklist avec `CheckCircle2`

### 5.3 — Services (`src/components/landing/Services.tsx`)

- 3 cards avec :
  - Numéro géant 8rem en filigrane (`opacity 0.04` → `0.08` au hover)
  - `bg-gradient-gold-subtle` révélé au hover
  - `sheen-sweep 1.4s` au hover (gradient 110deg blanc/8 alpha)
  - Filet doré bas qui se trace au hover (`w-0 → w-full`)
  - Border `gold/10 → gold/30` au hover
  - `-translate-y-1` au hover
- 5 hovers détaillés par carte

### 5.4 — Process (`src/components/landing/Process.tsx`)

- `useScroll` + `useTransform` → `lineHeight: 0% → 100%` sur la ligne or verticale
- 4 étapes avec icônes circulaires `animate-pulse-gold`
- Tête lumineuse avec `box-shadow: 0 0 14px 2px gold/0.6`
- Rail gris `bg-gold/10` sous la ligne or animée

### 5.5 — Calculator (`src/components/landing/Calculator.tsx`)

- `bg-stars-light` (étoiles or sombres)
- Donut SVG animé via `motion.circle` `strokeDasharray`
- Sliders custom : track + fill or + thumb avec `box-shadow gold-sm`
- `useSpring` sur valeurs animées (stiffness 80, damping 20)
- `AnimatedNumber` avec `useTransform` format
- Capture email léger avec `AnimatePresence`
- 4 hovers

### 5.6 — Faq (`src/components/landing/Faq.tsx`)

- Accordion grid-template-rows `0fr → 1fr` + opacity (200ms cubic-bezier(0.16,1,0.3,1))
- Plus icon rotate-45 quand ouvert
- Filet doré gradient horizontal sous chaque question (`gold/30 → gold/15 → transparent`)
- Card border `gold/10 → gold/35` quand ouverte
- 3 hovers

### 5.7 — Testimonials (`src/components/landing/Testimonials.tsx`)

- 4 cards `.glass` rounded-2xl
- `Quote` icon décorative top-right (opacity 0.20 → 0.35 au hover)
- 5 étoiles or pleines
- Citation italique Fraunces
- Photo ronde avec border `gold/30` (ou fallback initiale)
- 5 hovers

### 5.8 — WhySerujan (`src/components/landing/WhySerujan.tsx`)

- 3 cards `.glass` avec icônes Network/Award/Trophy
- `CountUp` metric par carte (40+ / 2016 / 500M$+)
- Filet doré bas qui se trace au hover
- 4 hovers

### 5.9 — Elev8Event (`src/components/landing/Elev8Event.tsx`)

- Vidéo lazy avec play button + `animate-pulse-gold` ring
- Countdown 4× `tabular-nums` mis à jour 1×/seconde
- Card visuelle Academy avec radial gradient gold décoratif
- Titre `text-gold-gradient-animated` (shimmer)
- Séparateur or animé `scaleX(0 → 1)` sur 1s
- 5 hovers

### 5.10 — Process Bar / Navbar / Floating

- `Navbar` : burger morphing 3 barres en X (CSS pure `cubic-bezier(0.16,1,0.3,1)`), backdrop `blur-xl` quand scrolled
- `MobileStickyBar` : `motion.div` slide y:100→0 + safe-area-inset-bottom iOS
- `BackToTop` / `WhatsAppFab` : `AnimatePresence` avec scale 0.85→1 + y 20→0
- `ScrollProgressBar` : motion `useScroll + useSpring(180/30)` sur transform `scaleX` (zéro re-render React)
- `MidPageCTA` : `useReducedMotion` aware, Card border `gold/20` glass
- `ExitIntent` : modal `AnimatePresence` backdrop blur + scale 0.94→1
- `MouseSpotlight` : 4 traînées RAF-driven, désactivé sur mobile + reduced-motion

### 5.11 — CountUp (`src/components/ui/CountUp.tsx`)

- Utilise `useReducedMotion` (affiche directement la valeur si reduced)
- Parse préfixe + suffixe (ex "500M$+" → anime de 0 à 500 puis ajoute M$+)

### 5.12 — Footer (`src/components/landing/Footer.tsx`)

- Logo h-16 md:h-20 (récemment agrandi)
- `SocialLink` 12 hovers (Instagram, Facebook, LinkedIn)
- Halo radial gold/0.08 blur-60 décoratif

---

## 6. Hover/focus states comptés

**84 occurrences `hover:` ou `group-hover:`** sur **20 fichiers** :

| Fichier | Nb hovers | Patterns notables |
|---|---|---|
| Footer | 12 | SocialLinks, liens footer |
| Services | 10 | Cards (border + bg + filet bas + sheen + numéro filigrane) |
| LeadForm | 9 | CTAs directs + form button |
| Hero | 7 | CTAs + scroll indicator |
| Navbar | 6 | Items menu + burger |
| WhySerujan | 6 | Cards |
| Testimonials | 5 | Cards + photos |
| Elev8Event | 5 | Play button + CTAs |
| Calculator | 4 | Sliders + CTA |
| Bio | 3 | CTA discret |
| Faq | 3 | Boutons accordéon |
| Autres (8 fichiers) | 14 | divers |

**62 occurrences de classes signatures** (`btn-shine`, `btn-glow`, `glass`, `sheen`,
`grain-overlay`, `bg-stars*`, `text-gold-gradient*`, `highlight-underline`,
`animate-pulse-gold`, `animate-fade-*`, `animate-scale-*`, `marquee-*`,
`bg-grad-anim`) sur **19 fichiers**.

---

## 7. Backdrop / Filter / will-change — 43 occurrences sur 25 fichiers

- **`backdrop-blur` / `backdropFilter`** : Navbar (xl scrolled), MobileStickyBar (xl), Faq (avant le grid-rows refacto), `.glass` (12px), modals
- **`filter: blur(...)`** : tous les halos décoratifs sections (40-80px), Hero halo réduit à 40px (perf)
- **`will-change`** : Hero parallax, marquee tracks
- **`transform: translateZ(0)`** : `.glass`, `.glass-light`, `.bg-stars*` (pré-composite GPU au mount = fix freeze 1er scroll)

---

## 8. Particules dorées / points lumineux

- **`bg-stars-hero`** sur Hero — 23 étoiles total (16 fixes ::before + 7 scintillantes ::after)
- **`bg-stars`** (sombre) sur WhySerujan, Bio, Process, Faq, Testimonials, Elev8Event, LendersNetwork, MidPageCTA, LeadForm
- **`bg-stars-light`** (clair) sur About, Calculator
- **`grain-overlay`** sur Bio, LeadForm

---

## 9. Italique serif sur mots-clés titres (à PRÉSERVER)

Chaque section v3 utilise le pattern :
```tsx
<h2>
  <span className="text-foreground">{titleLead} </span>
  <span className="text-gold-gradient italic font-display-italic">{titleEmphasis}</span>
  <span className="text-foreground/85"> {titleTail}</span>
</h2>
```

Mots-clés identifiés en italique or :
- Hero : *"pour promoteurs et investisseurs"*
- WhySerujan : *"fait la différence."*
- Services : *"une seule exigence."*
- About : *"stratégique"*
- Process : *"discussion"*
- LendersNetwork : *"fait la différence."*
- Bio : *"communauté"*
- Testimonials : *"investisseurs."*
- Calculator : *"votre paiement."*
- Faq : *"devez savoir."*
- Elev8Event : *"une communauté"*
- LeadForm : *"votre prochain projet."*

⚠️ **NE PAS toucher** ce pattern. C'est la signature éditoriale du site.

---

## 10. Reduced-motion respecté

Le site respecte `prefers-reduced-motion` à 5 endroits CSS + 6 endroits JS :

- **CSS** (`styles.css:243-251`) : règle globale `* { animation/transition: 0.01ms }` + `@media (prefers-reduced-motion: reduce)` à 4 autres endroits (bg-stars-hero::after, .text-gold-gradient-animated, .btn-shine::before, .btn-glow:hover, .bg-stars-floating, .bg-grad-anim, .highlight-underline::after, .marquee-content)
- **JS** : CountUp, MouseSpotlight, BackToTop, MidPageCTA, ExitIntent, Faq

---

## 11. Effets que CLAUDE DESIGN PROPOSE (handoff v2) — risques identifiés

D'après `serujan (1)/design_handoff_serujan_premium/README.md`, 8 priorités :

| Priorité | Action proposée | Risque pour effets existants |
|---|---|---|
| **P1** Tokens | Affiner `--gold` à `#c9a961` (hex) | 🔴 **CASSE TOUT** — toute la palette est en `oklch`, mélanger hex/oklch détruit la cohérence + bypass les variations animées (text-gold-gradient-animated). **Refuser.** |
| **P1.5** Cohérence sombre/beige | Adapter texte selon fond | ✅ Déjà géré via `--ink` / `--foreground` |
| **P2** Typographie | Hero h1 64px / 1.08 / weight 300 / letter-spacing -0.015em | 🟡 Affecte le rendu actuel (texte foreground/85 + Fraunces SOFT 100). **À évaluer visuellement.** |
| **P3** Hero range pill "1M$ — 50M$" | Déplacer dans cartouche dédiée APRÈS h1 | 🟢 Faisable proprement (nouveau composant), pas de conflit |
| **P4** Nav consolidation | Wordmark ÉQUIPE/SERUJAN à côté logo | ⚠️ **Conflit direct** — on a déjà mis le logo image (commit `04678a7`), pas un monogramme SK + wordmark texte. **À discuter.** |
| **P5** Boutons CTA letter-spacing 0.14em | Modifier UNIQUEMENT spacing/weight/padding | 🟢 OK si on ne touche pas `btn-shine` ni `btn-glow` |
| **P6** Téléphones en monospace | `.phone-number { font-family: SF Mono... }` | 🟢 Faisable, à appliquer sur Hero CTA tel + LeadForm |
| **P7** Stats restructure | Séparer `<span class="stat-num">500</span><span class="stat-suffix">M$+</span>` | 🟡 **Conflit avec CountUp** qui parse "500M$+" en string. À adapter. |
| **P8** Détails premium (eyebrow rule, indicator pulsant, num 01/02/03 mono) | Ajouts décoratifs | 🟢 Numérotation 01/02/03 **déjà présente** dans Services. Indicator pulsant et eyebrow rule faisables. |

---

## 12. Recommandation de stratégie Phase 2

**Verdict honnête** : le site est déjà **très soigné**. Sur les 8 priorités du
handoff, voici ma proposition de tri :

### 🟢 À appliquer (gain réel, faible risque)

- **P3** Hero range pill : créer un composant dédié `<HeroRangePill>` après h1, ne touche pas au titre tripartite italique or
- **P5** Boutons CTA : letter-spacing + weight + padding **seulement** (préserve btn-shine/btn-glow)
- **P6** Téléphones en monospace : ajouter classe `.phone-number` ou inline `font-mono tabular-nums` sur les 4 endroits où le téléphone s'affiche
- **P8** Indicator pulsant vert à côté de "Réponse < 24h" dans urgencyBadges Hero

### 🟡 À discuter avec toi (compromis nécessaire)

- **P2** Typographie : tester en visuel — les valeurs proposées peuvent rendre le titre un peu plus light
- **P7** Stats restructure : casserait le `CountUp` actuel. Alternative — garder `CountUp` pour le nombre, ajouter un suffixe italique séparé en or **côté tsx** (sans changer la classe utilitaire)

### 🔴 À refuser (casserait la signature visuelle)

- **P1** Remplacer `--gold` oklch par `#c9a961` hex : casse `text-gold-gradient-animated`, casse les variations 8 tons or, casse la cohérence palette `oklch`. Le doré actuel `oklch(0.78 0.13 82)` est riche et chaud — c'est précisément la signature
- **P4** Wordmark ÉQUIPE/SERUJAN à côté monogramme SK : on vient juste de mettre le logo image (commit `04678a7`) qui contient déjà ce wordmark. Doublon

---

## 13. Vérifications post-modif requises (checklist QA)

Pour CHAQUE priorité Phase 2 appliquée, vérifier que ces effets existent toujours :

- [ ] `btn-shine` continue de balayer les CTAs primaires (4.2s)
- [ ] `btn-glow` pulse au hover des CTAs primaires
- [ ] `.glass` cards (Hero stats, Bio milestones, WhySerujan, Testimonials, etc.) gardent leur backdrop-blur
- [ ] `bg-stars-hero` étoiles scintillent (twinkle 4.2s)
- [ ] `text-gold-gradient-animated` shimmer sur les `titleEmphasis` italiques
- [ ] Italique serif Fraunces SOFT 100 sur tous les mots-clés or
- [ ] Process : ligne or se trace au scroll (useTransform 0% → 100%)
- [ ] Calculator : donut animé + sliders or
- [ ] Marquee LendersNetwork : pause au hover
- [ ] Hero parallax bg image (bgY 0% → 30%)
- [ ] Halos blur sections (translateZ pré-composite OK)
- [ ] FAQ accordéon fluide grid-template-rows (200ms cubic-bezier)
- [ ] Reduced-motion désactive bien toutes les boucles continues
- [ ] Mobile : MobileStickyBar visible avec safe-area-inset-bottom iOS
- [ ] Burger morphing nav 3 barres → X
- [ ] CountUp stats animent sur scroll
- [ ] WhatsAppFab + BackToTop apparaissent à 800px
- [ ] ExitIntent armé après 8s, ne se réaffiche pas (sessionStorage)

---

## 14. Conclusion Phase 1

**Aucun fichier source modifié.** Branche `refonte-premium` créée à partir de
`main` (= commit `9733dda` après mes 3 derniers commits feat:). `.gitignore`
mis à jour pour exclure `serujan (1)/` également.

Le site présente un design system mature avec :
- 7 tons d'or, 3 tons charbon chaud, 2 tons ivoire premium en `oklch`
- 13 keyframes CSS + 30+ animations motion/react
- 84 hover states distincts
- 23 effets signatures préservés (glass, btn-shine, btn-glow, sheen, marquee, bg-stars, text-gold-gradient-animated, animate-pulse-gold, italique Fraunces SOFT 100, etc.)

**Prochaine étape** : attente de la validation de Rochdi avant de passer à
Phase 2. Aucune modification ne sera faite tant que les priorités ne sont pas
explicitement validées **une par une**.
