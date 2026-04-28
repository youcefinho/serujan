# gemini.md — Directives Universelles Antigravity

> Ce fichier contient les règles globales qui s'appliquent à **TOUS** les projets Intralys.
> Antigravity doit lire ce fichier à chaque ouverture de projet.
> Dernière mise à jour : 2026-04-28

---

## 1. STACK PAR DÉFAUT

| Outil | Usage |
|---|---|
| **React** | UI — composants fonctionnels uniquement |
| **TypeScript** | Typage strict obligatoire sur tout projet |
| **Tailwind CSS v4** | Styles utilitaires (syntaxe v4 avec `@theme inline`, couleurs `oklch`) |
| **Vite** | Build tool et dev server |
| **Bun** | Runtime et gestionnaire de paquets |
| **Cloudflare Workers** | Worker unifié : API + assets statiques |
| **Cloudflare D1** | Base de données SQLite serverless (1 DB par client) |
| **Resend** | Envoi d'emails transactionnels |

### Règle absolue : Bun, jamais npm
- Installer : `bun install`
- Build : `bun run build`
- Dev : `bun run dev`
- Ajouter un paquet : `bun add <package>`
- **Ne jamais utiliser `npm` ni `yarn`.** Si un README ou un outil suggère `npm`, remplacer par `bun`.

---

## 2. BUILD

```bash
bun run build
```

- **Cette commande DOIT passer avec 0 erreurs et 0 warnings avant tout `git push`.**
- Si le build échoue, corriger les erreurs avant de commiter.
- Ne jamais push du code qui ne compile pas.

---

## 3. SÉCURITÉ

### Clés API
- **JAMAIS hardcoder de clé API, token, ou secret dans le code source.** Aucune exception.
- Toutes les clés vont dans `.env.local` (développement) ou dans les variables d'environnement du service d'hébergement (production).
- Le fichier `.env.example` documente chaque variable requise avec des valeurs placeholder.

### Fichiers .env
- **Ne jamais commiter de fichier `.env` contenant de vraies clés.**
- `.env` et `.env.local` doivent être dans `.gitignore`.
- Seul `.env.example` (avec des placeholders) est commité.

### Secrets Cloudflare Workers
- Les secrets (`ADMIN_PASSWORD`, `RESEND_API_KEY`) sont effacés par `npx wrangler deploy`.
- **Après chaque deploy**, exécuter `node post-deploy.cjs` pour remettre les secrets.
- Ne JAMAIS utiliser `echo` en PowerShell pour passer les secrets (ajoute `\r\n`).
- Méthode fiable : Node.js `execSync` avec `{ input: value }`.

---

## 4. QUALITÉ DE CODE

### Interdit en production
- ❌ `console.log()` — Supprimer avant tout commit.
- ❌ Imports inutilisés — Supprimer avant tout commit.
- ❌ Code mort (fonctions, composants, hooks jamais appelés) — Supprimer.

### Accepté en production
- ✅ `console.error()` dans les blocs `catch` — pour le logging d'erreurs.
- ✅ `console.warn()` pour les dégradations gracieuses.

### TypeScript
- Mode `strict: true` obligatoire.
- Ne jamais utiliser `any` sauf en dernier recours, avec un commentaire justificatif.
- Toujours typer les props, les retours de fonction, et les états.

---

## 5. STANDARDS INTRALYS (Sites Courtiers Immobiliers)

### 5.1 Toggle bilingue FR/EN
- Bouton FR / EN dans la Navbar. Français par défaut, persisté dans `localStorage`.

### 5.2 CTA principal
- Texte standardisé : **« RENCONTRE STRATÉGIQUE GRATUITE »**
- Présent dans : Hero, Navbar, MobileStickyBar, ExitIntentPopup, Deliverables.

### 5.3 Calculatrice hypothécaire enrichie
- Hypothèque + taxe foncière + assurance habitation = total mensuel.

### 5.4 Section Propriétés
- Vraies photos + badges (NOUVELLE/EXCLUSIVE/VENDU) + superficie + lien Centris.

### 5.5 Titres en UPPERCASE
- Tous les `<h2>` et boutons CTA : `uppercase tracking-widest`.

### 5.6 Section Équipe Parent enrichie
- Logo bannière immobilière + membres avec phone/website/stars/reviews.
- Modal cliquable (photo agrandie + infos contact).

### 5.7 Section « Première rencontre gratuite »
- Juste avant le formulaire. Badges ✅ Gratuit · ✅ Sans engagement · ✅ Confidentiel.

### 5.8 Services — 3 piliers
- **ACHAT** · **VENTE** · **INVESTISSEMENT** — toujours 3, jamais 2 ni 4.

### 5.9 Newsletter avec email de bienvenue
- Le worker détecte les inscriptions newsletter et envoie un email de bienvenue premium.
- 2 emails : notification courtier + bienvenue subscriber.

### 5.10 Admin avec lien retour
- `/admin/login` : lien "← Retour au site" sous le formulaire.
- `/admin/leads` : lien "← Retour au site" dans le header.

> 📖 Pour les détails complets, lire `CLAUDE.md` §10-12 et `CLIENT_SWAP.md`.

---

## 6. DÉPLOIEMENT

### Cloudflare Workers (par défaut)
```bash
# 1. Build
bun run build

# 2. Deploy
npx wrangler deploy

# 3. ⚠️ OBLIGATOIRE — Remettre les secrets
node post-deploy.cjs

# 4. Vérifier
# - Login admin
# - Formulaires achat + vente
# - Newsletter email
```

> ⚠️ Pas de dossier `functions/`. Toute la logique backend est dans `src/worker.ts`.
> Les headers de sécurité sont dans `public/_headers`.

---

## 7. GIT

### Checkpoint commits
- **Toujours faire un commit checkpoint avant toute modification majeure.**
- Format : `git commit -m "checkpoint: avant [description]"`

### Messages de commit
- Format court et descriptif en français.
- Exemples : `"fix: suppression console.log"`, `"feat: ajout section Propriétés"`, `"docs: mise à jour CLAUDE.md"`.

### Branches
- `main` = production. Tout push déclenche un déploiement.
- Pour les changements risqués, créer une branche feature.

---

## 8. GÉNÉRAL

### Au démarrage de tout projet
1. **Chercher `CLAUDE.md`** à la racine → le lire en entier.
2. **Chercher `INTRALYS_MASTER.md`** → comprendre l'architecture.
3. **Chercher `.env.example`** → variables requises.
4. **Chercher `gemini.md`** (ce fichier) → règles globales.
5. **Lire `LESSONS_LEARNED.md`** → ne pas répéter les erreurs passées.

### Documentation
- Toute modification structurelle doit être reflétée dans la documentation.
- Ne jamais supprimer de documentation existante sans raison explicite.

### Principes
- **Coder pour la lisibilité**, pas pour l'intelligence.
- **Un composant = un fichier = une responsabilité.**
- **Tester avant de push.** Toujours.
