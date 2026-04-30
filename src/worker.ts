// Worker principal Serujan v2 — API + assets + sécurité headers
// Architecture : run_worker_first → ce worker intercepte TOUTE requête
//                puis route vers /api/* ou délègue à env.ASSETS pour le SPA.

import { Resend } from "resend";
import { clientConfig as CLIENT } from "./lib/config";
import {
  sanitizeHtml,
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  isLikelyBot,
  buildSecurityHeaders,
  CSP_DIRECTIVES,
  MAX_LEAD_ATTEMPTS,
  LEAD_WINDOW_HOURS,
} from "./lib/security";
import { forwardToGhl } from "./worker/ghl";

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
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Fail-fast : configuration runtime requise pour les routes API
    if (url.pathname.startsWith("/api/")) {
      if (!env.DB || !env.ADMIN_PASSWORD) {
        return withSecurityHeaders(json({ error: "Configuration manquante" }, 500));
      }

      // Bloquer les requêtes POST sans Content-Type JSON
      // (empêche les form submissions cross-origin CSRF)
      if (request.method === "POST") {
        const ct = request.headers.get("Content-Type") || "";
        if (!ct.includes("application/json")) {
          return withSecurityHeaders(json({ error: "Content-Type invalide" }, 415));
        }
      }

      const apiResponse = await handleApi(url.pathname, request, env, ctx);
      return withSecurityHeaders(apiResponse);
    }

    // Tout le reste → SPA (Vite build dans /dist)
    const assetResponse = await env.ASSETS.fetch(request);
    return withSecurityHeaders(assetResponse);
  },
} satisfies ExportedHandler<Env>;

