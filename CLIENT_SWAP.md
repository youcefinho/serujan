# CLIENT_SWAP.md — Guide de personnalisation pour nouveau client commercial

> Ce fichier détaille TOUS les éléments à modifier pour adapter le template à un nouveau courtier commercial.
> Dernière mise à jour : 2026-04-29

---

## ⚡ ÉTAPE 0 : Configuration client (`src/lib/config.ts`)

**C'est LE FICHIER PRINCIPAL.** Modifier ce seul fichier met à jour automatiquement :
- Navbar, Hero, Footer, MobileStickyBar, ExitIntentPopup
- Page Merci, Panel Admin, LeadForm, FreeConsultation
- Worker email template (nom, email, données)

```ts
export const clientConfig = {
  name: "NOM DU COURTIER",
  title: { fr: "Courtier hypothécaire commercial", en: "..." },
  phone: { display: "(514) 000-0000", raw: "5140000000" },
  email: "expert@courtier.com",
  address: { street: "...", city: "Montréal", province: "QC", postalCode: "..." },
  territory: "MONTRÉAL | QUÉBEC",
  stats: { amount: { value: "500M$", ... }, ... },
  externalUrls: { event: "https://..." | null, academy: "..." | null, ... },
  siteUrl: "https://NOM-CLIENT.intralysqc.workers.dev",
  emailFrom: "NOM <onboarding@resend.dev>",
};
```

---

## Étape 1 : Traductions (`src/lib/translations.ts`)

| Clé | Contenu |
|---|---|
| `hero.title`, `hero.subtitle` | Accroche principale |
| `hero.typingWords` | Mots animés dans le Hero |
| `about.description`, `about.features` | Mon Approche |
| `services.items` | 4 services commerciaux |
| `process.steps` | 4 étapes du processus |
| `valueCards.cards` | 3 cartes de valeur ajoutée |
| `footer.description` | Pied de page |

---

## Étape 2 : Photos (`src/assets/`)

| Fichier | Format | Utilisé dans |
|---|---|---|
| `logo.png` | PNG transparent | Navbar, Footer |
| `portrait.jpg` | 800×1000px, portrait | About |
| `hero-bg.jpg` | 1920×1080px (optionnel) | Hero background |

---

## Étape 3 : Couleurs (`src/styles.css`)

```css
:root {
  --gold: oklch(0.76 0.12 85);           /* Accent principal */
  --gold-glow: oklch(0.82 0.14 85);      /* Hover */
  --black-deep: oklch(0.08 0.005 260);   /* Fond */
  --black-surface: oklch(0.12 0.008 260); /* Cartes */
}
```

---

## Étape 4 : SEO (`index.html`)

Tous les marqueurs `<!-- SWAP: -->` sont documentés dans le fichier.

---

## Étape 5 : Sections optionnelles

Certaines sections sont liées aux `externalUrls` dans `config.ts` :

| Section | Config | Si `null` |
|---|---|---|
| Elev8Event | `externalUrls.event` | Section masquée |
| Elev8Academy | `externalUrls.academy` | Section masquée |
| Podcast | `externalUrls.podcast` | Section masquée |

---

## Étape 6 : Déploiement

```bash
# Créer la base D1
npx wrangler d1 create NOM-CLIENT-leads
# Copier l'ID dans wrangler.jsonc

# Exécuter le schéma
npx wrangler d1 execute NOM-CLIENT-leads --file=./schema.sql --remote

# Build + Deploy
bun run build
npx wrangler deploy
node post-deploy.cjs
```

---

## Éléments à demander au client commercial

| # | Élément | Format |
|---|---|---|
| 1 | Nom complet | Texte |
| 2 | Titre professionnel | Texte |
| 3 | Téléphone | Texte |
| 4 | Email | Texte |
| 5 | Adresse du bureau | Texte |
| 6 | Zone de service | Texte (ex: MONTRÉAL \| QUÉBEC) |
| 7 | URL Calendly | URL |
| 8 | Réseaux sociaux | URLs |
| 9 | Logo (couleur + blanc) | PNG transparent |
| 10 | Photo portrait | JPG haute résolution |
| 11 | Stats (M$ financés, % approbation, etc.) | Nombres |
| 12 | Description bio | 2-3 paragraphes |
| 13 | URL événement (optionnel) | URL |
| 14 | URL academy (optionnel) | URL |
| 15 | Embed podcast (optionnel) | URL Spotify |
| 16 | ID Google Analytics 4 | G-XXXXXXXX |
| 17 | Mot de passe admin | Pour post-deploy.cjs |

> ⚠️ Temps estimé pour un swap complet : **20-30 minutes** si tous les éléments sont fournis.
