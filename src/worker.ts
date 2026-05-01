// Worker principal Serujan v3 — assets statiques + admin API + sécurité headers
//
// Architecture v2 (mai 2026) — Site Forms GHL embed.
// Le pipeline lead v1 (POST /api/leads → D1 → Resend → forwardToGhl) est retiré.
// Les leads sont désormais capturés via le widget GHL Site Form embed dans le React.
// Le Worker ne sert plus qu'à :
//   - servir les assets statiques (build Vite dans dist/)
//   - appliquer les headers de sécurité (CSP, HSTS, etc.)
//   - exposer le dashboard admin /admin (lecture des leads historiques en D1)

import { buildSecurityHeaders, CSP_DIRECTIVES } from "./lib/security";

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  ADMIN_PASSWORD: string;
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

    // Routes API admin uniquement
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

      const apiResponse = await handleApi(url.pathname, request, env);
      return withSecurityHeaders(apiResponse);
    }

    // Tout le reste → SPA (Vite build dans /dist)
    const assetResponse = await env.ASSETS.fetch(request);
    return withSecurityHeaders(assetResponse);
  },
} satisfies ExportedHandler<Env>;

async function handleApi(pathname: string, request: Request, env: Env): Promise<Response> {
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