async function handleApi(
  pathname: string,
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  if (pathname === "/api/leads" && request.method === "POST") {
    return handleLeads(request, env, ctx);
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
async function handleLeads(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
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
      // Attribution (migration 004)
      source?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      utm_term?: string;
      utm_content?: string;
      referrer?: string;
      language?: string;
    };

    // Anti-bot : honeypot + timing
    if (isLikelyBot({ elapsed_ms: body.elapsed_ms, hp: body.hp })) {
      await env.DB.prepare("INSERT INTO lead_attempts (ip) VALUES (?)").bind(ip).run();
      return json({ success: true, id: "silent" });
    }

    // Nom obligatoire ; au moins UN canal de contact (email OU phone) requis.
    if (!body.name || (!body.email && !body.phone)) {
      return json({ error: "Nom et téléphone ou courriel requis" }, 400);
    }

    const cleanName = sanitizeInput(body.name, 100);
    const cleanEmail = sanitizeInput(body.email, 200);
    const cleanPhone = sanitizeInput(body.phone, 30);
    const cleanProjectType = sanitizeInput(body.project_type, 100);
    const cleanAmount = sanitizeInput(body.estimated_amount, 100);
    const cleanMessage = sanitizeInput(body.message, 1000);

    // Attribution (sanitize light — données déjà filtrées côté client)
    const cleanSource = sanitizeInput(body.source, 50);
    const cleanUtmSource = sanitizeInput(body.utm_source, 100);
    const cleanUtmMedium = sanitizeInput(body.utm_medium, 100);
    const cleanUtmCampaign = sanitizeInput(body.utm_campaign, 100);
    const cleanUtmTerm = sanitizeInput(body.utm_term, 100);
    const cleanUtmContent = sanitizeInput(body.utm_content, 100);
    const cleanReferrer = sanitizeInput(body.referrer, 500);
    const cleanLanguage = sanitizeInput(body.language, 20);

    if (cleanName.length < 2) return json({ error: "Nom trop court" }, 400);
    if (cleanEmail && !isValidEmail(cleanEmail)) return json({ error: "Email invalide" }, 400);
    if (cleanPhone && !isValidPhone(cleanPhone))
      return json({ error: "Numéro de téléphone invalide" }, 400);
    if (!cleanEmail && !cleanPhone) return json({ error: "Téléphone ou courriel requis" }, 400);

    const id = crypto.randomUUID();

    // INSERT enrichi : 7 champs métier + 9 attribution + ghl_status par défaut
    await env.DB.prepare(
      `INSERT INTO leads (
        id, name, email, phone, project_type, estimated_amount, message,
        source, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        referrer, language, ghl_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        id,
        cleanName,
        cleanEmail,
        cleanPhone,
        cleanProjectType,
        cleanAmount,
        cleanMessage,
        cleanSource,
        cleanUtmSource,
        cleanUtmMedium,
        cleanUtmCampaign,
        cleanUtmTerm,
        cleanUtmContent,
        cleanReferrer,
        cleanLanguage,
        env.GHL_WEBHOOK_URL && CLIENT.ghl.enabled ? "pending" : "skipped",
      )
      .run();

    // Enregistrement de la tentative pour le rate limit
    await env.DB.prepare("INSERT INTO lead_attempts (ip) VALUES (?)").bind(ip).run();

    // Notification email à Serujan + accusé de réception au lead (best-effort)
    try {
      const resend = new Resend(env.RESEND_API_KEY);

      // 1) Notification interne à Serujan
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

      // 2) Accusé de réception au lead — uniquement si email fourni
      // (Si seulement le téléphone est rempli, Serujan rappelle directement.)
      if (cleanEmail) {
        await resend.emails.send({
          from: CLIENT.emailFrom,
          to: [cleanEmail],
          replyTo: CLIENT.email,
          subject: "Demande reçue · Équipe Serujan",
          html: renderConfirmationHtml({
            name: cleanName,
            phone: cleanPhone,
            amount: cleanAmount,
          }),
        });
      }
    } catch (emailErr) {
      console.warn("Échec notification email:", emailErr);
    }

    // Webhook GHL — non bloquant pour la réponse via ctx.waitUntil.
    // Forward avec retry 1× + 500ms, puis UPDATE D1 avec le statut de sync.
    ctx.waitUntil(
      (async () => {
        const result = await forwardToGhl(
          env.GHL_WEBHOOK_URL,
          CLIENT.ghl,
          {
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            project_type: cleanProjectType,
            estimated_amount: cleanAmount,
            message: cleanMessage,
            source: cleanSource,
          },
          {
            utm_source: cleanUtmSource,
            utm_medium: cleanUtmMedium,
            utm_campaign: cleanUtmCampaign,
            utm_term: cleanUtmTerm,
            utm_content: cleanUtmContent,
            referrer: cleanReferrer,
            language: cleanLanguage,
          },
        );
        try {
          await env.DB.prepare(
            `UPDATE leads SET synced_to_ghl_at = ?, ghl_status = ?, ghl_response = ? WHERE id = ?`,
          )
            .bind(
              result.status === "skipped" ? null : new Date().toISOString(),
              result.status,
              result.response,
              id,
            )
            .run();
        } catch (dbErr) {
          console.warn("Échec UPDATE ghl_status:", dbErr);
        }
      })(),
    );

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

// Email d'accusé de réception au lead — confirme que la demande est arrivée
// et donne le prochain pas (rappel personnel sous 24h ouvrées).
function renderConfirmationHtml(d: { name: string; phone: string; amount: string }): string {
  const firstName = sanitizeHtml(d.name.split(/\s+/)[0] || d.name);
  const phoneLine = d.phone
    ? `<p style="margin:0 0 14px;font-size:14px;color:#cfcfcf;line-height:1.7;">Pendant ce délai, vous pouvez aussi joindre directement Serujan au <a href="tel:+1${CLIENT.phone.raw}" style="color:#d4af37;text-decoration:none;font-weight:600;">${sanitizeHtml(CLIENT.phone.display)}</a>.</p>`
    : "";
  const amountLine = d.amount
    ? `<p style="margin:0 0 18px;font-size:13px;color:#9a9a9a;line-height:1.6;">Demande référencée — fourchette indicative <strong style="color:#cfcfcf;">${sanitizeHtml(d.amount)}</strong>.</p>`
    : "";

  return `
    <div style="background:#070a0e;padding:32px 16px;font-family:'Inter','Helvetica Neue',Helvetica,Arial,sans-serif;">
      <div style="max-width:580px;margin:0 auto;background:#0e0e10;border:1px solid #2a2a2a;border-radius:16px;overflow:hidden;color:#f5f5f5;">

        <!-- Bandeau or éditorial -->
        <div style="background:linear-gradient(135deg,rgba(212,175,55,0.12) 0%,rgba(212,175,55,0.04) 100%);padding:28px 32px;border-bottom:1px solid #2a2a2a;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="display:inline-block;width:28px;height:1px;background:#d4af37;"></span>
            <span style="font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#d4af37;font-weight:500;">Demande reçue · Équipe Serujan</span>
          </div>
          <h2 style="margin:14px 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:300;font-style:italic;font-size:28px;color:#f5f5f5;letter-spacing:-0.015em;line-height:1.15;">
            Bonjour ${firstName},
          </h2>
        </div>

        <div style="padding:28px 32px 32px;">
          <p style="margin:0 0 16px;font-size:15px;color:#e5e5e5;line-height:1.75;">
            Merci pour votre demande. Elle a bien été enregistrée et sera traitée personnellement par
            <strong style="color:#fff;font-weight:600;">Serujan Kaneshalingam</strong>.
          </p>

          <!-- Cartouche prochain pas -->
          <div style="margin:24px 0;padding:20px 22px;background:rgba(212,175,55,0.06);border-left:2px solid #d4af37;border-radius:6px;">
            <div style="font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#d4af37;font-weight:600;margin-bottom:8px;">Prochaine étape</div>
            <p style="margin:0;font-size:15px;color:#e5e5e5;line-height:1.7;">
              Vous serez recontacté <strong style="color:#d4af37;font-weight:600;">sous 24 heures ouvrées</strong> pour cadrer le projet, discuter de la structure de financement adaptée et planifier les prochaines étapes.
            </p>
          </div>

          ${amountLine}
          ${phoneLine}

          <!-- Engagement personnel -->
          <blockquote style="margin:28px 0 0;padding:18px 22px;border:1px solid rgba(212,175,55,0.2);border-radius:10px;background:rgba(255,255,255,0.015);">
            <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#e8e6e1;line-height:1.65;">
              « Chaque demande reçoit une attention personnelle. Pas un assistant, pas un script — vous parlerez directement à moi pour cadrer votre projet. »
            </p>
            <div style="margin-top:10px;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:rgba(212,175,55,0.85);">
              — Serujan Kaneshalingam
            </div>
          </blockquote>

          <!-- Confidentialité -->
          <div style="margin:24px 0 0;padding:16px 20px;border:1px solid rgba(212,175,55,0.18);border-radius:10px;background:rgba(212,175,55,0.03);">
            <div style="font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#d4af37;font-weight:600;margin-bottom:8px;">Confidentialité garantie</div>
            <p style="margin:0;font-size:13px;color:#bdbdbd;line-height:1.65;">
              Vos informations restent strictement confidentielles. Conformité <strong style="color:#cfcfcf;">Loi 25 du Québec</strong>. Vos états financiers ne sont jamais transmis à un prêteur sans votre autorisation explicite, prêteur par prêteur.
            </p>
          </div>

          <!-- Signature -->
          <p style="margin:28px 0 0;font-size:13px;color:#9a9a9a;line-height:1.7;">
            Au plaisir d'échanger,<br>
            <span style="color:#d4af37;font-style:italic;font-family:Georgia,serif;font-size:18px;font-weight:300;">Équipe Serujan</span><br>
            <span style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#7a7a7a;">Courtage hypothécaire commercial — Montréal</span>
          </p>
        </div>

        <!-- Footer -->
        <div style="border-top:1px solid #2a2a2a;padding:16px 32px;font-size:10px;color:#6a6a6a;letter-spacing:0.06em;background:#0a0a0c;">
          <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
            <span>${sanitizeHtml(CLIENT.address.street)}, ${sanitizeHtml(CLIENT.address.suite)} · ${sanitizeHtml(CLIENT.address.city)}, ${sanitizeHtml(CLIENT.address.province)}</span>
            <span>
              <a href="tel:+1${CLIENT.phone.raw}" style="color:#9a9a9a;text-decoration:none;font-family:Menlo,Consolas,monospace;letter-spacing:0.06em;">${sanitizeHtml(CLIENT.phone.display)}</a>
            </span>
          </div>
        </div>
      </div>
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

    if (!password || !(await timingSafeEqual(password, env.ADMIN_PASSWORD))) {
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

/**
 * Comparaison à temps constant — protège contre les timing attacks.
 * Utilise crypto.subtle pour garantir un temps d'exécution fixe
 * indépendant du contenu des chaînes comparées.
 */
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const keyData = enc.encode(a);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigA = await crypto.subtle.sign("HMAC", key, enc.encode(a));
  const sigB = await crypto.subtle.sign("HMAC", key, enc.encode(b));
  if (sigA.byteLength !== sigB.byteLength) return false;
  const viewA = new Uint8Array(sigA);
  const viewB = new Uint8Array(sigB);
  let diff = 0;
  for (let i = 0; i < viewA.length; i++) {
    diff |= viewA[i] ^ viewB[i];
  }
  return diff === 0;
}
