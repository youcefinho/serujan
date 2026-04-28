# INTRALYS MASTER DOCUMENTATION

This document serves as the master guide to reproduce this exact site architecture for any new Intralys client in under 1 hour. It details the complete technical stack, all implemented features, security and SEO setups, and provides an exact checklist of client-specific elements to swap.

---

## 1. Complete Tech Stack and Dependencies

**Core Frameworks & Tools:**
- **Vite:** Build tool and development server (`vite`, `@vitejs/plugin-react`).
- **React 19:** UI Library (`react`, `react-dom`).
- **TypeScript:** Typed JavaScript for robust development.
- **TanStack Router:** Type-safe file-based routing (`@tanstack/react-router`).
- **Tailwind CSS v4:** Utility-first CSS framework (`tailwindcss`, `@tailwindcss/vite`).

**Backend & Integration:**
- **Supabase:** Database and authentication for leads and admin dashboard (`@supabase/supabase-js`).
- **Resend:** Automated email delivery for lead magnets (`resend`).
- **Netlify Functions:** Serverless functions for backend operations (`@netlify/functions`).
- **Calendly:** Meeting scheduling integration.

**UI Libraries & Utilities:**
- **Radix UI:** Headless accessible UI components (`@radix-ui/react-accordion`, `@radix-ui/react-slot`).
- **Lucide React:** Iconography (`lucide-react`).
- **Sonner:** Toast notifications (`sonner`).
- **Zod:** Schema validation for forms (`zod`).
- **Tailwind Merge & CLSX:** Class merging utilities (`tailwind-merge`, `clsx`, `class-variance-authority`).
- **TW Animate CSS:** Animations (`tw-animate-css`).

---

## 2. Site Structure & Component Locations

All landing page sections are cleanly separated into individual components located in `src/components/landing/`.

| Section | Component Name | File Location |
| :--- | :--- | :--- |
| **Navigation** | `Navbar` | `src/components/landing/Navbar.tsx` |
| **Hero Section** | `Hero` | `src/components/landing/Hero.tsx` |
| **Statistics Bar** | `StatsBar` | `src/components/landing/StatsBar.tsx` |
| **Fears / Pain Points** | `Fears` | `src/components/landing/Fears.tsx` |
| **Triggers / Empathy** | `Triggers` | `src/components/landing/Triggers.tsx` |
| **About the Agent** | `About` | `src/components/landing/About.tsx` |
| **Instagram Reels** | `InstagramReels` | `src/components/landing/InstagramReels.tsx` |
| **Team (if applicable)** | `Team` | `src/components/landing/Team.tsx` |
| **Core Pillars** | `Pillars` | `src/components/landing/Pillars.tsx` |
| **Services Offered** | `Services` | `src/components/landing/Services.tsx` |
| **Market Stats** | `MarketStats` | `src/components/landing/MarketStats.tsx` |
| **Deliverables** | `Deliverables` | `src/components/landing/Deliverables.tsx` |
| **Manifesto** | `Manifesto` | `src/components/landing/Manifesto.tsx` |
| **Testimonials** | `Testimonials` | `src/components/landing/Testimonials.tsx` |
| **Process Steps** | `Process` | `src/components/landing/Process.tsx` |
| **Mortgage Calculator** | `Calculator` | `src/components/landing/Calculator.tsx` |
| **The "Enemy" Section**| `Enemy` | `src/components/landing/Enemy.tsx` |
| **Lead Magnet / PDF** | `LeadMagnet` | `src/components/landing/LeadMagnet.tsx` |
| **Dual Lead Form** | `LeadForm` | `src/components/landing/LeadForm.tsx` |
| **FAQ** | `Faq` | `src/components/landing/Faq.tsx` |
| **Footer** | `Footer` | `src/components/landing/Footer.tsx` |
| **WhatsApp Button** | `WhatsAppButton` | `src/components/landing/WhatsAppButton.tsx` |
| **Mobile Sticky Bar** | `MobileStickyBar`| `src/components/landing/MobileStickyBar.tsx` |
| **Scroll Progress** | `ScrollProgressBar`| `src/components/landing/ScrollProgressBar.tsx` |
| **Scroll Reveal Wrapper**| `ScrollReveal` | `src/components/landing/ScrollReveal.tsx` |
| **Exit Intent Popup** | `ExitIntentPopup`| `src/components/landing/ExitIntentPopup.tsx` |

