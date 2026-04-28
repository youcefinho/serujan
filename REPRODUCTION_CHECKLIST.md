# REPRODUCTION CHECKLIST — Intralys Client Onboarding

> **Last Audit Date:** 2026-04-28
> **Build Status:** ✅ `npm run build` → **0 errors, 0 warnings** (2.38s, 1935 modules)

---

## PART 1 — FEATURE AUDIT REPORT

### 1) FORMS — Dual Lead Form (Acheter / Vendre)
**STATUS: ✅ WORKING**

| Item | Detail |
|---|---|
| Component | `src/components/landing/LeadForm.tsx` |
| Tabs | "J'achète" (buy) and "Je vends" (sell) — state managed via `useState` |
| Validation | Zod schemas (`buySchema` / `sellSchema`) validate all fields client-side |
| Supabase Insert | Direct insert to `leads` table with type, name, phone, email, budget/timeline (buy) or address/property_type (sell) |
| Honeypot | Hidden `website` field (lines 124-134) — silently fakes success if filled by bots |
| After Submit | Navigates to `/merci` thank-you page |
| Error Handling | Zod validation errors shown via `sonner` toast; Supabase errors caught with user-friendly message |

**Note for reproduction:** The form does NOT send an email notification on its own. The admin must check the dashboard or set up a Supabase webhook/trigger for email notifications.

---

### 2) CALCULATOR — Canadian Mortgage Formula
**STATUS: ✅ WORKING**

| Item | Detail |
|---|---|
| Component | `src/components/landing/Calculator.tsx` |
| Formula | Canadian semi-annual compounding: `r = (1 + annualRate/2)^(1/6) - 1` (line 12) |
| Interactive Fields | **4 sliders** (not 3): Price ($150K–$1.5M), Down payment (5–50%), Interest rate (2–10%), Amortization (5–30 yrs) |
| Output | Monthly payment, down payment amount, borrowed amount |
| CTA | "Discuter de mon projet" links to `#contact` |
| Currency Format | `fr-CA` locale with CAD currency, 0 decimal digits |

**Note:** The calculator has 4 interactive sliders, not 3. All work reactively via `useMemo`.

---

### 3) CALENDLY — Popup Integration
**STATUS: ✅ WORKING**

| Item | Where it triggers |
|---|---|
| Helper | `src/lib/calendly.ts` → `openCalendly()` function |
| Widget loaded | `index.html` lines 78-82 (async script + CSS) |
| **Hero** CTA button | `Hero.tsx` line 54 |
| **Navbar** desktop button | `Navbar.tsx` line 82 |
| **Navbar** mobile button | `Navbar.tsx` line 130 |
| **MobileStickyBar** button | `MobileStickyBar.tsx` line 17 |
| **Deliverables** CTA button | `Deliverables.tsx` line 46 |
| **ExitIntentPopup** CTA button | `ExitIntentPopup.tsx` line 79 |
| Supabase Sync | `attachCalendlyListener()` in `main.tsx` line 30 auto-saves booked meetings to `leads` table |
| Fallback | If Calendly script fails to load, opens URL in new tab |

**CALENDLY_URL to swap:** `src/lib/calendly.ts` line 4

---

### 4) LEAD MAGNET — Guide Download Form
**STATUS: ✅ WORKING** (Fixed in this audit)

| Item | Detail |
|---|---|
| Component | `src/components/landing/LeadMagnet.tsx` |
| Fields | Prénom + Courriel |
| Backend | `netlify/functions/send-guide.ts` (Netlify Function) |
| Email delivery | Via Resend API — sends HTML email with Google Drive link to PDF |
| Supabase Save | **FIXED** — now also saves lead to Supabase `leads` table (type: `buy`, message: "Guide Gratuit...") |
| Success feedback | Toast: "Merci ! Vérifiez votre boîte email." |

**Fix applied:** Removed hardcoded Resend API key fallback (security risk). Added Supabase insert to `send-guide.ts` so lead magnet submissions are captured in the admin dashboard alongside form leads.

