import { useEffect } from "react";
import { clientConfig } from "@/lib/config";

// ═══════════════════════════════════════════════════════════
// GhlPixel — injection conditionnelle du tracking pixel GHL
// ═══════════════════════════════════════════════════════════
// Le pixel GHL ne s'injecte que si VITE_GHL_PIXEL_ID (env build-time)
// OU clientConfig.ghl.pixelId est défini. Sinon : no-op (rien dans le DOM).
//
// Multi-tenant : chaque client a son propre pixelId. Pour onboarder un
// nouveau client : set VITE_GHL_PIXEL_ID dans .env OU édit
// clientConfig.ghl.pixelId dans config.ts. Voir DEPLOYMENT.md.
//
// Pixel domain & CSP : à ajouter dans src/lib/security.ts (script-src,
// connect-src) après confirmation du domaine GHL réel par l'agence.
// ═══════════════════════════════════════════════════════════

const GHL_PIXEL_BASE = "https://link.msgsndr.com/js/form_embed.js";
// NB : Le vrai endpoint pixel GHL pourra varier selon le sous-compte
// (link.msgsndr.com / leadconnectorhq.com / msgsndr.com).
// Pour l'instant on utilise le format documenté générique.

export function GhlPixel(): null {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Priorité : env var build-time, fallback config.ts, sinon désactivé
    const pixelId =
      (import.meta.env.VITE_GHL_PIXEL_ID as string | undefined) ||
      clientConfig.ghl.pixelId ||
      "";

    if (!pixelId || !clientConfig.ghl.enabled) return;

    // Évite injection multiple si le composant remount (HMR, dev)
    if (document.querySelector(`script[data-ghl-pixel="${pixelId}"]`)) return;

    const script = document.createElement("script");
    script.src = GHL_PIXEL_BASE;
    script.async = true;
    script.defer = true;
    script.dataset.ghlPixel = pixelId;
    script.setAttribute("data-location-id", pixelId);
    document.head.appendChild(script);

    return () => {
      // Cleanup si le composant unmount (rare — GhlPixel est en root)
      const existing = document.querySelector(`script[data-ghl-pixel="${pixelId}"]`);
      if (existing) existing.remove();
    };
  }, []);

  return null;
}
