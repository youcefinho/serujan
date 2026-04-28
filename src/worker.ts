// Worker principal — Route les requêtes API vers les handlers
// Les fichiers statiques (assets) sont servis automatiquement par Cloudflare

import { Resend } from 'resend';
import { clientConfig as CLIENT } from './lib/config';

interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
  RESEND_API_KEY: string;
}

// ── Constantes sécurité ─────────────────────────────────────
const SESSION_DURATION_HOURS = 24;
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_HOURS = 1;
const MAX_INPUT_LENGTH = 500;

// ── Sanitization ────────────────────────────────────────────
// Échappe les caractères HTML dangereux (protection XSS pour les emails)
function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Nettoie un input utilisateur : trim + limite de longueur
function sanitizeInput(str: string | undefined, maxLen = MAX_INPUT_LENGTH): string {
  if (!str) return '';
  return str.trim().slice(0, maxLen);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Routage API
    if (url.pathname === '/api/leads' && request.method === 'POST') {
      return handleLeads(request, env);
    }
    if (url.pathname === '/api/send-guide' && request.method === 'POST') {
      return handleSendGuide(request, env);
    }
    if (url.pathname === '/api/admin/login' && request.method === 'POST') {
      return handleAdminLogin(request, env);
    }
    if (url.pathname === '/api/admin/logout' && request.method === 'POST') {
      return handleAdminLogout(request, env);
    }
    if (url.pathname === '/api/admin/leads' && request.method === 'GET') {
      return handleAdminLeads(request, env);
    }

    // Les assets statiques sont servis automatiquement — ce return ne devrait jamais être atteint
    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;

// ── POST /api/leads ──────────────────────────────────────────
async function handleLeads(request: Request, env: Env): Promise<Response> {
  try {
    const { name, email, phone, message, type, budget, timeline, address, property_type } = await request.json() as {
      name: string; email: string; phone?: string; message?: string; type?: string;
      budget?: string; timeline?: string; address?: string; property_type?: string;
    };

    if (!email || !name) {
      return json({ error: 'Nom et email requis' }, 400);
    }

    // Sanitisation des inputs
    const cleanName = sanitizeInput(name, 100);
    const cleanEmail = sanitizeInput(email, 200);
    const cleanPhone = sanitizeInput(phone, 30);
    const cleanMessage = sanitizeInput(message, 1000);
    const cleanType = type === 'sell' ? 'sell' : 'buy';
    const cleanBudget = sanitizeInput(budget, 100);
    const cleanTimeline = sanitizeInput(timeline, 100);
    const cleanAddress = sanitizeInput(address, 300);
    const cleanPropertyType = sanitizeInput(property_type, 100);

    const id = crypto.randomUUID();

    // INSERT résilient — tente avec toutes les colonnes, fallback sur les colonnes de base
    try {
      await env.DB.prepare(
        'INSERT INTO leads (id, name, email, phone, message, type, budget, timeline, address, property_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(id, cleanName, cleanEmail, cleanPhone, cleanMessage, cleanType, cleanBudget, cleanTimeline, cleanAddress, cleanPropertyType).run();
    } catch {
      // Colonnes manquantes — auto-migration puis fallback
      try {
        await env.DB.prepare('ALTER TABLE leads ADD COLUMN budget TEXT DEFAULT \'\'').run();
        await env.DB.prepare('ALTER TABLE leads ADD COLUMN timeline TEXT DEFAULT \'\'').run();
        await env.DB.prepare('ALTER TABLE leads ADD COLUMN address TEXT DEFAULT \'\'').run();
        await env.DB.prepare('ALTER TABLE leads ADD COLUMN property_type TEXT DEFAULT \'\'').run();
      } catch {
        // Colonnes déjà ajoutées ou autre erreur — ignorer
      }
      // Retry avec toutes les colonnes, sinon fallback basique
      try {
        await env.DB.prepare(
          'INSERT INTO leads (id, name, email, phone, message, type, budget, timeline, address, property_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(id, cleanName, cleanEmail, cleanPhone, cleanMessage, cleanType, cleanBudget, cleanTimeline, cleanAddress, cleanPropertyType).run();
      } catch {
        await env.DB.prepare(
          'INSERT INTO leads (id, name, email, phone, message, type) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(id, cleanName, cleanEmail, cleanPhone, cleanMessage, cleanType).run();
      }
    }

    // Déterminer si c'est une inscription newsletter (PropertyAlerts)
    const isNewsletter = cleanName === 'Alerte Propriété';

    // Notification email au courtier (best-effort — ne bloque pas la réponse)
    try {
      const resend = new Resend(env.RESEND_API_KEY);

      if (isNewsletter) {
        // Notification courtier — inscription newsletter
        await resend.emails.send({
          from: CLIENT.emailFrom,
          to: [CLIENT.email],
          subject: `📬 Nouvelle inscription alertes propriétés — ${sanitizeHtml(cleanEmail)}`,
          html: `
            <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;border:1px solid #e0e0e0;border-radius:12px;">
              <h2 style="color:#E63946;margin:0 0 16px;">📬 Nouvelle inscription alertes</h2>
              <p style="font-size:14px;color:#666;">Un visiteur s'est inscrit aux alertes propriétés exclusives.</p>
              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                <tr><td style="padding:8px 0;color:#666;width:100px;">Email</td><td style="padding:8px 0;font-weight:bold;"><a href="mailto:${cleanEmail}" style="color:#E63946;text-decoration:none;">${sanitizeHtml(cleanEmail)}</a></td></tr>
              </table>
              <p style="margin:16px 0 0;font-size:12px;color:#999;">Reçu le ${new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}</p>
            </div>
          `,
        });

        // Email de bienvenue au subscriber
        await resend.emails.send({
          from: CLIENT.emailFrom,
          to: [cleanEmail],
          subject: `🏠 Bienvenue dans nos alertes propriétés exclusives — ${CLIENT.banner.name}`,
          html: buildNewsletterWelcomeEmail(),
        });
      } else {
        // Notification courtier — lead classique (achat/vente)
        const typeLabel = cleanType === 'buy' ? 'Acheteur' : 'Vendeur';
        const details = cleanType === 'buy'
          ? `Budget: ${cleanBudget || '—'} | Échéancier: ${cleanTimeline || '—'}`
          : `Adresse: ${cleanAddress || '—'} | Type: ${cleanPropertyType || '—'}`;

        await resend.emails.send({
          from: CLIENT.emailFrom,
          to: [CLIENT.email],
          subject: `🔔 Nouveau lead ${typeLabel} — ${sanitizeHtml(cleanName)}`,
          html: `
            <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;border:1px solid #e0e0e0;border-radius:12px;">
              <h2 style="color:#E63946;margin:0 0 16px;">Nouveau lead ${typeLabel}</h2>
              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                <tr><td style="padding:8px 0;color:#666;width:100px;">Nom</td><td style="padding:8px 0;font-weight:bold;">${sanitizeHtml(cleanName)}</td></tr>
                <tr><td style="padding:8px 0;color:#666;">Téléphone</td><td style="padding:8px 0;"><a href="tel:${cleanPhone}" style="color:#E63946;text-decoration:none;font-weight:bold;">${sanitizeHtml(cleanPhone)}</a></td></tr>
                <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${cleanEmail}" style="color:#E63946;text-decoration:none;">${sanitizeHtml(cleanEmail)}</a></td></tr>
                <tr><td style="padding:8px 0;color:#666;">Détails</td><td style="padding:8px 0;">${sanitizeHtml(details)}</td></tr>
                ${cleanMessage ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top;">Message</td><td style="padding:8px 0;">${sanitizeHtml(cleanMessage)}</td></tr>` : ''}
              </table>
              <p style="margin:16px 0 0;font-size:12px;color:#999;">Reçu le ${new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}</p>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      console.warn('Échec notification email:', emailErr);
    }

    return json({ success: true, id });
  } catch (error) {
    console.error('Erreur sauvegarde lead:', error);
    return json({ error: 'Erreur serveur' }, 500);
  }
}

// ── Email de bienvenue newsletter (HTML premium) ─────────────
function buildNewsletterWelcomeEmail(): string {
  const city = CLIENT.address.city;
  const team = CLIENT.banner.name;
  const phone = CLIENT.phone.display;
  const siteUrl = CLIENT.siteUrl;

  return `
    <div style="background-color:#0d1b2a;color:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#E63946 0%,#c62828 100%);padding:40px 32px;text-align:center;">
        <h1 style="margin:0;font-size:28px;font-weight:900;letter-spacing:2px;text-transform:uppercase;">🏠 Bienvenue!</h1>
        <p style="margin:12px 0 0;font-size:15px;opacity:0.9;">Vous faites maintenant partie de notre réseau exclusif</p>
      </div>

      <!-- Corps -->
      <div style="padding:32px;">
        <p style="font-size:16px;line-height:1.7;margin:0 0 24px;color:#e0e0e0;">
          Merci de vous être inscrit(e) aux <strong style="color:#E63946;">alertes propriétés exclusives</strong> de <strong>${team}</strong>.
        </p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 24px;color:#e0e0e0;">
          Vous recevrez en priorité nos nouvelles inscriptions à <strong>${city}</strong> — avant même qu'elles soient affichées publiquement.
        </p>

        <!-- Ce que vous recevrez -->
        <div style="background-color:#1b2838;border:1px solid #2a3a4a;border-radius:10px;padding:24px;margin:0 0 28px;">
          <p style="margin:0 0 16px;font-weight:bold;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;color:#E63946;">Ce que vous recevrez :</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-size:15px;color:#e0e0e0;">🏡</td><td style="padding:8px 0 8px 12px;font-size:15px;color:#e0e0e0;">Nouvelles propriétés en exclusivité</td></tr>
            <tr><td style="padding:8px 0;font-size:15px;color:#e0e0e0;">📊</td><td style="padding:8px 0 8px 12px;font-size:15px;color:#e0e0e0;">Analyses du marché immobilier à ${city}</td></tr>
            <tr><td style="padding:8px 0;font-size:15px;color:#e0e0e0;">💡</td><td style="padding:8px 0 8px 12px;font-size:15px;color:#e0e0e0;">Conseils d'experts pour vos projets</td></tr>
            <tr><td style="padding:8px 0;font-size:15px;color:#e0e0e0;">🔔</td><td style="padding:8px 0 8px 12px;font-size:15px;color:#e0e0e0;">Opportunités d'investissement</td></tr>
          </table>
        </div>

        <!-- CTA -->
        <div style="text-align:center;margin:0 0 28px;">
          <a href="${siteUrl}#contact" target="_blank" rel="noopener noreferrer" style="background:linear-gradient(135deg,#E63946 0%,#c62828 100%);color:#ffffff;padding:16px 40px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;">
            Planifier une rencontre gratuite
          </a>
        </div>

        <p style="font-size:14px;line-height:1.6;color:#999;margin:0 0 28px;text-align:center;">
          Vous avez des questions ? Appelez-nous au <a href="tel:${phone.replace(/-/g, '')}" style="color:#E63946;text-decoration:none;font-weight:bold;">${phone}</a>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color:#0a1628;padding:24px 32px;border-top:1px solid #1b2838;text-align:center;">
        <p style="margin:0 0 4px;font-weight:bold;font-size:16px;">${team}</p>
        <p style="margin:0;font-size:13px;color:#666;">Courtiers immobiliers — ${city}</p>
        <p style="margin:12px 0 0;font-size:11px;color:#555;">
          <a href="${siteUrl}" style="color:#E63946;text-decoration:none;">${siteUrl.replace('https://', '')}</a>
        </p>
      </div>
    </div>
  `;
}

// ── POST /api/send-guide ─────────────────────────────────────
async function handleSendGuide(request: Request, env: Env): Promise<Response> {
  try {
    const { prenom, email } = await request.json() as { prenom?: string; email?: string };

    if (!email) {
      return json({ error: 'Email requis' }, 400);
    }

    // Diagnostic : vérifier les bindings
    const diagnostics: string[] = [];
    if (!env.DB) diagnostics.push('DB binding manquant');
    if (!env.RESEND_API_KEY) diagnostics.push('RESEND_API_KEY manquant');

    if (diagnostics.length > 0) {
      return json({ error: `Configuration manquante: ${diagnostics.join(', ')}` }, 500);
    }

    // Sanitisation des inputs
    const cleanPrenom = sanitizeInput(prenom, 100);
    const cleanEmail = sanitizeInput(email, 200);
    // Version HTML-safe pour injection dans le template email
    const safePrenom = sanitizeHtml(cleanPrenom);

    // Sauvegarder le lead dans D1 (best-effort)
    try {
      const id = crypto.randomUUID();
      await env.DB.prepare(
        'INSERT INTO leads (id, name, email, phone, message, type) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(id, cleanPrenom || 'Lead Magnet', cleanEmail, '', 'Guide Gratuit du Premier Acheteur — téléchargé via Lead Magnet', 'buy').run();
    } catch (dbErr) {
      console.warn('Échec sauvegarde lead D1:', dbErr);
    }

    // Envoyer l'email via Resend
    const resend = new Resend(env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: CLIENT.emailFrom,
      to: [cleanEmail],
      subject: CLIENT.emailSubject.fr,
      html: `
        <div style="background-color:#ffffff;color:#1a1a1a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;padding:40px 20px;max-width:600px;margin:0 auto;line-height:1.6;border:1px solid #f0f0f0;border-radius:12px;">
          <h2 style="color:#1a1a1a;font-size:22px;margin-bottom:24px;font-weight:bold;">Bonjour ${safePrenom || ''},</h2>
          <p style="margin-bottom:24px;font-size:16px;">Merci de votre intérêt ! Votre guide gratuit est prêt à être consulté.</p>
          <div style="background-color:#f9f9f9;padding:24px;border-radius:8px;margin-bottom:32px;">
            <p style="margin:0 0 12px;font-weight:bold;color:#1a1a1a;">À l'intérieur vous trouverez :</p>
            <ul style="list-style:none;padding:0;margin:0;">
              <li style="margin-bottom:10px;">✅ Les 5 erreurs les plus courantes à éviter</li>
              <li style="margin-bottom:10px;">✅ Le vrai coût d'achat à ${CLIENT.address.city}</li>
              <li style="margin-bottom:0;">✅ Le processus étape par étape pour acheter sereinement</li>
            </ul>
          </div>
          <div style="text-align:center;margin-bottom:32px;">
            <a href="${CLIENT.guideUrl}" target="_blank" rel="noopener noreferrer" style="background-color:#E63946;color:#ffffff;padding:18px 36px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:16px;">
              Accéder à mon guide gratuit
            </a>
          </div>
          <p style="margin-bottom:32px;font-size:15px;color:#4a4a4a;">Ce guide a été préparé spécialement pour vous aider à réussir votre premier achat immobilier à ${CLIENT.address.city}.</p>
          <div style="border-top:1px solid #eeeeee;padding-top:24px;">
            <p style="margin:0;font-weight:bold;color:#1a1a1a;">À très bientôt,</p>
            <p style="margin:4px 0 0;font-size:16px;color:#1a1a1a;"><strong>${CLIENT.name}</strong></p>
            <p style="margin:2px 0 0;color:#666666;font-size:14px;">${CLIENT.title.fr} — ${CLIENT.address.city}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return json({ error: `Resend: ${JSON.stringify(error)}` }, 500);
    }

    return json({ success: true, data });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return json({ error: `Erreur: ${msg}` }, 500);
  }
}

// ── POST /api/admin/login ────────────────────────────────────
// Sécurité : rate limiting + token stocké en D1 avec expiration
async function handleAdminLogin(request: Request, env: Env): Promise<Response> {
  try {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    // ── Rate limiting : max 5 tentatives par IP par heure ────
    const windowStart = new Date(Date.now() - LOGIN_WINDOW_HOURS * 60 * 60 * 1000).toISOString();
    const { results: attempts } = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM login_attempts WHERE ip = ? AND attempted_at > ?'
    ).bind(ip, windowStart).all();

    const attemptCount = (attempts?.[0]?.count as number) || 0;
    if (attemptCount >= MAX_LOGIN_ATTEMPTS) {
      return json({ error: 'Trop de tentatives. Réessayez dans 1 heure.' }, 429);
    }

    const { password } = await request.json() as { password: string };

    // Enregistrer la tentative (succès ou échec)
    await env.DB.prepare(
      'INSERT INTO login_attempts (ip, attempted_at) VALUES (?, datetime(\'now\'))'
    ).bind(ip).run();

    if (!password || password !== env.ADMIN_PASSWORD) {
      return json({ error: 'Mot de passe incorrect' }, 401);
    }

    // ── Générer un token sécurisé et le stocker en D1 ────────
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000).toISOString();

    await env.DB.prepare(
      'INSERT INTO admin_sessions (token, created_at, expires_at) VALUES (?, datetime(\'now\'), ?)'
    ).bind(token, expiresAt).run();

    // Nettoyer les sessions et tentatives expirées (best-effort)
    try {
      await env.DB.prepare('DELETE FROM admin_sessions WHERE expires_at < datetime(\'now\')').run();
      const cleanupWindow = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      await env.DB.prepare('DELETE FROM login_attempts WHERE attempted_at < ?').bind(cleanupWindow).run();
    } catch {
      // Nettoyage non critique
    }

    return json({ success: true, token });
  } catch (error) {
    console.error('Erreur login admin:', error);
    return json({ error: 'Erreur serveur' }, 500);
  }
}

// ── POST /api/admin/logout ───────────────────────────────────
// Supprime le token de session de D1
async function handleAdminLogout(request: Request, env: Env): Promise<Response> {
  try {
    const token = extractToken(request);
    if (token) {
      await env.DB.prepare('DELETE FROM admin_sessions WHERE token = ?').bind(token).run();
    }
    return json({ success: true });
  } catch (error) {
    console.error('Erreur logout admin:', error);
    return json({ success: true }); // On déconnecte quand même côté client
  }
}

// ── GET /api/admin/leads ─────────────────────────────────────
// Sécurité : vérifie que le token existe en D1 ET n'est pas expiré
async function handleAdminLeads(request: Request, env: Env): Promise<Response> {
  try {
    const token = extractToken(request);
    if (!token) {
      return json({ error: 'Non autorisé' }, 401);
    }

    // Vérifier le token dans D1 + vérifier l'expiration
    const { results } = await env.DB.prepare(
      'SELECT token FROM admin_sessions WHERE token = ? AND expires_at > datetime(\'now\')'
    ).bind(token).all();

    if (!results || results.length === 0) {
      return json({ error: 'Session expirée ou invalide' }, 401);
    }

    const { results: leads } = await env.DB.prepare(
      'SELECT * FROM leads ORDER BY created_at DESC'
    ).all();

    return json({ data: leads });
  } catch (error) {
    console.error('Erreur lecture leads:', error);
    return json({ error: 'Erreur serveur' }, 500);
  }
}

// ── Helpers ──────────────────────────────────────────────────

function extractToken(request: Request): string | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.replace('Bearer ', '').trim();
  return token.length >= 10 ? token : null;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
