# CLIENT_SWAP.md — Guide de personnalisation pour nouveau client

> Ce fichier détaille TOUS les éléments à modifier pour adapter le template à un nouveau courtier.
> Prérequis : avoir exécuté `setup-client.sh` ou les étapes manuelles de CLAUDE.md §8.
> Dernière mise à jour : 2026-04-28

---

## Étape 1 : Traductions (`src/lib/translations.ts`)

C'est le fichier **le plus important** — il contient TOUS les textes du site.

### Sections à modifier :

| Clé | Contenu | Exemple |
|---|---|---|
| `hero.title` | Nom du courtier | "MATHIS GUIMONT" → "MARIE DUPONT" |
| `hero.subtitle` | Sous-titre | "Courtier immobilier résidentiel" |
| `hero.territory` | Zone de service | "GATINEAU \| OTTAWA" → "MONTRÉAL \| LAVAL" |
| `hero.phone` | Téléphone | "819-918-3409" → "514-123-4567" |
| `about.*` | Biographie | Paragraphes sur le courtier |
| `testimonials.items` | Avis clients | 3-5 témoignages |
| `faq.items` | Questions fréquentes | Adapter à la ville/zone |
| `marketStats.*` | Statistiques du marché | Adapter à la ville |
| `team.*` | Infos équipe/bannière | Nom de l'équipe, bannière |
| `footer.*` | Contact complet | Adresse, tel, email, réseaux |

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

| Élément | Ligne | Quoi modifier |
|---|---|---|
| `<title>` | 6 | Nom du courtier + ville |
| `<link canonical>` | 9 | URL du nouveau site |
| `<meta description>` | 13 | Description adaptée |
| `og:url`, `og:title` | 18-20 | URL et titre |
| `og:image` | 21 | Screenshot du nouveau site |
| Schema.org JSON-LD | 49-76 | Nom, tel, email, adresse, réseaux sociaux |
| GA4 ID | 30-35 | Remplacer `G-XXXXXXXXXX` |

---

## Étape 5 : Worker — Email (`src/worker.ts`)

Modifier la fonction `handleSendGuide()` :

| Ligne | Quoi modifier |
|---|---|
| `from:` | `'NOM_COURTIER <onboarding@resend.dev>'` |
| `subject:` | Adapter le titre de l'email |
| HTML `<strong>` | Nom du courtier en signature |
| `<p>` métier | Titre professionnel + ville |
| `href` du bouton | Lien vers le nouveau guide PDF |

---

## Étape 6 : PWA (`public/manifest.json`)

```json
{
  "name": "NOM_COURTIER · Courtier immobilier à VILLE",
  "short_name": "NOM_COURTIER",
  "description": "Courtier immobilier résidentiel à VILLE",
  "lang": "fr-CA"
}
```

Remplacer aussi les icônes dans `public/` :
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)
- `favicon.ico`

---

## Étape 7 : Fichiers de config

| Fichier | Quoi modifier |
|---|---|
| `wrangler.jsonc` | `name`, `database_name`, `database_id` |
| `.env.local` | `VITE_CALENDLY_URL`, `VITE_GA4_ID` |
| `public/sitemap.xml` | URL du site |
| `public/robots.txt` | URL du sitemap |

---

## Étape 8 : Vérification finale

```bash
# 1. Build
bun run build   # 0 erreurs obligatoire

# 2. Test local
bun run dev     # Vérifier visuellement

# 3. Checklist visuelle :
# [ ] Hero : bon nom, bonne photo, bon territoire
# [ ] Navbar : logo, toggle FR/EN, CTA
# [ ] About : bonne bio, bonne photo
# [ ] Témoignages : vrais avis du client
# [ ] Footer : bon tel, email, adresse, réseaux
# [ ] Calculator : fonctionne correctement
# [ ] Toggle EN : TOUS les textes changent
# [ ] Mobile : sticky bar, WhatsApp, responsive
# [ ] Formulaire : soumission → lead dans D1
# [ ] Lead Magnet : email reçu avec bon guide

# 4. Deploy
npx wrangler deploy

# 5. Secrets dans Cloudflare Dashboard
# → Settings → Variables et secrets
# → RESEND_API_KEY + ADMIN_PASSWORD

# 6. Push
git add -A
git commit -m "feat: nouveau client — NOM_COURTIER"
git push -u origin main
```

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
| 9 | Réseaux sociaux | URLs (Facebook, Instagram, TikTok) |
| 10 | Bannière immobilière | Nom + Logo |
| 11 | Photo portrait (2 poses) | JPG haute résolution |
| 12 | Photo bannière hero | JPG 1920×1080 |
| 13 | Logo couleur + blanc | PNG transparent |
| 14 | 3-5 témoignages clients | Textes |
| 15 | Biographie | 2-3 paragraphes |
| 16 | Guide PDF (Lead Magnet) | URL hébergée (Google Drive) |
| 17 | ID Google Analytics 4 | G-XXXXXXXX |

---

> ⚠️ Temps estimé pour un swap complet : **30-45 minutes** si tous les éléments client sont fournis.
