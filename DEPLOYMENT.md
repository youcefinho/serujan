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
bun run test       # 43/43 doit passer
wrangler deploy
```

Cloudflare retourne l'URL `https://serujan.<account>.workers.dev`.

---

## 7. Vérifications post-déploiement

### Sécurité
- Ouvre `https://securityheaders.com/` et entre l'URL → cible **A+**
- Vérifie que le CSP charge bien Calendly + GA4 sans erreur console
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
- [ ] `bun run test` → 43/43
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