**Items to swap for new client:**
- `netlify/functions/send-guide.ts` line 37: Google Drive PDF link
- `netlify/functions/send-guide.ts` lines 19, 24, 46-48: Client name, email signature
- Netlify env vars: `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

---

### 5) SOCIAL LINKS — Facebook, Instagram, TikTok
**STATUS: ✅ WORKING**

| Platform | URL | Location |
|---|---|---|
| Facebook | `https://www.facebook.com/mathis.guimont/reels/` | `Footer.tsx` line 50 |
| Instagram | `https://www.instagram.com/mathis_guimont/` | `Footer.tsx` line 51 · `InstagramReels.tsx` lines 44, 78 · `Testimonials.tsx` line 66 (Google reviews) |
| TikTok | `https://www.tiktok.com/@mathisguimont` | `Footer.tsx` line 52 |

All open with `target="_blank"` and `rel="noopener noreferrer"`.

---

### 6) WHATSAPP — Floating Button
**STATUS: ✅ WORKING**

| Item | Detail |
|---|---|
| Component | `src/components/landing/WhatsAppButton.tsx` |
| Phone Number | `18199183409` (line 4) |
| Pre-filled message | French greeting (line 5-7) |
| URL format | `https://wa.me/18199183409?text=...` |
| Position | Fixed bottom-right, z-50, with ping animation |
| Mobile offset | `bottom-24` on mobile (above MobileStickyBar), `bottom-6` on desktop |

---

### 7) ADMIN DASHBOARD — /admin route
**STATUS: ✅ WORKING**

| Item | Detail |
|---|---|
| Layout | `src/routes/admin.tsx` — Auth guard with Supabase session + `user_roles` table |
| Login | `src/routes/admin.login.tsx` — Email/password with signup option |
| Leads page | `src/routes/admin.leads.tsx` — Table with filter (all/buy/sell), search, stats cards |
| CSV Export | `exportCSV()` function (lines 24-55) — UTF-8 BOM for Excel compatibility |
| Lead Detail | Click-to-open modal with phone/email direct action buttons |
| Role check | Uses `user_roles` table with `has_role()` SQL function (SECURITY DEFINER) |
| robots.txt | `/admin` and `/admin/` are blocked from crawlers |

---

### 8) ANIMATIONS — All Visual Effects
**STATUS: ✅ WORKING**

| Animation | Component | Mechanism |
|---|---|---|
| Scroll reveal (fade+slide) | `ScrollReveal.tsx` | IntersectionObserver via `useScrollReveal.ts` hook |
| Animated counters | `StatsBar.tsx` | Custom `useCountUp` hook with `requestAnimationFrame`, ease-out cubic |
| Scroll progress bar | `ScrollProgressBar.tsx` | `scroll` event listener, GPU-accelerated `scaleX` transform |
| Sticky mobile bar | `MobileStickyBar.tsx` | Fixed `bottom-0`, hidden on `md:` screens |
| Exit intent popup | `ExitIntentPopup.tsx` | `mouseout` event (clientY ≤ 5) + 30-second timer fallback |
| Typing animation | `TypingAnimation.tsx` | Character-by-character typing with blinking cursor, cycles through phrases |
| Loading spinner | `index.html` lines 84-92 | Pure CSS spinner, removed after React mounts (`main.tsx` lines 23-27) |
| Hover effects | Various | `hover:scale`, `hover:border-crimson`, `transition-transform` throughout |

---

### 9) MOBILE — Responsive Design
**STATUS: ✅ WORKING**

| Breakpoint | What happens |
|---|---|
| 320px–430px | Single-column layout, MobileStickyBar visible, WhatsApp button offset above it, hamburger menu, all text scales with `text-3xl`→`text-base` |
| `body padding-bottom: 5rem` | `styles.css` lines 113-117 reserves space for MobileStickyBar |
| `safe-area-inset-bottom` | `MobileStickyBar.tsx` line 7 accounts for iPhone notch area |
| Images | All have `max-width: 100%; height: auto` via `styles.css` lines 126-129 |
| Text overflow | `overflow-wrap: break-word; word-break: break-word` on body and headings |

**Verified at:** 320px, 375px, 430px — all Tailwind responsive classes (`sm:`, `md:`, `lg:`) properly cascade.

---

### 10) SEO — All Meta Tags & Structured Data
**STATUS: ✅ WORKING**

