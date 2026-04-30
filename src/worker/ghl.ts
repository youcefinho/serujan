// ═══════════════════════════════════════════════════════════
// GoHighLevel — module pur, testable, no side-effects
// ═══════════════════════════════════════════════════════════
// Construit le payload natif GHL (firstName/lastName/phone E.164/tags/customFields)
// à partir d'un lead D1 + attribution UTM + config client.
//
// forwardToGhl() effectue le POST avec timeout 5s + 1× retry après 500ms.
// Retourne { status, response } pour traçabilité D1.
//
// Multi-tenant : ghlConfig.sourcePrefix + ghlConfig.clientName
//   → un même module sert tous les clients de l'agence.
// ═══════════════════════════════════════════════════════════

export interface GhlConfig {
  enabled: boolean;
  sourcePrefix: string;       // ex: "serujan" → tags "serujan-leadform"
  clientName: string;         // ex: "Serujan" → custom field site_source
  defaultTags: readonly string[];
  defaultCountry: string;     // "CA" → +1 prefix sur 10 digits
}

export interface LeadAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  language?: string;
}

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  estimated_amount: string;
  message: string;
  source: string;             // leadform | midpage_cta | exit_intent | calculator
}

export interface GhlPayload {
  firstName: string;
  lastName: string;
  name: string;
  email?: string;
  phone?: string;
  source: string;
  tags: string[];
  customFields: Record<string, string>;
}

export type GhlStatus = "ok" | "error" | "skipped" | "pending";

export interface GhlForwardResult {
  status: GhlStatus;
  response: string;           // JSON ou message d'erreur, truncated 500 chars
  attempts: number;
}

// ── Splitters / normalizers ────────────────────────────────

export function splitName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = (fullName || "").trim().replace(/\s+/g, " ");
  if (!trimmed) return { firstName: "", lastName: "" };
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { firstName: trimmed, lastName: "" };
  return {
    firstName: trimmed.slice(0, idx),
    lastName: trimmed.slice(idx + 1),
  };
}

export function toE164(phone: string, country: string = "CA"): string {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  // CA/US : 10 digits → +1XXXXXXXXXX, 11 digits commençant par 1 → +1...
  if ((country === "CA" || country === "US") && digits.length === 10) {
    return `+1${digits}`;
  }
  if ((country === "CA" || country === "US") && digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  // Sinon on prepend juste un + (au-delà du périmètre actuel)
  return `+${digits}`;
}

// ── Tags derivation (kebab-case, dedup, max 10) ────────────

const SLUG_RE = /[^a-z0-9]+/g;
function slug(s: string): string {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(SLUG_RE, "-")
    .replace(/^-+|-+$/g, "");
}

export function deriveTags(args: {
  source: string;
  language?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  prefix: string;
  defaultTags: readonly string[];
}): string[] {
  const tags: string[] = [];
  // Source du tunnel (entrée du formulaire)
  if (args.source) {
    const tag = args.prefix ? `${slug(args.prefix)}-${slug(args.source)}` : slug(args.source);
    if (tag) tags.push(tag);
  }
  // Langue
  if (args.language) {
    const lang = args.language.split("-")[0]?.toLowerCase();
    if (lang) tags.push(`lang-${lang}`);
  }
  // UTM
  if (args.utmSource) tags.push(`utm-${slug(args.utmSource)}`);
  if (args.utmMedium) tags.push(`utm-medium-${slug(args.utmMedium)}`);
  if (args.utmCampaign) tags.push(`campaign-${slug(args.utmCampaign)}`);
  // Defaults client
  for (const t of args.defaultTags) {
    const s = slug(t);
    if (s) tags.push(s);
  }
  // Dedup case-insensitive, cap 10
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of tags) {
    const key = t.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
    if (out.length >= 10) break;
  }
  return out;
}

// ── Payload builder ────────────────────────────────────────

function omitEmpty<T extends Record<string, string>>(obj: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== "" && v != null) (out as Record<string, string>)[k] = v;
  }
  return out;
}

export function buildGhlPayload(
  lead: LeadInput,
  attribution: LeadAttribution,
  cfg: GhlConfig,
): GhlPayload {
  const { firstName, lastName } = splitName(lead.name);
  const phone = lead.phone ? toE164(lead.phone, cfg.defaultCountry) : "";
  const tags = deriveTags({
    source: lead.source,
    language: attribution.language,
    utmSource: attribution.utm_source,
    utmMedium: attribution.utm_medium,
    utmCampaign: attribution.utm_campaign,
    prefix: cfg.sourcePrefix,
    defaultTags: cfg.defaultTags,
  });

  const customFields = omitEmpty({
    project_type: lead.project_type,
    estimated_amount: lead.estimated_amount,
    message: lead.message,
    utm_source: attribution.utm_source ?? "",
    utm_medium: attribution.utm_medium ?? "",
    utm_campaign: attribution.utm_campaign ?? "",
    utm_term: attribution.utm_term ?? "",
    utm_content: attribution.utm_content ?? "",
    referrer: attribution.referrer ?? "",
    language: attribution.language ?? "",
    site_source: cfg.clientName,
    submitted_at: new Date().toISOString(),
  }) as Record<string, string>;

  const payload: GhlPayload = {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`.trim(),
    source: cfg.sourcePrefix ? `${cfg.sourcePrefix}-${lead.source}` : lead.source,
    tags,
    customFields,
  };
  if (lead.email) payload.email = lead.email;
  if (phone) payload.phone = phone;
  return payload;
}

// ── Forward avec retry ─────────────────────────────────────

const FORWARD_TIMEOUT_MS = 5000;
const RETRY_DELAY_MS = 500;

function truncate(s: string, n = 500): string {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

async function attemptForward(url: string, payload: GhlPayload): Promise<{ ok: boolean; body: string; status: number }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
    });
    const body = await res.text().catch(() => "");
    return { ok: res.ok, body: truncate(body), status: res.status };
  } catch (err) {
    return { ok: false, body: truncate(err instanceof Error ? err.message : String(err)), status: 0 };
  }
}

export async function forwardToGhl(
  webhookUrl: string | undefined,
  cfg: GhlConfig,
  lead: LeadInput,
  attribution: LeadAttribution,
): Promise<GhlForwardResult> {
  if (!webhookUrl || !cfg.enabled) {
    return { status: "skipped", response: "", attempts: 0 };
  }
  const payload = buildGhlPayload(lead, attribution, cfg);

  // Tentative 1
  const r1 = await attemptForward(webhookUrl, payload);
  if (r1.ok) return { status: "ok", response: r1.body, attempts: 1 };

  // Retry après 500ms
  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
  const r2 = await attemptForward(webhookUrl, payload);
  if (r2.ok) return { status: "ok", response: r2.body, attempts: 2 };

  return {
    status: "error",
    response: `[1] ${r1.status} ${r1.body} || [2] ${r2.status} ${r2.body}`.slice(0, 500),
    attempts: 2,
  };
}
