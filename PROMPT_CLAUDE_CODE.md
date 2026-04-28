# PROMPT CLAUDE CODE — Phase 2 : Personnalisation Nouveau Client

> Copier-coller ce prompt dans Claude Code (terminal) après avoir cloné le template.
> Remplacer les {{VARIABLES}} par les informations du client.
> Dernière mise à jour : 2026-04-28

---

## PROMPT À COLLER DANS CLAUDE CODE :

```
## CONTEXTE

Je suis Rochdi, développeur solo chez Intralys. Ce projet est un clone du template `intralys-template` pour un nouveau client courtier immobilier.

**Lis d'abord ces fichiers dans cet ordre :**
1. `CLAUDE.md` — TOUTES les règles + TOUTES les leçons apprises (§12)
2. `CLIENT_SWAP.md` — Guide de personnalisation étape par étape
3. `COLOR_PALETTES.md` — Palettes couleurs par bannière

---

## INFORMATIONS DU NOUVEAU CLIENT

- **Nom du courtier :** {{NOM_COURTIER}}
- **Titre :** {{TITRE}} (ex: Courtier immobilier résidentiel)
- **Téléphone :** {{TELEPHONE}} (format: 514-123-4567)
- **Email :** {{EMAIL}}
- **Adresse :** {{ADRESSE_RUE}}, {{VILLE}}, {{PROVINCE}} {{CODE_POSTAL}}
- **Territoire :** {{TERRITOIRE}} (ex: MONTRÉAL | LAVAL)
- **Région :** {{REGION}} (ex: Grand Montréal)
- **Bannière :** {{BANNIERE}} (ex: RE/MAX, Royal LePage, Sutton, indépendant)
- **Nom de l'équipe :** {{NOM_EQUIPE}}
- **URL Calendly :** {{CALENDLY_URL}}
- **URL Centris :** {{CENTRIS_URL}}
- **URL Google Review :** {{GOOGLE_REVIEW_URL}}
- **Instagram :** {{INSTAGRAM_URL}} / {{INSTAGRAM_HANDLE}}
- **Facebook :** {{FACEBOOK_URL}}
- **TikTok :** {{TIKTOK_URL}} (ou null)
- **LinkedIn :** {{LINKEDIN_URL}} (ou null)
- **URL Guide PDF :** {{GUIDE_URL}}
- **ID Google Analytics :** {{GA4_ID}} (ou G-XXXXXXXXXX)
- **Âge/expérience :** {{AGE_BADGE}} (ex: "28 ans" ou "12 ans d'expérience")
- **Membres équipe :**
  - {{MEMBRE_1_NOM}}, {{MEMBRE_1_ROLE}}, {{MEMBRE_1_TEL}}, {{MEMBRE_1_SITE}}
  - {{MEMBRE_2_NOM}}, {{MEMBRE_2_ROLE}}, {{MEMBRE_2_TEL}}, {{MEMBRE_2_SITE}}

### Biographie (FR) :
{{BIO_FR}}

### Biographie (EN) :
{{BIO_EN}}

### Témoignages (4-5) :
1. {{TEMOIGNAGE_1_NOM}} · {{TEMOIGNAGE_1_QUARTIER}} · "{{TEMOIGNAGE_1_TEXTE}}"
2. {{TEMOIGNAGE_2_NOM}} · {{TEMOIGNAGE_2_QUARTIER}} · "{{TEMOIGNAGE_2_TEXTE}}"
3. {{TEMOIGNAGE_3_NOM}} · {{TEMOIGNAGE_3_QUARTIER}} · "{{TEMOIGNAGE_3_TEXTE}}"
4. {{TEMOIGNAGE_4_NOM}} · {{TEMOIGNAGE_4_QUARTIER}} · "{{TEMOIGNAGE_4_TEXTE}}"

### FAQ spécifiques (adapter les réponses à la ville) :
- Adapter les FAQ dans translations.ts à la ville {{VILLE}}

### Stats marché local :
- Prix médian : {{PRIX_MEDIAN}}
- Temps moyen de vente : {{TEMPS_VENTE}}
- Transactions annuelles : {{TRANSACTIONS}}
- Augmentation prix : {{AUGMENTATION}}

---

## MISSION — Exécuter dans cet ordre exact :

### Étape 0 : Setup initial
```bash
# Si pas déjà fait :
git remote set-url origin https://github.com/youcefinho/{{REPO_NOM}}.git
bun install
```

### Étape 1 : `src/lib/config.ts`
Remplacer TOUTES les données client. Chercher "SWAP" et "NOM DU COURTIER" comme repères.

### Étape 2 : `src/lib/translations.ts`
Réécrire les textes FR/EN :
- `hero.*` — accroche + badge territoire
- `about.*` — biographie complète
- `testimonials.cards` — témoignages
- `faq.items` — FAQ adaptées à la ville
- `marketStats.*` — stats du marché local
- `footer.*` — desc + copyright + secteurs desservis
- `calculator.cta` — CTA avec nom du courtier
- `whatsapp.message` — message avec nom
- Tout autre texte contenant le nom de l'ancien courtier

### Étape 3 : `src/assets/`
Les photos doivent être remplacées manuellement par Rochdi AVANT ou APRÈS cette session.
Les noms de fichiers à remplacer :
- `hero-banner.jpg` (1920×1080)
- `mathis-red.jpg` → renommer en `courtier-portrait-1.jpg` (ou garder le nom)
- `mathis-white.jpg` → renommer en `courtier-portrait-2.jpg` (ou garder le nom)
- Logos équipe (si fournis)

⚠️ Si les noms changent, mettre à jour les imports dans :
- `About.tsx` (import de la photo portrait)
- `FreeConsultation.tsx` (import de la photo rouge)
- `Team.tsx` (import de la photo)
- `Hero.tsx` (import hero-banner)

### Étape 4 : `src/styles.css`
Appliquer la palette couleurs de la bannière du client depuis `COLOR_PALETTES.md`.

### Étape 5 : `index.html`
Chercher tous les `<!-- SWAP: -->` et remplacer :
- `<title>`
- `<link canonical>` + `<link hreflang>`
- `<meta description>` + `<meta keywords>`
- Open Graph (og:url, og:title, og:description)
- Twitter Card
- GA4 ID (2 occurrences)
- `apple-mobile-web-app-title`
- JSON-LD Schema.org (TOUT le bloc)

### Étape 6 : Fichiers config
- `wrangler.jsonc` — `name`, `database_name`, `database_id`
- `public/manifest.json` — `name`, `short_name`, `description`
- `public/sitemap.xml` — URL du site
- `public/robots.txt` — URL du sitemap

### Étape 7 : Propriétés (`Properties.tsx`)
Adapter les propriétés d'exemple :
- Changer les locations pour {{VILLE}}
- Adapter les prix au marché local
- Garder le même format (3 propriétés, badges, superficie)

### Étape 8 : Commentaires dans `index.tsx`
Remplacer le commentaire `{/* — QUI EST MATHIS — */}` par le nom du nouveau courtier.

### Étape 9 : Vérifications OBLIGATOIRES avant de terminer
```bash
bun run build   # DOIT être 0 erreurs
```
Puis vérifier :
- [ ] `grep -ri "mathis" src/` → 0 résultats (sauf commentaires)
- [ ] `grep -ri "mathis" index.html` → 0 résultats
- [ ] `grep -ri "gatineau" src/` → 0 résultats (sauf si le client EST à Gatineau)
- [ ] Aucun `console.log` dans src/
- [ ] Aucun import inutilisé
- [ ] config.ts ne contient que des données du NOUVEAU client
- [ ] translations.ts ne mentionne que le NOUVEAU client

### Commit final
```bash
git add -A
git commit -m "feat: personnalisation {{NOM_COURTIER}} — swap complet template Intralys"
```

---

## RÈGLES NON NÉGOCIABLES
1. **Bun, jamais npm** — `bun install`, `bun run build`, `bun add`
2. **0 console.log** en production (console.error dans catch OK)
3. **0 données hardcodées** — tout dans config.ts ou translations.ts
4. **TypeScript strict** — pas de `any`
5. **Build = 0 erreurs** avant de terminer
6. **Lire CLAUDE.md §12** — les 27 leçons DOIVENT être respectées
```

---

## Notes pour Rochdi

### Avant de lancer Claude Code :
1. Avoir les infos client prêtes (PDF ou notes)
2. Avoir les photos prêtes dans un dossier
3. Avoir créé le repo GitHub (`youcefinho/nom-du-client`)
4. Avoir cloné le template et être dans le répertoire

### Après Claude Code, passer à Antigravity :
→ Voir `PROMPT_ANTIGRAVITY.md`
