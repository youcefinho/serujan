# gemini.md — Directives Universelles Antigravity

> Ce fichier contient les règles globales qui s'appliquent à **TOUS** les projets — sites web et applications.
> Antigravity doit lire ce fichier à chaque ouverture de projet.

---

## 1. STACK PAR DÉFAUT

| Outil | Usage |
|---|---|
| **React** | UI — composants fonctionnels uniquement |
| **TypeScript** | Typage strict obligatoire sur tout projet |
| **Tailwind CSS v4** | Styles utilitaires (syntaxe v4 avec `@theme inline`, couleurs `oklch`) |
| **Vite** | Build tool et dev server |
| **Bun** | Runtime et gestionnaire de paquets |

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

---

## 4. QUALITÉ DE CODE

### Interdit en production
- ❌ `console.log()` — Supprimer avant tout commit.
- ❌ Imports inutilisés — Supprimer avant tout commit.
- ❌ Code mort (fonctions, composants, hooks jamais appelés) — Supprimer ou justifier par un commentaire.

### Accepté en production
- ✅ `console.error()` dans les blocs `catch` — pour le logging d'erreurs.
- ✅ `console.warn()` pour les dégradations gracieuses (ex: fallback quand un service est down).

### TypeScript
- Mode `strict: true` obligatoire.
- Ne jamais utiliser `any` sauf en dernier recours, avec un commentaire `// eslint-disable-next-line @typescript-eslint/no-explicit-any -- raison`.
- Toujours typer les props, les retours de fonction, et les états.

---

## 5. STANDARDS INTRALYS (Sites Courtiers Immobiliers)

Ces standards s'appliquent à tous les projets de landing page Intralys :

### 5.1 Toggle bilingue FR/EN
- Bouton de bascule FR / EN dans la Navbar.
- Français = langue par défaut, choix persisté dans `localStorage`.

### 5.2 CTA principal
- Texte standardisé sur tout le site : **« RENCONTRE STRATÉGIQUE GRATUITE »**
- Présent dans : Hero, Navbar, MobileStickyBar, ExitIntentPopup, Deliverables.

### 5.3 Calculatrice hypothécaire enrichie
- Inclure : paiement hypothécaire + **taxe foncière annuelle** + **assurance habitation**.
- Afficher la **ventilation mensuelle totale** (hypothèque + taxes/12 + assurance/12).

### 5.4 Section Propriétés
- Section placeholder « DÉCOUVREZ NOS PROPRIÉTÉS » avec cartes et lien Centris du courtier.

### 5.5 Titres en UPPERCASE
- Tous les `<h2>` : `uppercase tracking-widest`.
- Tous les boutons CTA : `uppercase tracking-widest`.

### 5.6 Section Équipe Parent
- Section dédiée à la bannière immobilière (Royal LePage, RE/MAX, Sutton, etc.).

### 5.7 Section « Première rencontre gratuite »
- Placée juste avant le formulaire de contact.
- Titre : « VOTRE PREMIÈRE RENCONTRE EST GRATUITE »
- Badges : ✅ Gratuit · ✅ Sans engagement · ✅ Confidentiel

### 5.8 Services — 3 piliers
- **ACHAT** · **VENTE** · **INVESTISSEMENT** — toujours 3, jamais 2 ni 4.

> 📖 Pour les détails complets, lire `CLAUDE.md` §10, `INTRALYS_MASTER.md` §11, et `CLIENT_SWAP.md`.

---

## 6. DÉPLOIEMENT

### Netlify (par défaut)
```bash
# 1. Vérifier le build
bun run build

# 2. Commiter
git add -A
git commit -m "description concise"

# 3. Pousser — Netlify auto-deploy
git push origin main
```

- Netlify détecte le push et déploie automatiquement via `netlify.toml`.
- Les headers de sécurité (CSP, X-Frame-Options, etc.) sont configurés dans `netlify.toml`.
- Ne jamais déployer manuellement sauf urgence.

---

## 7. SUPABASE

### Nommage des variables
- **Toujours** : `VITE_SUPABASE_ANON_KEY` et `SUPABASE_ANON_KEY`
- **Jamais** : `VITE_SUPABASE_PUBLISHABLE_KEY` ni `SUPABASE_PUBLISHABLE_KEY`
- Si un outil Supabase génère du code avec `PUBLISHABLE_KEY`, le renommer immédiatement en `ANON_KEY`.

### Sécurité
- `client.ts` (clé anon) → côté client uniquement.
- `client.server.ts` (clé service_role) → Netlify Functions uniquement. **JAMAIS** dans du code frontend.
- Row Level Security (RLS) activé sur toutes les tables.

---

## 8. GIT

### Checkpoint commits
- **Toujours faire un commit checkpoint avant toute modification majeure** (refactoring, migration, ajout de feature).
- Format : `git commit -m "checkpoint: avant [description du changement]"`
- Cela permet de revenir en arrière si la modification casse quelque chose.

### Messages de commit
- Format court et descriptif en français ou anglais.
- Exemples : `"fix: suppression console.log en prod"`, `"feat: ajout section Propriétés"`, `"docs: mise à jour CLAUDE.md"`.

### Branches
- `main` = branche de production. Tout push déclenche un déploiement.
- Pour les changements risqués, créer une branche feature et merger via PR.

---

## 9. PHP / WORDPRESS

Quand un projet utilise WordPress :

### Environnement local
- **Toujours utiliser LocalWP** (Local by Flywheel) pour le développement et les tests.
- Ne jamais tester directement sur un serveur de production.

### Règles de développement
- **Ne jamais modifier les fichiers core de WordPress.** Les mises à jour écraseront tout.
- **Toujours utiliser un child theme** pour les modifications de thème.
- **Toujours utiliser les hooks** (`add_action`, `add_filter`) pour les modifications de comportement.
- Les modifications vont dans `functions.php` du child theme ou dans un plugin custom.

### Plugins
- Préférer les hooks et le code custom aux plugins quand c'est raisonnable.
- Documenter chaque plugin installé et sa raison d'être.

---

## 10. GÉNÉRAL

### Au démarrage de tout projet
1. **Chercher `CLAUDE.md`** à la racine du projet. S'il existe, le lire en entier avant toute action.
2. **Chercher `INTRALYS_MASTER.md`** à la racine. S'il existe, le lire pour comprendre l'architecture.
3. **Chercher `.env.example`** pour connaître les variables d'environnement requises.
4. **Chercher `gemini.md`** (ce fichier) pour les règles globales.

### Documentation
- Toute modification structurelle doit être reflétée dans la documentation (`CLAUDE.md`, `README.md`, etc.).
- Ne jamais supprimer de documentation existante sans raison explicite.

### Principes
- **Coder pour la lisibilité**, pas pour l'intelligence.
- **Un composant = un fichier = une responsabilité.**
- **Tester avant de push.** Toujours.
