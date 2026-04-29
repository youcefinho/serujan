// Worker principal Serujan v2 — API + assets + sécurité headers
// Architecture : run_worker_first → ce worker intercepte TOUTE requête
//                puis route vers /api/* ou délègue à env.ASSETS pour le SPA.

import { Resend } from "resend";
import { clientConfig as CLIENT } from "./lib/config";
import {
  sanitizeHtml,
  sanitizeInput,
  isValidEmail,
  isLikelyBot,
  buildSecurityHeaders,
  CSP_DIRECTIVES,
  MAX_LEAD_ATTEMPTS,
  LEAD_WINDOW_HOURS,
} from "./lib/security";

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  ADMIN_PASSWORD: string;
  RESEND_API_KEY: string;
  GHL_WEBHOOK_URL?: string;
}

// ── Constantes sécurité spécifiques worker ───────────────
const SESSION_DURATION_HOURS = 24;
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_HOURS = 1;

const SECURITY_HEADERS = buildSecurityHeaders(CSP_DIRECTIVES);

// ── Fetch principal ─────────────────────────────────────────
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Routage API
    if (url.pathname.startsWith("/api/")) {
      const apiResponse = await handleApi(url.pathname, request, env);
      return withSecurityHeaders(apiResponse);
    }

    // Tout le reste → SPA (Vite build dans /dist)
    const assetResponse = await env.ASSETS.fetch(request);
    return withSecurityHeaders(assetResponse);
  },
} satisfies ExportedHandler<Env>;

async function handleApi(pathname: string, request: Request, env: Env): Promise<Response> {
  if (pathname === "/api/leads" && request.method === "POST") {
    return handleLeads(request, env);
  }
  if (pathname === "/api/admin/login" && request.method === "POST") {
    return handleAdminLogin(request, env);
  }
  if (pathname === "/api/admin/logout" && request.method === "POST") {
    return handleAdminLogout(request, env);
  }
  if (pathname === "/api/admin/leads" && request.method === "GET") {
    return handleAdminLeads(request, env);
  }
  return json({ error: "Endpoint inconnu" }, 404);
}

// ── POST /api/leads ──────────────────────────────────────────
async function handleLeads(request: Request, env: Env): Promise<Response> {
  try {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";

    // Rate limit : max 10 soumissions par IP par heure
    const windowStart = new Date(Date.now() - LEAD_WINDOW_HOURS * 60 * 60 * 1000).toISOString();
    const { results: attempts } = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM lead_attempts WHERE ip = ? AND attempted_at > ?",
    )
      .bind(ip, windowStart)
      .all();

    const attemptCount = (attempts?.[0]?.count as number) || 0;
    if (attemptCount >= MAX_LEAD_ATTEMPTS) {
      return json({ error: "Trop de demandes. Réessayez dans 1 heure." }, 429);
    }

    const body = (await request.json()) as {
      name: string;
      email: string;
      phone?: string;
      project_type?: string;
      estimated_amount?: string;
      message?: string;
      elapsed_ms?: number;
      hp?: string; // honeypot
    };

    // Anti-bot : honeypot + timing
    if (isLikelyBot({ elapsed_ms: body.elapsed_ms, hp: body.hp })) {
      await env.DB.prepare("INSERT INTO lead_attempts (ip) VALUES (?)").bind(ip).run();
      return json({ success: true, id: "silent" });
    }

    if (!body.email || !body.name) {
      return json({ error: "Nom et email requis" }, 400);
    }

    const cleanName = sanitizeInput(body.name, 100);
    const cleanEmail = sanitizeInput(body.email, 200);
    const cleanPhone = sanitizeInput(body.phone, 30);
    const cleanProjectType = sanitizeInput(body.project_type, 100);
    const cleanAmount = sanitizeInput(body.estimated_amount, 100);
    const cleanMessage = sanitizeInput(body.message, 1000);

    if (cleanName.length < 2) return json({ error: "Nom trop court" }, 400);
    if (!isValidEmail(cleanEmail)) return json({ error: "Email invalide" }, 400);

    const id = crypto.randomUUID();

    await env.DB.prepare(
      "INSERT INTO leads (id, name, email, phone, project_type, estimated_amount, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
      .bind(id, cleanName, cleanEmail, cleanPhone, cleanProjectType, cleanAmount, cleanMessage)
      .run();

    // Enregistrement de la tentative pour le rate limit
    await env.DB.prepare("INSERT INTO lead_attempts (ip) VALUES (?)").bind(ip).run();

    // Notification email (best-effort)
    try {
      const resend = new Resend(env.RESEND_API_KEY);
      await resend.emails.send({
        from: CLIENT.emailFrom,
        to: [CLIENT.email],
        subject: `Nouveau lead commercial — ${sanitizeHtml(cleanName)}`,
        html: renderEmailHtml({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          projectType: cleanProjectType,
          amount: cleanAmount,
          message: cleanMessage,
        }),
      });
    } catch (emailErr) {
      console.warn("Échec notification email:", emailErr);
    }

    // Webhook GHL (best-effort)
    if (env.GHL_WEBHOOK_URL) {
      try {
        await fetch(env.GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            project_type: cleanProjectType,
            estimated_amount: cleanAmount,
            message: cleanMessage,
            source: "Site Serujan",
          }),
        });
      } catch {
        // GHL indisponible → non bloquant
      }
    }

    return json({ success: true, id });
  } catch (error) {
    console.error("Erreur sauvegarde lead:", error);
    return json({ error: "Erreur serveur" }, 500);
  }
}