**Routing Files (TanStack Router):**
- Main Layout: `src/routes/__root.tsx`
- Landing Page: `src/routes/index.tsx`
- Thank You Page: `src/routes/merci.tsx`
- Admin Layout: `src/routes/admin.tsx`
- Admin Login: `src/routes/admin.login.tsx`
- Admin Leads Dashboard: `src/routes/admin.leads.tsx`

---

## 3. Features Implemented

1. **Calendly Popup Integration:** Triggered via `openCalendly()` helper from `src/lib/calendly.ts`. The script and CSS are preloaded in `index.html`. It listens for `calendly.event_scheduled` to auto-sync leads to Supabase.
2. **Mortgage Calculator (Canadian Formula):** Located in `Calculator.tsx`, includes Canadian specific calculations (semi-annual compounding, CMHC insurance logic, welcome tax calculation).
3. **Dual Lead Forms (Supabase):** "J'achète" and "Je vends" tabs in `LeadForm.tsx` saving directly to the `leads` table in Supabase.
4. **Admin Dashboard:** A protected route (`/admin/leads`) using Supabase Auth to view, filter, and manage captured leads.
5. **Animated Counters:** Implemented in `StatsBar.tsx` using `framer-motion` or custom hooks to count up when scrolled into view.
6. **Scroll Animations:** `ScrollReveal.tsx` wraps sections to fade/slide them in as the user scrolls.
7. **Scroll Progress Bar:** `ScrollProgressBar.tsx` fixed at the top, showing how far the user has scrolled.
8. **Sticky Mobile Bar:** `MobileStickyBar.tsx` appears only on mobile screens at the bottom to provide persistent CTA buttons (Call, Message).
9. **Exit Intent Popup:** `ExitIntentPopup.tsx` tracks mouse movement and triggers a modal when the user moves their cursor out of the viewport.
10. **WhatsApp Button:** Floating `WhatsAppButton.tsx` opening a direct WhatsApp chat.
11. **Instagram Reels Section:** `InstagramReels.tsx` simulating a mobile reel feed with embedded videos.
12. **Lead Magnet Section:** `LeadMagnet.tsx` captures emails and delivers a PDF via Resend email automation.

---

## 4. Security Setup

