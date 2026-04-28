// Calendly URL — set VITE_CALENDLY_URL in .env.local
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/dahmanimohamedrouchdi";

import { trackCalendlyClick } from "@/lib/analytics";

/**
 * Opens the Calendly popup widget.
 * Listens for the `calendly.event_scheduled` postMessage event
 * and saves the lead data via l'API Cloudflare (/api/leads).
 */
export function openCalendly(e?: React.MouseEvent, location = "unknown") {
  e?.preventDefault();

  // Tracking GA4
  trackCalendlyClick(location);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- API Calendly externe
  const Calendly = (window as any).Calendly;
  if (!Calendly) {
    // Fallback: open Calendly in a new tab if script didn't load
    window.open(CALENDLY_URL, "_blank", "noopener");
    return;
  }

  Calendly.initPopupWidget({ url: CALENDLY_URL });
}

// One-time listener for Calendly booking events → save via API
let listenerAttached = false;

export function attachCalendlyListener() {
  if (listenerAttached) return;
  listenerAttached = true;

  window.addEventListener("message", async (event) => {
    // Calendly sends postMessage events for various actions
    if (event.data?.event !== "calendly.event_scheduled") return;

    const payload = event.data?.payload;
    if (!payload) return;

    try {
      const invitee = payload.invitee ?? {};

      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "buy",
          name: invitee.name ?? "Rendez-vous Calendly",
          email: invitee.email ?? "",
          phone: "",
          message: `Rendez-vous pris via Calendly le ${
            payload.event?.start_time
              ? new Date(payload.event.start_time).toLocaleString("fr-CA")
              : "date inconnue"
          }`,
        }),
      });

      // Lead sauvegardé avec succès
    } catch (err) {
      console.error("Failed to save Calendly lead:", err);
    }
  });
}