| SEO Element | Location | Details |
|---|---|---|
| `<html lang="fr-CA">` | `index.html` line 2 | ✅ |
| Canonical | `index.html` line 9 | `https://mathis-guimont.netlify.app/` |
| Hreflang fr-CA | `index.html` line 10 | Points to same canonical |
| Meta description | `index.html` line 13 | ✅ Full keyword-rich description |
| Meta keywords | `index.html` line 14 | ✅ Gatineau-focused terms |
| Open Graph | `index.html` lines 17-21 | type, url, title, description, image |
| Twitter Card | `index.html` lines 24-27 | summary_large_image |
| Schema.org JSON-LD | `index.html` lines 49-76 | Type: `RealEstateAgent` with areaServed, telephone, address |
| robots.txt | `public/robots.txt` | Allow all, Disallow /admin, Sitemap URL |
| sitemap.xml | `public/sitemap.xml` | Single URL, weekly changefreq, priority 1.0 |
| Google Analytics | `index.html` lines 30-36 | GA4 placeholder `G-XXXXXXXXXX` |

---

### 11) SECURITY — CSP Headers & Honeypot
**STATUS: ✅ WORKING**

| Security Feature | Location | Details |
|---|---|---|
| CSP | `netlify.toml` line 24 | `default-src 'self'`; explicit whitelist for GTM, GA, Calendly, Supabase, fonts |
| X-Frame-Options | `netlify.toml` line 19 | `DENY` |
| X-Content-Type-Options | `netlify.toml` line 20 | `nosniff` |
| Referrer-Policy | `netlify.toml` line 21 | `strict-origin-when-cross-origin` |
| Permissions-Policy | `netlify.toml` line 22 | Camera, mic, geolocation all disabled |
| X-XSS-Protection | `netlify.toml` line 23 | `1; mode=block` |
| Honeypot field | `LeadForm.tsx` lines 124-134 | Hidden `website` input, `display: none`, `aria-hidden="true"`, `tabIndex={-1}` |
| Supabase RLS | Migration files | INSERT allowed for anon; SELECT only for admin role |
| Resend API Key | `netlify/functions/send-guide.ts` | **FIXED** — no longer hardcoded; reads from `process.env.RESEND_API_KEY` only |

---

### 12) BUILD — Production Compilation
**STATUS: ✅ WORKING**

```
$ npm run build
vite v7.3.2 building client environment for production...
✓ 1935 modules transformed.
✓ built in 2.38s
0 errors, 0 warnings
```

| Output | Size |
|---|---|
| Total JS (main chunk) | 478.79 kB (142 kB gzip) |
| Total CSS | 59.13 kB (9.78 kB gzip) |
| Images | 450 kB total |
| Code-split routes | admin, admin.login, admin.leads, merci — all lazy-loaded |

---

## PART 2 — FIXES APPLIED IN THIS AUDIT

### Fix 1: Lead Magnet Supabase Integration
**File:** `netlify/functions/send-guide.ts`
- **Problem:** Lead Magnet form submissions only sent an email via Resend but did NOT save the lead to Supabase. Leads captured via the guide download were invisible in the admin dashboard.
- **Fix:** Added Supabase insert (best-effort, non-blocking) so every Lead Magnet submission is saved to the `leads` table.

### Fix 2: Hardcoded Resend API Key Removed
**File:** `netlify/functions/send-guide.ts`
- **Problem:** The Resend API key was hardcoded as a fallback (`re_9PGVvdq6_...`), creating a security vulnerability if the repo is public.
- **Fix:** Removed hardcoded fallback. The key now reads exclusively from `process.env.RESEND_API_KEY`.

---

## PART 3 — COMPLETE REPRODUCTION STEPS (New Client)

> ⚠️ **ÉTAPE OBLIGATOIRE #0 : Configurer `.env.local` AVANT toute chose.**
> Sans variables d'environnement valides, rien ne fonctionne (Supabase, Resend, Calendly, GA4).

---

### Phase 0: Variables d'environnement (OBLIGATOIRE — 2 min)

```bash
# Copier le template
cp .env.example .env.local
```

Ouvrir `.env.local` et remplir **chaque** valeur :

