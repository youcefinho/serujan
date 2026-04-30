// ═══════════════════════════════════════════════════════════
// leadClient — wrapper unifié pour POST /api/leads
// ═══════════════════════════════════════════════════════════
// Tous les composants qui soumettent un lead (LeadForm, MidPageCTA,
// ExitIntent, Calculator) passent par submitLead(). Cela garantit :
//   1. Le `source` est toujours envoyé (entrée du tunnel)
//   2. L'attribution UTM/referrer/language est attachée automatiquement
//   3. Le format JSON et les headers sont cohérents
//   4. Une seule couche réseau à maintenir/tester
// ═══════════════════════════════════════════════════════════

import { getAttribution } from "./attribution";

export type LeadSource = "leadform" | "midpage_cta" | "exit_intent" | "calculator";

// Champs métier qui peuvent être envoyés (tous optionnels sauf name+phone OR email).
// Validation côté serveur.
export interface LeadPayload {
  name: string;
  email?: string;
  phone?: string;
  project_type?: string;
  estimated_amount?: string;
  message?: string;
  hp: string;          // honeypot — toujours envoyé (vide en condition normale)
  elapsed_ms: number;  // anti-bot timing
}

export async function submitLead(args: {
  source: LeadSource;
  payload: LeadPayload;
}): Promise<Response> {
  const attribution = getAttribution();

  const body = {
    // Champs métier
    name: args.payload.name,
    email: args.payload.email ?? "",
    phone: args.payload.phone ?? "",
    project_type: args.payload.project_type ?? "",
    estimated_amount: args.payload.estimated_amount ?? "",
    message: args.payload.message ?? "",
    hp: args.payload.hp,
    elapsed_ms: args.payload.elapsed_ms,

    // Source du tunnel (entrée formulaire)
    source: args.source,

    // Attribution capturée à la 1ère visite (sessionStorage)
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    referrer: attribution.referrer,
    language: attribution.language,
  };

  return fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
