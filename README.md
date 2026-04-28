# 🏠 Landing Page Courtier Immobilier — Template Intralys

> Template de site web haute conversion pour courtier immobilier au Québec.
> Conçu pour être reproduit en moins de 1 heure pour chaque nouveau client.

---

## 🛠 Stack Technique

| Outil | Rôle |
|---|---|
| **Vite** | Build & dev server |
| **React 19** | Interface utilisateur |
| **TypeScript** | Typage strict |
| **Tailwind CSS v4** | Styles utilitaires |
| **TanStack Router** | Routing type-safe |
| **Supabase** | Base de données + authentification |
| **Resend** | Envoi d'emails automatisé |
| **Netlify** | Hébergement + Functions serverless |
| **Calendly** | Prise de rendez-vous |

---

## 📋 Guide de Reproduction — Nouveau Client

### Étape 1 : Cloner le repo

```bash
git clone https://github.com/youcefinho/gatineau-premier-achat-vente.git nom-du-nouveau-client
cd nom-du-nouveau-client
```

### Étape 2 : Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Ouvrez `.env.local` et remplissez **toutes** les valeurs :

| Variable | Où la trouver |
|---|---|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon (public) key |
| `SUPABASE_URL` | Même valeur que `VITE_SUPABASE_URL` |
| `SUPABASE_ANON_KEY` | Même valeur que `VITE_SUPABASE_ANON_KEY` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role key |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys |
| `VITE_GA4_ID` | Google Analytics 4 → Admin → Data Streams |
| `VITE_CALENDLY_URL` | URL de la page Calendly du courtier |

> ⚠️ **Important :** `VITE_GA4_ID` doit aussi être collé manuellement dans `index.html` lignes 30 et 35 (remplacer `G-XXXXXXXXXX`).

### Étape 3 : Créer le projet Supabase