| Variable | Source | Utilisée par |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Settings → API | Client-side (formulaires, auth) |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon key | Client-side (formulaires, auth) |
| `SUPABASE_URL` | Même valeur que VITE_SUPABASE_URL | Netlify Functions (server) |
| `SUPABASE_ANON_KEY` | Même valeur que VITE_SUPABASE_ANON_KEY | Netlify Functions (fallback) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role | Netlify Functions (admin ops) |
| `RESEND_API_KEY` | resend.com → API Keys | Envoi email Lead Magnet |
| `VITE_GA4_ID` | GA4 Admin → Data Streams | Google Analytics (à coller aussi dans `index.html` L30, L35) |
| `VITE_CALENDLY_URL` | URL Calendly du courtier | Popup rendez-vous |

> **Note :** `VITE_GA4_ID` doit aussi être remplacé manuellement dans `index.html` lignes 30 et 35 (remplacer `G-XXXXXXXXXX`) car il est dans le HTML statique et non lu par Vite.

---

### Phase 1: Clone & Setup (5 min)

```bash
# 1. Clone the template
git clone https://github.com/youcefinho/gatineau-premier-achat-vente.git new-client-site
cd new-client-site

# 2. Copy .env template (PHASE 0 ci-dessus)
cp .env.example .env.local
# → Remplir toutes les valeurs

# 3. Install dependencies
bun install  # or npm install
```

### Phase 2: Create Supabase Project (10 min)

