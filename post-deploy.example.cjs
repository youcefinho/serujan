// ═══════════════════════════════════════════════════════════
// POST-DEPLOY — Script de configuration des secrets Cloudflare
// ═══════════════════════════════════════════════════════════
// Usage : node post-deploy.cjs (après chaque `npx wrangler deploy`)
//
// INSTRUCTIONS :
// 1. Copier ce fichier en `post-deploy.cjs`
// 2. Remplacer les placeholders par les vraies valeurs
// 3. Ajouter `post-deploy.cjs` au .gitignore (déjà fait)
// 4. Exécuter après chaque deploy
//
// ⚠️ NE JAMAIS commiter ce fichier avec les vraies clés !
// ═══════════════════════════════════════════════════════════

const { execSync } = require("child_process");

// SWAP: Remplacer par les vrais secrets du client
const secrets = {
  ADMIN_PASSWORD: "REMPLACER_PAR_MOT_DE_PASSE_ADMIN",
  RESEND_API_KEY: "REMPLACER_PAR_CLE_RESEND_re_...",
  // GHL_WEBHOOK_URL: 'https://services.leadconnectorhq.com/hooks/VOTRE_ID',  // Optionnel — décommenter si GoHighLevel est utilisé
};

console.log("🔐 Configuration des secrets Cloudflare...\n");

for (const [name, value] of Object.entries(secrets)) {
  try {
    execSync(`npx wrangler secret put ${name}`, {
      input: value,
      stdio: ["pipe", "inherit", "inherit"],
      cwd: __dirname,
    });
    console.log(`✅ ${name} configuré\n`);
  } catch {
    console.error(`❌ ${name} — échec (réessayer)\n`);
  }
}

console.log("🚀 Secrets configurés ! Teste le login sur /admin/login");
