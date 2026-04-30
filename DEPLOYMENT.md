# DEPLOYMENT.md — Guide de déploiement Serujan v2

> Procédure pas-à-pas pour mettre le site en production sur Cloudflare.
> Durée estimée : 15-20 min la première fois.

---

## Pré-requis

- Compte Cloudflare actif
- `wrangler` CLI installé (`bun add -g wrangler` ou `npm i -g wrangler`)
- Connexion : `wrangler login`

---

## 1. Créer la base D1

```bash
wrangler d1 create serujan-leads
```

Cloudflare retourne quelque chose comme :
```jsonc
{
  "binding": "DB",
  "database_name": "serujan-leads",
  "database_id": "abcd-1234-5678-..."
}
```

→ **Copier le `database_id`** dans `wrangler.jsonc` à la ligne marquée `REMPLACER-PAR-LE-VRAI-ID...`

---

## 2. Initialiser le schéma

```bash
# Schéma complet (premier déploiement)
wrangler d1 execute serujan-leads --file=./schema.sql --remote

# OU si la base existe déjà avec d'anciennes tables :
wrangler d1 execute serujan-leads --file=./migrations/003_add_lead_attempts.sql --remote
```

Vérifier :
```bash
wrangler d1 execute serujan-leads --command "SELECT name FROM sqlite_master WHERE type='table'" --remote
```

Doit retourner : `leads`, `admin_sessions`, `login_attempts`, `lead_attempts`.

---

## 3. Configurer les secrets

```bash
wrangler secret put ADMIN_PASSWORD --name serujan
# Coller le mot de passe quand demandé

wrangler secret put RESEND_API_KEY --name serujan
# Coller la clé Resend (commence par re_...)

# Optionnel — webhook GoHighLevel
wrangler secret put GHL_WEBHOOK_URL --name serujan
```

Vérifier :
```bash
wrangler secret list --name serujan
```

---

## 4. Configurer l'email Resend

Dans `src/lib/config.ts` :
```ts
emailFrom: "Équipe Serujan <onboarding@resend.dev>",
```

Pour utiliser un domaine custom (`expert@serujan.com` par exemple), ajouter le domaine dans **Resend Dashboard → Domains**, valider les DNS, puis remplacer `onboarding@resend.dev` par l'adresse choisie.

---

## 5. Configurer Google Analytics 4 (optionnel)

Dans `index.html`, remplacer les deux `G-XXXXXXXXXX` par l'ID GA4 réel (format `G-AB12CD34EF`).

---

## 6. Build & déploiement

```bash
bun run build      # Doit retourner 0 erreur
bun run test       # 52/52 doit passer
wrangler deploy
```

Cloudflare retourne l'URL `https://serujan.<account>.workers.dev`.

---

## 7. Vérifications post-déploiement

### Sécurité
- Ouvre `https://securityheaders.com/` et entre l'URL → cible **A+**
- Vérifie que le CSP charge bien GA4 sans erreur console
- Teste le formulaire de contact → email reçu sur `expert@serujan.com`

### Fonctionnel
- [ ] Toggle FR/EN change tous les textes
- [ ] Le formulaire de contact envoie un email
- [ ] La calculatrice anime ses chiffres
- [ ] Le scroll trace bien la ligne or du Process
- [ ] Le countdown Elev8 affiche le temps restant
- [ ] `/admin/login` → entrer `ADMIN_PASSWORD` → accès `/admin/leads`
- [ ] `/mentions-legales` et `/confidentialite` chargent bien
- [ ] Page `/merci` accessible
- [ ] 404 stylée sur URL inconnue

### Performance
- Lighthouse mobile + desktop : cible **95+/100/100/100**
- LCP < 1.5 s sur 4G
- Pas d'erreurs console en navigation normale

---

## 8. Domaine custom (optionnel)

