#!/bin/bash
# ============================================================================
# setup-client.sh — Script d'onboarding Intralys
# Usage : ./setup-client.sh <nom-du-client> <nom-du-repo>
# Exemple : ./setup-client.sh "Jean Dupont" "jean-dupont-courtier"
# ============================================================================

set -e

# --- Validation des arguments ---
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "❌ Usage : ./setup-client.sh \"Nom du Client\" \"nom-du-repo\""
  echo "   Exemple : ./setup-client.sh \"Jean Dupont\" \"jean-dupont-courtier\""
  exit 1
fi

CLIENT_NAME="$1"
REPO_NAME="$2"
GITHUB_USER="youcefinho"
TEMPLATE_URL="https://github.com/${GITHUB_USER}/intralys-template.git"
CLIENT_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo ""
echo "🏗️  INTRALYS — Onboarding nouveau client"
echo "========================================="
echo "👤 Client     : ${CLIENT_NAME}"
echo "📦 Repo       : ${CLIENT_URL}"
echo "📋 Template   : ${TEMPLATE_URL}"
echo ""

# --- Étape 1 : Cloner le template ---
echo "1️⃣  Clonage du template master..."
git clone "${TEMPLATE_URL}" "${REPO_NAME}"
cd "${REPO_NAME}"
echo "   ✅ Template cloné dans ./${REPO_NAME}"

# --- Étape 2 : Changer le remote ---
echo ""
echo "2️⃣  Configuration du remote Git..."
git remote remove origin
git remote add origin "${CLIENT_URL}"
echo "   ✅ Remote configuré vers ${CLIENT_URL}"

# --- Étape 3 : Créer .env.local à partir de .env.example ---
echo ""
echo "3️⃣  Création de .env.local..."
if [ -f ".env.example" ]; then
  cp .env.example .env.local
  echo "   ✅ .env.local créé à partir de .env.example"
  echo "   ⚠️  IMPORTANT : Remplissez les variables dans .env.local avant de continuer !"
else
  echo "   ⚠️  .env.example introuvable. Créez manuellement .env.local."
fi

# --- Étape 4 : Installer les dépendances ---
echo ""
echo "4️⃣  Installation des dépendances..."
if command -v bun &> /dev/null; then
  bun install
  echo "   ✅ Dépendances installées avec bun"
else
  echo "   ⚠️  bun non trouvé. Installez bun puis exécutez 'bun install'."
fi

# --- Résumé ---
echo ""
echo "========================================="
echo "🎉 Projet initialisé avec succès !"
echo "========================================="
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Ouvrir .env.local et remplir les clés (Supabase, Resend, Calendly, GA4)"
echo "   2. Créer le projet Supabase du client et la table 'leads'"
echo "   3. Suivre CLIENT_SWAP.md pour le rebranding complet"
echo "   4. Exécuter : bun run build"
echo "   5. Commiter : git add . && git commit -m \"Nouveau client : ${CLIENT_NAME}\""
echo "   6. Pousser  : git push -u origin main"
echo ""
echo "📖 Documentation :"
echo "   - CLAUDE.md              → Règles du projet"
echo "   - CLIENT_SWAP.md         → Checklist des standards Intralys"
echo "   - REPRODUCTION_CHECKLIST → Numéros de lignes exacts pour le swap"
echo "   - INTRALYS_MASTER.md     → Architecture technique complète"
echo ""
