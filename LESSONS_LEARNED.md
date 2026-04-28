# Leçons apprises — Projet Mathis Guimont (Gatineau)

> Ce fichier documente les erreurs et solutions trouvées lors du premier déploiement client.
> À consulter AVANT chaque nouveau projet pour ne pas répéter les mêmes erreurs.
> Dernière mise à jour : 2026-04-28

---

## 🔴 Erreur 1 : Variables d'environnement au mauvais endroit

**Symptôme :** "Internal Server Error" sur `/api/send-guide`  
**Cause :** Les variables `RESEND_API_KEY` et `ADMIN_PASSWORD` étaient dans les variables de **build**, pas dans les variables **runtime**.  
**Solution :** Les configurer dans **Cloudflare → Workers & Pages → Settings → Variables et secrets** (section runtime).

> ⚠️ Les variables de build sont injectées pendant le build. Les variables runtime sont lues par le Worker à l'exécution. Ce sont DEUX endroits différents dans le Dashboard.

---

## 🔴 Erreur 2 : Dossier `functions/` incompatible avec Workers natifs

**Symptôme :** Les routes API ne fonctionnent pas, 404 partout.  
**Cause :** Le dossier `functions/` est pour Cloudflare **Pages Functions**, pas pour les Workers natifs.  
**Solution :** Supprimer `functions/` et mettre toute la logique API dans `src/worker.ts`.

---

## 🔴 Erreur 3 : Types TypeScript manquants pour Cloudflare

**Symptôme :** Erreurs TS sur `D1Database` et `ExportedHandler` dans `worker.ts`.  
**Cause :** Le paquet `@cloudflare/workers-types` n'était pas installé.  
**Solution :**
```bash
bun add -D @cloudflare/workers-types
```
Et dans `tsconfig.json` :
```json
"types": ["vite/client", "@cloudflare/workers-types"]
```

---

## 🔴 Erreur 4 : `response.json()` retourne `unknown` en mode strict

**Symptôme :** Erreurs TS "est de type unknown" sur les réponses fetch.  
**Cause :** TypeScript strict mode ne permet pas d'accéder aux propriétés d'un type `unknown`.  
**Solution :** Toujours caster les réponses JSON :
```typescript
const data = await response.json() as { token?: string };
const { data } = await response.json() as { data: Lead[] };
```

---

## 🔴 Erreur 5 : Textes hardcodés oubliés

**Symptôme :** Certains textes ne changeaient pas quand on passait en anglais.  
**Cause :** 17 composants utilisaient encore du texte en dur au lieu du système i18n.  
**Solution :** TOUS les composants doivent utiliser `useLanguage()` + `translations.ts`. Aucune exception.

---

## 🔴 Erreur 6 : Anciens fichiers Supabase jamais supprimés

**Symptôme :** Erreurs TS sur `@supabase/supabase-js` introuvable.  
**Cause :** Le dossier `src/integrations/supabase/` existait encore après la migration.  
**Solution :** Toujours supprimer les anciens fichiers lors d'une migration. Vérifier avec `grep -r "supabase" src/`.

---

## ✅ Checklist nouveau projet (pour ne rien oublier)

1. [ ] Cloner le template
2. [ ] Créer la DB D1 + exécuter `schema.sql`
3. [ ] Mettre `database_id` dans `wrangler.jsonc`
4. [ ] `bun install` (vérifier que `@cloudflare/workers-types` est dans devDeps)
5. [ ] Configurer `.env.local` (VITE_CALENDLY_URL, VITE_GA4_ID)
6. [ ] Swap contenu client dans `translations.ts`
7. [ ] Swap photos dans `src/assets/`
8. [ ] Swap `index.html` (title, meta, Schema.org)
9. [ ] Swap `worker.ts` (nom courtier, lien guide PDF, email)
10. [ ] `bun run build` → 0 erreurs
11. [ ] `npx wrangler deploy`
12. [ ] Configurer secrets dans Dashboard Cloudflare (RESEND_API_KEY, ADMIN_PASSWORD)
13. [ ] Tester le formulaire de contact
14. [ ] Tester le Lead Magnet (envoi email)
15. [ ] Tester le panel admin (/admin/login → /admin/leads)
16. [ ] Tester le toggle FR/EN sur TOUTES les sections
17. [ ] `git push origin main`
