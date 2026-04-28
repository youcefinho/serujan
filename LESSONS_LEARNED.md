# Leçons Apprises — Template Intralys

> Ce fichier documente TOUTES les erreurs et solutions trouvées lors des déploiements clients.
> À consulter AVANT chaque nouveau projet pour ne pas répéter les mêmes erreurs.
> Dernière mise à jour : 2026-04-28

---

## 🔴 ERREURS D'ARCHITECTURE

### Erreur 1 : Variables d'environnement au mauvais endroit
- **Symptôme :** "Internal Server Error" sur les routes API.
- **Cause :** `RESEND_API_KEY` et `ADMIN_PASSWORD` dans les variables de **build**, pas **runtime**.
- **Solution :** Configurer dans **Cloudflare → Workers → Settings → Variables et secrets** (section runtime).

### Erreur 2 : Dossier `functions/` incompatible avec Workers natifs
- **Symptôme :** Routes API 404 partout.
- **Cause :** `functions/` = Cloudflare Pages Functions, pas Workers natifs.
- **Solution :** Toute logique API dans `src/worker.ts`. Pas de dossier `functions/`.

### Erreur 3 : Types TypeScript manquants pour Cloudflare
- **Symptôme :** Erreurs TS sur `D1Database` et `ExportedHandler`.
- **Solution :** `bun add -D @cloudflare/workers-types` + `"types": ["vite/client", "@cloudflare/workers-types"]` dans tsconfig.

### Erreur 4 : `response.json()` retourne `unknown` en mode strict
- **Solution :** Toujours caster : `const data = await response.json() as { token?: string };`

### Erreur 5 : Textes hardcodés dans les composants
- **Solution :** TOUS les composants utilisent `useLanguage()` + `translations.ts`. Aucune exception.

### Erreur 6 : Anciens fichiers Supabase jamais supprimés
- **Solution :** Toujours supprimer les anciens fichiers lors d'une migration. Vérifier avec `grep -r "supabase" src/`.

---

## 🔴 ERREURS DE DONNÉES CLIENT

### Erreur 7 : Données client hardcodées dans 14+ fichiers
- **Solution :** Tout dans `src/lib/config.ts`. Zéro donnée client dans les composants `.tsx`.

### Erreur 8 : Schéma D1 incomplet vs frontend
- **Solution :** Pour chaque champ collecté : Frontend (Zod) → API → Worker → D1 → Admin. Tous alignés.

### Erreur 9 : Token admin validé par longueur seule (FAILLE CRITIQUE)
- **Solution :** `crypto.randomUUID()` stocké en D1 avec `expires_at` 24h + rate limiting 5/h/IP.

### Erreur 10 : Pas de sanitisation des inputs serveur (XSS)
- **Solution :** `sanitizeHtml()` pour le HTML + `sanitizeInput()` (trim+maxLen) + whitelist pour `type`.

### Erreur 11 : Fichiers statiques sans marqueurs SWAP
- **Solution :** `<!-- SWAP: -->` dans HTML, `# SWAP:` dans robots/sitemap, `_comment_SWAP` dans JSON.

---

## 🔴 ERREURS DE DÉPLOIEMENT

### Erreur 12 : Secrets Cloudflare effacés au deploy
- **Symptôme :** Login admin et emails cessent de fonctionner après `npx wrangler deploy`.
- **Solution :** Script `post-deploy.cjs` exécuté après chaque deploy. Utilise Node.js `execSync` avec `{ input: value }`.
- **Workflow :** `npx wrangler deploy` → `node post-deploy.cjs` → vérifier login.

### Erreur 13 : D1 CREATE TABLE IF NOT EXISTS ne modifie pas les tables existantes
- **Symptôme :** Erreur 500 — l'INSERT avec les nouvelles colonnes (budget, timeline, etc.) crashe.
- **Solution :** `migration-leads.sql` (ALTER TABLE) + INSERT résilient dans le worker (try/catch + auto-migration + fallback).

### Erreur 14 : Login admin — race condition navigate() + reload()
- **Symptôme :** Boucle infinie sur /admin/login après connexion réussie.
- **Solution :** Utiliser `window.location.href = "/admin/leads"` (PAS navigate + reload).

### Erreur 15 : PowerShell echo corrompt les secrets
- **Symptôme :** Mot de passe incorrect alors que la valeur semble bonne.
- **Solution :** Seule méthode fiable = Node.js `execSync('npx wrangler secret put NAME', { input: 'value', stdio: ['pipe','inherit','inherit'] })`.

### Erreur 16 : Resend plan gratuit — emails en spam
- **Symptôme :** Les emails de bienvenue newsletter ne sont pas reçus.
- **Solution :** Vérifier un domaine custom dans Resend pour la production. `onboarding@resend.dev` = dev/test uniquement.

### Erreur 17 : Pages admin sans lien retour
- **Solution :** "← Retour au site" sur `/admin/login` + header `/admin/leads`.

### Erreur 18 : VS Code — faux positifs CSS Tailwind v4
- **Solution :** `.vscode/settings.json` avec `"css.validate": false`.

---

## ✅ Checklist nouveau projet

1. [ ] `config.ts` contient TOUTES les données client
2. [ ] Zéro hardcoded dans les `.tsx`
3. [ ] Schema D1 = API = Frontend = Admin (alignés)
4. [ ] Auth admin : token D1 + expiration + rate limiting + logout
5. [ ] Sanitisation serveur (sanitizeHtml + sanitizeInput + whitelist)
6. [ ] Marqueurs SWAP dans tous les fichiers statiques
7. [ ] Admin gère 401 + 429 + erreurs (jamais page blanche)
8. [ ] Notification email courtier à chaque lead
9. [ ] Newsletter email de bienvenue automatique
10. [ ] i18n complet (toggle = 100% change)
11. [ ] `bun run build` = 0 erreurs
12. [ ] `post-deploy.cjs` créé (dans .gitignore)
13. [ ] Login admin testé après deploy
14. [ ] Formulaires achat + vente testés en production
15. [ ] Admin pages avec lien "← Retour au site"
16. [ ] teamMembers enrichis (phone/website/stars/reviews) + modal
17. [ ] `.vscode/settings.json` CSS validate = false
