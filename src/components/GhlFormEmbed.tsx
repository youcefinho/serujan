import { useEffect, useState } from "react";
import { Phone, Mail, Sparkles } from "lucide-react";
import { clientConfig } from "@/lib/config";
import {
  trackLeadFormSubmit,
  trackPhoneClick,
  trackEmailClick,
} from "@/lib/analytics";

// ═══════════════════════════════════════════════════════════
// GhlFormEmbed — widget GHL Site Form intégré dans le site
//
// Architecture v2 (mai 2026) — remplace le LeadForm custom v1.
// Le form est rendu par GHL dans une iframe.
// On écoute les postMessage de GHL pour fire les pixels au submit.
//
// Fallback présentable : tant que le formId est en placeholder (pas encore
// créé dans GHL), on affiche un encadré premium avec phone + email CTAs
// au lieu d'un message dev. Le client peut ainsi voir le site fini en démo
// et contacter le courtier directement en attendant la config GHL.
// ═══════════════════════════════════════════════════════════

const GHL_EMBED_SCRIPT_URL = "https://link.msgsndr.com/js/form_embed.js";
const GHL_WIDGET_BASE = "https://api.leadconnectorhq.com/widget/form/";

// Sentinel value pour le placeholder pendant la migration v1→v2.
// Tant que ce placeholder est en place, on affiche un fallback premium
// présentable au client (phone + email CTAs).
// À remplacer dans clientConfig.ghl.formIds.leadform après création du form GHL.
const PLACEHOLDER = "REPLACE_AFTER_GHL_SETUP";

interface GhlFormEmbedProps {
  formId: string;
  formName?: string;
  height?: number;
  className?: string;
  /** Callback déclenché au submit success (postMessage GHL). */
  onSubmitSuccess?: (payload?: unknown) => void;
}

export function GhlFormEmbed({
  formId,
  formName = "Lead Form",
  height = 650,
  className,
  onSubmitSuccess,
}: GhlFormEmbedProps) {
  const [scriptInjected, setScriptInjected] = useState(false);

  // Inject le script GHL embed une seule fois (partagé entre tous les <GhlFormEmbed>)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (formId === PLACEHOLDER) return; // pas de script si placeholder

    const existing = document.querySelector(`script[src="${GHL_EMBED_SCRIPT_URL}"]`);
    if (existing) {
      setScriptInjected(true);
      return;
    }

    const script = document.createElement("script");
    script.src = GHL_EMBED_SCRIPT_URL;
    script.async = true;
    script.onload = () => setScriptInjected(true);
    document.head.appendChild(script);
  }, [formId]);

  // PostMessage listener pour fire les pixels au submit du form
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (formId === PLACEHOLDER) return;

    function handleMessage(event: MessageEvent) {
      const fromGhl =
        event.origin.includes("leadconnectorhq.com") ||
        event.origin.includes("msgsndr.com");
      if (!fromGhl) return;

      const data = event.data as Record<string, unknown> | null | undefined;
      // Le format exact du postMessage GHL peut varier — on capture large.
      const isSubmit =
        data && typeof data === "object" &&
        (data.type === "form" ||
          data.event === "form_submit" ||
          data.action === "submit");

      if (isSubmit) {
        // Fire GA4 conversion (consent-aware via Consent Mode v2)
        trackLeadFormSubmit("ghl_site_form");
        onSubmitSuccess?.(data);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [formId, onSubmitSuccess]);

  // ── Fallback présentable quand formId pas encore configuré ────
  // Affiche un encadré premium avec phone + email CTAs au lieu d'un message dev.
  // Le client voit un site fini en démo, peut contacter le courtier directement.
  if (formId === PLACEHOLDER) {
    return (
      <div
        className={`rounded-xl border border-gold/20 bg-gradient-to-b from-black-deep/60 to-black-elevated/40 p-8 md:p-10 ${className ?? ""}`}
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 mb-6">
            <Sparkles className="w-3 h-3 text-gold" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold-light">
              Contact direct
            </span>
          </div>

          <p className="font-display text-xl md:text-2xl text-foreground tracking-tight leading-snug mb-2 text-balance">
            Pour démarrer maintenant,
          </p>
          <p className="text-foreground/65 mb-8 text-pretty">
            contactez {clientConfig.shortName} directement :
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <a
              href={`tel:+${clientConfig.phone.international}`}
              onClick={() => trackPhoneClick("ghl-form-fallback")}
              className="group flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-gradient-gold text-black-deep font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 shadow-gold-sm hover:shadow-gold btn-shine"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="tabular-nums">{clientConfig.phone.display}</span>
            </a>
            <a
              href={`mailto:${clientConfig.email}`}
              onClick={() => trackEmailClick("ghl-form-fallback")}
              className="group flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-gold/30 text-foreground font-medium text-sm hover:border-gold/60 hover:bg-gold/5 transition-all duration-300"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="truncate">{clientConfig.email}</span>
            </a>
          </div>

          <p className="mt-8 text-[11px] text-foreground/40">
            Réponse personnelle sous 24 heures ouvrées.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <iframe
        src={`${GHL_WIDGET_BASE}${formId}`}
        title={formName}
        loading="lazy"
        style={{
          width: "100%",
          height: `${height}px`,
          border: "none",
          borderRadius: "0.75rem",
          background: "transparent",
        }}
        id={`inline-${formId}`}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-height={String(height)}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
        allow="clipboard-write"
      />
      {!scriptInjected && (
        <p className="mt-2 text-xs text-foreground/40 text-center">Chargement…</p>
      )}
    </div>
  );
}