1. Créer un nouveau projet sur [supabase.com](https://supabase.com)
2. Aller dans **SQL Editor** et exécuter les 3 fichiers de migration dans l'ordre :
   ```
   supabase/migrations/20260424213511_*.sql  ← Table leads + RLS
   supabase/migrations/20260424213530_*.sql  ← Comment policy
   supabase/migrations/20260424214820_*.sql  ← Table user_roles + admin policies
   ```
3. Créer un compte admin dans **Authentication → Users**
4. Ajouter le rôle admin en SQL :
   ```sql
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('UUID-DU-USER-ADMIN', 'admin');
   ```

### Étape 4 : Remplacer le contenu client (CLIENT_SWAP)

Remplacer les éléments suivants pour le nouveau client :

#### A. Identité & SEO → `index.html`
- Titre, meta description, keywords, URLs canonical/OG
- Schema.org JSON-LD (nom, téléphone, email, adresse, villes)
- ID Google Analytics (`G-XXXXXXXXXX` → votre ID)

#### B. Photos & Logos → `src/assets/`
- `hero-banner.jpg` — Image de fond hero
- `mathis-red.jpg` — Portrait du courtier (Hero)
- `mathis-white.jpg` — Portrait du courtier (About, Team)
- `logo-equipe-color.png` — Logo couleur (Navbar)
- `logo-equipe-white.png` — Logo blanc (Footer)

#### C. Contenu des sections → `src/components/landing/`
- `Hero.tsx` — Nom, titre, numéro de téléphone, badge âge
- `About.tsx` — Biographie, adresse du bureau
- `Footer.tsx` — Téléphone, email, adresse, réseaux sociaux
- `Testimonials.tsx` — Avis clients + ventes récentes
- `Team.tsx` — Nom, titre, biographie
- `WhatsAppButton.tsx` — Numéro WhatsApp
- `MobileStickyBar.tsx` — Numéro de téléphone
- `ExitIntentPopup.tsx` — Numéro de téléphone
- `InstagramReels.tsx` — URLs Instagram + thumbnails
- `MarketStats.tsx` — Statistiques marché local

#### D. Lead Magnet → `netlify/functions/send-guide.ts`
- Lien du PDF (Google Drive ou hébergé)
- Nom et signature dans l'email

#### E. SEO → `public/`
- `robots.txt` — URL du sitemap
- `sitemap.xml` — URL du site

> 📖 Voir `REPRODUCTION_CHECKLIST.md` pour la liste complète avec numéros de lignes exacts.

### Étape 5 : Installer les dépendances

```bash
bun install
# ou
npm install
```

### Étape 6 : Vérifier le build

```bash
bun run build
# ou
npm run build
```

✅ Doit afficher **0 errors, 0 warnings**.

### Étape 7 : Tester localement

```bash
bun run dev
# ou
npm run dev
```

Vérifier :
- [ ] Page d'accueil charge correctement
- [ ] Formulaire de contact fonctionne
- [ ] Popup Calendly s'ouvre
- [ ] Dashboard admin accessible à `/admin/login`

### Étape 8 : Déployer sur Netlify

```bash
git add -A
git commit -m "Nouveau client : [Nom du courtier]"
git push origin main
```

Netlify détecte le push et déploie automatiquement via `netlify.toml`.

**Variables à configurer dans Netlify UI** (Site Settings → Environment Variables) :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`

### Étape 9 : Vérification post-déploiement

- [ ] Homepage affiche le bon branding
- [ ] Formulaire lead enregistre dans Supabase
- [ ] Lead Magnet envoie l'email
- [ ] Calendly popup fonctionne
- [ ] WhatsApp ouvre le bon numéro
- [ ] Admin dashboard accessible
- [ ] Export CSV fonctionne
- [ ] Mobile responsive (375px)
- [ ] `robots.txt` et `sitemap.xml` accessibles

---

## 📁 Structure du projet

```
├── index.html                  # Point d'entrée + SEO + Schema.org
├── netlify.toml                # Config Netlify (headers, redirects, caching)
├── .env.example                # Template des variables d'environnement
├── public/
│   ├── robots.txt              # Directives crawlers
│   └── sitemap.xml             # Plan du site
├── netlify/functions/
│   └── send-guide.ts           # Netlify Function — envoi email Lead Magnet
├── supabase/migrations/        # SQL — tables leads + user_roles + RLS
├── src/
│   ├── main.tsx                # Point d'entrée React
│   ├── styles.css              # Variables de couleurs + Tailwind config
│   ├── lib/calendly.ts         # Helper Calendly popup + sync Supabase
│   ├── hooks/                  # useScrollReveal, useMobile
│   ├── integrations/supabase/  # Client Supabase + types
│   ├── components/
│   │   ├── landing/            # 27 composants de la landing page
│   │   └── ui/                 # Composants UI réutilisables
│   └── routes/                 # Pages TanStack Router
│       ├── index.tsx           # Page d'accueil (assemblage)
│       ├── merci.tsx           # Page de remerciement
│       ├── admin.tsx           # Layout admin (auth guard)
│       ├── admin.login.tsx     # Connexion admin
│       └── admin.leads.tsx     # Dashboard leads + export CSV
└── src/assets/                 # Photos et logos du courtier
```

---

## 🎨 Personnalisation des couleurs

Les couleurs sont dans `src/styles.css` (`:root`, lignes 44-49) :

```css
--navy: oklch(0.21 0.04 260);       /* Fond principal */
--navy-deep: oklch(0.16 0.035 260); /* Sections sombres */
--crimson: oklch(0.56 0.22 25);     /* Couleur d'accent */
--crimson-glow: oklch(0.63 0.24 25);/* Accent hover */
--cream: oklch(0.97 0.01 80);       /* Variante claire */
```

---

## 📚 Documentation complète

| Fichier | Contenu |
|---|---|
| `INTRALYS_MASTER.md` | Documentation technique complète du template |
| `REPRODUCTION_CHECKLIST.md` | Audit des fonctionnalités + checklist de reproduction avec numéros de lignes |
| `.env.example` | Toutes les variables d'environnement requises |

---

*Créé par Intralys · Template courtier immobilier haute conversion*