// Email HTML noir/or — extrait pour lisibilité
function renderEmailHtml(d: {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  amount: string;
  message: string;
}): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:10px 0;color:#9a9a9a;width:140px;font-size:13px;">${label}</td>` +
    `<td style="padding:10px 0;color:#f5f5f5;font-weight:500;">${value}</td></tr>`;

  return `
    <div style="font-family:'Inter',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;border:1px solid #2a2a2a;border-radius:16px;background:#0e0e10;color:#f5f5f5;">
      <div style="border-bottom:1px solid #2a2a2a;padding-bottom:16px;margin-bottom:20px;">
        <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#d4af37;font-weight:600;">Nouveau lead</div>
        <h2 style="margin:8px 0 0;font-family:Georgia,serif;font-weight:400;font-size:22px;color:#f5f5f5;">${sanitizeHtml(d.name)}</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${d.phone ? row("Téléphone", `<a href="tel:${d.phone}" style="color:#d4af37;text-decoration:none;">${sanitizeHtml(d.phone)}</a>`) : ""}
        ${row("Email", `<a href="mailto:${d.email}" style="color:#d4af37;text-decoration:none;">${sanitizeHtml(d.email)}</a>`)}
        ${row("Type de projet", sanitizeHtml(d.projectType || "—"))}
        ${row("Montant estimé", sanitizeHtml(d.amount || "—"))}
        ${d.message ? `<tr><td style="padding:14px 0 6px;color:#9a9a9a;font-size:13px;vertical-align:top;">Message</td><td style="padding:14px 0 6px;color:#f5f5f5;line-height:1.6;">${sanitizeHtml(d.message)}</td></tr>` : ""}
      </table>
      <p style="margin:20px 0 0;font-size:11px;color:#6a6a6a;letter-spacing:0.05em;">Reçu le ${new Date().toLocaleString("fr-CA", { timeZone: "America/Toronto" })}</p>
    </div>
  `;
}

// ── POST /api/admin/login ────────────────────────────────────
async function handleAdminLogin(request: Request, env: Env): Promise<Response> {
  try {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";

    const windowStart = new Date(Date.now() - LOGIN_WINDOW_HOURS * 60 * 60 * 1000).toISOString();
    const { results: attempts } = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM login_attempts WHERE ip = ? AND attempted_at > ?",
    )
      .bind(ip, windowStart)
      .all();

    const attemptCount = (attempts?.[0]?.count as number) || 0;
    if (attemptCount >= MAX_LOGIN_ATTEMPTS) {
      return json({ error: "Trop de tentatives. Réessayez dans 1 heure." }, 429);
    }

    const { password } = (await request.json()) as { password: string };

    await env.DB.prepare("INSERT INTO login_attempts (ip) VALUES (?)").bind(ip).run();

    if (!password || password !== env.ADMIN_PASSWORD) {
      return json({ error: "Mot de passe incorrect" }, 401);
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000).toISOString();

    await env.DB.prepare("INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)")
      .bind(token, expiresAt)
      .run();

    // Cleanup best-effort des anciennes traces
    try {
      await env.DB.prepare("DELETE FROM admin_sessions WHERE expires_at < datetime('now')").run();
      const cleanupWindow = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      await env.DB.prepare("DELETE FROM login_attempts WHERE attempted_at < ?")
        .bind(cleanupWindow)
        .run();
      await env.DB.prepare("DELETE FROM lead_attempts WHERE attempted_at < ?")
        .bind(cleanupWindow)
        .run();
    } catch {
      // non critique
    }

    return json({ success: true, token });
  } catch (error) {
    console.error("Erreur login admin:", error);
    return json({ error: "Erreur serveur" }, 500);
  }
}

// ── POST /api/admin/logout ───────────────────────────────────
async function handleAdminLogout(request: Request, env: Env): Promise<Response> {
  try {
    const token = extractToken(request);
    if (token) {
      await env.DB.prepare("DELETE FROM admin_sessions WHERE token = ?").bind(token).run();
    }
    return json({ success: true });
  } catch (error) {
    console.error("Erreur logout admin:", error);
    return json({ success: true });
  }
}

// ── GET /api/admin/leads ─────────────────────────────────────
async function handleAdminLeads(request: Request, env: Env): Promise<Response> {
  try {
    const token = extractToken(request);
    if (!token) return json({ error: "Non autorisé" }, 401);

    const { results } = await env.DB.prepare(
      "SELECT token FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')",
    )
      .bind(token)
      .all();

    if (!results || results.length === 0) {
      return json({ error: "Session expirée ou invalide" }, 401);
    }

    const { results: leads } = await env.DB.prepare(
      "SELECT * FROM leads ORDER BY created_at DESC",
    ).all();

    return json({ data: leads });
  } catch (error) {
    console.error("Erreur lecture leads:", error);
    return json({ error: "Erreur serveur" }, 500);
  }
}

// ── Helpers ──────────────────────────────────────────────────
function extractToken(request: Request): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.replace("Bearer ", "").trim();
  return token.length >= 10 ? token : null;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function withSecurityHeaders(response: Response): Response {
  // On clone car les headers d'une Response servie par ASSETS sont parfois immuables
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
