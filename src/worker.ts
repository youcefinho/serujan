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
    await env.DB.prepare(
      'INSERT INTO leads (id, name, email, phone, message, type, budget, timeline, address, property_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      id,
      cleanName,
      cleanEmail,
      cleanPhone,
      cleanMessage,
      cleanType,
      cleanBudget,
      cleanTimeline,
      cleanAddress,
      cleanPropertyType,
    ).run();

    return json({ success: true, id });
  } catch (error) {
    console.error('Erreur sauvegarde lead:', error);
    return json({ error: 'Erreur serveur' }, 500);
  }
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