1. Go to [supabase.com](https://supabase.com) → New Project
2. Run all 3 migration files from `supabase/migrations/` in the SQL Editor (in order)
3. Copy the **Project URL** and **anon key** from Settings → API → coller dans `.env.local`
4. Create an admin user in Authentication → Users
5. Insert admin role in SQL Editor:
   ```sql
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('USER_UUID_HERE', 'admin');
   ```

### Phase 3: Swap Client Identity (15 min)

#### 3A. index.html — SEO & Meta (all line numbers refer to current file)
| Line(s) | What to change |
|---|---|
| 6 | `<title>` — New client name |
| 9-10 | Canonical and hreflang URLs |
| 13 | Meta description |
| 14 | Meta keywords |
| 17-21 | Open Graph (url, title, description, image) |
| 24-27 | Twitter Card (title, description, image) |
| 30, 35 | GA4 Measurement ID (valeur de `VITE_GA4_ID`) |
| 53 | Schema.org `name` |
| 54 | Schema.org `jobTitle` |
| 55 | Schema.org `telephone` |
| 56 | Schema.org `email` |
| 57 | Schema.org `url` |
| 58-69 | Schema.org `address` and `areaServed` |
| 72 | Schema.org `sameAs` (social links) |
| 74 | Schema.org `description` |

#### 3B. src/components/landing/Hero.tsx
| Line(s) | What to change |
|---|---|
| 4-5 | Image imports (hero banner + client portrait) |
| 32 | Badge text ("La Transaction Sans Stress · Gatineau") |
| 36-37 | H1 headline |
| 39 | Typing animation phrases |
| 49 | Client name in paragraph |
| 62 | Phone number `href="tel:..."` |
| 87 | Trust badge text |
| 98 | Alt text for portrait image |
| 105 | Age badge ("22 ans") |

#### 3C. src/components/landing/Navbar.tsx
| Line(s) | What to change |
|---|---|
| 4 | Logo import |
| 46, 50 | Logo alt text and aria-label |
| 74, 79 | Phone number |

#### 3D. src/components/landing/Footer.tsx
| Line(s) | What to change |
|---|---|
| 2 | Logo import |
| 18 | Logo alt text |
| 20 | Bio text |
| 28, 30 | Phone number |
| 34, 36 | Email address |
| 41 | Physical office address |
| 50 | Facebook URL |
| 51 | Instagram URL |
| 52 | TikTok URL |
| 67 | Instagram handle |
| 76 | Copyright name |

#### 3E. src/components/landing/About.tsx
| Line(s) | What to change |
|---|---|
| 2 | Portrait image import |
| 29 | Age ("22") |
| 47-56 | Biography paragraphs |
| 94 | Office address |

#### 3F. src/components/landing/WhatsAppButton.tsx
| Line | What to change |
|---|---|
| 4 | Phone number |
| 6 | Pre-filled message text |

#### 3G. src/components/landing/MobileStickyBar.tsx
| Line | What to change |
|---|---|
| 9 | Phone number `href="tel:..."` |

#### 3H. src/components/landing/ExitIntentPopup.tsx
| Line | What to change |
|---|---|
| 85 | Phone number `href="tel:..."` |
| 88 | Phone number display text |

#### 3I. src/components/landing/Testimonials.tsx
| Line(s) | What to change |
|---|---|
| 3-39 | All testimonial content (name, quartier, text, initials) |
| 41-46 | Recent sales data |
| 59 | Client name in heading |
| 66 | Google reviews URL |

#### 3J. src/components/landing/Team.tsx
| Line(s) | What to change |
|---|---|
| 2-3 | Image imports |
| 39 | Client name |
| 40 | Job title |
| 42 | Bio paragraph |

#### 3K. src/components/landing/InstagramReels.tsx
| Line(s) | What to change |
|---|---|
| 7-22 | Reel thumbnails, views, captions |
| 44, 78 | Instagram profile URL |

#### 3L. src/components/landing/MarketStats.tsx
| Line(s) | What to change |
|---|---|
| 5-9 | Market statistics values |
| 20 | Cities/regions in subtitle |

#### 3M. src/routes/merci.tsx
| Line(s) | What to change |
|---|---|
| 25-26 | Client name |
| 32, 39 | Phone number |
| 42, 49 | Email address |
| 52 | WhatsApp number |
| 70 | Instagram URL |
| 75 | Instagram handle |

#### 3N. src/routes/admin.tsx
| Line | What to change |
|---|---|
| 117 | Admin header label ("Admin · Client Name") |

#### 3O. netlify/functions/send-guide.ts
| Line(s) | What to change |
|---|---|
| 38 | `from` email display name |
| 56 | PDF download link (Google Drive or hosted URL) |
| 65-67 | Email signature (name, title, website URL) |

### Phase 4: Swap Photos & Logos (5 min)

1. Replace files in `src/assets/`:
   - `hero-banner.jpg` — Hero background image
   - `mathis-red.jpg` — Client portrait (Hero)
   - `mathis-white.jpg` — Client portrait (About + Team)
   - `logo-equipe-color.png` — Color logo (Navbar)
   - `logo-equipe-white.png` — White logo (Footer)
   - `logo-equipe-red.png` — Red logo (if used)
   - `logo-equipe.png` — Default logo

2. Replace `public/favicon.ico` (or add `favicon.svg`)

3. Upload new OG preview image to CDN and update URL in `index.html` lines 21, 27

### Phase 5: Update SEO Files (2 min)

1. **`public/robots.txt`** line 6: Update sitemap URL to new domain
2. **`public/sitemap.xml`** line 4: Update `<loc>` to new domain URL

### Phase 6: Rebrand Colors (optional, 2 min)

Edit `src/styles.css` lines 44-49:
```css
--navy: oklch(0.21 0.04 260);       /* Primary background */
--navy-deep: oklch(0.16 0.035 260); /* Darker sections */
--crimson: oklch(0.56 0.22 25);     /* Accent color */
--crimson-glow: oklch(0.63 0.24 25);/* Hover accent */
--cream: oklch(0.97 0.01 80);       /* Light variant */
```

### Phase 7: Build & Deploy to Netlify (5 min)

1. Verify locally:
   ```bash
   bun run build   # or npm run build — must show 0 errors
   ```

2. Create new Netlify site linked to the client's GitHub repo

3. Set environment variables in **Netlify UI → Site Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`

4. Push & deploy:
   ```bash
   git add -A && git commit -m "Nouveau client : [nom]" && git push
   ```

5. Netlify auto-deploys from `netlify.toml` config

### Phase 8: Post-Deploy Verification (5 min)

- [ ] Homepage loads with correct branding
- [ ] Calendly popup opens on all CTA buttons
- [ ] Lead form submits (check Supabase dashboard)
- [ ] Lead Magnet sends email (check with test email)
- [ ] WhatsApp button opens correct number
- [ ] Admin login works at `/admin/login`
- [ ] CSV export downloads correctly
- [ ] Social links open correct profiles
- [ ] Mobile layout correct at 375px
- [ ] robots.txt accessible at `/robots.txt`
- [ ] sitemap.xml accessible at `/sitemap.xml`

---

**Total estimated time: ~45 minutes per new client.**

