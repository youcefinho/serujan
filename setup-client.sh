#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# INTRALYS — Script d'installation pour nouveau client
# ═══════════════════════════════════════════════════════════════
# Usage : bash setup-client.sh
# Ce script guide la configuration d'un nouveau projet client.
# ═══════════════════════════════════════════════════════════════

set -e

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║         INTRALYS — Configuration Nouveau Client         ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# ── Étape 1 : Informations du client ──────────────────────────
read -p "📝 Nom du courtier (ex: Marie Dupont) : " COURTIER_NOM
read -p "📝 Nom du repo GitHub (ex: montreal-premier-achat) : " REPO_NOM
read -p "📝 Nom de la DB D1 (ex: marie-dupont-leads) : " DB_NOM
read -p "📝 Téléphone (ex: 5141234567) : " TEL
read -p "📝 Email (ex: info@mariedupont.com) : " EMAIL
read -p "📝 Ville principale (ex: Montréal) : " VILLE
read -p "📝 URL Calendly : " CALENDLY_URL

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  Récapitulatif :"
echo "  Courtier    : $COURTIER_NOM"
echo "  Repo        : $REPO_NOM"
echo "  Base D1     : $DB_NOM"
echo "  Téléphone   : $TEL"
echo "  Email       : $EMAIL"
echo "  Ville       : $VILLE"
echo "  Calendly    : $CALENDLY_URL"
echo "═══════════════════════════════════════════════════════════"
echo ""
read -p "✅ Confirmer ? (o/n) : " CONFIRM
if [ "$CONFIRM" != "o" ]; then
  echo "❌ Annulé."
  exit 1
fi

# ── Étape 2 : Remote GitHub ───────────────────────────────────
echo ""
echo "🔗 Configuration du remote GitHub..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/youcefinho/$REPO_NOM.git"
echo "   ✅ Remote configuré : youcefinho/$REPO_NOM"

# ── Étape 3 : Créer la base D1 ───────────────────────────────
echo ""
echo "🗄️  Création de la base D1..."
echo "   Exécutez manuellement :"
echo "   npx wrangler d1 create $DB_NOM"
echo ""
read -p "📝 Collez le database_id généré : " DB_ID

# ── Étape 4 : Mettre à jour wrangler.jsonc ───────────────────
echo ""
echo "📝 Mise à jour de wrangler.jsonc..."
cat > wrangler.jsonc << EOF
{
  "\$schema": "node_modules/wrangler/config-schema.json",
  "name": "$REPO_NOM",
  "main": "src/worker.ts",
  "compatibility_date": "2025-04-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "$DB_NOM",
      "database_id": "$DB_ID"
    }
  ]
}
EOF
echo "   ✅ wrangler.jsonc mis à jour"

# ── Étape 5 : Exécuter le schéma D1 ──────────────────────────
echo ""
echo "🗄️  Exécution du schéma SQL..."
npx wrangler d1 execute "$DB_NOM" --file=schema.sql
echo "   ✅ Table leads créée"

# ── Étape 6 : Configurer .env.local ──────────────────────────
echo ""
echo "📝 Configuration de .env.local..."
cat > .env.local << EOF
# Variables client — $COURTIER_NOM
VITE_CALENDLY_URL=$CALENDLY_URL
VITE_GA4_ID=G-XXXXXXXXXX
EOF
echo "   ✅ .env.local créé"

# ── Étape 7 : Rappels ────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                    ✅ CONFIGURATION OK                  ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║                                                        ║"
echo "║  Prochaines étapes manuelles :                         ║"
echo "║                                                        ║"
echo "║  1. Modifier src/lib/translations.ts                   ║"
echo "║     → Remplacer les textes de Mathis par $COURTIER_NOM ║"
echo "║                                                        ║"
echo "║  2. Remplacer les photos dans src/assets/              ║"
echo "║     → hero-banner.jpg, mathis-red.jpg, mathis-white.jpg║"
echo "║     → logo-equipe-color.png, logo-equipe-white.png     ║"
echo "║                                                        ║"
echo "║  3. Modifier index.html                                ║"
echo "║     → title, meta description, Schema.org, GA4 ID      ║"
echo "║                                                        ║"
echo "║  4. Modifier src/worker.ts                             ║"
echo "║     → Nom courtier dans l'email, lien guide PDF        ║"
echo "║                                                        ║"
echo "║  5. Build + Deploy :                                   ║"
echo "║     bun install                                        ║"
echo "║     bun run build                                      ║"
echo "║     npx wrangler deploy                                ║"
echo "║                                                        ║"
echo "║  6. Configurer dans Cloudflare Dashboard :             ║"
echo "║     → Settings → Variables et secrets                  ║"
echo "║     → RESEND_API_KEY + ADMIN_PASSWORD                  ║"
echo "║                                                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
