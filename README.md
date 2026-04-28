# 🏠 Template Intralys — Landing Page Courtier Immobilier

> Template universel de site web haute conversion pour courtiers immobiliers au Québec.
> Chaque site = design unique + même architecture de production.

---

## 🛠 Stack Technique

| Outil | Rôle |
|---|---|
| **React 19** | Interface utilisateur (composants fonctionnels) |
| **TypeScript 5.8+** | Typage strict obligatoire |
| **Vite 7** | Build tool et dev server |
| **Tailwind CSS v4** | Styles utilitaires (`@theme inline`, couleurs `oklch`) |
| **TanStack Router** | Routing type-safe basé sur les fichiers |
| **Cloudflare Workers** | Worker unifié : API + assets statiques |
| **Cloudflare D1** | Base de données SQLite serverless (1 DB par client) |
| **Resend** | Envoi d'emails transactionnels |
| **Bun** | Runtime et gestionnaire de paquets (jamais npm) |
| **Calendly** | Prise de rendez-vous en popup |

---

## 🚀 Workflow Nouveau Client — 3 Phases

### Phase 1 : DESIGN (Lovable ou Zoer.ai) — 2-3h
1. Prompter avec le PDF du client (identité, photos, couleurs, style unique)
2. Itérer visuellement jusqu'à validation
3. Exporter le code → push sur GitHub

> ⚠️ Le code exporté = maquette fonctionnelle, PAS du code de production.

### Phase 2 : INGÉNIERIE (Claude Code) — 3-5h
1. Restructurer selon les standards `intralys-template`
2. Implémenter : config.ts, translations.ts, worker.ts, schema.sql
3. Appliquer TOUTES les leçons de `CLAUDE.md` §12

### Phase 3 : POLISH & DEPLOY (Antigravity) — 1-2h
1. `bun run build` → 0 erreurs
2. Toggle FR/EN → 100% du texte change
3. `npx wrangler deploy` → `node post-deploy.cjs`
4. Tester : login admin, formulaires, newsletter, emails

---

## 📋 Déploiement Rapide

```bash
# 1. Cloner le template
git clone https://github.com/youcefinho/intralys-template.git nom-du-client
cd nom-du-client
git remote set-url origin https://github.com/youcefinho/nom-du-client.git

# 2. Installer
bun install

# 3. Créer la base D1
npx wrangler d1 create nom-du-client-leads
# → Copier le database_id dans wrangler.jsonc

# 4. Exécuter le schéma
npx wrangler d1 execute nom-du-client-leads --file=schema.sql --remote

# 5. Configurer
cp .env.example .env.local    # Remplir VITE_CALENDLY_URL, VITE_GA4_ID
cp post-deploy.example.cjs post-deploy.cjs  # Mettre les vrais secrets

# 6. Swap client — suivre CLIENT_SWAP.md

# 7. Build + Deploy
bun run build                 # 0 erreurs obligatoire
npx wrangler deploy
node post-deploy.cjs          # ⚠️ OBLIGATOIRE — remet les secrets

# 8. Vérifications post-deploy
# → Login admin, formulaires, newsletter, emails
```

---

## 📁 Structure du Projet

```
├── src/
│   ├── assets/              # Photos et logos du courtier
│   ├── components/
│   │   ├── landing/         # 1 composant = 1 section de page
│   │   └── ui/              # Composants UI réutilisables
│   ├── hooks/               # Hooks custom (useScrollReveal, etc.)
│   ├── lib/
│   │   ├── config.ts        # ⭐ Données client centralisées
│   │   ├── translations.ts  # Toutes les traductions FR/EN
│   │   ├── LanguageContext.tsx  # Provider i18n
│   │   └── calendly.ts      # Helper Calendly
│   ├── routes/              # TanStack Router (file-based)
│   └── worker.ts            # ⭐ Worker Cloudflare (API routes)
├── public/
│   ├── _headers             # Headers de sécurité (CSP)
│   ├── _redirects           # Redirects SPA
│   ├── robots.txt / sitemap.xml
│   └── manifest.json        # PWA
├── wrangler.jsonc            # Config Worker + D1
├── schema.sql               # Schéma complet D1
├── migration-leads.sql      # ALTER TABLE pour bases existantes
├── post-deploy.example.cjs  # Template script secrets
└── .vscode/settings.json    # CSS validate off (Tailwind v4)
```

---

## 📚 Documentation

| Fichier | Contenu |
|---|---|
| `CLAUDE.md` | Instructions IA + standards + 27 leçons apprises |
| `INTRALYS_MASTER.md` | Architecture technique complète |
| `CLIENT_SWAP.md` | Guide pas-à-pas pour adapter à un nouveau client |
| `COLOR_PALETTES.md` | Palettes couleurs par bannière immobilière |
| `LESSONS_LEARNED.md` | Erreurs documentées et solutions |
| `.env.example` | Variables d'environnement requises |

---

*Créé par Intralys · Template universel courtier immobilier haute conversion*