- **CSP Headers:** Configured globally in `netlify.toml` under `[[headers]]`. Includes strict `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
- **Honeypot Anti-Spam:** Implemented in `LeadForm.tsx` (Lines ~124-134). A hidden input field (`name="website"`) is invisible to humans but gets filled by bots. If filled, the submission is silently rejected (fake success) without hitting Supabase.
- **Supabase RLS:** Row Level Security policies should be configured in Supabase to restrict public inserts and only allow authenticated admin reads.

---

## 5. SEO Setup

Implemented directly in `index.html`:
- **Canonical URL:** `<link rel="canonical" href="..." />`
- **Hreflang for Canada:** `<link rel="alternate" hreflang="fr-CA" href="..." />`
- **Sitemap & Robots.txt:** Generated at build time or served from `public/`. Caching rules are set in `netlify.toml` to refresh every 24h.
- **Schema.org JSON-LD:** Structured data block of type `RealEstateAgent` detailing Name, Phone, Email, Location (Gatineau, Hull, Aylmer, etc.), and social profiles.
- **Open Graph & Twitter Cards:** Comprehensive meta tags for social sharing with optimized preview images.

---

## 6. Performance Optimizations

1. **Preloading Critical Assets:** `index.html` preloads fonts (`Inter`, `Playfair Display`) and Calendly assets.
2. **Font Loading:** Uses `font-display: swap` for non-blocking font rendering.
3. **App Loader:** A tiny inline CSS spinner in `index.html` prevents white screens while React and Vite load the JavaScript bundle.
4. **Vite SPA Build:** Optimized bundling with Vite, extracting vendor chunks.
5. **Netlify Caching:** `netlify.toml` applies immutable caching (`max-age=31536000`) for hashed assets (`/assets/*`) and zero-cache (`must-revalidate`) for `index.html`.

---

## 7. Deployment Process

The project is designed for zero-config CI/CD on Netlify.
1. **Local Build Check:** Run `bun run build` (or `npm run build`) to verify Vite compiles without TypeScript/ESLint errors.
2. **Git Push:** Push changes to the main branch on GitHub.
3. **Netlify Auto-Deploy:** Netlify detects the push, runs the `build` command specified in `netlify.toml`, and publishes the `dist` folder.

---

## 8. Client-Specific Elements Checklist (To Swap)

To rebrand the site for a new client, update the following files and lines:

**A. Core Identity & SEO (`index.html`)**
- Line 6 & 19: `<title>` and `og:title` (Client Name).
- Line 9-10 & 18: URLs (Netlify/Domain URL).
- Line 13-14 & 20: Meta description and keywords.
- Line 21 & 27: `og:image` and `twitter:image` (Social preview image URL).
- Line 30 & 35: Google Analytics 4 Tag ID (`G-XXXXXXXXXX`).
- Line 53-56: Schema.org `name`, `jobTitle`, `telephone`, `email`.
- Line 58-69: Schema.org `address` and `areaServed` (Cities/Regions).
- Line 72: Schema.org `sameAs` (Social media links).

**B. Environment Variables (`.env.local` + Netlify UI)**
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` — Supabase client-side.
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — Supabase server-side (Netlify Functions).
- `RESEND_API_KEY` — Clé API Resend pour l'envoi du Lead Magnet.
- `VITE_GA4_ID` — ID Google Analytics 4 (aussi dans `index.html` lignes 30, 35).
- `VITE_CALENDLY_URL` — URL Calendly du courtier (lu automatiquement par `src/lib/calendly.ts`).

Voir `.env.example` pour la liste complète avec placeholders.

**D. Hero Section (`src/components/landing/Hero.tsx`)**
- Line 32 & 87: Location badges (e.g., "Gatineau", "Outaouais").
- Line 49: Client Name ("Mathis Guimont").
- Line 62, 64, 67: Phone number in `<a href="tel:...">` and aria-labels.
- Line 105: Badge info (e.g., "22 ans", "Nouvelle génération").

**E. Footer (`src/components/landing/Footer.tsx`)**
- Line 18: Logo image import and `alt` text.
- Line 20: Short bio text.
- Line 28, 30: Phone number.
- Line 34, 36: Email address.
- Line 41: Physical office address.
- Line 50-52: Social media URLs (Facebook, Instagram, TikTok).
- Line 67: Instagram handle text (`@...`).

**F. Content Sections (Review & Update Copy)**
- `src/components/landing/About.tsx`: Client biography, personal stats, and photo.
- `src/components/landing/InstagramReels.tsx`: Update video URLs or embed codes.
- `src/components/landing/Team.tsx`: Update team members if it's a team, or remove if solo agent.
- `src/components/landing/Testimonials.tsx`: Update client reviews.
- `src/components/landing/WhatsAppButton.tsx`: Update the WhatsApp phone number in the URL.

---

## 9. Color Variables Location

All branding colors are managed via CSS variables in **`src/styles.css`**.
To rebrand the site's color scheme, modify the `:root` block (Lines 41-78):

```css
:root {
  /* Brand Colors */
  --navy: oklch(0.21 0.04 260);          /* Main background */
  --navy-deep: oklch(0.16 0.035 260);    /* Darker sections */
  --crimson: oklch(0.56 0.22 25);        /* Primary accent color */
  --crimson-glow: oklch(0.63 0.24 25);   /* Hover states */
  --cream: oklch(0.97 0.01 80);          /* Light text/bg alternative */

  /* Fonts */
  --font-display: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
}
```
*Note: The project uses the new Tailwind v4 syntax with `oklch` colors. Update the `--crimson` and `--navy` values to instantly rebrand all buttons, accents, and backgrounds.*

---

## 10. Swapping Photos and Logos

1. **Asset Folder:** Place all new client images in `src/assets/`.
2. **Hero Image:** Overwrite or update the import in `src/components/landing/Hero.tsx` (Lines 4-5):
   ```tsx
   import heroBanner from "@/assets/hero-banner.jpg";
   import clientPhoto from "@/assets/client-photo.jpg"; // Update this
   ```
3. **Footer Logo:** Update the import in `src/components/landing/Footer.tsx` (Line 2):
   ```tsx
   import logoEquipe from "@/assets/new-client-logo.png";
   ```
4. **Other Photos:** Check `About.tsx` and `LeadMagnet.tsx` (for the PDF cover image) and update the corresponding `import` statements at the top of the files.
5. **Favicon:** Replace `/public/favicon.ico` or `/public/favicon.svg` with the new client's logo.
6. **Social Preview Image (OG):** Upload the new Open Graph image to a CDN or `/public` folder and update the URL in `index.html` (Lines 21 & 27).

---

## 11. Standards de Contenu et UX — Directives Intralys

Les directives suivantes définissent les standards de contenu et d'expérience utilisateur pour **tous** les sites Intralys. Chaque nouveau site client doit les implémenter.

### 11.1 Toggle Bilingue FR/EN
- Un bouton de bascule **FR / EN** est présent dans la `Navbar`.
- Français = langue par défaut. Le choix est persisté dans `localStorage`.
- Composant dédié : `LanguageToggle.tsx` dans `src/components/landing/`.

### 11.2 CTA Principal Standardisé
- Le CTA principal partout sur le site est : **« RENCONTRE STRATÉGIQUE GRATUITE »**
- Remplace : "Prendre rendez-vous", "Parlons-en", "Commencer", etc.
- Présent dans : `Hero.tsx`, `Navbar.tsx`, `MobileStickyBar.tsx`, `ExitIntentPopup.tsx`, `Deliverables.tsx`.

### 11.3 Calculatrice Hypothécaire Enrichie
- En plus du paiement hypothécaire mensuel, le calculateur affiche :
  - **Taxe foncière annuelle** (saisie manuelle ou estimation)
  - **Assurance habitation** (saisie manuelle ou estimation)
  - **Ventilation mensuelle totale** : hypothèque + taxes/12 + assurance/12

### 11.4 Section Propriétés (Placeholder + Centris)
- Section « DÉCOUVREZ NOS PROPRIÉTÉS » avec 3–6 cartes placeholder.
- Chaque carte : image, prix, adresse, nb chambres/salles de bain.
- CTA vers la page Centris du courtier : `https://www.centris.ca/fr/courtier~ID`.
- Composant : `Properties.tsx` dans `src/components/landing/`.