Dans **Cloudflare Dashboard → Workers → serujan → Settings → Triggers** :
- Ajouter un Custom Domain : `serujan.com` ou sous-domaine choisi
- Mettre à jour les URLs canoniques dans `index.html`, `sitemap.xml`, `robots.txt`, `src/lib/config.ts` (`siteUrl`)
- Re-déployer

---

## 9. Maintenance

### Voir les leads en CLI
```bash
wrangler d1 execute serujan-leads --command "SELECT * FROM leads ORDER BY created_at DESC LIMIT 10" --remote
```

### Purger les anciennes tentatives (manuel — le worker le fait au login)
```bash
wrangler d1 execute serujan-leads --command "DELETE FROM login_attempts WHERE attempted_at < datetime('now', '-7 days')" --remote
wrangler d1 execute serujan-leads --command "DELETE FROM lead_attempts WHERE attempted_at < datetime('now', '-7 days')" --remote
```

### Logs en direct
```bash
wrangler tail --name serujan
```

### Rollback
```bash
wrangler rollback --name serujan
# Choisir une version précédente dans la liste
```

---

## 10. Mise à jour de contenu

Modifier `src/lib/translations.ts` pour le copy, puis :
```bash
bun run build && wrangler deploy
```

Pour les données client (téléphone, email, adresse), modifier `src/lib/config.ts`.

---

## 11. Checklist de pré-vol pour chaque déploiement

- [ ] `bun run build` → 0 erreur
- [ ] `bunx tsc --noEmit` → 0 erreur
- [ ] `bun run test` → 52/52
- [ ] Pas de `console.log` ajouté (sauf `console.error`/`warn` dans catch)
- [ ] Pas de texte hardcodé en français dans les composants (tout via `translations.ts`)
- [ ] Variables d'env Cloudflare à jour si changement
- [ ] Migrations D1 appliquées si changement de schéma
- [ ] Test manuel toggle FR/EN après déploiement

---

## Support

- Logs worker : `wrangler tail --name serujan`
- Dashboard Cloudflare : https://dash.cloudflare.com → Workers & Pages → serujan
- Resend dashboard : https://resend.com/emails

---

## 🆕 Onboarding d'un nouveau client (multi-tenant GHL)

Le code est prêt pour servir plusieurs clients. Chaque nouveau client = un nouveau
worker Cloudflare + sub-account GoHighLevel + 6 valeurs à éditer.

### Étape 1 — Côté GoHighLevel (5 min)

1. **Créer un sub-account** dans l'agence GHL pour le client (Location).
2. **Workflow webhook** : Workflows → New → trigger "Inbound Webhook"
   → copier l'URL générée (`https://services.leadconnectorhq.com/hooks/XXX`)
3. **Pixel ID** : Settings → Tracking → noter le Location ID du sub-account
4. **Custom fields** : Settings → Custom Fields → créer (textarea) si besoin :
   - `project_type`, `estimated_amount`, `message`
   - `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
   - `referrer`, `language`, `site_source`, `submitted_at`

   *(Si non créés : GHL ignorera ces fields silencieusement, mais le contact
   sera quand même créé avec le standard set firstName/lastName/email/phone/tags.)*

### Étape 2 — Côté code (10 min)

Fork le repo, ouvre **`src/lib/config.ts`**, édite tout le `clientConfig` :

```ts
export const clientConfig = {
  name: "Nouveau Client",
  shortName: "NomCourt",
  // ... toutes les autres valeurs (téléphone, email, address, etc.)

  ghl: {
    enabled: true,
    pixelId: "",                          // sera lu depuis VITE_GHL_PIXEL_ID
    sourcePrefix: "nouveauclient",        // → tags GHL "nouveauclient-leadform"
    clientName: "Nouveau Client",         // → custom field site_source
    defaultTags: ["site-lead"],
    defaultCountry: "CA",
  },
} as const;
```

Édite **`src/lib/translations.ts`** pour les copies bilingues FR/EN.

### Étape 3 — Côté infrastructure Cloudflare (5 min)

```bash
# 1. Créer la D1 dédiée pour ce client
npx wrangler d1 create nouveauclient-leads

