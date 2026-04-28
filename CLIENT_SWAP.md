# CLIENT_SWAP.md — Guide de personnalisation pour nouveau client

> Ce fichier détaille TOUS les éléments à modifier pour adapter le template à un nouveau courtier.
> Prérequis : avoir exécuté `setup-client.sh` ou les étapes manuelles de CLAUDE.md §8.
> Dernière mise à jour : 2026-04-28

---

## ⚡ ÉTAPE 0 : Configuration client (`src/lib/config.ts`)

**C'est LE FICHIER PRINCIPAL.** Modifier ce seul fichier met à jour automatiquement :
- Navbar, Hero, Footer, WhatsApp, MobileStickyBar, ExitIntentPopup
- Page Merci, Panel Admin, LeadForm (erreur), Testimonials (Google Review)
- Worker email template (nom, ville, titre, guide URL)

```ts
export const clientConfig = {
  name: "NOM DU COURTIER",
  title: { fr: "Courtier immobilier résidentiel", en: "..." },
  phone: {
    display: "514-123-4567",
    raw: "5141234567",
    international: "15141234567",
  },
  email: "info@courtier.com",
  address: { street: "...", city: "Montréal", region: "...", province: "QC", postalCode: "...", country: "CA" },
  territory: "MONTRÉAL | LAVAL",
  territoryLabel: "Montréal",
  socials: {
    instagram: { url: "...", handle: "@courtier" },
    facebook: { url: "..." },
    tiktok: { url: "..." },
    linkedin: null,
  },
  banner: { name: "Nom de l'équipe", team: "RE/MAX" },
  centrisUrl: "...",
  googleReviewUrl: "...",
  guideUrl: "...",
  siteUrl: "...",
  emailFrom: "NOM <onboarding@resend.dev>",
  emailSubject: { fr: "...", en: "..." },
  ageBadge: { value: "X ans", label: { fr: "...", en: "..." } },
  merci: { callbackDelay: { fr: "...", en: "..." }, followText: { fr: "...", en: "..." } },
};
```

---

## Étape 1 : Traductions (`src/lib/translations.ts`)

Textes spécifiques au courtier (biographie, témoignages, FAQ, statistiques du marché).

| Clé | Contenu |
|---|---|
| `hero.description`, `hero.descriptionBold` | Accroche du Hero |
| `about.*` | Biographie complète |
| `testimonials.cards` | Témoignages clients |
| `faq.items` | FAQ adaptées à la ville |
| `marketStats.*` | Statistiques du marché local |
| `team.bio`, `team.role` | Bio et rôle |
| `footer.desc`, `footer.copyright` | Pied de page |

---

## Étape 2 : Photos (`src/assets/`)

| Fichier | Format | Utilisé dans |
|---|---|---|
| `hero-banner.jpg` | 1920×1080px, paysage | Hero background |
| `mathis-red.jpg` | 800×1000px, portrait | About, Team |
| `mathis-white.jpg` | 800×1000px, portrait | Hero |
| `logo-equipe-color.png` | PNG transparent | Navbar, ParentTeam |
| `logo-equipe-white.png` | PNG transparent | Footer |

> ⚠️ Renommer les fichiers en gardant les mêmes noms OU modifier les imports dans les composants.

---

## Étape 3 : Couleurs (`src/styles.css`)

Voir `COLOR_PALETTES.md` pour les palettes pré-définies par bannière.

```css
:root {
  --navy: oklch(0.21 0.04 260);      /* Couleur de fond principale */
  --navy-deep: oklch(0.16 0.035 260); /* Fond encore plus sombre */
  --crimson: oklch(0.56 0.22 25);     /* Couleur accent (boutons, CTAs) */
  --crimson-glow: oklch(0.63 0.24 25); /* Accent hover/glow */
  --cream: oklch(0.97 0.01 80);       /* Texte clair */
}
```

---

## Étape 4 : SEO (`index.html`)

Tous les éléments à modifier sont marqués avec `<!-- SWAP: ... -->` dans le HTML.

| Marqueur | Quoi modifier |
|---|---|
| `<!-- SWAP: Titre du site -->` | `<title>` |
| `<!-- SWAP: URL du site -->` | `<link canonical>` + `<link hreflang>` |
| `<!-- SWAP: Description SEO -->` | `<meta description>` |
| `<!-- SWAP: Mots-clés SEO -->` | `<meta keywords>` |
| `<!-- SWAP: Open Graph -->` | `og:url`, `og:title`, `og:description`, `og:image` |
| `<!-- SWAP: Twitter Card -->` | `twitter:title`, `twitter:description`, `twitter:image` |
| `<!-- SWAP: Google Analytics 4 ID -->` | `G-XXXXXXXXXX` (2 occurrences) |
| `<!-- SWAP: Nom de l'app mobile -->` | `apple-mobile-web-app-title` |
| `<!-- SWAP: JSON-LD Schema.org -->` | Tout le bloc JSON-LD |

> 💡 Astuce : chercher `SWAP:` dans le fichier pour trouver toutes les zones en 5 secondes.

---

