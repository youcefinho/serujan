import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

// ═══════════════════════════════════════════════════════════
// useScrollDepth — fire un GA4 event aux thresholds de scroll
//
// Permet à Meta/Google de segmenter les users engagés (scroll 75-100%)
// vs les bounces (< 25%). Améliore l'optimisation des audiences ads.
// ═══════════════════════════════════════════════════════════

const THRESHOLDS = [25, 50, 75, 100] as const;

export function useScrollDepth(): void {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    function getScrollPercent(): number {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) return 0;
      return (scrollTop / scrollHeight) * 100;
    }

    function handleScroll() {
      const percent = getScrollPercent();
      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold);
          trackEvent("scroll_depth", {
            event_category: "engagement",
            event_label: `${threshold}%`,
            scroll_percent: threshold,
          });
        }
      }
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // check initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
