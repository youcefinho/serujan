// Worker principal — Route les requêtes API vers les handlers
// Template Commercial Intralys — Pas de Lead Magnet, pas de newsletter

import { Resend } from 'resend';
import { clientConfig as CLIENT } from './lib/config';

interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
  RESEND_API_KEY: string;
  GHL_WEBHOOK_URL?: string; // GoHighLevel — optionnel, configuré dans Dashboard Cloudflare
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

// Validation email côté serveur (RFC 5322 simplifié)
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 200;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Routage API
    if (url.pathname === '/api/leads' && request.method === 'POST') {
      return handleLeads(request, env);
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
    const body = await request.json() as {
      name: string; email: string; phone?: string;
      project_type?: string; estimated_amount?: string; message?: string;
    };

    if (!body.email || !body.name) {
      return json({ error: 'Nom et email requis' }, 400);
    }

    // Sanitisation des inputs
    const cleanName = sanitizeInput(body.name, 100);
    const cleanEmail = sanitizeInput(body.email, 200);
    const cleanPhone = sanitizeInput(body.phone, 30);
    const cleanProjectType = sanitizeInput(body.project_type, 100);
    const cleanAmount = sanitizeInput(body.estimated_amount, 100);
    const cleanMessage = sanitizeInput(body.message, 1000);

    // Validation : nom min. 2 caractères, email valide
    if (cleanName.length < 2) {
      return json({ error: 'Nom trop court' }, 400);
    }
    if (!isValidEmail(cleanEmail)) {
      return json({ error: 'Email invalide' }, 400);
    }

    const id = crypto.randomUUID();

    await env.DB.prepare(
      'INSERT INTO leads (id, name, email, phone, project_type, estimated_amount, message) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(id, cleanName, cleanEmail, cleanPhone, cleanProjectType, cleanAmount, cleanMessage).run();

    // Notification email au courtier (best-effort)
    try {
      const resend = new Resend(env.RESEND_API_KEY);
      await resend.emails.send({
        from: CLIENT.emailFrom,
        to: [CLIENT.email],
        subject: `🔔 Nouveau lead commercial — ${sanitizeHtml(cleanName)}`,
        html: `
          <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px;border:1px solid #333;border-radius:12px;background:#1a1a1a;color:#fff;">
            <h2 style="color:#d4af37;margin:0 0 16px;">Nouveau lead commercial</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#999;width:120px;">Nom</td><td style="padding:8px 0;font-weight:bold;color:#fff;">${sanitizeHtml(cleanName)}</td></tr>
              <tr><td style="padding:8px 0;color:#999;">Téléphone</td><td style="padding:8px 0;"><a href="tel:${cleanPhone}" style="color:#d4af37;text-decoration:none;font-weight:bold;">${sanitizeHtml(cleanPhone)}</a></td></tr>
              <tr><td style="padding:8px 0;color:#999;">Email</td><td style="padding:8px 0;"><a href="mailto:${cleanEmail}" style="color:#d4af37;text-decoration:none;">${sanitizeHtml(cleanEmail)}</a></td></tr>
              <tr><td style="padding:8px 0;color:#999;">Type de projet</td><td style="padding:8px 0;color:#fff;">${sanitizeHtml(cleanProjectType || '—')}</td></tr>
              <tr><td style="padding:8px 0;color:#999;">Montant estimé</td><td style="padding:8px 0;color:#fff;">${sanitizeHtml(cleanAmount || '—')}</td></tr>
              ${cleanMessage ? `<tr><td style="padding:8px 0;color:#999;vertical-align:top;">Message</td><td style="padding:8px 0;color:#fff;">${sanitizeHtml(cleanMessage)}</td></tr>` : ''}
            </table>
            <p style="margin:16px 0 0;font-size:12px;color:#666;">Reçu le ${new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn('Échec notification email:', emailErr);
    }

    // Webhook GoHighLevel (best-effort)
    if (env.GHL_WEBHOOK_URL) {
      try {
        await fetch(env.GHL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            project_type: cleanProjectType,
            estimated_amount: cleanAmount,
            message: cleanMessage,
            source: 'Site Intralys Commercial',
          }),
        });
      } catch {
        // GHL indisponible → pas grave, le lead est safe en D1
      }
    }

    return json({ success: true, id });
  } catch (error) {
    console.error('Erreur sauvegarde lead:', error);
    return json({ error: 'Erreur serveur' }, 500);
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