## Étape 5 : PWA (`public/manifest.json`)

Modifier les 3 champs marqués `_comment_SWAP` :

```json
{
  "name": "NOM_COURTIER · Courtier immobilier à VILLE",
  "short_name": "NOM_COURTIER",
  "description": "Courtier immobilier résidentiel à VILLE"
}
```

Remplacer aussi les icônes dans `public/` :
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)
- `favicon.ico`

---

## Étape 6 : Fichiers de config

| Fichier | Quoi modifier |
|---|---|
| `wrangler.jsonc` | `name`, `database_name`, `database_id` |
| `.env.local` | `VITE_CALENDLY_URL`, `VITE_GA4_ID` |
| `public/sitemap.xml` | URL du site |
| `public/robots.txt` | URL du sitemap |

---

## Étape 7 : Base de données D1

```bash
# Créer la base
npx wrangler d1 create NOM-COURTIER-leads

# Copier le database_id dans wrangler.jsonc

# Exécuter le schéma complet (inclut leads + admin_sessions + login_attempts)
npx wrangler d1 execute NOM-COURTIER-leads --file=./schema.sql
```

---

## Étape 8 : Vérification finale et déploiement

```bash
# 1. Build
bun run build   # 0 erreurs obligatoire

# 2. Tests
bun run test    # 14 tests doivent passer

# 3. Test local
bun run dev     # Vérifier visuellement

# 4. Checklist visuelle :
# [ ] Hero : bon nom, bonne photo, bon territoire
# [ ] Navbar : logo, toggle FR/EN, CTA, bon téléphone
# [ ] About : bonne bio, bonne photo
# [ ] Témoignages : vrais avis du client
# [ ] Footer : bon tel, email, adresse, réseaux
# [ ] Calculator : fonctionne correctement
# [ ] Toggle EN : TOUS les textes changent
# [ ] Mobile : sticky bar, WhatsApp, responsive
# [ ] Formulaire : soumission → lead dans D1
# [ ] Lead Magnet : email reçu avec bon guide
# [ ] Admin : login → leads → export CSV → logout

# 5. Deploy
npx wrangler deploy

# 6. ⚠️ OBLIGATOIRE — Remettre les secrets (effacés par le deploy)
# Copier post-deploy.example.cjs → post-deploy.cjs
# Mettre les vrais secrets dedans
node post-deploy.cjs

# 7. Vérifications post-deploy :
# [ ] Login admin → /admin/login avec le mot de passe
# [ ] Formulaire ACHAT → remplir et soumettre → page merci
# [ ] Formulaire VENTE → remplir et soumettre → page merci
# [ ] Newsletter → inscrire un email test → vérifier spams
# [ ] Notification courtier → vérifier l'email reçu
# [ ] Admin panel → vérifier que les leads apparaissent
# [ ] Lien "← Retour au site" dans l'admin
# [ ] Vider les leads de test : npx wrangler d1 execute DB --command="DELETE FROM leads" --remote

# 8. Push
git add -A
git commit -m "feat: nouveau client — NOM_COURTIER"
git push -u origin main
```

> ⚠️ **Si la base D1 existait déjà** avec un ancien schéma, exécuter d'abord :
> `npx wrangler d1 execute DB --file=./migration-leads.sql --remote`

---

## Étape 9 : Fichiers à créer pour chaque client

| Fichier | Source | Description |
|---|---|---|
| `post-deploy.cjs` | Copier `post-deploy.example.cjs` | Mettre les vrais secrets dedans |
| `.vscode/settings.json` | Déjà dans le template | `"css.validate": false` (Tailwind v4) |

> ⚠️ `post-deploy.cjs` est dans `.gitignore` — il ne sera JAMAIS commité.

---

## Éléments à demander au client

| # | Élément | Format |
|---|---|---|
| 1 | Nom complet | Texte |
| 2 | Titre professionnel | Texte |
| 3 | Téléphone | Texte |
| 4 | Email professionnel | Texte |
| 5 | Adresse du bureau | Texte |
| 6 | Zone de service | Texte (ex: GATINEAU \| OTTAWA) |
| 7 | URL Calendly | URL |
| 8 | URL Centris | URL |
| 9 | URL Google Review | URL |
| 10 | Réseaux sociaux | URLs (Facebook, Instagram, TikTok) |
| 11 | Bannière immobilière | Nom + Logo |
| 12 | Photo portrait (2 poses) | JPG haute résolution |
| 13 | Photo bannière hero | JPG 1920×1080 |
| 14 | Logo couleur + blanc | PNG transparent |
| 15 | 3-5 témoignages clients | Textes |
| 16 | Biographie | 2-3 paragraphes |
| 17 | Guide PDF (Lead Magnet) | URL hébergée (Google Drive) |
| 18 | ID Google Analytics 4 | G-XXXXXXXX |
| 19 | Mot de passe admin | Pour `post-deploy.cjs` |
| 20 | Membres de l'équipe | Nom, téléphone, site web, photo |

---

> ⚠️ Temps estimé pour un swap complet : **30-45 minutes** si tous les éléments client sont fournis.

