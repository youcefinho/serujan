# PROMPT ANTIGRAVITY — Phase 3 : Polish, Deploy & Audit

> Copier-coller ce prompt dans Antigravity (VS Code) après que Claude Code ait terminé la Phase 2.
> Remplacer les {{VARIABLES}} par les informations du client.
> Dernière mise à jour : 2026-04-28

---

## PROMPT À COLLER DANS ANTIGRAVITY :

```
## CONTEXTE

Je suis Rochdi, développeur solo chez Intralys. Le projet `{{NOM_REPO}}` vient d'être personnalisé par Claude Code pour le courtier **{{NOM_COURTIER}}** ({{VILLE}}).

Le code est dans `c:\Users\rochdi\.gemini\antigravity\scratch\{{NOM_REPO}}`

**Lis d'abord :**
1. `CLAUDE.md` — les standards et les 27 leçons apprises
2. `CLIENT_SWAP.md` — les vérifications post-swap

---

## MISSION — Audit + Polish + Deploy

### 1. AUDIT COMPLET (obligatoire)

```bash
# Build
bun run build   # DOIT être 0 erreurs

# Vérifier qu'il n'y a plus de données de l'ancien client
grep -ri "mathis" src/
grep -ri "mathis" index.html
grep -ri "gatineau" src/   # sauf si le client EST à Gatineau

# Vérifier la qualité
grep -r "console.log" src/ --include="*.ts" --include="*.tsx"   # DOIT être 0
```

### 2. TESTS VISUELS (dans le navigateur)

Ouvrir `http://localhost:5173` et vérifier :
- [ ] Hero : bon nom, bonne photo, bon territoire, bon CTA
- [ ] Navbar : logo, toggle FR/EN fonctionne, CTA, bon téléphone
- [ ] Toggle FR → EN → FR : 100% du texte change, aucun texte hardcodé visible
- [ ] About : bonne bio, bonne photo, CTA présent
- [ ] Services : 3 piliers (ACHAT · VENTE · INVESTISSEMENT)
- [ ] Calculatrice : fonctionne, CTA avec nom du courtier
- [ ] Témoignages : vrais avis du client, lien Google Review
- [ ] Properties : bonnes villes, badges, superficie
- [ ] PropertyAlerts : inscription email fonctionne
- [ ] Équipe parent : membres avec phone/website/stars, modal cliquable
- [ ] FreeConsultation : section avant le formulaire, badges ✅
- [ ] LeadForm : soumission ACHAT + VENTE → page merci
- [ ] Footer : bon tel, email, adresse, réseaux, secteurs desservis
- [ ] MobileStickyBar : visible sur mobile, bon CTA
- [ ] WhatsApp : bon numéro, bon message
- [ ] Responsive : tester 375px, 768px, 1440px
- [ ] Animations : scroll reveal, hover effects

### 3. CORRECTIONS

Si des problèmes sont trouvés, les corriger. Exemples fréquents :
- Texte hardcodé oublié dans un composant
- Mauvaise couleur (vérifier COLOR_PALETTES.md)
- Photo pas chargée (vérifier le path de l'import)
- Toggle FR/EN ne change pas un texte

### 4. DEPLOY

```bash
# Build final
bun run build   # DOIT être 0 erreurs

# Deploy
npx wrangler deploy

# ⚠️ OBLIGATOIRE — Remettre les secrets
node post-deploy.cjs
```

### 5. VÉRIFICATIONS POST-DEPLOY (en production)

- [ ] Login admin → `/admin/login` avec le mot de passe → ça marche
- [ ] Formulaire ACHAT → remplir et soumettre → page merci → lead dans admin
- [ ] Formulaire VENTE → remplir et soumettre → page merci → lead dans admin
- [ ] Newsletter → inscrire un email → email de bienvenue reçu (vérifier spams)
- [ ] Notification courtier → email reçu par le courtier
- [ ] Admin panel → leads visibles → export CSV fonctionne
- [ ] Lien "← Retour au site" dans l'admin
- [ ] Vider les leads de test :
  ```bash
  npx wrangler d1 execute {{DB_NOM}} --command="DELETE FROM leads" --remote
  ```

### 6. COMMIT + PUSH FINAL

```bash
git add -A
git commit -m "deploy: {{NOM_COURTIER}} — site en production"
git push -u origin main
```

### 7. DOCUMENTATION

Mettre à jour `CLAUDE.md` si de nouvelles leçons ont été découvertes pendant l'audit.
Ajouter dans la section §12 (LEÇONS APPRISES).

---

## RÈGLES
- Toujours en français (réponses, commits, commentaires)
- Bun, jamais npm
- 0 console.log
- 0 erreurs de build
- Ne pas déployer si l'audit visuel n'est pas passé
```