# 2. Récupérer le database_id retourné, l'écrire dans wrangler.jsonc
#    (binding "DB" → database_id: "...")

# 3. Appliquer le schéma
npx wrangler d1 execute nouveauclient-leads --file=./schema.sql --remote

# 4. Appliquer toutes les migrations
npx wrangler d1 execute nouveauclient-leads --file=./migrations/002_add_auth_tables.sql --remote
npx wrangler d1 execute nouveauclient-leads --file=./migrations/003_add_lead_attempts.sql --remote
npx wrangler d1 execute nouveauclient-leads --file=./migrations/004_add_lead_attribution.sql --remote

# 5. Set les secrets
npx wrangler secret put ADMIN_PASSWORD       # mot de passe admin du dashboard
npx wrangler secret put RESEND_API_KEY        # clé Resend pour les emails
npx wrangler secret put GHL_WEBHOOK_URL       # URL webhook GHL de l'étape 1.2

# 6. Set la variable build-time pour le pixel GHL
echo "VITE_GHL_PIXEL_ID=<location_id_de_l_étape_1.3>" >> .env.production
```

### Étape 4 — Déploiement

```bash
bun install
bun run build      # build avec VITE_GHL_PIXEL_ID injecté
npx wrangler deploy
```

### Étape 5 — Smoke test (5 min)

1. Ouvrir le site déployé en navigation privée
2. Soumettre **1 lead par chacun des 4 points de capture** :
   - Hero LeadForm (formulaire complet)
   - MidPageCTA (rappel rapide)
   - ExitIntent (déclenché en sortant la souris en haut)
   - Calculator (capture email après simulation)
3. Vérifier dans GHL → Contacts qu'apparaissent **4 contacts** avec :
   - Tags : `nouveauclient-leadform`, `nouveauclient-midpage-cta`, etc.
   - `lang-fr` (ou `lang-en` selon la langue testée)
   - Custom fields remplis (project_type, message, utm_*, etc.)
4. Vérifier `/admin/leads` du site : 4 leads avec **GHL statut = ✓ ok**

### Test attribution UTM

Ouvrir une URL avec UTM, ex :
```
https://nouveauclient.com/?utm_source=google&utm_medium=cpc&utm_campaign=spring2026
```

Naviguer dans le site (les UTM disparaissent de l'URL), puis soumettre un lead.
Dans GHL Contact → Custom Fields → vérifier `utm_source=google`, `utm_medium=cpc`,
`utm_campaign=spring2026`.

### Tag list disponible

Tous les leads reçoivent automatiquement :
| Tag | Quand |
|---|---|
| `<sourcePrefix>-<source>` | Toujours (ex: `serujan-leadform`) |
| `lang-fr` ou `lang-en` | Selon `navigator.language` du visiteur |
| `utm-<source>` | Si UTM source présent |
| `utm-medium-<medium>` | Si UTM medium présent |
| `campaign-<campaign>` | Si UTM campaign présent |
| `<defaultTags[]>` | Tags par défaut du client (config.ts) |

Cap : **10 tags max par lead**, dedup case-insensitive.

### En cas de problème

| Symptôme | Diagnostic | Solution |
|---|---|---|
| Lead arrive en D1 mais pas en GHL | `ghl_status = "error"` dans admin | Vérifier que `GHL_WEBHOOK_URL` est correct, tester avec Postman |
| Lead arrive en D1 et GHL mais sans tags | Workflow GHL ne lit pas `tags` array | Activer "Add Tags" dans le step de création de contact GHL |
| Custom fields vides dans GHL | Custom fields pas créés côté GHL | Étape 1.4 : créer les custom fields manquants |
| `ghl_status = "skipped"` | `GHL_WEBHOOK_URL` non défini OU `ghl.enabled = false` | Set le secret + vérifier config.ts |
