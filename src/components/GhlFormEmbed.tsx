import { useEffect, useRef, useState } from "react";
import { trackLeadFormSubmit } from "@/lib/analytics";

// ═══════════════════════════════════════════════════════════
// GhlFormEmbed — widget GHL Site Form intégré dans le site
//
// Architecture v2 (mai 2026) — remplace le LeadForm custom v1.
// Le form est rendu par GHL dans une iframe.
// On écoute les postMessage de GHL pour fire les pixels au submit.
// ═══════════════════════════════════════════════════════════

const GHL_EMBED_SCRIPT_URL = "https://link.msgsndr.com/js/form_embed.js";
const GHL_WIDGET_BASE = "https://api.leadconnectorhq.com/widget/form/";

// Sentinel value pour le placeholder pendant la migration v1→v2.
// Tant que ce placeholder est en place, l'iframe affichera l'erreur GHL standard.
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
  }, []);

  // PostMessage listener pour fire les pixels au submit du form
  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleMessage(event: MessageEvent) {
      const fromGhl =
        event.origin.includes("leadconnectorhq.com") ||
        event.origin.includes("msgsndr.com");
      if (!fromGhl) return;

      const data = event.data as Record<string, unknown> | null | undefined;
      // Le format exact du postMessage GHL peut varier — on capture large.
      const isSubmit =
        (data && typeof data === "object" &&
          (data.type === "form" ||
            data.event === "form_submit" ||
            data.action === "submit"));

      if (isSubmit) {
        // Fire GA4 conversion (consent-aware via Consent Mode v2)
        trackLeadFormSubmit("ghl_site_form");
        onSubmitSuccess?.(data);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [formId, onSubmitSuccess]);

  // Placeholder visible en dev quand le formId n'est pas encore configuré.
  // En prod, l'iframe GHL affichera le message d'erreur standard si le formId est invalide.
  if (formId === PLACEHOLDER) {
    return (
      <div
        className={`rounded-xl border border-dashed border-gold/30 bg-black-elevated/30 p-8 text-center ${className ?? ""}`}
        style={{ minHeight: height }}
      >
        <p className="text-sm text-foreground/55">
          ⚠️ Form GHL pas encore configuré.
          <br />
          Renseigner <code className="text-gold">clientConfig.ghl.formIds.leadform</code> après création du form dans GHL.
        </p>
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
