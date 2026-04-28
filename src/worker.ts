// Worker principal — Route les requêtes API vers les handlers
// Les fichiers statiques (assets) sont servis automatiquement par Cloudflare

import { Resend } from 'resend';
import { clientConfig as CLIENT } from './lib/config';

interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
  RESEND_API_KEY: string;
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

    const id = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO leads (id, name, email, phone, message, type, budget, timeline, address, property_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      id,
      name,
      email,
      phone || '',
      message || '',
      type || 'buy',
      budget || '',
      timeline || '',
      address || '',
      property_type || '',
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

    // Sauvegarder le lead dans D1 (best-effort)
    try {
      const id = crypto.randomUUID();
      await env.DB.prepare(
        'INSERT INTO leads (id, name, email, phone, message, type) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(id, prenom || 'Lead Magnet', email, '', 'Guide Gratuit du Premier Acheteur — téléchargé via Lead Magnet', 'buy').run();
    } catch (dbErr) {
      console.warn('Échec sauvegarde lead D1:', dbErr);
    }

    // Envoyer l'email via Resend
    const resend = new Resend(env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: CLIENT.emailFrom,
      to: [email],
      subject: CLIENT.emailSubject.fr,
      html: `
        <div style="background-color:#ffffff;color:#1a1a1a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;padding:40px 20px;max-width:600px;margin:0 auto;line-height:1.6;border:1px solid #f0f0f0;border-radius:12px;">
          <h2 style="color:#1a1a1a;font-size:22px;margin-bottom:24px;font-weight:bold;">Bonjour ${prenom || ''},</h2>
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
async function handleAdminLogin(request: Request, env: Env): Promise<Response> {
  try {
    const { password } = await request.json() as { password: string };

    if (!password || password !== env.ADMIN_PASSWORD) {
      return json({ error: 'Mot de passe incorrect' }, 401);
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(password + Date.now().toString());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const token = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return json({ success: true, token });
  } catch (error) {
    console.error('Erreur login admin:', error);
    return json({ error: 'Erreur serveur' }, 500);
  }
}

// ── GET /api/admin/leads ─────────────────────────────────────
async function handleAdminLeads(request: Request, env: Env): Promise<Response> {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.replace('Bearer ', '').length < 10) {
      return json({ error: 'Non autorisé' }, 401);
    }

    const { results } = await env.DB.prepare(
      'SELECT * FROM leads ORDER BY created_at DESC'
    ).all();

    return json({ data: results });
  } catch (error) {
    console.error('Erreur lecture leads:', error);
    return json({ error: 'Erreur serveur' }, 500);
  }
}

// ── Helper ───────────────────────────────────────────────────
function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