### 11.5 Territoire dans le Hero
- Le badge de territoire dans le Hero affiche la zone de service en **MAJUSCULES** séparée par `|`.
- Exemples : `QUÉBEC | ONTARIO`, `GATINEAU | OTTAWA`, `OUTAOUAIS | ONTARIO`.

### 11.6 Section Équipe Parent
- Section dédiée à la bannière immobilière du courtier (Royal LePage, RE/MAX, Sutton, etc.).
- Contenu : logo bannière, nom d'équipe, description, photo de groupe.
- Composant : `ParentTeam.tsx` dans `src/components/landing/`.

### 11.7 Titres et CTAs en UPPERCASE
- Tous les `<h2>` de section : classe Tailwind `uppercase tracking-widest`.
- Tous les boutons CTA : classe Tailwind `uppercase tracking-widest` ou `tracking-wider`.
- Sous-titres (`<p>`, `<h3>`) et texte courant : casse normale.

### 11.8 Section « Votre Première Rencontre est Gratuite »
- Section placée **juste avant** le `LeadForm` dans l'ordre de la page.
- Titre : « VOTRE PREMIÈRE RENCONTRE EST GRATUITE »
- Sous-titre : « Sans engagement. Sans pression. On discute de votre projet. »
- 3 badges : ✅ Gratuit · ✅ Sans engagement · ✅ Confidentiel
- Composant : `FreeConsultation.tsx` dans `src/components/landing/`.

### 11.9 Section Services — 3 Piliers
- Exactement **3 piliers** (pas 2, pas 4) :
  1. **ACHAT** — Accompagnement complet pour l'achat de propriété
  2. **VENTE** — Stratégie marketing et mise en marché
  3. **INVESTISSEMENT** — Analyse de rentabilité et conseil patrimonial
- Chaque pilier : icône Lucide, titre en `uppercase`, description, CTA → `#contact`.

---
*Created automatically to ensure perfectly consistent, high-performance deployments for every Intralys client.*
