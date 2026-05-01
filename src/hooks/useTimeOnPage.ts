import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// ═══════════════════════════════════════════════════════════
// useTimeOnPage — fire un GA4 event aux thresholds de temps
//
// Engagement passif : un user qui passe 30+ secondes sur la page
// est typiquement plus intéressé qu'un bounce. Aide Meta/Google
// à mieux qualifier les audiences "engaged" vs "low intent".
// ═══════════════════════════════════════════════════════════

const THRESHOLDS_SEC = [10, 30, 60, 180] as const; // 10s, 30s, 1min, 3min

export function useTimeOnPage(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (const sec of THRESHOLDS_SEC) {
      const id = setTimeout(() => {
        trackEvent("time_on_page", {
          event_category: "engagement",
          event_label: `${sec}s`,
          time_seconds: sec,
        });
      }, sec * 1000);
      timeouts.push(id);
    }

    return () => {
      for (const id of timeouts) clearTimeout(id);
    };
  }, []);
}
